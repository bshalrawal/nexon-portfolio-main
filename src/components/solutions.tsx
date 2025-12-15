'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type Dot = {
  left: string;
  top: string;
  duration: number;
  delay: number;
};

export default function Solutions() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const generatedDots = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setDots(generatedDots);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white py-36">
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Animated Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-[400px] h-[400px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"
          animate={{
            y: [0, 60, 0],
            x: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-[450px] h-[450px] bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-20 blur-3xl"
          animate={{
            y: [0, -70, 0],
            x: [0, 50, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Dots/Particles */}
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-500 rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-light text-gray-600 mb-2">
            Our <b className="text-gray-900">Solutions</b> are
          </h2>
          <h3 className="text-5xl md:text-8xl font-bold text-gray-900 leading-tight">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <b>Simply</b>
            </motion.span>{" "}
            <motion.i
              className="font-serif font-light text-6xl md:text-9xl text-cyan-500 inline-block"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Creative
            </motion.i>
          </h3>
          <motion.div
            className="max-w-3xl mx-auto mt-6 text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We provide solutions that create impact through creative ideas and
            transforming businesses. We believe in the power of innovative
            solutions combined with practical functionality to align with our
            client's business objectives and help them achieve their goals.
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </motion.div>
            <h4 className="text-2xl font-semibold mb-3 text-gray-900">Innovative Ideas</h4>
            <p className="text-sm text-gray-600">
              Our experts are driven to develop fresh ideas for each project,
              exploring new possibilities to create innovative solutions that
              stand out from the competition and drive results.
            </p>
          </motion.div>

          <motion.div
            className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
            <h4 className="text-2xl font-semibold mb-3 text-gray-900">Effective Strategy</h4>
            <p className="text-sm text-gray-600">
              We create personalized plans and strategies for each client based
              on a thorough understanding of their business goals. We focus on
              achieving these objectives through data-driven insights.
            </p>
          </motion.div>

          <motion.div
            className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            <h4 className="text-2xl font-semibold mb-3 text-gray-900">Seamless Execution</h4>
            <p className="text-sm text-gray-600">
              Our team of experts flawlessly executes projects, seamlessly
              integrating innovative ideas and effective strategies. From
              concept to launch, we ensure a smooth and efficient experience for
              our clients.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}