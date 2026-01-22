import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import CoverageMap from '@/components/CoverageMap';
import QuoteCalculator from '@/components/QuoteCalculator';
import Testimonials from '@/components/Testimonials';
import SafetyCompliance from '@/components/SafetyCompliance';
import Careers from '@/components/Careers';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TransportationService"],
  "name": "TYRAS Group",
  "description": "Cross-border auto logistics between Canada and the United States. Door-to-door vehicle transport, fully bonded and insured.",
  "url": "https://tyrasgroup.com",
  "telephone": "+1-800-123-4567",
  "email": "info@tyrasgroup.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Transport Way, Suite 400",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M5V 2K7",
    "addressCountry": "CA"
  },
  "areaServed": [
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "United States" }
  ],
  "serviceType": "Vehicle Transport",
  "priceRange": "$$"
};

export default function Index() {
  return (
    <>
      <Helmet>
        <title>TYRAS Group | Cross-Border Auto Logistics Canada ↔ USA</title>
        <meta 
          name="description" 
          content="Door-to-door vehicle transport between Canada and the United States. Fully bonded customs brokerage, insured carriers, and 24/7 tracking. Get an instant quote." 
        />
        <meta name="keywords" content="auto transport, vehicle shipping, cross-border logistics, Canada USA car transport, car carrier, customs brokerage" />
        <link rel="canonical" href="https://tyrasgroup.com" />
        <meta property="og:title" content="TYRAS Group | Cross-Border Auto Logistics" />
        <meta property="og:description" content="Your vehicles. Across the border. Faster. Door-to-door auto logistics Canada ↔ USA." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        <main id="main-content">
          <Hero />
          <Services />
          <HowItWorks />
          <CoverageMap />
          <QuoteCalculator />
          <Testimonials />
          <SafetyCompliance />
          <Careers />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
