
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { RichTextEditor } from '@/components/shared/RichTextEditor';
import { Progress } from '@/components/ui/progress';

const generateRandomSlug = () => {
  return Math.random().toString(36).substring(2, 12);
};

export default function NewPostPage() {
  const firestore = useFirestore();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setSlug(generateRandomSlug());
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(0);
    setUploadError(null);

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
        setImageUrl(url);
        setUploadProgress(100);
      } catch (error: any) {
        console.error("Error uploading image:", error);
        setUploadError(`Upload failed: ${error.message}`);
        setUploadProgress(null);
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to convert image to Data URI.");
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalSlug = slug || generateRandomSlug();
    if (!firestore || !title || !content) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(firestore, 'posts'), {
        title,
        slug: finalSlug,
        content,
        imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      router.push('/admin/posts');
    } catch (e: any) {
      console.error("Error adding document: ", e);
      setUploadError(`Failed to save post: ${e.message || e}`);
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
        <CardDescription>Fill out the details below to add a new post to the site.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title / Place Name</Label>
              <Input id="title" value={title} onChange={handleTitleChange} placeholder="e.g., Bardhaman, Shantiniketan" required />
            </div>
            <div>
              <Label htmlFor="slug-display">Slug</Label>
              <Input id="slug-display" value={slug} readOnly className="bg-muted" />
              <input type="hidden" name="slug" value={slug} />
            </div>
          </div>

          <div>
            <Label htmlFor="imageUrl">Featured Image</Label>
            <Input id="imageUrl" type="file" onChange={handleImageUpload} accept="image/*" />
            {uploadProgress !== null && (
              <Progress value={uploadProgress} className="w-full mt-2" />
            )}
            {uploadError && (
              <div className="mt-2 text-sm text-destructive font-medium">
                {uploadError}
              </div>
            )}
            {imageUrl && (
              <div className="mt-4 p-2 border rounded-md">
                <p className="text-xs text-muted-foreground mb-2">Image Preview:</p>
                <Image src={imageUrl} alt="Image preview" width={100} height={100} className="object-contain rounded-md" />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="content">Description / Content</Label>
            <RichTextEditor
              content={content}
              onChange={setContent}
            />
          </div>

          <div className="flex justify-end gap-4 pt-8">
            <Button type="button" variant="outline" disabled={isSubmitting}>Save as Draft</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
