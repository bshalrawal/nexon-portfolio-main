'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { collection, deleteDoc, doc, updateDoc, query, writeBatch } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/shared/RichTextEditor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PlusCircle, Trash2, Edit, ArrowUp, ArrowDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  thumbnailUrl: string;
  order?: number;
};

function EditPortfolioItemForm({ item, onUpdateItem }: { item: PortfolioItem, onUpdateItem: (item: PortfolioItem) => void }) {
  const [formData, setFormData] = useState(item);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({...prev, description: content}));
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        if (typeof reader.result !== 'string') {
            setUploadError('Failed to read file as data URL.');
            return;
        }

        try {
            setUploadProgress(50);
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file: reader.result }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const { url } = await response.json();
            setFormData(prev => ({ ...prev, thumbnailUrl: url }));
            setUploadProgress(100);
        } catch (error: any) {
            console.error(`Error uploading image:`, error);
            setUploadError(`Upload failed: ${error.message}`);
            setUploadProgress(0);
        }
    }
    reader.onerror = () => {
        setUploadError("Failed to convert image to Data URI.");
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdateItem(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title-edit">Title</Label>
        <Input id="title-edit" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>
       <div>
        <Label htmlFor="thumbnailUrl-edit">Thumbnail Image</Label>
        <Input id="thumbnailUrl-edit" type="file" onChange={handleThumbnailUpload} accept="image/*" />
        {uploadProgress !== null && (
            <Progress value={uploadProgress} className="w-full mt-2" />
        )}
        {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
        )}
        {formData.thumbnailUrl && (
            <div className="mt-4 p-2 border rounded-md">
                <p className="text-xs text-muted-foreground mb-2">Thumbnail Preview:</p>
                <Image src={formData.thumbnailUrl} alt="Thumbnail preview" width={100} height={100} className="object-contain rounded-md" />
            </div>
        )}
      </div>
      <div>
        <Label htmlFor="description-edit">Description</Label>
        <RichTextEditor content={formData.description} onChange={handleDescriptionChange} />
      </div>
      <div>
        <Label htmlFor="category-edit">Category</Label>
        <Input id="category-edit" name="category" value={formData.category} onChange={handleInputChange} placeholder="website, branding, seo, etc." required />
      </div>
      <div>
        <Label htmlFor="link-edit">Project Link</Label>
        <Input id="link-edit" name="link" type="url" value={formData.link} onChange={handleInputChange} required />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save Changes</Button>
      </DialogFooter>
    </form>
  );
}

export default function PortfolioAdminPage() {
  const firestore = useFirestore();
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [sortedItems, setSortedItems] = useState<PortfolioItem[]>([]);

  const portfolioCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'portfolio_items') : null),
    [firestore]
  );

  const { data: portfolioItems, isLoading, error } = useCollection<PortfolioItem>(portfolioCollectionRef);

  useEffect(() => {
    if (portfolioItems) {
      const itemsWithOrder = portfolioItems.filter(item => typeof item.order === 'number');
      const itemsWithoutOrder = portfolioItems.filter(item => typeof item.order !== 'number');
      
      itemsWithOrder.sort((a, b) => a.order! - b.order!);
      
      setSortedItems([...itemsWithOrder, ...itemsWithoutOrder]);
    }
  }, [portfolioItems]);

  const handleDeleteItem = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'portfolio_items', id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const handleUpdateItem = async (item: PortfolioItem) => {
    if (!firestore) return;
    const { id, ...data } = item;
    try {
      await updateDoc(doc(firestore, 'portfolio_items', id), data as any);
      setEditingItem(null);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  const handleMove = async (item: PortfolioItem, direction: 'up' | 'down') => {
    if (!firestore || !sortedItems) return;

    const itemsWithOrder = sortedItems.every(p => typeof p.order === 'number');
    if (!itemsWithOrder) {
      // First time reordering: assign order to all items
      const batch = writeBatch(firestore);
      sortedItems.forEach((p, index) => {
        const docRef = doc(firestore, 'portfolio_items', p.id);
        batch.update(docRef, { order: index });
      });
      await batch.commit();
      return;
    }

    const currentIndex = sortedItems.findIndex(p => p.id === item.id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sortedItems.length) return;

    const otherItem = sortedItems[newIndex];

    try {
      const itemRef = doc(firestore, 'portfolio_items', item.id);
      const otherItemRef = doc(firestore, 'portfolio_items', otherItem.id);

      const batch = writeBatch(firestore);
      batch.update(itemRef, { order: otherItem.order });
      batch.update(otherItemRef, { order: item.order });
      await batch.commit();

    } catch (e) {
      console.error("Error reordering items:", e);
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>Manage your portfolio projects. You can add, edit, or delete items.</CardDescription>
          </div>
          <Button size="sm" className="gap-1" asChild>
            <Link href="/admin/portfolio/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Item
              </span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading portfolio items...</p>}
        {error && <p className="text-destructive">Error: {error.message}</p>}
        {!isLoading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedItems?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.thumbnailUrl ? (
                      <Image src={item.thumbnailUrl} alt={item.title} width={80} height={60} className="object-cover rounded-md aspect-[4/3]" />
                    ) : (
                      <div className="w-[80px] h-[60px] bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Thumbnail</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleMove(item, 'up')} disabled={index === 0 && sortedItems.every(p => typeof p.order === 'number')}>
                        <ArrowUp className="h-3.5 w-3.5" />
                        <span className="sr-only">Move Up</span>
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleMove(item, 'down')} disabled={index === sortedItems.length - 1 && sortedItems.every(p => typeof p.order === 'number')}>
                        <ArrowDown className="h-3.5 w-3.5" />
                        <span className="sr-only">Move Down</span>
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setEditingItem(item)}>
                        <Edit className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteItem(item.id)}
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
        {!isLoading && !error && portfolioItems?.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <p>No portfolio items found.</p>
            <Button size="sm" className="gap-1 mt-4" asChild>
              <Link href="/admin/portfolio/new">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Add Item</span>
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Portfolio Item</DialogTitle>
              <DialogDescription>
                Update the details for your portfolio project.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <EditPortfolioItemForm item={editingItem} onUpdateItem={handleUpdateItem} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
