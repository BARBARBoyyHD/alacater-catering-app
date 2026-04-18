'use client';

import Head from 'next/head';
import Link from 'next/link';
// Removed: import '../style.css'; // Vanilla CSS import removed
import '../globals.css'; // Import global styles

// Import components
import { TopNavBar } from '@/components/landing/TopNavBar';
import { HeroSection } from '@/components/landing/HeroSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  // Task 2.6 & 2.7: Integrate Vercel Analytics and Mixpanel (placeholders)
  // These scripts are typically loaded in _app.tsx or _layout.tsx for global availability.
  // For demonstration, placeholders are commented out here, assuming actual integration happens elsewhere.
  // If using environment variables, they should be prefixed with NEXT_PUBLIC_
  const isProduction = process.env.NODE_ENV === 'production';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alacater.com';
  const mixpanelId = process.env.NEXT_PUBLIC_MIXPANEL_ID; // Example env var for Mixpanel

  return (
    <>
      <Head>
        {/* SEO meta tags from HTML */}
        <title>AlaCater Mitra - Scale Your Catering Empire</title>
        <meta name="description" content="Join the elite B2B network where culinary excellence meets automated logistics. Empower your kitchen with the tools designed for master chefs." />
        <meta name="keywords" content="B2B catering, catering platform, restaurant logistics, culinary business, partner portal" />
        <meta charSet="UTF-8" />

        {/* Open Graph meta tags from HTML */}
        <meta property="og:title" content="AlaCater Mitra - Scale Your Catering Empire" />
        <meta property="og:description" content="Join the elite B2B network where culinary excellence meets automated logistics. Empower your kitchen with the tools designed for master chefs." />
        <meta property="og:type" content="website" />
        {/* Ensure the og-image.jpg is placed in the public/images directory */}
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content={siteUrl} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-sans antialiased">
        <TopNavBar />
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
        <Footer />
      </main>

      {/* Analytics Placeholders */}
      {isProduction && mixpanelId && (
        <>
          {/* Vercel Analytics Script Placeholder */}
          {/* This would typically be configured in next.config.js or a global script */}

          {/* Mixpanel Script Placeholder */}
          {/* Example using a React hook or a global script */}
          {/* <Script strategy="lazyOnload" src={`https://cdn.mxpnl.com/libs/mx-sdk.min.js`}/>
          <script dangerouslySetInnerHTML={{ __html: `
            window.mixpanel.init('${mixpanelId}', {debug: false, api_host: 'https://api.mixpanel.com'});
            window.mixpanel.track('PageView');
          `}}/> */}
        </>
      )}
    </>
  );
}
