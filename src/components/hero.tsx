<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Counter } from "./ui/counter";
import Image from "next/image";
import Background from "./assets/Background.png";
import Link from "next/link";

const services = [
  "App Development",
  "Software Development",
  "AI Products & Solutions",
  "Web Development",
  "E-commerce Solutions",
  "Social Media Management",
  "UI/UX Design"
];

export default function Hero() {
  const [currentService, setCurrentService] = useState(0);

  // Rotate text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black text-white mb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <Image
        src={Background}
        fill
        alt="Background"
        className="object-cover z-0"
        priority
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
          x: useTransform(smoothX, (x) => x - 250),
          y: useTransform(smoothY, (y) => y - 250),
        }}
      />

      {/* Content */}
      <div className="relative z-[20] w-full max-w-7xl mx-auto text-center pt-40 px-4">

        {/* Headline */}
        <motion.h1
          className="flex flex-col items-center text-4xl md:text-6xl font-light mb-10 leading-tight"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.span
            className="text-white/80 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We Do
          </motion.span>

          {/* Rotating text */}
          <span
            className="relative h-32 w-full max-w-4xl px-4 font-semibold text-accent text-3xl md:text-6xl flex items-center justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={services[currentService]}
                className="absolute drop-shadow-[0_0_20px_rgba(0,0,0,1)] text-center w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {services[currentService]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          You've found the right agency to give your brand the upper hand.
        </motion.p>

        {/* CTA Button */}
        <Link href="https://wa.me/9779763607255" target="_blank" rel="noopener noreferrer">
          <motion.button
            className="
              group relative px-10 py-4 rounded-full 
              bg-white/10 border border-white/30 
              backdrop-blur-sm
              shadow-[0_0_30px_rgba(0,200,255,0.3)]
              overflow-hidden
            "
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 50px rgba(0,200,255,0.5)",
              borderColor: "rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 font-medium">Get a Quote</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>

        {/* Counters - Positioned like in image */}
        <div className="relative mt-20">
          {/* Top Counter */}
          <motion.div
            className="absolute left-0 bottom-0 hidden lg:block"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="
                bg-white/10 backdrop-blur-md p-6 rounded-2xl 
                border border-white/20
                cursor-default
                w-[280px]
              "
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Counter value={50} from={45} suffix="+" className="text-4xl font-semibold mb-2" />
              <p className="text-xs text-white/70">
                Projects completed for various services<br />in the IT sector.
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom Counter */}
          <motion.div
            className="absolute right-0 bottom-0 hidden lg:block"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="
                bg-white/10 backdrop-blur-md p-6 rounded-2xl 
                border border-white/20
                cursor-default
                w-[280px]
              "
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Counter value={150} from={140} suffix="+" className="text-4xl font-semibold mb-2" />
              <p className="text-xs text-white/70">
                Clients Served Across Various<br />Industries and Sectors Globally
              </p>
            </motion.div>
          </motion.div>


          {/* Mobile Counters */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto lg:hidden"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="
                bg-white/10 backdrop-blur-md p-6 rounded-2xl 
                border border-white/20
                cursor-default
              "
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs md:text-sm mb-2 text-white/70">Projects Completed</p>
              <Counter value={50} from={45} suffix="+" className="text-4xl font-semibold" />
            </motion.div>

            <motion.div
              className="
                bg-white/10 backdrop-blur-md p-6 rounded-2xl 
                border border-white/20
                cursor-default
              "
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs md:text-sm mb-2 text-white/70">Clients Served</p>
              <Counter value={150} from={120} suffix="+" className="text-4xl font-semibold" />
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
=======
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="flex flex-col justify-center h-[70vh] px-8 max-w-7xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[clamp(3rem,8vw,6rem)] font-headline leading-[0.9] font-bold mb-8"
            >
                ROOTED IN<br />
                <span className="text-muted-foreground">INNOVATION.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="max-w-lg text-lg text-muted-foreground leading-relaxed"
            >
                We build premium digital experiences for forward-thinking brands.
                Specializing in marketing tech, ed-tech, and AI solutions.
            </motion.p>
        </section>
    );
};

export default Hero;
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
