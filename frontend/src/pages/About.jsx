import { motion } from 'framer-motion';
import { CheckCircle2, Target, Users, Globe, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { analyticsAPI } from '../api';
import { STATS } from '../siteConfig';

const values = [
  {
    name: 'Transparency',
    description: 'Clear eligibility criteria and application processes, removing ambiguity from government benefits.',
    icon: Target,
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    name: 'Accessibility',
    description: 'Designed for everyone, irrespective of digital literacy levels, with seamless multi-language support.',
    icon: Globe,
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    name: 'Security',
    description: 'Your personal data is encrypted and handled with the highest standards of data protection laws.',
    icon: CheckCircle2,
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

const teamMembers = [
  { name: 'Mission-First', role: 'Every feature we build starts with one question: does it help a citizen get what they deserve?' },
  { name: 'Data-Driven', role: 'We use anonymized usage data to keep improving our scheme matching accuracy every week.' },
  { name: 'Open Platform', role: 'Designed for future integration with government systems.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    setVisitorCount(analyticsAPI.getVisitorCount());
  }, []);

  const dynamicStats = [
    { label: 'Platform Visitors', value: visitorCount.toLocaleString(), icon: Users, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', iconColor: 'text-orange-600' },
    { label: 'Active Schemes', value: '100+', icon: Award, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', iconColor: 'text-orange-600' },
    { label: 'States & UTs', value: 'All', icon: Globe, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', iconColor: 'text-orange-600' },
  ];

  return (
    <div className="mesh-bg overflow-hidden text-left">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-20 pb-12 px-6 lg:px-8 overflow-hidden">
        {/* blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-200/20 blur-3xl float-anim-slow" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-amber-200/15 blur-3xl float-anim" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto pt-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={itemVariants}>
              <span className="badge badge-primary mb-5 inline-flex">Our Story</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Making governance
              <br />
              <span className="text-gradient">work for everyone</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-base text-slate-600 leading-relaxed max-w-xl">
              We are on a mission to democratize access to government schemes. By leveraging technology,
              we bridge the gap between welfare initiatives and the citizens who need them most.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-6">
              <Link to="/find-schemes" className="btn-primary text-sm px-6 py-3">
                Find Your Schemes <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section className="px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dynamicStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="stat-card flex items-center gap-4 p-5"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {stat.value}
                  </p>
                  <p className="text-slate-500 font-medium text-xs mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────── */}
      <section className="px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="badge badge-primary mb-3 inline-flex">Our Values</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What drives us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-orange-100/30 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl ${value.bg} mb-4`}>
                  <value.icon className={`w-6 h-6 ${value.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{value.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
                <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ───────────────────────────────────── */}
      <section className="px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="badge badge-primary mb-3 inline-flex">Our Approach</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              How we operate
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0 pulse-glow" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl gradient-bg p-10 text-center overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Ready to find your benefits?
              </h2>
              <p className="text-white/90 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
                It takes less than 2 minutes to discover all the government schemes you qualify for.
              </p>
              <Link
                to="/find-schemes"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-orange-600 font-bold text-sm rounded-xl hover:bg-orange-50/90 transition-all duration-300 shadow-lg hover:scale-105"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
