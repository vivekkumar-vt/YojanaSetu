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
    color: 'from-indigo-500 to-violet-500',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    name: 'Accessibility',
    description: 'Designed for everyone, irrespective of digital literacy levels, with seamless multi-language support.',
    icon: Globe,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    name: 'Security',
    description: 'Your personal data is encrypted and handled with the highest standards of data protection laws.',
    icon: CheckCircle2,
    color: 'from-emerald-500 to-green-500',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
];

const teamMembers = [
  { name: 'Mission-First', role: 'Every feature we build starts with one question: does it help a citizen get what they deserve?' },
  { name: 'Data-Driven', role: 'We use anonymized usage data to keep improving our scheme matching accuracy every week.' },
  { name: 'Open Platform', role: 'Our APIs are open for integration with state government portals and NGO platforms.' },
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
    { label: STATS.visitorsLabel, value: visitorCount.toLocaleString(), icon: Users, color: 'from-indigo-500 to-violet-500', bg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { label: STATS.schemesLabel, value: STATS.schemesCount, icon: Award, color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', iconColor: 'text-pink-600' },
    { label: STATS.statesLabel, value: STATS.statesCovered, icon: Globe, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  ];

  return (
    <div className="mesh-bg overflow-hidden">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl float-anim-slow" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-pink-200/25 blur-3xl float-anim" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={itemVariants}>
              <span className="badge badge-primary mb-6 inline-flex">Our Story</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Making governance
              <br />
              <span className="text-gradient">work for everyone</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              We are on a mission to democratize access to government schemes. By leveraging technology,
              we bridge the gap between welfare initiatives and the citizens who need them most.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Link to="/find-schemes" className="btn-primary text-base">
                Find Your Schemes <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dynamicStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="stat-card flex items-center gap-5"
              >
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {stat.value}
                  </p>
                  <p className="text-slate-500 font-medium text-sm mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────── */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="badge badge-primary mb-4 inline-flex">Our Values</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What drives us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-2xl ${value.bg} mb-6`}>
                  <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.name}</h3>
                <p className="text-slate-500 leading-relaxed">{value.description}</p>
                <div className={`absolute bottom-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ───────────────────────────────────── */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="badge badge-primary mb-4 inline-flex">Our Approach</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
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
                className="flex gap-4 p-6 bg-white rounded-2xl border border-indigo-50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2.5 flex-shrink-0 pulse-glow" />
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl gradient-bg p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Ready to find your benefits?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                It takes less than 2 minutes to discover all the government schemes you qualify for.
              </p>
              <Link
                to="/find-schemes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold text-lg rounded-2xl hover:bg-indigo-50 transition-all duration-300 shadow-xl shadow-black/20 hover:scale-105"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
