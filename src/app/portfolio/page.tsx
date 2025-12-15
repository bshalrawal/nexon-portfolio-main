import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PageHero from '@/components/layout/page-hero';
import Portfolio from '@/components/portfolio';
import { BlurFade } from '@/registry/magicui/blur-fade';

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHero 
          title="Our Portfolio"
          subtitle="Check out some of the amazing projects we've delivered for our clients."
          breadcrumb="Portfolio"
        />
        <BlurFade delay={0.25} inView>
          <Portfolio className="pb-28" />
        </BlurFade>
      </main>
      <Footer />
    </div>
  );
}
