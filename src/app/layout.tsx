import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { EmailCTA } from '@/components/ui/email-cta';
import { ChatBot } from '@/components/chat-bot';

export const metadata: Metadata = {
  title: 'Nexon Inc- Engineering Success',
  description: '#1 Web Design & Development  Company in Nepal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <title>NexonInc — Web Design & Development Company in Kathmandu</title>
        <meta name="description" content="NexonInc is a leading web design and development company in Kathmandu, Nepal. We build modern, fast, and custom websites that help businesses grow." />
        <meta name="author" content="NexonInc" />
        <link rel="canonical" href="https://nexoninc.com/" />

        <meta property="og:title" content="NexonInc — Web Design & Development Company in Kathmandu" />
        <meta property="og:description" content="Professional website design, custom development, e-commerce builds, and reliable digital solutions in Kathmandu, Nepal." />
        <meta property="og:image" content="https://nexoninc.com/og-image.jpg" />
        <meta property="og:url" content="https://nexoninc.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NexonInc — Web Design & Development Company in Kathmandu" />
        <meta name="twitter:description" content="We create modern, user-focused web solutions for growing businesses." />
        <meta name="twitter:image" content="https://nexoninc.com/og-image.jpg" />


        <meta name="keywords" content="web design Nepal, website development Kathmandu, NexonInc, IT company Nepal, ecommerce development Nepal" />
      </head>
      <body className={cn('font-body antialiased')}>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <EmailCTA />
        <WhatsAppCTA />
        <ChatBot />
        <ScrollToTop />
      </body>
    </html>
  );
}
