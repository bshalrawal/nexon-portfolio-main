'use client';
import { collection, query, where, limit } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { BlurFade } from '@/registry/magicui/blur-fade';
import PageHero from '@/components/layout/page-hero';
import type { Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  createdAt: Timestamp;
};

export default function BlogPostClient({ slug }: { slug: string }) {
  const firestore = useFirestore();

  const postQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'posts'), where('slug', '==', slug), limit(1)) : null),
    [firestore, slug]
  );

  const { data: posts, isLoading, error } = useCollection<Post>(postQuery);
  const post = posts?.[0];

  if (isLoading || posts === null) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-96 w-full mb-12 rounded-lg" />
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if ((!post && !isLoading) || error) {
    if (error) console.error("Error fetching post:", error);
    notFound();
  }

  if (!post) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHero
          title={post.title}
          subtitle={post.createdAt?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) || 'Blog Post'}
          breadcrumb={post.title}
        />
        <BlurFade delay={0.25} inView>
          <div className="bg-background relative z-10 py-16 md:py-28 px-4">
            <div className="container mx-auto max-w-4xl">
              {post.imageUrl && (
                <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              )}
              <article
                className="prose dark:prose-invert lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </BlurFade>
      </main>
      <Footer />
    </div>
  );
}
