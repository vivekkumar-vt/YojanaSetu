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
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    name: 'Safe & Secure',
    description: 'Your data is protected with enterprise-grade security protocols.',
    icon: ShieldCheck,
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    name: 'For All Citizens',
    description: 'Comprehensive coverage of state and central government initiatives.',
    icon: Users,
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
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
    { value: '100+', label: 'Schemes', icon: Zap },
    { value: 'All', label: 'Indian States', icon: Globe },
    { value: 'Smart', label: 'Eligibility Match', icon: ShieldCheck },
  ];

  return (
    <div className="mesh-bg overflow-hidden">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center isolate overflow-hidden">

        {/* Animated blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="blob-shape absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-gradient-to-br from-orange-200/20 to-amber-200/10 rounded-full blur-3xl float-anim-slow" />
          <div className="blob-shape absolute top-1/4 -right-40 w-[32rem] h-[32rem] bg-gradient-to-bl from-orange-200/15 to-red-200/10 rounded-full blur-3xl float-anim" style={{ animationDelay: '2s' }} />
          <div className="blob-shape absolute bottom-0 left-1/3 w-[28rem] h-[28rem] bg-gradient-to-tr from-amber-200/15 to-orange-200/10 rounded-full blur-3xl float-anim-fast" style={{ animationDelay: '1s' }} />

          {/* Grid dots */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#E84430" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">

          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-2xl text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                GovTech Innovation &nbsp;·&nbsp; Live Matching
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-4 text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Empowering
              <br />
              <span className="text-gradient">Citizens</span>
              <br />
              through Schemes
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base text-slate-600 leading-relaxed mb-8 max-w-lg">
              Discover and apply for government benefits tailored to your profile. Yojana Setu intelligently matches you with key central and state welfare initiatives.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3.5">
              <Link to="/home" className="btn-primary text-sm shadow-lg shadow-orange-500/20 px-6 py-3.5">
                Browse All Schemes <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/find-schemes" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 transition-all duration-200 shadow-sm">
                Find My Schemes
              </Link>
            </motion.div>

            {/* Mini stats row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mt-10 pt-6 border-t border-orange-100/60">
              {dynamicStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-black text-gradient" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</span>
                  <span className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: floating cards visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative hidden lg:flex items-center justify-center animate-y-float"
            role="img"
            aria-label="Illustration showing scheme matching cards"
          >
            <div className="relative w-[400px] h-[300px] flex items-center justify-center">
              {/* Central glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/10 to-orange-400/10 blur-3xl" />

              {/* Big card */}
              <motion.div
                className="w-72 bg-white rounded-3xl shadow-xl shadow-orange-200/40 p-6 border border-orange-100/50"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-medium">Matched for you</p>
                    <p className="text-sm font-bold text-slate-800">PM Kisan Samman</p>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-orange-100 mb-1">
                  <motion.div className="h-1.5 rounded-full gradient-bg" initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1.5, delay: 1 }} />
                </div>
                <p className="text-xs text-orange-600 font-semibold text-left">92% Match Score</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-7 rounded-full border border-slate-300 flex items-start justify-center pt-1"
          >
            <div className="w-0.5 h-1.5 rounded-full bg-slate-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section className="relative py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="badge badge-primary mb-3">Platform Features</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Everything you need for your{' '}
              <span className="text-gradient">welfare</span>
            </h2>
            <p className="text-base text-slate-500 max-w-xl mx-auto">
              From discovery to application, Yojana Setu is your one-stop platform for every government benefit available to you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-orange-100/30 transition-all duration-300 text-left"
              >
                <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>

                {/* Hover accent line */}
                <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl gradient-bg p-10 text-center overflow-hidden"
          >
            {/* Inner decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-4 backdrop-blur-sm border border-white/20">
                <Sparkles className="w-3.5 h-3.5" /> Smart Matching
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Find your perfect scheme
                <br />in under 2 minutes
              </h2>
              <p className="text-white/90 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
                Tell us a little about yourself, and our matching engine will find the best government benefits you qualify for.
              </p>
              <Link
                to="/find-schemes"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-orange-600 font-bold text-sm rounded-xl hover:bg-orange-50/90 transition-all duration-300 shadow-lg hover:scale-105"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
