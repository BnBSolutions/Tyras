import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { Calendar, ClipboardCheck, FileCheck2, Truck } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Book Online or Call',
    description: 'Get an instant quote and schedule your pickup in minutes. Our team is available 24/7 to assist you.',
  },
  {
    icon: ClipboardCheck,
    title: 'Vehicle Pickup & Inspection',
    description: 'Professional drivers conduct a thorough inspection and photo documentation before loading.',
  },
  {
    icon: FileCheck2,
    title: 'Customs Clearance',
    description: 'Our bonded brokers handle all CBSA and CBP documentation. Zero hassle border crossing.',
  },
  {
    icon: Truck,
    title: '24-Hour Delivery Window',
    description: 'Track your vehicle in real-time and receive it within a precise delivery window.',
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="mt-4 text-foreground">How It Works</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            From booking to delivery, we handle everything. Your only job is to hand over the keys.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              className="w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative pl-20 md:pl-24"
                >
                  {/* Step Number Circle */}
                  <div className="absolute left-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-card border-4 border-primary flex items-center justify-center shadow-gold">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary font-bold text-sm">STEP {index + 1}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
