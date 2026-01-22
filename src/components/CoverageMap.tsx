import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const locations = [
  { city: 'Toronto', country: 'CA', x: '73%', y: '52%', transit: '1-2 days', departures: 'Daily' },
  { city: 'Montréal', country: 'CA', x: '78%', y: '48%', transit: '1-2 days', departures: 'Daily' },
  { city: 'Calgary', country: 'CA', x: '38%', y: '42%', transit: '2-3 days', departures: '3x weekly' },
  { city: 'Vancouver', country: 'CA', x: '22%', y: '45%', transit: '3-4 days', departures: 'Daily' },
  { city: 'Chicago', country: 'US', x: '62%', y: '58%', transit: '1-2 days', departures: 'Daily' },
  { city: 'Miami', country: 'US', x: '74%', y: '82%', transit: '3-4 days', departures: '4x weekly' },
  { city: 'Houston', country: 'US', x: '52%', y: '78%', transit: '2-3 days', departures: '5x weekly' },
  { city: 'New York', country: 'US', x: '80%', y: '55%', transit: '1-2 days', departures: 'Daily' },
];

export default function CoverageMap() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [focusedLocation, setFocusedLocation] = useState<string | null>(null);

  const currentLocation = activeLocation || focusedLocation;

  return (
    <section id="coverage" className="section-padding bg-navy text-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Network</span>
          <h2 className="mt-4">Coverage Across North America</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
            Strategic hubs positioned for optimal cross-border routing. Daily departures from major markets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* SVG Map of North America */}
          <svg
            viewBox="0 0 800 500"
            className="w-full h-auto"
            role="img"
            aria-label="Coverage map showing service locations across North America"
          >
            {/* Background */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,201,20,0.1)" />
                <stop offset="100%" stopColor="rgba(255,201,20,0.02)" />
              </linearGradient>
            </defs>

            {/* Simplified North America shape */}
            <path
              d="M100,120 L150,80 L200,60 L280,50 L350,45 L420,40 L500,45 L580,50 L650,70 L700,100 L720,150 L710,200 L680,250 L650,280 L620,320 L580,350 L550,380 L520,400 L480,420 L440,430 L400,435 L360,430 L320,420 L280,400 L240,370 L200,330 L160,280 L130,230 L110,180 L100,120"
              fill="url(#mapGradient)"
              stroke="rgba(255,201,20,0.3)"
              strokeWidth="2"
            />

            {/* US-Canada Border Line */}
            <path
              d="M100,200 L200,195 L300,190 L400,185 L500,190 L600,195 L700,200"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />

            {/* Connection lines between hubs */}
            <g stroke="rgba(255,201,20,0.2)" strokeWidth="1">
              <line x1="73%" y1="52%" x2="78%" y2="48%" />
              <line x1="73%" y1="52%" x2="62%" y2="58%" />
              <line x1="62%" y1="58%" x2="52%" y2="78%" />
              <line x1="62%" y1="58%" x2="80%" y2="55%" />
              <line x1="80%" y1="55%" x2="74%" y2="82%" />
              <line x1="38%" y1="42%" x2="22%" y2="45%" />
              <line x1="38%" y1="42%" x2="62%" y2="58%" />
            </g>
          </svg>

          {/* Location Markers */}
          {locations.map((loc, index) => (
            <motion.button
              key={loc.city}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              style={{ left: loc.x, top: loc.y }}
              onMouseEnter={() => setActiveLocation(loc.city)}
              onMouseLeave={() => setActiveLocation(null)}
              onFocus={() => setFocusedLocation(loc.city)}
              onBlur={() => setFocusedLocation(null)}
              aria-label={`${loc.city}, ${loc.country}: ${loc.transit} transit, ${loc.departures} departures`}
              aria-expanded={currentLocation === loc.city}
            >
              {/* Pulse Ring */}
              <span className="absolute inset-0 w-8 h-8 -m-2 rounded-full bg-primary/30 animate-ping-slow" />
              
              {/* Marker Dot */}
              <span className="relative block w-4 h-4 rounded-full bg-primary border-2 border-white shadow-gold group-hover:scale-125 group-focus:scale-125 transition-transform" />

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: currentLocation === loc.city ? 1 : 0,
                  y: currentLocation === loc.city ? 0 : 10,
                }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-card text-card-foreground rounded-lg shadow-xl min-w-[180px] pointer-events-none z-10"
              >
                <div className="font-display font-bold text-foreground">{loc.city}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  <div>Avg. transit: <span className="text-primary font-medium">{loc.transit}</span></div>
                  <div>Departures: <span className="text-foreground">{loc.departures}</span></div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-card" />
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-white/60"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            Active Hub
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-white/30" style={{ borderStyle: 'dashed' }} />
            US-Canada Border
          </div>
        </motion.div>
      </div>
    </section>
  );
}
