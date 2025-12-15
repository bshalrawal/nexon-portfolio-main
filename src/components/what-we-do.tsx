'use client';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const InfoCard = ({ description, details, link, isPrimary }: { description: string, details: string, link?: string, isPrimary?: boolean }) => {
  if (isPrimary) {
    return (
      <div className="bg-gradient-to-br from-primary to-accent text-white rounded-[35px] p-6 pr-20 md:pr-6 relative overflow-hidden group h-full min-h-[150px]">
        <div
          className="absolute inset-0 bg-no-repeat bg-[position:101%_101%]"
        ></div>
        <div className="relative z-10">
          <p className="text-lg font-semibold text-white/90">{description}</p>
          {link && (
            <a href={link} className="absolute bottom-[-57px] right-[-57px] group-hover:scale-110 transition-transform">
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[35px] p-6 pr-20 md:pr-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <p className="text-lg font-semibold mb-2">{description}</p>
      <p className="text-sm text-muted-foreground">{details}</p>
    </div>
  )
}

export default function WhatWeDo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <section className="bg-secondary text-foreground py-16 md:py-28 px-0 sm:px-4">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-8 relative z-10">
        <div className="w-full lg:w-3/5">
          <div className="bg-gradient-to-br from-neutral-800 to-black rounded-[50px] px-4 py-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-primary/30 to-transparent blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-medium text-white mb-4">
                #1 Agency to Fulfill <span className="text-accent">Client Requirements</span>
              </h2>
              <p className="text-white/80 mb-8">
                Nexon Inc is a leading creative agency based in Budhanilkantha, Nepal, with a global reach. Our team of experts works across various industries to deliver creative websites, branding, and digital marketing services, featuring unique designs and ROI-driven marketing strategies.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input type="text" placeholder="Name" className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white" />
                <Input type="email" placeholder="Email" className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white" />
                <Input type="tel" placeholder="Phone Number" className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white" />
                <Input type="text" placeholder="Company Name" className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white" />
                <Textarea placeholder="Requirement Details" className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white h-20" />
                <div className="pt-8">
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/80 rounded-full text-lg font-semibold px-12 py-8 shadow-lg shadow-primary/30">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 space-y-8">

          <InfoCard
            description="Choose us as your trusted IT service company to support your business growth."
            details="We are a globally recognized brand, delivering exceptional IT services and support across diverse regions worldwide."
          />
          <InfoCard
            description="Get a free quote and see how we can help your business grow."
            details=""
            link="#pricing"
            isPrimary
          />
        </div>
      </div>
    </section>
  )
}
