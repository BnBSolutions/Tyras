import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Michael Chen',
    company: 'AutoMax Dealership',
    vehicle: '2024 BMW X5',
    route: 'Toronto → Miami',
    date: 'January 2024',
    rating: 5,
    comment: 'Flawless cross-border delivery. The customs process was completely handled for us. Vehicle arrived in perfect condition.',
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    company: 'Premium Motors Inc.',
    vehicle: '2023 Mercedes S-Class',
    route: 'Vancouver → Los Angeles',
    date: 'December 2023',
    rating: 5,
    comment: 'We ship 50+ vehicles monthly with TYRAS. Their enclosed transport service is unmatched for luxury vehicles.',
  },
  {
    id: 3,
    name: 'Jean-Pierre Dubois',
    company: 'Québec Auto Imports',
    vehicle: '2023 Porsche 911',
    route: 'New York → Montréal',
    date: 'January 2024',
    rating: 5,
    comment: 'Service bilingue impeccable! The RIV paperwork was handled seamlessly. Our go-to for US imports.',
  },
  {
    id: 4,
    name: 'David Martinez',
    company: 'Texas Car Auctions',
    vehicle: 'Fleet of 8 vehicles',
    route: 'Calgary → Houston',
    date: 'November 2023',
    rating: 5,
    comment: 'Moved our entire fleet in under a week. Competitive pricing and excellent communication throughout.',
  },
  {
    id: 5,
    name: 'Emily Watson',
    company: 'Classic Car Collector',
    vehicle: '1967 Mustang Shelby',
    route: 'Detroit → Toronto',
    date: 'October 2023',
    rating: 5,
    comment: 'Trusted them with my prized classic. The enclosed transport and extra care they provided was worth every penny.',
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    if (!inView || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [inView, isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Trusted by Dealers</span>
          <h2 className="mt-4 text-foreground">What Our Clients Say</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Join 500+ dealerships and collectors who trust us with their vehicles.
          </p>
        </motion.div>

        {/* Carousel Controls */}
        <div className="flex justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="testimonial-card snap-start"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground mb-4 line-clamp-3">"{testimonial.comment}"</p>

              {/* Reviewer Info */}
              <div className="pt-4 border-t border-border">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span className="text-primary font-medium">{testimonial.vehicle}</span>
                  <span>•</span>
                  <span>{testimonial.route}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span> from 200+ Google Reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
