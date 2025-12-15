'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PageHero from '@/components/layout/page-hero';
import BlogList from './_components/blog-list';
import { BlurFade } from '@/registry/magicui/blur-fade';

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHero
          title="Blogs"
          subtitle="Read our latest articles and insights on web design, development, and marketing."
          breadcrumb="Blogs"
          className="mb-0"
        />
        <BlurFade delay={0.25} inView>
          <div className="bg-background relative z-10">
            <BlogList />
          </div>
        </BlurFade>
      </main>
      <Footer />
    </div>
  );
}
