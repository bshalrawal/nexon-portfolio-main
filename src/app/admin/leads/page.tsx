
'use client';

import { useState } from 'react';
import { collection, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  requirements: string;
  submittedAt: Timestamp;
  status: 'new' | 'contacted' | 'closed';
};

export default function LeadsAdminPage() {
  const firestore = useFirestore();

  const leadsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'leads') : null),
    [firestore]
  );
  
  const { data: leads, isLoading, error } = useCollection<Lead>(leadsCollectionRef);

  const handleStatusChange = async (id: string, status: Lead['status']) => {
    if (!firestore) return;
    const leadRef = doc(firestore, 'leads', id);
    try {
      await updateDoc(leadRef, { status });
    } catch (e) {
      console.error("Error updating lead status: ", e);
    }
  };

  const getStatusVariant = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'closed':
        return 'outline';
      default:
        return 'outline';
    }
  }

  return (
     <Card className="bg-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Contact Form Leads</CardTitle>
            <CardDescription>Manage submissions from your website's contact form.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading leads...</p>}
        {error && <p className="text-destructive">Error: {error.message}</p>}
        {!isLoading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submitted</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email & Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads?.sort((a, b) => b.submittedAt.toMillis() - a.submittedAt.toMillis()).map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(lead.submittedAt.toDate(), { addSuffix: true })}
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                        {lead.phone && <span className="text-muted-foreground">{lead.phone}</span>}
                    </div>
                  </TableCell>
                   <TableCell>{lead.company || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{lead.requirements}</TableCell>
                   <TableCell>
                     <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
                   </TableCell>
                  <TableCell>
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(lead.id, 'new')}>
                          Mark as New
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(lead.id, 'contacted')}>
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(lead.id, 'closed')}>
                          Mark as Closed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
         {!isLoading && !error && leads?.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <p>No leads have been submitted yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
