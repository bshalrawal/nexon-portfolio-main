'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RichTextEditor } from '@/components/shared/RichTextEditor';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

type PortfolioItem = {
  title: string;
  description: string;
  category: string;
  link: string;
  thumbnailUrl: string;
  order: number;
};

export default function NewPortfolioItemPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<PortfolioItem, 'order'>>({
    title: '',
    description: '',
    category: '',
    link: '',
    thumbnailUrl: ''
  });
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firestore || !user) {
      if (!user) alert("You must be logged in to create an item.");
      return;
    }
    setIsSubmitting(true);
    try {
      const portfolioCollectionRef = collection(firestore, 'portfolio_items');
      const snapshot = await getDocs(portfolioCollectionRef);
      const order = snapshot.size;

      await addDoc(portfolioCollectionRef, {
        ...formData,
        order,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      router.push('/admin/portfolio');
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Portfolio Item</CardTitle>
        <CardDescription>Fill out the details for the new portfolio project.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>
           <div>
            <Label htmlFor="thumbnailUrl">Thumbnail Image</Label>
            <Input id="thumbnailUrl" type="file" onChange={handleThumbnailUpload} accept="image/*" />
            {uploadProgress !== null && (
              <Progress value={uploadProgress} className="w-full mt-2" />
            )}
            {uploadError && (
              <div className="mt-2 text-sm text-destructive font-medium">
                {uploadError}
              </div>
            )}
            {formData.thumbnailUrl && (
              <div className="mt-4 p-2 border rounded-md">
                <p className="text-xs text-muted-foreground mb-2">Thumbnail Preview:</p>
                <Image src={formData.thumbnailUrl} alt="Thumbnail preview" width={100} height={100} className="object-contain rounded-md" />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              content={formData.description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" value={formData.category} onChange={handleInputChange} placeholder="website, branding, seo, etc." required />
          </div>
          <div>
            <Label htmlFor="link">Project Link</Label>
            <Input id="link" name="link" type="url" value={formData.link} onChange={handleInputChange} required />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Item...' : 'Add Item'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
