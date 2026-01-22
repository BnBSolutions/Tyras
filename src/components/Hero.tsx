import { motion } from 'framer-motion';
import { ArrowRight, Search, Shield, Award, Truck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
      <div className="relative z-10 container-custom pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-white/90 text-sm font-medium">Trusted by 500+ dealerships across North America</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white mb-6"
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
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Door-to-door auto logistics Canada ↔ USA.{' '}
            <span className="text-primary font-semibold">Fully bonded. Fully insured.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              onClick={scrollToQuote}
              className="bg-primary text-primary-foreground hover:bg-gold-dim shadow-gold-lg text-lg px-8 py-6 group"
            >
              Get instant quote
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-black hover:bg-white/10 hover:text-white text-lg px-8 py-6"
                >
                  <Search className="mr-2 w-5 h-5" />
                  Track shipment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Track Your Shipment
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter AWB or Reference Number"
                      value={awbNumber}
                      onChange={(e) => setAwbNumber(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                    />
                    <Button onClick={handleTrack} disabled={isTracking}>
                      {isTracking ? 'Tracking...' : 'Track'}
                    </Button>
                  </div>
                  {trackingResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-muted space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                        <span className="font-semibold text-success">{trackingResult.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{trackingResult.location}</p>
                      <p className="text-sm font-medium">{trackingResult.eta}</p>
                    </motion.div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-4"
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
                  <Shield className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] text-white/60 mt-1 font-medium">{badge.name}</span>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-navy text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
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
