import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Menu, X, Phone, Mail, MessageSquare, MapPin, 
  ChevronRight, Car, Truck, Zap, ShieldCheck, 
  Globe, Clock, Award, Users, Search, Ship, 
  Package, LayoutGrid, CheckCircle2, Quote,
  Tractor, Zap as SolarIcon, ArrowRight,
  ExternalLink, Facebook, Instagram, Linkedin, Send
} from 'lucide-react';

// --- Components ---

const Diamond = ({ className = "" }) => (
  <div className={`w-3 h-3 bg-primary rotate-45 ${className}`} />
);

const SectionLabel = ({ text }: { text: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="section-label"
  >
    <Diamond /> <span>{text}</span>
  </motion.div>
);

const Counter = ({ target, label, icon: Icon }: { target: number, label: string, icon: any }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4">
      <div className="text-primary mb-2">
        <Icon size={28} />
      </div>
      <div className="text-3xl font-bold mb-1">
        {count}{target > 500 ? "+" : target === 12 ? "+" : ""}
      </div>
      <div className="text-xs font-accent tracking-widest text-grey uppercase">{label}</div>
    </div>
  );
};

// --- App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Luxury Cars');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fleetTabs = [
    { name: 'Luxury Cars', icons: [Car, Car, Car, Car], examples: ['Mercedes-Benz C-Class', 'Toyota Camry', 'Lexus ES350', 'Honda Accord'] },
    { name: 'SUVs & 4x4', icons: [Car, Car, Car, Car], examples: ['Range Rover Evoque', 'Toyota Land Cruiser', 'Lexus LX570', 'Toyota Highlander'] },
    { name: 'Trucks & Haulage', icons: [Truck, Truck, Truck, Truck], examples: ['Mack Trucks', 'DAF Trucks', 'Mercedes Actros', 'Iveco Trucks'] },
    { name: 'Tractors & Equipment', icons: [Tractor, Tractor, Tractor, Tractor], examples: ['Massey Ferguson', 'John Deere', 'New Holland', 'Dongfeng Tractor'] },
    { name: 'Hybrid Cars', icons: [Zap, Zap, Zap, Zap], examples: ['Toyota Prius', 'Honda CR-V Hybrid', 'Lexus RX Hybrid', 'Ford Escape Hybrid'] },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-dark w-full">
      <div className="noise-overlay" />

      {/* [1] NAVIGATION */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Car className="text-white" size={24} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-serif font-black tracking-tight">
                <span className="text-primary">Afesho</span> Motors
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-grey font-accent">Nigeria Limited</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {['Home', 'About', 'Services', 'Fleet', 'Why Us', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="nav-link">
                {link}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:08055368080" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Phone size={16} className="text-primary" />
              08055368080
            </a>
            <a href="#contact" className="btn-primary py-2.5 px-6 text-sm">Get a Quote</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-dark flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif font-bold italic">Afesho Motors</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-grey"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-serif">
              {['Home', 'About', 'Services', 'Fleet', 'Why Us', 'Contact'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(' ', '-')}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <a href="tel:08055368080" className="btn-primary text-center">Call Now</a>
              <p className="text-center text-grey text-sm">Afeshomotorsltd2@gmail.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* [2] HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0A0A0A]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(192,57,43,0.15)_0%,transparent_70%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[conic-gradient(from_230deg_at_50%_50%,rgba(192,57,43,0.05)_0deg,transparent_60deg)]" />
          
          {/* Floating Diamonds */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
              animate={{ 
                y: '-20vh', 
                opacity: [0, 0.2, 0.2, 0],
                rotate: 45 
              }}
              transition={{ 
                duration: 15 + Math.random() * 10, 
                repeat: Infinity, 
                delay: i * 2,
                ease: "linear"
              }}
              className="absolute w-8 h-8 border border-primary/30"
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8"
          >
            <Diamond className="w-2 h-2" />
            <span className="text-[10px] sm:text-xs font-accent tracking-widest text-gold uppercase">CAC REGISTERED · RC 1089010 · EST. 2013</span>
            <Diamond className="w-2 h-2" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif font-black mb-6 leading-[1.1] tracking-tight"
          >
            Nigeria's Premier<br />
            <span className="text-primary italic">Vehicle Importer</span><br />
            & Contractor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-grey text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Luxury cars. Heavy trucks. Solar installations. Global sourcing. 
            Delivered to your doorstep — anywhere in Nigeria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#fleet" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              Explore Our Fleet <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-outline w-full sm:w-auto">Contact Us Today</a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-grey/40"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-accent tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* [3] TRUST BAR */}
      <section className="py-12 border-y border-glass bg-dark-2/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-y-12 gap-x-8 md:gap-x-16">
            <Counter target={500} label="Vehicles Delivered" icon={Car} />
            <Diamond className="hidden md:block opacity-20" />
            <Counter target={12} label="Years Experience" icon={Award} />
            <Diamond className="hidden md:block opacity-20" />
            <Counter target={1} label="Global Import Network" icon={Globe} />
            <Diamond className="hidden md:block opacity-20" />
            <Counter target={1} label="Solar Solutions" icon={SolarIcon} />
            <Diamond className="hidden md:block opacity-20" />
            <Counter target={2013} label="CAC Certified" icon={ShieldCheck} />
          </div>
        </div>
      </section>

      {/* [4] ABOUT US */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel text="ABOUT US" />
              <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight">
                Built on Trust. <br />
                <span className="text-primary">Driven by Excellence.</span>
              </h2>
              <div className="space-y-6 text-grey text-lg leading-relaxed">
                <p>
                  Afesho Motors Nigeria Limited was founded in 2013 and has rapidly grown to become one of Nigeria's leading vehicle importers and general merchandise companies.
                </p>
                <p>
                  We are constantly geared towards improving our standards and delivering world-class service to every client. Our philosophy is simple: your business is our business.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="bg-dark-2 p-6 rounded-xl border border-glass">
                    <p className="text-4xl font-serif font-bold text-white mb-1">Est. 2013</p>
                    <p className="text-xs uppercase tracking-widest text-primary font-accent">Foundation Year</p>
                  </div>
                  <div className="bg-dark-2 p-6 rounded-xl border border-glass">
                    <p className="text-4xl font-serif font-bold text-white mb-1">Abuja</p>
                    <p className="text-xs uppercase tracking-widest text-primary font-accent">HQT Location</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-10 relative group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
              <h3 className="text-xl font-accent tracking-widest text-white mb-8 border-b border-glass pb-4">OFFICIAL CREDENTIALS</h3>
              <div className="space-y-6">
                {[
                  { label: "Company", value: "AFESHO MOTORS NIGERIA LIMITED", icon: Globe },
                  { label: "RC Number", value: "1089010", icon: ShieldCheck },
                  { label: "Incorporated", value: "7th January, 2013", icon: Clock },
                  { label: "Location", value: "Abuja, FCT, Nigeria", icon: MapPin },
                  { label: "Legal Status", value: "Active — Limited by Shares", icon: CheckCircle2 },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <item.icon className="text-primary mt-1 shrink-0" size={20} />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-grey font-accent">{item.label}</span>
                      <span className="text-sm md:text-base font-bold text-white">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-dark-2 border border-glass rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <div className="p-8 md:p-16 flex flex-col justify-center relative min-h-[400px]">
              <Quote className="absolute top-8 right-12 text-primary/10" size={160} />
              <div className="relative z-10 max-w-4xl">
                <div className="text-2xl md:text-4xl font-serif italic text-white/90 leading-relaxed mb-12">
                  "We believe that your business is our business and that if you succeed, we succeed. That philosophy is at the centre of everything we do. We always work hard to deliver the highest quality products and services on time and within budget."
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-serif font-black shrink-0 shadow-xl">
                    SB
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-bold text-white">Stephen Bello</p>
                    <p className="text-sm font-accent tracking-widest text-primary uppercase">MD / CEO, Afesho Motors Nigeria Limited</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* [5] VISION, MISSION & PRINCIPLES */}
      <section className="py-24 bg-dark-2/30 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card flex flex-col p-8 border-t-[3px] border-t-primary group hover:shadow-[0_10px_30px_rgba(192,57,43,0.15)]"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Search size={24} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Our Vision</h3>
              <p className="text-grey leading-relaxed">
                To be the leading car services provider and distributor in Nigeria — using innovative work practices, a culture of self-improvement, and new technologies that add value to our clients.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card flex flex-col p-8 border-t-[3px] border-t-primary group hover:shadow-[0_10px_30px_rgba(192,57,43,0.15)]"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <LayoutGrid size={24} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
              <ul className="space-y-3 text-grey text-sm">
                {[
                  "Quality and timely service delivery",
                  "Ensuring maximum client satisfaction",
                  "Ethical and social consistency",
                  "Harnessing people and technology",
                  "Attaining international standards",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Principles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card flex flex-col p-8 border-t-[3px] border-t-primary group hover:shadow-[0_10px_30px_rgba(192,57,43,0.15)]"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Core Principles</h3>
              <ul className="space-y-3 text-grey text-sm">
                {[
                  "Creative Vision",
                  "Strong Communication",
                  "Unrivaled Consistency",
                  "Client Business Growth",
                  "Going The Extra Mile",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* [6] SERVICES */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center"><SectionLabel text="WHAT WE DO" /></div>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-4">Our Services</h2>
            <p className="text-grey text-lg max-w-2xl mx-auto leading-relaxed">
              From premium vehicle imports to high-efficiency solar installations — we deliver end-to-end solutions for Nigerian homes and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Vehicle Imports", 
                desc: "We source and import premium cars, SUVs, and luxury vehicles from the USA, Europe, and Asia to your doorstep.", 
                icon: Car,
                delay: 0
              },
              { 
                title: "Exports", 
                desc: "Facilitating seamless export of goods and vehicles from Nigeria to international markets with full documentation support.", 
                icon: Ship,
                delay: 0.1
              },
              { 
                title: "Delivery Services", 
                desc: "End-to-end vehicle and cargo delivery across Nigeria and West African borders. Reliable and on-time.", 
                icon: Package,
                delay: 0.2
              },
              { 
                title: "Solar Solutions", 
                desc: "Supply and professional installation of solar energy systems for residential, commercial, and industrial clients.", 
                icon: SolarIcon,
                delay: 0.3
              },
              { 
                title: "General Contracts", 
                desc: "Executing federal, state, and private sector projects across multiple high-impact sectors with excellence.", 
                icon: Award,
                delay: 0.4
              },
              { 
                title: "Consultancy", 
                desc: "Expert automotive advisory and business development services to help you make informed procurement decisions.", 
                icon: MessageSquare,
                delay: 0.5
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
                className="glass-card group p-8 hover:bg-dark-3 hover:-translate-y-2 border-t border-t-glass hover:border-t-primary"
              >
                <div className="w-14 h-14 bg-dark-2 rounded-full border border-glass flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                  <service.icon className="text-primary group-hover:text-white transition-colors duration-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-grey text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <a href="#contact" className="text-primary font-accent tracking-widest text-xs flex items-center gap-2 group-hover:gap-4 transition-all uppercase">
                  Learn More <ChevronRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* [7] FLEET SHOWCASE */}
      <section id="fleet" className="py-24 bg-dark-2/20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center"><SectionLabel text="OUR FLEET" /></div>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-4">What We Supply</h2>
            <p className="text-grey max-w-2xl mx-auto italic mb-12">
              We source vehicles from anywhere in the world — exactly to your specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-dark-2 p-8 rounded-2xl border border-glass flex items-center gap-6 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Ship size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold">Premium Import Network</h4>
                <p className="text-sm text-grey">Sourced from the best international markets.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-dark-2 p-8 rounded-2xl border border-glass flex items-center gap-6 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Truck size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold">Logistics & Supply</h4>
                <p className="text-sm text-grey">Extensive range of heavy duty fleet options.</p>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {fleetTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-6 py-2.5 rounded-full text-xs font-accent tracking-widest uppercase transition-all duration-300 ${activeTab === tab.name ? 'bg-primary text-white shadow-lg' : 'bg-dark-2 text-grey border border-glass hover:border-primary/50'}`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {fleetTabs.find(t => t.name === activeTab)?.examples.map((item, i) => (
                <motion.div
                  key={`${activeTab}-${item}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="glass-card group"
                >
                  <div className="aspect-[16/10] bg-dark-3 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {activeTab.includes('Trucks') ? <Truck size={64} className="text-white/10" /> : activeTab.includes('Tractors') ? <Tractor size={64} className="text-white/10" /> : <Car size={64} className="text-white/10" />}
                    <div className="absolute bottom-4 left-4 bg-primary text-[10px] px-2 py-1 rounded font-accent tracking-widest uppercase">Premium Sourcing</div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item}</h4>
                    <p className="text-xs text-grey uppercase tracking-widest font-accent">{activeTab}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-16 bg-primary/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                <Search size={22} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Don't see what you're looking for?</h4>
                <p className="text-grey text-sm">We provide tailored custom orders for any vehicle globally.</p>
              </div>
            </div>
            <a href="tel:08055368080" className="btn-primary relative z-10 whitespace-nowrap">Call to Order: 08055368080</a>
          </div>
        </div>
      </section>

      {/* [8] WHY CHOOSE US */}
      <section id="why-us" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center"><SectionLabel text="WHY AFESHO MOTORS" /></div>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-center mb-16">Why Nigeria's Best Choose Us</h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:col-span-2 grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
              {[
                { title: "CAC Registered & Fully Compliant", desc: "Incorporated in 2013, legally registered under Nigerian corporate law. RC: 1089010.", icon: ShieldCheck },
                { title: "Global Sourcing Network", desc: "We import from the USA, Europe, Japan, China, and beyond — at competitive prices.", icon: Globe },
                { title: "Reliable On-Time Delivery", desc: "We are deeply committed to meeting agreed delivery timelines, every single time.", icon: Clock },
                { title: "Diverse Service Portfolio", desc: "Luxury sedans to heavy-duty trucks, solar installations to general contracting.", icon: LayoutGrid },
                { title: "Client-First Philosophy", desc: "Your success is our success. We take ownership of your project from request to delivery.", icon: Users },
                { title: "Post-Sale Support", desc: "Our relationship doesn't end at delivery. We stay with you and ensure your satisfaction.", icon: MessageSquare },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-4 bg-dark-2 p-8 rounded-2xl border border-glass hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                       {item.title}
                    </h4>
                    <p className="text-grey text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* [9] CERTIFICATION */}
      <section className="py-24 bg-dark-3 relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionLabel text="CERTIFIED & TRUSTED" />
          <h2 className="text-3xl md:text-5xl font-serif font-black mb-12">Fully Registered. Fully Legal.</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h3 className="text-2xl font-serif font-bold mb-6 text-primary">RC Number: 1089010</h3>
              <p className="text-grey text-lg leading-relaxed mb-6">
                Afesho Motors Nigeria Limited is a fully compliant corporate entity, incorporated under the 
                <strong> Companies and Allied Matters Act 1990</strong> on the 7th of January, 2013.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Active Legal Status",
                  "Limited by Shares",
                  "Federal Republic of Nigeria Registered",
                  "Compliant with All Tax Regulations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle2 size={18} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://cac.gov.ng" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
                Verify on CAC Portal <ExternalLink size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ rotateY: 30, opacity: 0, scale: 0.9 }}
              whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white text-dark p-8 md:p-12 shadow-2xl relative border-[8px] border-dark/5"
            >
              <div className="absolute top-4 right-4 flex items-center flex-col opacity-10 pointer-events-none">
                <Award size={100} />
              </div>
              <div className="border-[1px] border-dark/20 p-8 flex flex-col items-center">
                <div className="mb-6 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-dark flex items-center justify-center mb-2">
                    <span className="font-black text-2xl">CAC</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Corporate Affairs Commission</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif font-black underline underline-offset-8 mb-8 uppercase tracking-widest text-center">Certificate of Incorporation</h3>
                <p className="text-xs uppercase tracking-widest font-bold mb-1">Company Name</p>
                <p className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center">AFESHO MOTORS NIGERIA LTD</p>
                
                <div className="grid grid-cols-2 gap-8 w-full border-t border-dark/10 pt-8">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold mb-1 text-grey">RC Number</p>
                    <p className="font-black text-xl">1089010</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold mb-1 text-grey">Incorporation Date</p>
                    <p className="font-black text-xl">07 Jan 2013</p>
                  </div>
                </div>
                
                <div className="mt-12 text-[10px] text-grey uppercase tracking-widest leading-loose text-center">
                  Incorporated under the Companies and Allied Matters Act 1990<br />
                  Company is Limited by Shares | Registered at: Abuja, Nigeria
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* [10] CALL TO ACTION BANNER */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary to-[#8B0000]">
        <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 -rotate-12 pointer-events-none">
          <Car size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 leading-tight">Ready to Order Your Vehicle<br />or Discuss a Contract?</h2>
            <p className="text-white/80 text-xl mb-12 max-w-3xl mx-auto font-medium">
              Call us, send an email, or message us on WhatsApp — we respond fast to all inquiries across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:08055368080" className="bg-white text-primary px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform">
                <Phone size={24} /> 08055368080
              </a>
              <a href="mailto:Afeshomotorsltd2@gmail.com" className="bg-dark/20 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-dark/40 transition-colors">
                <Mail size={24} /> Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* [11] CONTACT SECTION */}
      <section id="contact" className="py-24 bg-dark scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel text="GET IN TOUCH" />
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-16">Contact Afesho Motors</h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[
                { label: "Email Address", value: "Afeshomotorsltd2@gmail.com", icon: Mail, href: "mailto:Afeshomotorsltd2@gmail.com" },
                { label: "Hotline", value: "08055368080", icon: Phone, href: "tel:08055368080" },
                { label: "WhatsApp", value: "+234 805 536 8080", icon: MessageSquare, href: "https://wa.me/2348055368080" },
                { label: "Our Office", value: "Abuja, Federal Capital Territory, Nigeria", icon: MapPin },
                { label: "Legal Status", value: "RC 1089010 — CAC Registered", icon: Award },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-dark-2 border border-glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-accent tracking-widest text-grey uppercase">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-lg font-bold hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-lg font-bold">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              <div className="pt-8 flex gap-4">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-dark-2 flex items-center justify-center text-grey hover:text-white transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 relative"
            >
              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">Message Sent!</h3>
                  <p className="text-grey mb-8">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setFormStatus('idle')} className="btn-primary">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-accent tracking-widest text-grey uppercase">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full bg-dark-3 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-accent tracking-widest text-grey uppercase">Phone Number</label>
                      <input required type="tel" placeholder="08055368080" className="w-full bg-dark-3 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-accent tracking-widest text-grey uppercase">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full bg-dark-3 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-accent tracking-widest text-grey uppercase">Service Interested In</label>
                    <select required className="w-full bg-dark-3 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none">
                      <option value="">Select a Service</option>
                      <option>Vehicle Import</option>
                      <option>Vehicle Export</option>
                      <option>Delivery Service</option>
                      <option>Solar Panel Installation</option>
                      <option>General Contract</option>
                      <option>Consultancy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-accent tracking-widest text-grey uppercase">Your Message</label>
                    <textarea required rows={4} placeholder="How can we help you?" className="w-full bg-dark-3 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                    Send Message <Send size={18} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* [12] FOOTER */}
      <footer className="bg-dark border-t-2 border-primary pt-24 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-6">
                <Car size={32} className="text-primary" />
                <div className="flex flex-col leading-none">
                  <span className="text-2xl font-serif font-black">Afesho <span className="text-primary">Motors</span></span>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-grey">Nigeria Limited</span>
                </div>
              </a>
              <p className="text-grey text-sm mb-6 max-w-xs leading-relaxed">
                Nigeria's trusted vehicle importer and general contractor. Sourcing premium quality and delivering reliability across the nation since 2013.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, MessageSquare, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="text-grey hover:text-primary transition-colors"><Icon size={20} /></a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-accent tracking-widest text-sm text-white mb-6 uppercase">Quick Links</h4>
              <ul className="space-y-4 text-grey text-sm">
                {['Home', 'About Us', 'Services', 'Our Fleet', 'Why Us', 'Contact'].map((item) => (
                  <li key={item}><a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-accent tracking-widest text-sm text-white mb-6 uppercase">Our Services</h4>
              <ul className="space-y-4 text-grey text-sm">
                {['Vehicle Imports', 'Vehicle Exports', 'Delivery Services', 'Solar Installation', 'General Contracts', 'Consultancy'].map((item) => (
                  <li key={item}><a href="#services" className="hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-accent tracking-widest text-sm text-white mb-6 uppercase">Contact</h4>
              <ul className="space-y-4 text-grey text-sm">
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-primary mt-0.5" />
                  <span>Afeshomotorsltd2@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-primary mt-0.5" />
                  <span>08055368080</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-0.5" />
                  <span>Abuja, FCT, Nigeria</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={16} className="text-primary mt-0.5" />
                  <span>RC: 1089010</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-glass pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase font-accent tracking-widest text-grey">
            <p>© 2025 Afesho Motors Nigeria Limited. All Rights Reserved.</p>
            <div className="flex gap-8">
              <span className="flex items-center gap-2"><Diamond className="w-1.5 h-1.5" /> RC 1089010</span>
              <span className="flex items-center gap-2"><Diamond className="w-1.5 h-1.5" /> CAC Registered</span>
            </div>
          </div>
        </div>
      </footer>

      {/* [13] FLOATING WHATSAPP BUTTON */}
      <motion.a
        href="https://wa.me/2348055368080?text=Hello%20Afesho%20Motors%2C%20I%27d%20like%20to%20enquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] group"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
        <div className="absolute right-20 bg-dark-2 border border-glass px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us on WhatsApp
        </div>
        <MessageSquare size={32} />
      </motion.a>
    </div>
  );
}

