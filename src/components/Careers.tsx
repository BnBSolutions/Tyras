import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { MapPin, Briefcase, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const jobs = [
  {
    id: 1,
    title: 'CDL-A Driver',
    location: 'Toronto, ON',
    type: 'Full-time',
    salary: '$65,000 - $85,000/yr',
    department: 'Operations',
    description: 'Join our fleet of professional drivers transporting vehicles across North America.',
  },
  {
    id: 2,
    title: 'Dispatcher',
    location: 'Calgary, AB',
    type: 'Full-time',
    salary: '$50,000 - $65,000/yr',
    department: 'Logistics',
    description: 'Coordinate fleet movements and ensure on-time deliveries across routes.',
  },
  {
    id: 3,
    title: 'Customs Broker Intern',
    location: 'Montréal, QC',
    type: 'Internship',
    salary: '$22 - $28/hr',
    department: 'Compliance',
    description: 'Learn cross-border customs procedures under licensed broker supervision.',
  },
  {
    id: 4,
    title: 'Fleet Maintenance Technician',
    location: 'Detroit, MI',
    type: 'Full-time',
    salary: '$55,000 - $70,000/yr',
    department: 'Maintenance',
    description: 'Maintain our fleet of car carriers to DOT standards.',
  },
];

const departments = ['All', 'Operations', 'Logistics', 'Compliance', 'Maintenance'];

export default function Careers() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filter, setFilter] = useState('All');

  const filteredJobs = filter === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === filter);

  const scrollToContact = (jobTitle: string) => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Would typically set form subject to job application
    }
  };

  return (
    <section id="careers" className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Join Our Team</span>
          <h2 className="mt-4 text-foreground">Career Opportunities</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Build your career with North America's trusted cross-border auto logistics provider.
          </p>
        </motion.div>

        {/* Department Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={filter === dept ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(dept)}
              className={filter === dept ? 'bg-primary text-primary-foreground' : ''}
            >
              {dept}
            </Button>
          ))}
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="career-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">{job.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                </div>
                <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>
                  {job.type}
                </Badge>
              </div>

              <p className="text-muted-foreground text-sm mb-4">{job.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-primary font-medium">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
                <Button
                  size="sm"
                  onClick={() => scrollToContact(job.title)}
                  className="bg-primary text-primary-foreground hover:bg-gold-dim"
                >
                  Apply
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-primary" />
              Competitive pay
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              Health benefits
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              401(k) matching
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              Paid time off
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
