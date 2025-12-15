"use client";

import Image from 'next/image';
import type { Project } from '@/lib/types';
import Link from 'next/link';
import { format } from 'date-fns';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const displayDate = project.createdAt 
    ? format(new Date(project.createdAt.seconds * 1000), 'yyyy') 
    : new Date().getFullYear().toString();

  return (
    <Link href={`/project/${project.id}`} passHref>
        <div className="group block w-full relative">
            <div className="relative w-full aspect-[3/4] overflow-hidden mb-3">
                <Image
                    src={project.thumbnailUrl}
                    alt={project.category || 'Project Image'}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={project.imageHint}
                />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <h3 className="text-sm font-normal text-black leading-snug">
                    {project.title}
                </h3>
                <p className="text-xs text-neutral-700">{displayDate}</p>
            </div>
        </div>
    </Link>
  );
}
