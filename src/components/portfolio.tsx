'use client';
import { useMemo } from 'react';
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Image from "next/image";
import Link from 'next/link';
import { PortfolioSkeleton } from './ui/portfolio-skeleton';
import { cn } from '@/lib/utils';

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  mobileImageUrl?: string;
  link: string;
};

const PortfolioCard = ({ item }: { item: PortfolioItem }) => (
  <a href={item.link} className="block group">
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={item.imageUrl}
        alt={item.title}
        width={600}
        height={400}
        className="object-cover object-top w-full h-[300px] group-hover:scale-105 transition-transform duration-300"
      />
      {item.mobileImageUrl && (
         <div className="absolute bottom-4 -right-4 w-1/4">
            <Image
                src={item.mobileImageUrl}
                alt={`${item.title} mobile view`}
                width={100}
                height={200}
                className="object-contain object-top h-48 w-auto shadow-lg rounded-lg"
            />
         </div>
      )}
    </div>
    <h3 className="text-2xl font-semibold mt-4 group-hover:text-primary transition-colors">{item.title} →</h3>
  </a>
);

const BrandingCard = ({ item }: { item: PortfolioItem }) => (
    <a href={item.link} className="block group relative overflow-hidden rounded-[37px] min-h-[300px] flex flex-col justify-between p-6 bg-cover bg-center text-white" style={{backgroundImage: `url(${item.imageUrl})`}}>
        <div className="absolute inset-0 bg-black/50 group-hover:bg-primary/80 transition-colors duration-300"></div>
        <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs inline-block">
                {item.category}
            </div>
        </div>
        <div className="relative z-10">
            <h3 className="text-3xl font-light">{item.title}</h3>
        </div>
        <div className="absolute bottom-[-20px] right-[-20px] h-24 w-24 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white absolute top-1/2 left-1/2 -translate-x-3/4 -translate-y-3/4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </div>
    </a>
)

const SeoCard = ({ item }: { item: any }) => (
     <a href={item.link} className="block group relative overflow-hidden rounded-[37px] min-h-[300px] flex flex-col justify-center items-center p-6 bg-cover bg-center text-white text-center" style={{backgroundImage: `url(${item.imageUrl})`}}>
        <div className="absolute inset-0 bg-black/60 group-hover:bg-primary/80 transition-colors duration-300"></div>
        <div className="relative z-10">
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs inline-block mb-4">
                {item.category}
            </div>
            <h3 className="text-4xl font-semibold mb-4">{item.title}</h3>
            <div className="flex justify-center gap-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.stats?.clicks && <span>Clicks: <b className="text-accent">{item.stats.clicks}</b></span>}
                {item.stats?.impression && <span>Impression: <b className="text-accent">{item.stats.impression}</b></span>}
                {item.stats?.rankedKeywords && <span>Keywords: <b className="text-accent">{item.stats.rankedKeywords}</b></span>}
                {item.stats?.conversion && <span>Conversion: <b className="text-accent">{item.stats.conversion}</b></span>}
                {item.stats?.cost && <span>Cost: <b className="text-accent">{item.stats.cost}</b></span>}
                {item.stats?.reach && <span>Reach: <b className="text-accent">{item.stats.reach}</b></span>}
            </div>
        </div>
    </a>
)


export default function Portfolio({ className }: { className?: string }) {
  const firestore = useFirestore();
  const portfolioCollectionRef = useMemoFirebase(() => collection(firestore, 'portfolio_items'), [firestore]);
  const { data: allItems, isLoading, error } = useCollection<PortfolioItem>(portfolioCollectionRef);

  const portfolioItems = useMemo(() => {
    const items = {
      website: [] as PortfolioItem[],
      branding: [] as PortfolioItem[],
      seo: [] as PortfolioItem[],
      "google-ads": [] as PortfolioItem[],
      "social-media": [] as PortfolioItem[]
    };
    if (allItems) {
      allItems.forEach((item) => {
        if (items[item.category as keyof typeof items]) {
          items[item.category as keyof typeof items].push(item);
        }
      });
    }
    return items;
  }, [allItems]);

  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  if (error) {
    return (
      <section className="bg-white -mt-10 relative z-20 py-28 px-4" id="portfolio">
        <div className="container mx-auto text-center text-destructive">
          <p>Error loading portfolio: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-white -mt-10 relative z-20 py-28 px-4", className)} id="portfolio">
      <div className="container mx-auto">
        <div className="text-left mb-12 max-w-3xl">
          <h2 className="text-6xl font-semibold leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Portfolio</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            For over 7 years, we’ve partnered with businesses to improve their digital presence and achieve sustainable growth. Our services include website development, branding, and a complete range of digital marketing solutions, from SEO and Google Ads to engaging social media strategies. Some of the work we’ve done for our clients is as follows.
          </p>
        </div>

        <Tabs defaultValue="website" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="google-ads">Google Ads</TabsTrigger>
            <TabsTrigger value="social-media">Social Media</TabsTrigger>
          </TabsList>
          <TabsContent value="website">
            <div className="grid md:grid-cols-2 gap-8">
              {portfolioItems.website.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
             {portfolioItems.website.length === 0 && <p className="text-center text-muted-foreground">No website projects to display yet.</p>}
          </TabsContent>
          <TabsContent value="branding">
             <div className="grid md:grid-cols-3 gap-8">
                {portfolioItems.branding.map((item) => (
                    <BrandingCard key={item.id} item={item} />
                ))}
            </div>
             {portfolioItems.branding.length === 0 && <p className="text-center text-muted-foreground">No branding projects to display yet.</p>}
          </TabsContent>
          <TabsContent value="seo">
             <div className="grid md:grid-cols-3 gap-8">
                {portfolioItems.seo.map((item: any) => (
                    <SeoCard key={item.id} item={item} />
                ))}
            </div>
             {portfolioItems.seo.length === 0 && <p className="text-center text-muted-foreground">No SEO projects to display yet.</p>}
          </TabsContent>
          <TabsContent value="google-ads">
             <div className="grid md:grid-cols-3 gap-8">
                {portfolioItems["google-ads"].map((item: any) => (
                    <SeoCard key={item.id} item={item} />
                ))}
            </div>
             {portfolioItems["google-ads"].length === 0 && <p className="text-center text-muted-foreground">No Google Ads projects to display yet.</p>}
          </TabsContent>
          <TabsContent value="social-media">
            <div className="grid md:grid-cols-3 gap-8">
                {portfolioItems["social-media"].map((item: any) => (
                    <SeoCard key={item.id} item={item} />
                ))}
            </div>
             {portfolioItems["social-media"].length === 0 && <p className="text-center text-muted-foreground">No social media projects to display yet.</p>}
          </TabsContent>
        </Tabs>
         <div className="text-center mt-12">
            <Button size="lg" asChild>
                <Link href="/portfolio">View all projects</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
