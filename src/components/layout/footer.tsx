'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin } from 'lucide-react';
import { Button } from '../ui/button';
import Background from '../assets/Background.png';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Smooth mouse tracking with Framer Motion (same as Hero)
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

  return (
    <motion.footer
      onMouseMove={handleMouseMove}
      className="relative text-white pt-28 pb-8 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <Image
        src={Background}
        alt="Background"
        fill
        className="object-cover h-full w-[100vw] z-0"
        data-ai-hint="abstract background"
      />

      {/* Dark overlay with spotlight reveal */}
      <motion.div
        className="absolute inset-0 z-[5] bg-black/90"
        style={{
          maskImage: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(circle 300px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.3) 40%, black 100%)`
          ),
          WebkitMaskImage: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(circle 300px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.3) 40%, black 100%)`
          ),
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

      <div className="container mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Nexon Inc"
                width={140}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-lg text-white/80 font-light leading-relaxed">
              Nexon Inc. designs and builds web, software, and AI products. We combine strategy, engineering, and design to deliver reliable, user-centered solutions that help businesses grow.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground/50 uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/ui-ux-creative-design" className="hover:text-accent transition-colors">UI/UX Creative Design</Link></li>
              <li><Link href="/services/app-development" className="hover:text-accent transition-colors">App Development</Link></li>
              <li><Link href="/services/software-development" className="hover:text-accent transition-colors">Software Development</Link></li>
              <li><Link href="/services/ecommerce-solutions" className="hover:text-accent transition-colors">E-commerce Solutions</Link></li>
              <li><Link href="/services/seo-and-analytics" className="hover:text-accent transition-colors">SEO & Analytics</Link></li>
              <li><Link href="/services/graphic-design" className="hover:text-accent transition-colors">Graphic Design</Link></li>
              <li><Link href="/services/cloud-and-devops" className="hover:text-accent transition-colors">Cloud & DevOps</Link></li>
            </ul>

          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground/50 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Company</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Our Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-accent transition-colors">Our Portfolio</Link></li>
              <li><Link href="/blogs" className="hover:text-accent transition-colors">Our Blog</Link></li>
              <li><Link href="/blogs" className="hover:text-accent transition-colors">Latest News</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/10">
          <div>
            <p className="font-semibold text-primary-foreground/50 uppercase tracking-wider mb-2">Contact Us</p>
            <p className="text-lg font-medium">New Baneshwor, Kathmandu 44600, Nepal</p>
          </div>
          <div>
            <p className="font-semibold text-primary-foreground/50 uppercase tracking-wider mb-2">Call Our Office</p>
            <a href="tel:+9779763607255" className="text-xl font-medium hover:text-accent transition-colors">+977 9763607255</a>
          </div>
          <div>
            <p className="font-semibold text-primary-foreground/50 uppercase tracking-wider mb-2">Send a Message</p>
            <a href="mailto:info@nexoninc.tech" className="text-xl font-medium hover:text-accent transition-colors">info@nexoninc.tech</a>
          </div>


        </div>

        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-white/50">{currentYear} © Nexon Inc | ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </motion.footer>
  );
}
