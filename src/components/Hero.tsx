import { motion } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import heroBridge from '@/assets/hero-bridge.jpg';

const trustBadges = [
  { name: 'C-TPAT', description: 'Customs-Trade Partnership Against Terrorism' },
  { name: 'CBSA', description: 'Canada Border Services Agency Approved' },
  { name: 'FMCSA', description: 'Federal Motor Carrier Safety Administration' },
  { name: 'A+ BBB', description: 'Better Business Bureau A+ Rating' },
];

export default function Hero() {
  const [awbNumber, setAwbNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | { status: string; location: string; eta: string }>(null);

  const handleTrack = () => {
    if (!awbNumber.trim()) return;
    setIsTracking(true);
    // Simulated tracking result
    setTimeout(() => {
      setTrackingResult({
        status: 'In Transit',
        location: 'Detroit, MI - Customs Cleared',
        eta: 'Estimated arrival: Tomorrow, 2:00 PM',
      });
      setIsTracking(false);
    }, 1500);
  };

  const scrollToQuote = () => {
    const element = document.querySelector('#quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBridge}
          alt="Car carrier truck crossing Canada-US border bridge at dawn"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 sm:mb-8"
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">Trusted by 500+ dealerships across North America</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight px-2"
          >
            Your vehicles.{' '}
            <span className="text-gradient-gold">Across the border.</span>{' '}
            Faster.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
          >
            Door-to-door auto logistics Canada ↔ USA.{' '}
            <span className="text-primary font-semibold">Fully bonded. Fully insured.</span>
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-6 sm:mb-8 px-2"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 max-w-2xl mx-auto">
              <div className="flex-1 relative w-full">
                <Input
                  placeholder="Enter AWB or Reference Number"
                  value={awbNumber}
                  onChange={(e) => setAwbNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                  className="w-full h-12 sm:h-14 md:h-16 px-4 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg bg-white border-2 border-primary rounded-xl sm:rounded-l-xl sm:rounded-r-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 shadow-md"
                />
              </div>
              <Button
                onClick={handleTrack}
                disabled={isTracking || !awbNumber.trim()}
                className="h-12 sm:h-14 md:h-16 w-full sm:w-auto px-6 sm:px-8 md:px-10 bg-primary hover:bg-gold-dim text-navy font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-r-xl sm:rounded-l-none shadow-lg whitespace-nowrap min-w-[100px] sm:min-w-[120px]"
              >
                {isTracking ? 'Tracking...' : 'Track'}
              </Button>
            </div>
            {trackingResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 max-w-2xl mx-auto p-4 sm:p-5 rounded-xl bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg space-y-2 text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse flex-shrink-0" />
                  <span className="font-semibold text-success text-sm sm:text-base">{trackingResult.status}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{trackingResult.location}</p>
                <p className="text-xs sm:text-sm font-medium">{trackingResult.eta}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Get Instant Quote Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center mb-12 sm:mb-16 px-2"
          >
            <Button
              size="lg"
              onClick={scrollToQuote}
              className="bg-primary text-primary-foreground hover:bg-gold-dim shadow-gold-lg text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              Get instant quote
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-2"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                className="trust-badge group relative"
                title={badge.description}
              >
                <div className="flex flex-col items-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 group-hover:text-primary transition-colors" />
                  <span className="text-[9px] sm:text-[10px] text-white/60 mt-1 font-medium">{badge.name}</span>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-navy text-white text-[10px] sm:text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {badge.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
