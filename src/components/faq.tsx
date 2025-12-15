import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "./ui/button"
  
const faqs = [
    {
        question: "What is the typical process for a web design project?",
        answer: "Our process is collaborative and structured. It starts with a discovery phase to understand your goals, followed by wireframing and design mockups. Once you approve the design, we move into development, testing, and finally, deployment. We keep you involved at every stage to ensure the final product meets your vision."
    },
    {
        question: "How long does it take to see results from SEO?",
        answer: "SEO is a long-term strategy. While some improvements can be seen in as little as a few weeks (like fixing technical issues), significant results in terms of traffic and rankings typically take 3 to 6 months. Consistency is key, and we focus on building sustainable growth for your brand."
    },
    {
        question: "Do you offer website maintenance after the project is complete?",
        answer: "Yes, we offer comprehensive maintenance and support packages. This includes regular updates, security monitoring, performance checks, backups, and on-demand support to ensure your website remains fast, secure, and healthy long after launch."
    },
    {
        question: "How much does a new website or digital marketing campaign cost?",
        answer: "Project costs vary widely based on complexity, features, and scope. We provide custom quotes after an initial consultation to understand your specific needs. We focus on delivering value and a strong return on investment, with transparent pricing and no hidden fees."
    },
    {
        question: "What makes Nexon Inc. different from other agencies?",
        answer: "Our key difference lies in our partnership approach. We don't just build and leave; we build to last. With free six-month support, premium assets, and a commitment to data-driven strategies, we act as a true extension of your team, dedicated to your long-term success."
    }
]

export default function Faq() {
    return (
        <section className="bg-white py-28 px-4 pb-56">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
                        Discover Frequently Asked Questions?
                    </h2>
                </div>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6 transition-all hover:border-primary/50 hover:bg-primary/5">
                            <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pt-2">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
               
            </div>
        </section>
    )
}
