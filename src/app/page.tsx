<<<<<<< HEAD
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/hero';
import WhatWeDo from '@/components/what-we-do';
import OurServices from '@/components/our-services';
import Portfolio from '@/components/portfolio';
import Solutions from '@/components/solutions';
import WhyNexon from '@/components/why-nexon';
import Faq from '@/components/faq';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WhatWeDo />

        <div className="bg-white rounded-t-[50px] -mt-10 relative z-10">
          <OurServices />
        </div>

        <Solutions />


      


        <WhyNexon />


        <Faq />

      </main>
      <Footer />
=======
'use client';

import { Button } from '@/components/ui/button';
import Hero from '@/components/hero';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/types';
import Link from 'next/link';

export default function Home() {
  const { firestore } = useFirebase();
  const projectsCollection = useMemoFirebase(() => 
    firestore ? collection(firestore, 'portfolio_items') : null,
    [firestore]
  );
  const { data: projects, loading } = useCollection(projectsCollection);

  const validProjects = projects?.filter(p => p.thumbnailUrl).sort((a, b) => a.order - b.order) || [];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
        <h2 className="font-headline text-lg tracking-widest">NEXONINC.TECH</h2>
        <Button asChild variant="link" className="text-foreground">
          <Link href="https://wa.me/9779763607255" target="_blank" rel="noopener noreferrer">
            Let's Collaborate
          </Link>
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <Hero />
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
             <div className="h-40 flex items-center justify-center">
                <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : validProjects && validProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {validProjects.map((project: any) => (
                <ProjectCard key={project.id} project={project as Project} />
              ))}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full p-6 text-sm text-muted-foreground border-t border-border">
        <p className="text-center">
          © {new Date().getFullYear()} NEXONINC.TECH. All rights reserved.
        </p>
      </footer>
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
    </div>
  );
}
