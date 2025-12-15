'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { RichTextEditor } from '@/components/shared/RichTextEditor';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const generateRandomSlug = () => {
  return Math.random().toString(36).substring(2, 12);
};

type Post = {
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
};

export default function EditPostPage() {
  const firestore = useFirestore();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);


  useEffect(() => {
    if (!firestore || !id) return;
    const docRef = doc(firestore, 'posts', id as string);
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        const postData = docSnap.data() as Post;
        // Ensure slug exists, if not, create one
        if (!postData.slug) {
          postData.slug = generateRandomSlug();
        }
        setPost(postData);
      } else {
        console.error("No such document!");
      }
      setIsLoading(false);
    }).catch(error => {
      console.error("Error getting document:", error);
      setIsLoading(false);
    });
  }, [firestore, id]);

  const handleInputChange = (field: keyof Post, value: string) => {
    if (!post) return;
    const newPost = { ...post, [field]: value };
    setPost(newPost);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!post) return;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(0);
    setUploadError(null);
    const storage = getStorage();
    const storageRef = ref(storage, `post_images/${Date.now()}_${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setUploadError(`Upload failed: ${error.message}`);
        setUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPost(prev => prev ? { ...prev, imageUrl: downloadURL } : null);
          setUploadProgress(100);
        });
      }
    );
  };

  const handleDataUriConversion = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!post) return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) { // 500KB limit warning
      setUploadError("Warning: Large images (>500KB) stored as Data URIs may slow down your site or exceed database limits. Consider using standard upload.");
    } else {
      setUploadError(null);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPost(prev => prev ? { ...prev, imageUrl: reader.result as string } : null);
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to convert image to Data URI.");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firestore || !post || !id) return;

    // Ensure slug exists before submitting
    const finalPost = {
      ...post,
      slug: post.slug || generateRandomSlug(),
    };

    setIsSubmitting(true);
    const docRef = doc(firestore, 'posts', id as string);
    try {
      await updateDoc(docRef, {
        ...finalPost,
        updatedAt: serverTimestamp(),
      });
      router.push('/admin/posts');
    } catch (e: any) {
      console.error("Error updating document: ", e);
      setUploadError(`Failed to save post: ${e.message || e}`);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="rounded-lg">
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><Skeleton className="h-10 w-full" /></div>
            <div><Skeleton className="h-10 w-full" /></div>
          </div>
          <div><Skeleton className="h-10 w-full" /></div>
          <div><Skeleton className="h-64 w-full" /></div>
          <div className="flex justify-end gap-4 pt-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <CardTitle>Edit Post</CardTitle>
            <CardDescription>Update the details for your post.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={post.title} onChange={(e) => handleInputChange('title', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={post.slug} readOnly className="bg-muted" />
            </div>
          </div>

          <div>
            <Label htmlFor="imageUrl">Featured Image</Label>
            <Tabs defaultValue="upload">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="data-uri">Data URI</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="py-4">
                <Input id="imageUrl" type="file" onChange={handleImageUpload} accept="image/*" />
                {uploadProgress !== null && (
                  <Progress value={uploadProgress} className="w-full mt-2" />
                )}
              </TabsContent>
              <TabsContent value="data-uri" className="py-4">
                <div className="space-y-2">
                  <Label htmlFor="dataUriInput">Select Image for Data URI Conversion</Label>
                  <Input id="dataUriInput" type="file" onChange={handleDataUriConversion} accept="image/*" />
                  <p className="text-xs text-muted-foreground">Best for small images/icons. Large images may cause issues.</p>
                </div>
              </TabsContent>
              <TabsContent value="url" className="py-4">
                <Input name="imageUrl" type="url" placeholder="https://..." value={post.imageUrl || ''} onChange={(e) => handleInputChange('imageUrl', e.target.value)} />
              </TabsContent>
            </Tabs>
            {uploadError && (
              <div className="mt-2 text-sm text-destructive font-medium">
                {uploadError}
              </div>
            )}
            {post.imageUrl && (
              <div className="mt-4 p-2 border rounded-md">
                <p className="text-xs text-muted-foreground mb-2">Image Preview:</p>
                <Image src={post.imageUrl} alt="Image preview" width={100} height={100} className="object-contain rounded-md" />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <RichTextEditor
              content={post.content}
              onChange={(newContent) => handleInputChange('content', newContent)}
            />
          </div>

          <div className="flex justify-end gap-4 pt-8">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
