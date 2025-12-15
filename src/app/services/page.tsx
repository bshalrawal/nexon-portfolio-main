import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PageHero from '@/components/layout/page-hero';
import OurServices from '@/components/our-services';
import { BlurFade } from '@/registry/magicui/blur-fade';

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHero 
          title="Our Services"
          subtitle="Explore the wide range of services we offer to help your business grow."
          breadcrumb="Services"
        />
        <BlurFade delay={0.25} inView>
          <div className="bg-background -mt-10 relative z-10 pb-28">
            <OurServices />
          </div>
        </BlurFade>
      </main>
      <Footer />
    </div>
  );
}
