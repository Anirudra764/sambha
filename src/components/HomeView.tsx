import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Factory, Award, HelpCircle, CheckCircle } from 'lucide-react';
import { BRANDS } from '../data/products';

const HERO_IMAGE_SEQUENCE = [
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600', // high-precision pipes and valves
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600', // turbines and gears
  'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=1600', // machinery sparks
  'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&q=80&w=1600', // controller panels/refineries
  'https://images.unsplash.com/photo-1542124948-ed391de08a2c?auto=format&fit=crop&q=80&w=1600'  // heavy pumps
];

interface HomeViewProps {
  onNavigate: (view: 'home' | 'catalog' | 'detail' | 'rfq') => void;
  onSelectProduct: (productId: string) => void;
}

// ⏱️ Interactive Counter widget for premium telemetry feel without simulated log slop
function AnimatedCounter({ value, suffix = "", duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 8);
    const step = Math.ceil(end / (totalMiliseconds / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HomeView({ onNavigate, onSelectProduct }: HomeViewProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGE_SEQUENCE.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Container stagger effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="space-y-16 pb-20 entry-fade" id="home-view">
      
      {/* 1. Pure Black Premium Animated Hero Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.99, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        className="relative bg-black text-white rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
        id="home-hero"
      >
        {/* Smooth, seamless fading image sequence from @hero / Unsplash Fallbacks */}
        <div className="absolute inset-0 z-0 overflow-hidden" id="hero-bg-seq">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={frameIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.28, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={HERO_IMAGE_SEQUENCE[frameIndex]}
                alt=""
                className="w-full h-full object-cover grayscale brightness-35 contrast-125"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Drifting amber-blue gradient glow mesh overlays */}
          <motion.div 
            animate={{
              scale: [1, 1.15, 0.9, 1],
              x: [0, 30, -20, 0],
              y: [0, -20, 15, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" 
          />
          <motion.div 
            animate={{
              scale: [1, 0.85, 1.2, 1],
              x: [0, -40, 30, 0],
              y: [0, 15, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[90px] pointer-events-none" 
          />

          {/* Abstract engineering blueprint design overlay */}
          <div className="absolute inset-0 bg-transparent engineering-grid opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-at-t from-transparent via-black/40 to-black/95 pointer-events-none" />
        </div>
        
        {/* Visual structural framing: split-grid on desktop */}
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text credentials with motion staggering */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left" 
            id="hero-taglines"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-wider text-amber-400 font-bold uppercase">
                ISO 9001:2015 CERTIFIED DISTRIBUTOR
              </span>
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { 
                    type: "spring", 
                    stiffness: 55, 
                    damping: 22,
                    mass: 1.2
                  }
                }
              }}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Trusted Supplier of <br />
              <span className="text-amber-400 underline decoration-amber-500/30 decoration-wavy decoration-2">Industrial Equipment & Spare Parts</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-slate-300 text-base sm:text-lg max-w-2xl font-sans font-light leading-relaxed"
            >
              We specialize in high-speed, authorized procurement of authentic Mechanical, Electrical, Automation, and Power Transmission spare parts representing the world’s leading heavy manufacturers.
            </motion.p>

            {/* Interactive button layout with hover zoom feedbacks */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('catalog')}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-sm px-6 py-3.5 rounded-lg transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
                id="btn-hero-catalog"
              >
                Explore Components Catalog
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2, bg: "rgba(30, 41, 59, 1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('rfq')}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 font-sans font-semibold text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer"
                id="btn-hero-rfq"
              >
                Request Inquiry
              </motion.button>
            </motion.div>

            {/* Micro credentials logs with animated count trackers */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 max-w-lg" 
              id="hero-metrics"
            >
              <div className="hover:scale-105 transition-transform">
                <p className="font-display text-2xl font-bold text-white">
                  <AnimatedCounter value={100} suffix="%" />
                </p>
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">Genuine Spares</p>
              </div>
              <div className="hover:scale-105 transition-transform">
                <p className="font-display text-2xl font-bold text-white">
                  &lt;<AnimatedCounter value={24} suffix=" Hr" />
                </p>
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">RFQ Reply Guaranteed</p>
              </div>
              <div className="hover:scale-105 transition-transform">
                <p className="font-display text-2xl font-bold text-white">
                  <AnimatedCounter value={15000} suffix="+" />
                </p>
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">SKUs Indexed</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Side Visual Illustration with magnetic hover physics and hover triggers */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.2 }}
            className="lg:col-span-5 relative mt-4 lg:mt-0" 
            id="hero-image-frame"
          >
            {/* Elegant backdrop pulse */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-blue-500/10 blur-xl opacity-50" />
            
            <motion.div 
              whileHover={{ y: -6, rotate: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="relative rounded-xl border border-zinc-800 overflow-hidden shadow-2xl aspect-[4/3] bg-zinc-950 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800" 
                alt="High-precision industrial pipeline valves and instrumentation refinery"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/95 backdrop-blur-md p-3 rounded-lg border border-zinc-805 border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] text-amber-500 uppercase font-semibold">Active Supply Core</span>
                  <p className="font-sans text-xs font-bold text-white mt-0.5">Kitz-Yamada Split Body Flanged Assembly</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectProduct('fb-2000')}
                  className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-1.5 rounded hover:bg-amber-400 transition-colors uppercase font-mono cursor-pointer"
                >
                  View Detail
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.section>

      {/* 2. Brand Represent Marquee Ticker with Interactive Pause and Micro-scale */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900/60 py-10 rounded-2xl border border-zinc-800 shadow-sm overflow-hidden" 
        id="brands-marquee"
      >
        <div className="text-center px-4 mb-6">
          <p className="font-mono text-[10px] font-semibold text-zinc-400 tracking-widest uppercase">
            AUTHORISED AGENTS & STRATEGIC ALLIANCES
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-2 rounded" />
        </div>

        <div className="relative overflow-hidden w-full bg-zinc-950/40 py-4 border-y border-zinc-800 flex">
          {/* Double content for seamless looping scroll */}
          <div className="animate-ticker select-none gap-10 sm:gap-16">
            {BRANDS.concat(BRANDS).map((brand, idx) => (
              <motion.div 
                whileHover={{ scale: 1.04, color: "#d97706" }}
                key={idx} 
                className="flex items-center gap-2.5 shrink-0 px-4 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-display font-extrabold text-sm tracking-tighter shadow-sm transition-transform group-hover:scale-105">
                  {brand.logoText.substring(0, 3).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-sans text-sm font-bold text-zinc-200 leading-none">{brand.name}</span>
                  <span className="font-mono text-[9px] text-amber-550 text-amber-500 font-semibold tracking-wider uppercase mt-1">GENUINE PARTNER</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Core Corporate Advantages - Staggered Slide In on Scroll */}
      <section className="space-y-10" id="why-quote">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
            Why Supply Chain Directors Trust Us
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-sans font-light">
            We operate at the intersection of reliable engineering verification and lightning-fast global logistics to minimize your industrial downtime.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, borderColor: "rgba(245, 158, 11, 0.45)" }}
            className="bg-zinc-900/60 border border-zinc-800/85 p-6 rounded-xl hover:shadow-xl transition-all duration-300 relative group text-left"
          >
            <div className="bg-amber-500/10 text-amber-500 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-colors group-hover:bg-amber-500 group-hover:text-zinc-950">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">100% Genuine Certified</h3>
            <p className="text-zinc-400 text-xs font-light mt-2 leading-relaxed">
              Every package is shipped with raw mill certificates, certificates of origin, and complete traceability. No gray market items or imitations.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, borderColor: "rgba(245, 158, 11, 0.45)" }}
            className="bg-zinc-900/60 border border-zinc-800/85 p-6 rounded-xl hover:shadow-xl transition-all duration-300 relative group text-left"
          >
            <div className="bg-amber-500/10 text-amber-500 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-colors group-hover:bg-amber-500 group-hover:text-zinc-950">
              <Zap className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">Speed-of-Light Feedback</h3>
            <p className="text-zinc-400 text-xs font-light mt-2 leading-relaxed">
              We know downtime cost estimation. Our engineering desk issues comprehensive, item-aligned commercial quotations within 24 hours.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, borderColor: "rgba(245, 158, 11, 0.45)" }}
            className="bg-zinc-900/60 border border-zinc-800/85 p-6 rounded-xl hover:shadow-xl transition-all duration-300 relative group text-left"
          >
            <div className="bg-amber-500/10 text-amber-500 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-colors group-hover:bg-amber-500 group-hover:text-zinc-950">
              <Factory className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">Engineering Assistance</h3>
            <p className="text-zinc-400 text-xs font-light mt-2 leading-relaxed">
              Struggling with obsolete serial codes? Upload drawing specifications; our engineers cross-map and suggest direct mechanical replacements.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, borderColor: "rgba(245, 158, 11, 0.45)" }}
            className="bg-zinc-900/60 border border-zinc-800/85 p-6 rounded-xl hover:shadow-xl transition-all duration-300 relative group text-left"
          >
            <div className="bg-amber-500/10 text-amber-500 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-colors group-hover:bg-amber-500 group-hover:text-zinc-950">
              <Award className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">Pan-India Delivery</h3>
            <p className="text-zinc-400 text-xs font-light mt-2 leading-relaxed">
              From Chennai petrochemical blocks to heavy machinery yards in Haryana, our logistics network handles secure freight including oversized transport.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. Vision of S. AJAY Section - Dynamic Entrance Trigger */}
      <motion.section 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        className="bg-zinc-950 text-white rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 grid grid-cols-1 lg:grid-cols-12"
        id="vision-s-ajay"
      >
        <div className="lg:col-span-8 p-8 sm:p-12 space-y-6 flex flex-col justify-center text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg w-fit">
            <span className="font-mono text-[9px] tracking-widest text-amber-400 font-bold uppercase">
              LEADERSHIP STATEMENT
            </span>
          </div>

          <blockquote className="relative">
            <span className="absolute top-0 left-0 text-7xl font-serif text-zinc-800 leading-none pointer-events-none -translate-x-4 -translate-y-6">“</span>
            <p className="font-display text-lg sm:text-xl lg:text-2xl font-medium italic text-slate-100 relative z-10 leading-relaxed pl-4">
              At Sarvshresth Sambharan, we do not view spare parts distribution as transactional retail. We view ourselves as life support systems for Indian heavy industry. When a roller bearing cracks or a flanged control valve seizes, national assembly capacity hangs in the balance. Our pledge is absolute transparency: 100% genuine sourcing, precise technical matching, and zero communication delay. If it is humanly possible to dispatch across our borders, it arrives.
            </p>
          </blockquote>

          <div className="flex flex-wrap items-center gap-4 border-t border-zinc-800/80 pt-6" id="visionary-profile">
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-amber-400">S. AJAY</span>
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">CHAIRMAN & MANAGING DIRECTOR</span>
              <span className="font-sans text-xs text-zinc-500">Sarvshresth Sambharan Industrial Group</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-zinc-900 text-zinc-300 font-mono text-[10px] rounded border border-zinc-800 uppercase">
              <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
              Founder Seal
            </div>
          </div>
        </div>

        {/* Corporate Profile Image Representation with gentle parallax hover scaling */}
        <div className="lg:col-span-4 relative h-64 lg:h-auto min-h-[300px] overflow-hidden group">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" 
            alt="S. Ajay, Founder and CMD of Sarvshresth Sambharan"
            className="absolute inset-0 w-full h-full object-cover object-top grayscale brightness-90 contrast-105 group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-zinc-950 lg:via-transparent" />
          <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-sm p-4 rounded-lg border border-zinc-850">
            <span className="font-mono text-[9px] text-amber-500 tracking-wider">PORTRAIT CONTEXT</span>
            <p className="font-sans text-xs font-semibold text-slate-300 mt-0.5">S. AJAY, CMD, Sarvshresth Sambharan</p>
          </div>
        </div>
      </motion.section>

      {/* 5. Quick Support / Custom quote banner with lively interactive pop */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.005 }}
        className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between text-left gap-6 transition-transform"
      >
        <div className="space-y-1">
          <p className="font-mono text-[9px] text-amber-400 tracking-wider uppercase font-extrabold flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Unlisted Mechanical Code or Legacy Specifier?
          </p>
          <h3 className="font-display text-xl font-extrabold text-white">
            Have a custom machinery checklist or complex Bills of Material (BOM)?
          </h3>
          <p className="text-zinc-400 text-sm font-light">
            Do not waste hours digging for outdated catalogs. Submit your list directly via our RFQ channel.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate('rfq')}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-sm px-6 py-3.5 rounded-lg transition-colors shadow-md shadow-amber-500/10 shrink-0 cursor-pointer"
        >
          Dispatch RFQ Immediately
        </motion.button>
      </motion.section>

    </div>
  );
}
