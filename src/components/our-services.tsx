"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { services } from "@/app/services/services-data";
import type { Service } from "@/app/services/services-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ slug, title, shortDescription, icon: Icon }: Service) => (
  <motion.div
    className="relative pl-12 pb-12 pt-8 group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="absolute left-0 top-0 h-full w-px bg-border"></div>
    <motion.div
      className="absolute left-[-9px] top-12 h-5 w-5 rounded-full bg-white border-2 border-primary ring-4 ring-white transition-all duration-300 group-hover:bg-accent"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.2 }}
    ></motion.div>
    <div className="flex items-center gap-4 mb-3">
      <motion.div
        className="bg-primary/10 text-primary p-3 rounded-full"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
      <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
    </div>
    <p className="text-muted-foreground mb-4 pl-16">{shortDescription}</p>
    <div className="pl-16">
      <Button asChild variant="link" className="text-primary p-0 h-auto">
        <Link href={`/services/${slug}`}>
          Read More →
        </Link>
      </Button>
    </div>
  </motion.div>
);

export default function OurServices({ className }: { className?: string }) {
  return (
    <section className={cn("bg-white py-28 px-4 pb-48", className)}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            className="lg:sticky top-28 flex flex-col items-center text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h2
              className="text-7xl font-bold leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent [-webkit-text-stroke:2px_transparent] text-stroke-primary text-fill-transparent">Services</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We provide personalized IT solutions, including creative website development and personalized digital marketing strategies. Our expert team ensures high-quality services to meet your unique needs. Explore our wide range of offerings and request a personalized quote today.
            </motion.p>
            <div className="flex justify-center mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  asChild
                  className="group h-12 mt-12 px-10 text-lg bg-primary text-white hover:bg-primary/90 transition-colors duration-300"
                >
                  <Link href="https://wa.me/9779763607255" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Get in Touch <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>

          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </motion.div>

        </div>
      </div>

    </section>
  );
}