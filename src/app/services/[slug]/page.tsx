import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PageHero from '@/components/layout/page-hero';
import { services, Service } from '@/app/services/services-data';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { BlurFade } from '@/registry/magicui/blur-fade';
import Link from 'next/link';

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service: Service | undefined = services.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  const { title, longDescription, details, icon: Icon } = service;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHero
          title={title}
          subtitle="Our Services"
          breadcrumb={title}
        />
        <BlurFade delay={0.25} inView>
          <div className="bg-background -mt-10 relative z-10 py-16 md:py-28 px-4">
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <h2 className="text-4xl font-bold mb-6 text-foreground">{title}</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {longDescription}
                  </p>
                  <div className="space-y-8">
                    {details.map((detail, index) => (
                      <div key={index}>
                        <h3 className="text-2xl font-semibold mb-3 flex items-center">
                          <CheckCircle className="h-6 w-6 mr-3 text-primary" />
                          {detail.title}
                        </h3>
                        <p className="text-muted-foreground ml-9">{detail.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:sticky top-28 self-start">
                  <div className="bg-card p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Our Services</h3>
                    <ul className="space-y-3">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} className={`flex items-center gap-3 p-3 rounded-md transition-colors ${slug === s.slug ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            <s.icon className="h-5 w-5" />
                            <span>{s.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}
