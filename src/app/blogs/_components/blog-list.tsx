'use client';

import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

type Post = {
    id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl?: string;
    createdAt: any;
};

const BlogCardSkeleton = () => (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
        <Skeleton className="w-full h-56" />
        <div className="p-6">
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-5 w-24" />
        </div>
    </div>
);


export default function BlogList() {
    const firestore = useFirestore();
    const postsCollectionRef = useMemoFirebase(
        () => (firestore ? query(collection(firestore, 'posts'), orderBy('createdAt', 'desc')) : null),
        [firestore]
    );
    const { data: posts, isLoading, error } = useCollection<Post>(postsCollectionRef);

    return (
        <section className="bg-transparent relative z-10 py-16 md:py-28 px-4 pb-28">
            <div className="container mx-auto">
                {error && <div className="text-center text-destructive py-12"><p>Error: {error.message}</p></div>}
                {!isLoading && !error && !posts?.length ? (
                    <div className="text-center text-muted-foreground py-12">
                        <p>No blog posts have been published yet.</p>
                        <p>Stay tuned for exciting content coming soon!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isLoading ? (
                            <>
                                <BlogCardSkeleton />
                                <BlogCardSkeleton />
                                <BlogCardSkeleton />
                            </>
                        ) : (
                            posts?.map((post) => (
                                <Link href={`/blogs/${post.slug}`} key={post.id}>
                                    <div className="bg-card rounded-lg shadow-md overflow-hidden group">
                                        {post.imageUrl && (
                                            <Image
                                                src={post.imageUrl}
                                                alt={post.title}
                                                width={600}
                                                height={400}
                                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        )}
                                        <div className="p-6">
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {post.createdAt?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                                            <div
                                                className="text-muted-foreground line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: post.content }}
                                            />
                                            <p className="text-primary mt-4 group-hover:underline">Read More →</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
