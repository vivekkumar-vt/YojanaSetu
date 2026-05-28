import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Search, Users, Sparkles, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { analyticsAPI } from '../api';
import { STATS } from '../siteConfig';

const features = [
  {
    name: 'Easy Discovery',
    description: 'Find schemes tailored to your specific needs and eligibility criteria instantly.',
    icon: Search,
    color: 'from-red-500 to-orange-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    name: 'Safe & Secure',
    description: 'Your data is protected with enterprise-grade security protocols.',
    icon: ShieldCheck,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    name: 'For All Citizens',
    description: 'Comprehensive coverage of state and central government initiatives.',
    icon: Users,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Landing = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [visitorCount, setVisitorCount] = useState(0);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!hasIncremented.current) {
      setVisitorCount(analyticsAPI.incrementVisitorCount());
      hasIncremented.current = true;
    } else {
      setVisitorCount(analyticsAPI.getVisitorCount());
    }
  }, []);

  const dynamicStats = [
    { value: visitorCount.toLocaleString(), label: STATS.visitorsLabel, icon: Users },
    { value: STATS.schemesCount, label: STATS.schemesLabel, icon: Zap },
    { value: STATS.statesCovered, label: STATS.statesLabel, icon: Globe },
  ];

  return (
    <div className="mesh-bg overflow-hidden">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center isolate overflow-hidden">

        {/* Animated blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="blob-shape absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-gradient-to-br from-indigo-300/30 to-violet-300/20 rounded-full blur-3xl float-anim-slow" />
          <div className="blob-shape absolute top-1/4 -right-40 w-[32rem] h-[32rem] bg-gradient-to-bl from-pink-300/25 to-rose-200/20 rounded-full blur-3xl float-anim" style={{ animationDelay: '2s' }} />
          <div className="blob-shape absolute bottom-0 left-1/3 w-[28rem] h-[28rem] bg-gradient-to-tr from-amber-200/20 to-violet-200/15 rounded-full blur-3xl float-anim-fast" style={{ animationDelay: '1s' }} />

          {/* Grid dots */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#E84430" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 lg:py-36 flex flex-col lg:flex-row items-center gap-16">

          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-2xl"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-sm font-semibold mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-orange-500" />
                GovTech Innovation &nbsp;·&nbsp; Just released
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Empowering
              <br />
              <span className="text-gradient">Citizens</span>
              <br />
              through Schemes
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
              Discover and apply for government benefits matching your profile. Our intelligent platform bridges the gap between citizens and resources — making governance accessible to everyone.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link to="/home" className="btn-primary text-base">
                Browse All Schemes <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/find-schemes" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-orange-700 bg-white border-2 border-orange-100 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow-orange-100 hover:shadow-lg">
                Find My Schemes
              </Link>
            </motion.div>

            {/* Mini stats row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-orange-100/60">
              {dynamicStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-3xl font-black text-gradient" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</span>
                  <span className="text-sm text-slate-500 font-medium mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: floating cards visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative hidden lg:flex items-center justify-center"
            role="img"
            aria-label="Illustration showing scheme matching cards and platform statistics"
          >
            <div className="relative w-[480px] h-[480px]">
              {/* Central glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/20 to-orange-400/20 blur-3xl" />

              {/* Big card */}
              <motion.div
                className="absolute top-8 left-12 w-72 bg-white rounded-3xl shadow-2xl shadow-orange-200/60 p-6 border border-orange-50"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Matched for you</p>
                    <p className="text-sm font-bold text-slate-800">PM Kisan Samman</p>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-orange-100 mb-1">
                  <motion.div className="h-2 rounded-full gradient-bg" initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1.5, delay: 1 }} />
                </div>
                <p className="text-xs text-orange-600 font-semibold">92% Match Score</p>
              </motion.div>

              {/* Small badges */}
              <motion.div
                className="absolute bottom-32 right-4 bg-white rounded-2xl shadow-xl shadow-pink-100/60 px-4 py-3 border border-pink-50"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <p className="text-sm font-bold text-slate-700">{STATS.schemesCount}+ Schemes</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-12 left-20 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl shadow-xl px-5 py-3 text-white"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <p className="text-xs font-semibold opacity-80">Total Visitors</p>
                <p className="text-xl font-black">{visitorCount.toLocaleString()}</p>
              </motion.div>

              {/* Orbiting dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-200/60" />
                  <div className="orbit-1 w-3 h-3 rounded-full bg-orange-400 absolute top-0 left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-slate-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section className="relative py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-primary mb-4">Platform Features</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Everything you need for your{' '}
              <span className="text-gradient">welfare</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              From discovery to application, Yojana Setu is your one-stop platform for every government benefit available to you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-orange-100/60 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-2xl ${feature.bg} mb-6`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.name}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>

                {/* Hover accent line */}
                <div className={`absolute bottom-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section className="px-6 lg:px-8 pb-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl gradient-bg p-12 text-center overflow-hidden"
          >
            {/* Inner decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20">
                <Sparkles className="w-4 h-4" /> Smart Matching
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Find your perfect scheme
                <br />in under 2 minutes
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Tell us a little about yourself, and our matching engine will find the best government benefits you qualify for.
              </p>
              <Link
                to="/find-schemes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-700 font-bold text-lg rounded-2xl hover:bg-orange-50 transition-all duration-300 shadow-xl shadow-black/20 hover:scale-105"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
