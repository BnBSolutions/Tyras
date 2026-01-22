import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Truck, Car, Train, Container, FileCheck, Warehouse, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Truck,
    title: 'Open Carrier Transport',
    teaser: 'Cost-effective multi-vehicle transport across borders.',
    details: [
      'Up to 10 vehicles per load',
      'Daily departures from major hubs',
      'Real-time GPS tracking',
      'Door-to-door service',
    ],
  },
  {
    icon: Car,
    title: 'Enclosed Premium',
    teaser: 'White-glove service for luxury and classic vehicles.',
    details: [
      'Climate-controlled trailers',
      'Soft-tie securing system',
      'Dedicated single-vehicle option',
      'Insurance up to $1M per vehicle',
    ],
  },
  {
    icon: Train,
    title: 'Rail + Road Combo',
    teaser: 'Hybrid solutions for long-distance economy.',
    details: [
      'Coast-to-coast coverage',
      '30% cost savings vs. road only',
      'Weekly scheduled departures',
      'Intermodal tracking',
    ],
  },
  {
    icon: Container,
    title: 'Container Shipping',
    teaser: 'Ocean-ready solutions for overseas exports.',
    details: [
      'FCL and LCL options',
      'Port-to-port coordination',
      'Export documentation support',
      'Customs pre-clearance',
    ],
  },
  {
    icon: FileCheck,
    title: 'Customs Brokerage',
    teaser: 'Seamless border clearance, fully compliant.',
    details: [
      'Licensed customs brokers',
      'USMCA compliance',
      'RIV processing (Canada)',
      'EPA/DOT documentation',
    ],
  },
  {
    icon: Warehouse,
    title: 'Secure Storage',
    teaser: 'Bonded warehouses on both sides of the border.',
    details: [
      '24/7 security surveillance',
      'Climate-controlled options',
      'Short and long-term rates',
      'Inspection facilities on-site',
    ],
  },
];

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="mt-4 text-foreground">Cross-Border Services</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end auto logistics solutions designed for dealers, auctions, and OEMs moving vehicles between Canada and the United States.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card group"
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-7 h-7 text-primary" />
                </motion.div>

                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.teaser}</p>

                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="flex items-center gap-1 text-primary font-medium text-sm hover:underline"
                >
                  Learn more
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2 pt-4 border-t border-border">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
