'use client';
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const cardData = [
  {
    title: "Free Icon Plugin",
    description: "Access a curated icon library to enhance your UI quickly.",
    number: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Free 6 Month Support",
    description: "Complimentary technical support and assistance.",
    number: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Customer Strategy",
    description: "Data-driven acquisition & retention strategies.",
    number: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Premium Image Assets",
    description: "License-cleared assets to elevate your marketing.",
    number: "04",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Most Advanced Features",
    description: "Scalable architecture built with modern standards.",
    number: "05",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Very Reasonable Price",
    description: "Transparent pricing with strong ROI.",
    number: "06",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-yellow-500 to-orange-500"
  }
];

const Card = ({ 
  title, 
  description, 
  number, 
  index,
  icon,
  color
}: { 
  title: string; 
  description: string; 
  number: string;
  index: number;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-lg`}>
        {icon}
      </div>

      {/* Number Badge */}
      <motion.span 
        className={`inline-block text-sm font-semibold text-transparent bg-gradient-to-r ${color} bg-clip-text px-3 py-1 rounded-full border-2 border-current/20`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          delay: index * 0.1 + 0.2 
        }}
      >
        {number}
      </motion.span>

      {/* Title */}
      <motion.h3 
        className="text-xl font-semibold mt-4 text-gray-900"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p 
        className="text-gray-600 mt-2 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default function WhyNexon() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Enhanced Animated Background Orbs */}
      <motion.div 
        className="absolute left-0 top-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent_70%)] blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute right-0 bottom-20 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(147,51,234,0.12),transparent_70%)] blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.4, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div 
        className="absolute left-1/2 top-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(236,72,153,0.1),transparent_70%)] blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-40"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:sticky md:top-32"
          >
            {/* Small Label with Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <motion.div 
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-sm font-medium text-primary">Why Choose Us</span>
            </motion.div>

            {/* Main Heading with Gradient Animation */}
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-gray-700">Why </span>
              <motion.span 
                className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto' }}
                animate={{
                  backgroundPosition: ['0% center', '200% center'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Nexon Inc
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-gray-600 text-lg max-w-xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We deliver results through expert website development, branding, and digital marketing strategies.
              Our team provides personalized solutions to help your business grow efficiently.
            </motion.p>

            {/* Animated Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                <motion.div 
                  className="text-3xl font-bold text-primary mb-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
                >
                  150+
                </motion.div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                <motion.div 
                  className="text-3xl font-bold text-accent mb-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
                >
                  50+
                </motion.div>
                <div className="text-sm text-gray-600">Projects Done</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cardData.map((card, index) => (
              <Card key={card.number} {...card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}