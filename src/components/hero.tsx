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
