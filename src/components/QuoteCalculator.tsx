import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useMemo } from 'react';
import { Calculator, MapPin, Car, Calendar, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const canadianProvinces = ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE'];
const usStates = ['MI', 'NY', 'CA', 'TX', 'FL', 'IL', 'OH', 'PA', 'GA', 'WA'];

const vehicleMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Tesla', 'Porsche', 'Other'];

export default function QuoteCalculator() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    originCity: '',
    originProvState: '',
    destCity: '',
    destProvState: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    isRunning: true,
    shipDate: '',
  });

  const [showQuote, setShowQuote] = useState(false);

  const quote = useMemo(() => {
    // Simulated distance calculation (in reality would use an API)
    const baseDistance = 500 + Math.random() * 1500; // 500-2000 miles
    const ratePerMile = 1.25;
    const borderFee = 150;
    const nonRunningFee = formData.isRunning ? 0 : 75;
    
    const baseCost = baseDistance * ratePerMile + borderFee + nonRunningFee;
    const lowEstimate = Math.round(baseCost * 0.9);
    const highEstimate = Math.round(baseCost * 1.1);
    
    const transitDays = Math.ceil(baseDistance / 500) + 1;
    
    return {
      lowEstimate,
      highEstimate,
      transitDays,
      distance: Math.round(baseDistance),
    };
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.originCity && formData.destCity && formData.vehicleMake) {
      setShowQuote(true);
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="quote" className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Instant Pricing</span>
          <h2 className="mt-4 text-foreground">Get Your Quote</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Enter your shipment details for an instant estimate. No obligations, no hidden fees.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="quote-card">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Origin & Destination */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Origin */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <MapPin className="w-5 h-5 text-primary" />
                    Origin
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="originCity">City</Label>
                      <Input
                        id="originCity"
                        placeholder="Toronto"
                        value={formData.originCity}
                        onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="originProvState">Province/State</Label>
                      <Select
                        value={formData.originProvState}
                        onValueChange={(value) => setFormData({ ...formData, originProvState: value })}
                      >
                        <SelectTrigger id="originProvState">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="header-ca" disabled>🇨🇦 Canada</SelectItem>
                          {canadianProvinces.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                          <SelectItem value="header-us" disabled>🇺🇸 United States</SelectItem>
                          {usStates.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Destination */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <MapPin className="w-5 h-5 text-success" />
                    Destination
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="destCity">City</Label>
                      <Input
                        id="destCity"
                        placeholder="Miami"
                        value={formData.destCity}
                        onChange={(e) => setFormData({ ...formData, destCity: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="destProvState">Province/State</Label>
                      <Select
                        value={formData.destProvState}
                        onValueChange={(value) => setFormData({ ...formData, destProvState: value })}
                      >
                        <SelectTrigger id="destProvState">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="header-ca" disabled>🇨🇦 Canada</SelectItem>
                          {canadianProvinces.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                          <SelectItem value="header-us" disabled>🇺🇸 United States</SelectItem>
                          {usStates.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Car className="w-5 h-5 text-primary" />
                  Vehicle Information
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="vehicleYear">Year</Label>
                    <Input
                      id="vehicleYear"
                      placeholder="2024"
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicleMake">Make</Label>
                    <Select
                      value={formData.vehicleMake}
                      onValueChange={(value) => setFormData({ ...formData, vehicleMake: value })}
                    >
                      <SelectTrigger id="vehicleMake">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleMakes.map((make) => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vehicleModel">Model</Label>
                    <Input
                      id="vehicleModel"
                      placeholder="Camry"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center gap-3 h-10">
                      <Switch
                        id="isRunning"
                        checked={formData.isRunning}
                        onCheckedChange={(checked) => setFormData({ ...formData, isRunning: checked })}
                      />
                      <Label htmlFor="isRunning" className="text-sm">
                        {formData.isRunning ? 'Running' : 'Non-running (+$75)'}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ship Date */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Calendar className="w-5 h-5 text-primary" />
                    Preferred Ship Date
                  </div>
                  <Input
                    type="date"
                    value={formData.shipDate}
                    onChange={(e) => setFormData({ ...formData, shipDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="flex items-end">
                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-gold-dim shadow-gold">
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Quote
                  </Button>
                </div>
              </div>
            </form>

            {/* Quote Result */}
            {showQuote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-xl bg-navy text-white"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="text-white/60 text-sm mb-1">Estimated Price Range</div>
                    <div className="text-3xl md:text-4xl font-display font-bold">
                      <span className="text-primary">${quote.lowEstimate}</span>
                      <span className="text-white/40 mx-2">–</span>
                      <span className="text-primary">${quote.highEstimate}</span>
                      <span className="text-lg text-white/60 ml-2">CAD</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="text-white/60">
                      Est. transit: <span className="text-white font-medium">{quote.transitDays} days</span>
                    </div>
                    <div className="text-white/60">
                      Distance: <span className="text-white font-medium">~{quote.distance} miles</span>
                    </div>
                  </div>
                  <Button
                    onClick={scrollToContact}
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-gold-dim"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                This is an estimate based on standard rates. Final pricing depends on vehicle condition, 
                exact locations, and current fuel surcharges. Customs duties and taxes are not included. 
                Contact us for a binding quote.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
