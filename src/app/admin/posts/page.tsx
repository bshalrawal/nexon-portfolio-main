
'use client';

import { useState } from 'react';
import { collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
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
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  createdAt: any;
};

export default function AdminPostsPage() {
  const firestore = useFirestore();
  const router = useRouter();

  const postsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'posts') : null),
    [firestore]
  );
  
  const { data: posts, isLoading, error } = useCollection<Post>(postsCollectionRef);

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(firestore, 'posts', id));
    }
  };
  
  return (
     <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Create and manage your blog posts here.</CardDescription>
          </div>
          <Button size="sm" className="gap-1" asChild>
            <Link href="/admin/posts/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Post
              </span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading posts...</p>}
        {error && <p className="text-destructive">Error: {error.message}</p>}
        {!isLoading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.createdAt?.toDate().toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.push(`/admin/posts/edit/${post.id}`)}>
                          <Edit className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                         <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
         {!isLoading && !error && posts?.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <p>No blog posts found.</p>
            <p>Click "Add Post" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
