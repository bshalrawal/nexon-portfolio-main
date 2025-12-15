import BlogPostClient from './blog-post-client';

// This is now a Server Component
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 15, params is a Promise that must be awaited
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
