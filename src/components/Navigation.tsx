import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#coverage', label: 'Coverage' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#about', label: 'About' },
  { href: '#careers', label: 'Careers' },
  { href: '#contact', label: 'Contact' },
];

const languages = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'fr', label: 'FR', flag: '🇨🇦' },
  { code: 'es', label: 'ES', flag: '🇲🇽' },
];

const currencies = [
  { code: 'CAD', symbol: 'C$' },
  { code: 'USD', symbol: '$' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('tyras-lang') || 'en';
  });
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('tyras-currency') || 'CAD';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('tyras-lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('tyras-currency', currency);
  }, [currency]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? ' shadow-lg bg-[#0a203d] text-white border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img src="/Tyras/image-removebg-preview.png" alt="Tyras Logistics Logo" className="h-8 w-auto" />
              
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`link-underline text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-white hover:text-primary' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`gap-1.5 ${isScrolled ? 'text-white' : 'text-white'}`}
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-medium">{language.toUpperCase()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? 'bg-muted' : ''}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Currency Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`gap-1.5 ${isScrolled ? 'text-white' : 'text-white'}`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs font-medium">{currency}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {currencies.map((curr) => (
                    <DropdownMenuItem
                      key={curr.code}
                      onClick={() => setCurrency(curr.code)}
                      className={currency === curr.code ? 'bg-muted' : ''}
                    >
                      {curr.symbol} {curr.code}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CTA Button */}
              <Button 
                onClick={() => scrollToSection('#quote')}
                className="bg-primary text-primary-white hover:bg-gold-dim shadow-gold"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${isScrolled ? 'text-white' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="container-custom py-6 space-y-4 max-w-full">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left py-2 text-white hover:text-primary font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-muted rounded-md px-3 py-2 text-sm flex-1"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-muted rounded-md px-3 py-2 text-sm flex-1"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code}
                      </option>
                    ))}
                  </select>
                </div>
                <Button 
                  onClick={() => scrollToSection('#quote')}
                  className="w-full bg-primary text-primary-white"
                >
                  Get Quote
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
  );
}
