import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Send, Phone, Mail, MapPin, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const truckIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC914" width="32" height="32">
      <circle cx="12" cy="12" r="10" fill="#0B1F3B"/>
      <path d="M16.5 9.5H15V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8.5c0 .55.45 1 1 1h.5c0 1.1.9 2 2 2s2-.9 2-2h5c0 1.1.9 2 2 2s2-.9 2-2h1c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1h-2zM6.5 17.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-5H15V10h2.5l1 2.5z" fill="#FFC914"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  origin: z.string().optional(),
  destination: z.string().optional(),
  vins: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    vins: '',
    preferredDate: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      contactSchema.parse(formData);
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Message Sent!',
        description: 'We\'ll get back to you within 24 hours.',
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        origin: '',
        destination: '',
        vins: '',
        preferredDate: '',
        message: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);

        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: 'Please check the form for errors.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          <h2 className="mt-4 text-foreground">Contact Us</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to ship? Have questions? Our team is standing by to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Smith"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="ABC Motors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@company.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origin City</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => handleChange('origin', e.target.value)}
                    placeholder="Bancroft, ON"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination City</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                    placeholder="Ottawa, FL"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vins">VIN(s)</Label>
                  <Input
                    id="vins"
                    value={formData.vins}
                    onChange={(e) => handleChange('vins', e.target.value)}
                    placeholder="One per line"
                  />
                </div>
                <div>
                  <Label htmlFor="preferredDate">Preferred Ship Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleChange('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about your shipping needs..."
                  rows={4}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>

              {/* File Upload */}
              <div>
                <Label>Attachments (BOL, Title)</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag files here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-gold-dim shadow-gold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Map & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Map */}
            <div className="h-80 rounded-2xl overflow-hidden border border-border">
              <MapContainer
                center={[43.6532, -79.3832]}
                zoom={4}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[43.6532, -79.3832]} icon={truckIcon}>
                  <Popup>
                    <strong>TYRAS HQ</strong><br />
                    Toronto, Ontario
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <Phone className="w-5 h-5 text-primary mb-2" />
                <div className="font-semibold text-foreground">Call Us</div>
                <a href="tel:+18001234567" className="text-muted-foreground hover:text-primary">
                  1-800-123-4567
                </a>
                <div className="text-xs text-muted-foreground mt-1">24/7 Dispatch Available</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <Mail className="w-5 h-5 text-primary mb-2" />
                <div className="font-semibold text-foreground">Email Us</div>
                <a href="mailto:info@tyrasgroup.com" className="text-muted-foreground hover:text-primary">
                  info@tyrasgroup.com
                </a>
                <div className="text-xs text-muted-foreground mt-1">Response within 2 hours</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <MapPin className="w-5 h-5 text-primary mb-2" />
              <div className="font-semibold text-foreground">Head Office</div>
              <div className="text-muted-foreground">
                123 Transport Way, Suite 400<br />
                Toronto, ON M5V 2K7, Canada
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
