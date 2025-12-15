import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PageHero from '@/components/layout/page-hero';
import { BlurFade } from '@/registry/magicui/blur-fade';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

const teamMembers = [
  {
    name: 'Lucas Indra Sapkota',
    role: 'CEO and Co-founder',
    bio: 'Lucas Indra Sapkota is a dynamic entrepreneur from Nepal with a proven track record in founding and managing multiple successful businesses. He is the owner and CEO of Lingo Translations and a key figure behind Mayas Tolkeservice and Viborg Invest, focusing on language services, interpretation, and strategic investments. Known for his innovative approach and commitment to excellence, Lucas has built a reputation for delivering high-quality solutions across international markets. With strong leadership skills and a global mindset, he actively fosters growth in emerging sectors while maintaining a focus on client satisfaction and operational efficiency. Based in Nepal and connected to international ventures, Lucas combines business acumen with cultural insight, making him a recognized entrepreneur and thought leader in the industry.',
    imageId: 'team-lucas',
  },
  {
    name: 'Arjun Ghimire',
    role: 'Sales and marketing Director',
    bio: 'Arjun Ghimire is a dedicated sales associate and licensed REALTOR® with expertise in real estate, account management, and insurance services. In addition to his work in property sales, Arjun actively engages in financial markets, including stock trading and investment strategies. With a strong focus on client satisfaction and personalized service, he combines industry knowledge with practical financial insight to help clients make informed decisions. His versatile background in sales, insurance, and market analysis positions him as a trusted advisor in both real estate and financial matters.',
    imageId: 'team-arjun',
  },
  {
    name: 'Kim Nielsen',
    role: 'Project Leader',
    bio: 'Kim Nielsen is an accomplished IT professional based in Viborg, Denmark, with extensive experience in technology solutions, software development, and IT project management. With a strong focus on innovation and efficiency, Kim has successfully contributed to designing, implementing, and maintaining IT systems that optimize business operations. Known for problem-solving skills and a results-driven-approach, Kim combines technical expertise with strategic thinking to deliver reliable, scalable, and cutting-edge solutions. Passionate about staying up to date with emerging technologies, Kim supports organizations in digital transformation, cybersecurity, and IT infrastructure improvements. Recognized for professionalism and collaboration, Kim Nielsen brings both technical knowledge and practical insight, making him a trusted IT advisor and valuable contributor to any technology-focused team.',
    imageId: 'team-kim',
  },
  {
    name: 'Michael Engro',
    role: 'Sales Team leader',
    bio: 'Michael Engro is a dedicated sales professional with experience in the insurance and corporate sales sectors. He began his career working with Erie Insurance and other companies, honing his skills in client relations, product knowledge, and sales strategy. Currently, he serves as a salesman at Nexon Inc., where he continues to build strong client relationships and drive business growth. Known for his communication skills, persistence, and customer-focused approach, Michael combines practical sales experience with a results-oriented mindset. His diverse background across multiple companies allows him to adapt quickly, understand client needs, and deliver effective solutions, making him a valuable asset in any sales-driven environment.',
    imageId: 'team-michael',
  }
];

 // const TeamMemberCard = ({ name, role, bio, imageId }: { name: string, role: string, bio: string, imageId: string }) => {
  // const image = placeholderImages.find(img => img.id === imageId);




export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHero 
          title="About Us"
          subtitle="Learn more about Nexon Inc and our mission."
          breadcrumb="About"
          className="mb-10"
        />
        <BlurFade delay={0.25} inView>
          <div className="bg-background relative z-10 py-16 md:py-28 px-4">
            <div className="container mx-auto">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl font-bold mb-6 text-foreground">
                  Everything you need to go from zero to scale.
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We are a multidisciplinary team of product strategists, engineers, designers, and AI researchers. We help startups and enterprises move from concept to production by building user-centered web and mobile products, reliable backend services, and AI-enabled features that drive measurable outcomes.
                </p>
                <ul className="max-w-2xl mx-auto space-y-4 text-muted-foreground text-lg text-left">
                  <li className="flex items-start">
                    <span className="text-accent mr-4">✓</span>
                    <span>End-to-end product development — from concept to scalable deployment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-4">✓</span>
                    <span>Cloud-native, secure, and performance-optimized solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-4">✓</span>
                    <span>Continuous integration & delivery pipelines for faster releases</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </BlurFade>
      </main>
      <Footer />
    </div>
  );
}
