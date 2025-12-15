
"use client";

import { useState } from "react";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageHero from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurFade } from "@/registry/magicui/blur-fade";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, 'leads'), {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'new'
      });
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });

      // WhatsApp automation
      const nexonPhoneNumber = "9779763607255";
      const message = `
*New Lead from Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'N/A'}
*Company:* ${formData.company || 'N/A'}

*Requirements:*
${formData.requirements}
      `;
      const whatsappUrl = `https://wa.me/${nexonPhoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');


      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        requirements: ''
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <Header />
      <main className="flex-grow pb-48 relative z-10">
        <PageHero
          title="Contact Us"
          subtitle="We'd love to hear from you. Let's build something amazing together."
          breadcrumb="Contact"
        />
        <BlurFade delay={0.25} inView>
          <section className="bg-background py-16 md:py-28 px-4 relative z-20">
            <div className="container mx-auto">
              <div className="bg-gradient-to-br from-neutral-800 to-black rounded-[50px] px-4 py-8 md:p-12 relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-medium text-white mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-white/80 mb-8">
                    Have a project in mind? Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white"
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white"
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white"
                    />
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white"
                    />
                    <Textarea
                      name="requirements"
                      placeholder="Requirement Details"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/50 focus:border-white h-20"
                    />
                    <div className="pt-8">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/80 rounded-full text-lg font-semibold px-12 py-8 shadow-lg shadow-primary/30"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>
      </main>
      <Footer />
    </div>
  );
}
