import { motion } from 'framer-motion';
import { ArrowUp, Linkedin, Youtube, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Subscribed!',
        description: 'You\'ll receive our monthly industry insights.',
      });
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">T</span>
              </div>
              <span className="font-display font-bold text-xl">TYRAS</span>
            </div>
            <p className="text-white/60 text-sm mb-6">
              North America's trusted cross-border auto logistics provider. Moving vehicles safely between Canada and the United States since 2010.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="#services" className="hover:text-primary transition-colors">Services</a>
              </li>
              <li>
                <a href="#coverage" className="hover:text-primary transition-colors">Coverage Map</a>
              </li>
              <li>
                <a href="#quote" className="hover:text-primary transition-colors">Get a Quote</a>
              </li>
              <li>
                <a href="#careers" className="hover:text-primary transition-colors">Careers</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Driver Vlogs</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Customs Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">RIV Process</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Insurance Certificate</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">API Documentation</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-white/60 mb-4">
              Get industry updates, route alerts, and logistics insights delivered monthly.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
                <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-gold-dim flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/40">
            © {currentYear} TYRAS Group. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-gold flex items-center justify-center hover:bg-gold-dim transition-colors z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
