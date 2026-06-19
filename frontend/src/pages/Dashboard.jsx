import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, CreditCard, Bookmark, ArrowRight, LogOut,
  Calendar, Shield, Sparkles, TrendingUp, Search
} from 'lucide-react';
import { Activity, Tractor, BookOpen, Briefcase, Home as HomeIcon, Heart, Hammer, Monitor } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { schemesAPI } from '../api';

const ICON_MAP = { Activity, Tractor, BookOpen, Briefcase, Home: HomeIcon, Heart, Hammer, Monitor };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const data = await schemesAPI.getSaved();
        setSavedSchemes(data.schemes);
      } catch (err) {
        console.error('Failed to fetch saved schemes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const statCards = [
    {
      icon: Bookmark, label: 'Saved Schemes', value: savedSchemes.length,
      gradient: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', iconColor: 'text-orange-600',
    },
    {
      icon: Shield, label: 'Account Status', value: 'Verified',
      gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-50', iconColor: 'text-emerald-600',
    },
    {
      icon: Calendar, label: 'Profile Completion',
      value: user?.aadhaar ? '100%' : '80%',
      gradient: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="mesh-bg min-h-screen pb-24">

      {/* ─── HERO BANNER ──────────────────────────────────── */}
      <div className="relative gradient-bg py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dash-grid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dash-grid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-2xl shadow-black/20 flex-shrink-0"
            >
              <span className="text-4xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </motion.div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white/70 text-sm font-semibold">Your Dashboard</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Welcome, {user?.name?.split(' ')[0] || 'User'}!
              </h1>
              <p className="text-white/75 mb-4">Manage your profile and saved government schemes</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-3.5 py-1.5 rounded-full font-medium">
                  <Mail className="w-3.5 h-3.5 opacity-80" /> {user?.email}
                </span>
                {user?.aadhaar && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-3.5 py-1.5 rounded-full font-medium">
                    <CreditCard className="w-3.5 h-3.5 opacity-80" /> ****{user.aadhaar.slice(-4)}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* ─── STAT CARDS ───────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {statCards.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="stat-card flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className={`text-2xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── CTA ROW ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          <Link to="/find-schemes" className="btn-primary text-sm px-5 py-3">
            <Search className="w-4 h-4" /> Find New Schemes
          </Link>
          <Link to="/home" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-orange-600 bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50/20 transition-all duration-300 shadow-sm">
            <TrendingUp className="w-4 h-4 text-orange-500" /> Browse All Schemes
          </Link>
        </motion.div>

        {/* ─── SAVED SCHEMES ────────────────────────────────── */}
        <div className="mb-10 text-left">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <Bookmark className="w-5 h-5 text-orange-600" />
              Saved Schemes
            </h2>
            <Link to="/home" className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors">
              Browse More →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 h-36">
                  <div className="shimmer h-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : savedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedSchemes.map((scheme, index) => {
                const IconComponent = ICON_MAP[scheme.icon] || Activity;
                return (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  >
                    <Link
                      to={`/scheme/${scheme.id}`}
                      className="block bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg hover:shadow-orange-100/30 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-orange-50 flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {scheme.title}
                          </h3>
                          <span className="inline-flex px-2 py-0.5 rounded-md bg-orange-50 border border-orange-100 text-[10px] font-bold text-orange-600 uppercase tracking-wide">
                            {scheme.category}
                          </span>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{scheme.description}</p>
                          <div className="mt-3 flex items-center text-xs font-bold text-orange-600">
                            View Details <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white p-10 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-orange-300/30">
                <Bookmark className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>No saved schemes yet</h3>
              <p className="text-xs text-slate-500 mb-5">Start browsing and save schemes that interest you.</p>
              <Link to="/home" className="btn-primary text-xs px-5 py-2.5">
                Browse Schemes <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* ─── SIGN OUT ─────────────────────────────────────── */}
        <div className="border-t border-slate-200 pt-6">
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 transition-colors px-4 py-2.5 rounded-2xl hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
