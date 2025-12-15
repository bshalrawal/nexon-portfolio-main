'use client';
import { useParams } from 'next/navigation';
import { useFirebase, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { ProjectCard } from '@/components/project-card';

export default function ProjectPage() {
  const params = useParams();
  const { id } = params;
  const { firestore } = useFirebase();

  const projectRef = useMemoFirebase(
    () => (firestore && id ? doc(firestore, 'portfolio_items', id as string) : null),
    [firestore, id]
  );
  const { data: project, loading: projectLoading } = useDoc(projectRef);

  const projectsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'portfolio_items') : null),
    [firestore]
  );
  const { data: allProjects, loading: allProjectsLoading } = useCollection(projectsCollection);

  const loading = projectLoading || allProjectsLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">Project not found.</p>
      </div>
    );
  }

  const typedProject = project as Project;
  
  const suggestedProjects = allProjects
    ? (allProjects as Project[]).filter(p => p.id !== id && p.thumbnailUrl).slice(0, 3)
    : [];

  return (
    <div className="bg-background text-foreground">
       <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-background/80 backdrop-blur-sm">
        <a href="/" className="font-headline text-lg tracking-widest">NEXONINC.TECH</a>
       </header>
      <main className="max-w-4xl mx-auto mt-24 px-4 py-8">
        <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-bold font-headline mb-2">{typedProject.title}</h1>
        </div>
        
        {/* Render HTML description from Tiptap */}
        <div 
          className="rich-text-content text-lg text-muted-foreground mb-8"
          dangerouslySetInnerHTML={{ __html: typedProject.description }} 
        />
      </main>
      
      {suggestedProjects.length > 0 && (
        <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-sm font-headline tracking-widest uppercase text-muted-foreground mb-8">You may also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestedProjects.map((p: Project) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
