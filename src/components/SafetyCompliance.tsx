import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useRef } from 'react';
import { Shield, Clock, Award, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CounterProps {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  inView: boolean;
}

function AnimatedCounter({ end, suffix = '', decimals = 0, duration = 2000, inView }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = easeOutQuart * end;
      setCount(countRef.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span className="counter-value">
      {displayValue}{suffix}
    </span>
  );
}

const stats = [
  { 
    icon: Shield, 
    value: 12, 
    suffix: 'M+', 
    label: 'Miles Driven Safely',
    description: 'Accident-free miles across North America'
  },
  { 
    icon: Clock, 
    value: 98.7, 
    suffix: '%', 
    decimals: 1,
    label: 'On-Time Delivery',
    description: 'Arriving within the promised window'
  },
  { 
    icon: Award, 
    value: 0.00, 
    suffix: '', 
    decimals: 2,
    label: 'DOT Reportable Accidents',
    description: 'Zero incidents. Zero compromises.'
  },
];

const badges = [
  { name: 'C-TPAT', fullName: 'Customs-Trade Partnership Against Terrorism' },
  { name: 'PIP', fullName: 'Partners in Protection (Canada)' },
  { name: 'FAST', fullName: 'Free and Secure Trade' },
  { name: 'SCAC', fullName: 'Standard Carrier Alpha Code' },
];

export default function SafetyCompliance() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="section-padding bg-navy text-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Safety First</span>
          <h2 className="mt-4">Industry-Leading Compliance</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
            Your cargo is in the safest hands. We exceed every federal safety standard on both sides of the border.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals || 0}
                  inView={inView}
                />
                <div className="mt-2 font-display font-bold text-lg">{stat.label}</div>
                <p className="mt-2 text-sm text-white/60">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Insurance Certificate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16 p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="font-semibold">Fully Insured</div>
              <div className="text-sm text-white/60">$2M cargo liability coverage per shipment</div>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Certificate
          </Button>
        </motion.div>

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-6 text-sm text-white/60 uppercase tracking-wider">Certified Programs</div>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
                className="group relative px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default"
              >
                <span className="font-bold text-primary">{badge.name}</span>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card text-card-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {badge.fullName}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
