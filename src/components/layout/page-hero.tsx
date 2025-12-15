
"use client";

import { useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import Background from '../assets/Background.png';
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  className?: string;
}

export default function PageHero({ title, subtitle, breadcrumb, className }: PageHeroProps) {
  // Smooth mouse tracking with Framer Motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  const maskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(circle 300px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.3) 40%, black 100%)`
  );
  
  const WebkitMaskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(circle 300px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.3) 40%, black 100%)`
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={cn("relative min-h-[50vh] mb-10 md:min-h-[60vh] overflow-hidden flex flex-col items-center justify-center bg-black text-white p-4", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={Background}
        alt="Abstract background"
        fill
        className="object-cover z-0"
        data-ai-hint="abstract background"
        priority
      />
      
      {/* Dark overlay with spotlight reveal */}
      <motion.div 
        className="absolute inset-0 z-[5] bg-black/90"
        style={{
          maskImage,
          WebkitMaskImage,
        }}
      />

      {/* Spotlight glow effect */}
      <motion.div
        className="absolute z-[6] pointer-events-none rounded-full opacity-50 blur-[100px]"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(0,200,255,0.4) 0%, rgba(0,150,255,0.2) 40%, transparent 70%)',
          x: useTransform(smoothX, (x) => x - 150),
          y: useTransform(smoothY, (y) => y - 150),
        }}
      />


      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center text-center pt-20 md:pt-32">
        <motion.div 
          className="relative mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </motion.div>
        <motion.p 
          className="text-lg md:text-xl font-light max-w-3xl mb-4 text-white/80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
        <motion.div 
          className="text-sm font-light text-white/70"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span>{breadcrumb}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
