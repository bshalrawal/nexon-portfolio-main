import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/hero';
import WhatWeDo from '@/components/what-we-do';
import OurServices from '@/components/our-services';
import Portfolio from '@/components/portfolio';
import Solutions from '@/components/solutions';
import WhyNexon from '@/components/why-nexon';
import Faq from '@/components/faq';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WhatWeDo />

        <div className="bg-white rounded-t-[50px] -mt-10 relative z-10">
          <OurServices />
        </div>

        <Solutions />


      


        <WhyNexon />


        <Faq />

      </main>
      <Footer />
    </div>
  );
}
