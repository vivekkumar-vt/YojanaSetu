import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, FileText, IndianRupee, Shield, 
  Share2, Bookmark, BookmarkCheck, ExternalLink, Calendar,
  ArrowRight, Info, Award, Users, MapPin, Tag, Landmark, Sparkles
} from 'lucide-react';
import { Activity, Tractor, BookOpen, Briefcase, Home as HomeIcon, Heart, Hammer, Monitor } from 'lucide-react';
import { schemesAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import DocumentChecklist from '../components/DocumentChecklist';

const ICON_MAP = { Activity, Tractor, BookOpen, Briefcase, Home: HomeIcon, Heart, Hammer, Monitor };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const SchemeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateSavedSchemes } = useAuth();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSavedLocal, setIsSavedLocal] = useState(false);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const data = await schemesAPI.getById(id);
        setScheme(data.scheme);
        setIsSavedLocal(user?.savedSchemes?.includes(data.scheme.id));
      } catch (err) {
        setError('Scheme not found or error loading details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScheme();
  }, [id, user]);

  const handleSave = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await schemesAPI.toggleSave(scheme.id);
      updateSavedSchemes(data.savedSchemes);
      setIsSavedLocal(data.savedSchemes.includes(scheme.id));
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  if (loading) return (
    <div className="mesh-bg min-h-screen flex items-center justify-center pt-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin shadow-xl" />
        <p className="font-black text-indigo-600 uppercase tracking-widest text-sm animate-pulse">Scanning Scheme Data...</p>
      </div>
    </div>
  );

  if (error || !scheme) return (
    <div className="mesh-bg min-h-screen flex items-center justify-center p-6 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 rounded-[3rem] max-w-lg shadow-2xl">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Info className="w-10 h-10 text-red-400" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Oops! Not Found</h2>
        <p className="text-slate-500 mb-10 text-lg leading-relaxed">{error || "The scheme you're looking for doesn't exist or has been removed."}</p>
        <Link to="/home" className="btn-primary px-10">Back to All Schemes</Link>
      </motion.div>
    </div>
  );

  const IconComponent = ICON_MAP[scheme.icon] || Activity;

  return (
    <div className="mesh-bg min-h-screen pb-24">
      {/* ─── HERO HEADER ─────────────────────────────────────── */}
      <div className="relative gradient-bg py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl float-anim-slow" />
          <div className="absolute -bottom-32 left-0 w-[450px] h-[450px] bg-indigo-500/20 rounded-full blur-3xl float-anim" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 pt-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all mb-10 font-black text-sm uppercase tracking-widest group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" /> Back to listings
             </button>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="badge bg-white/20 backdrop-blur-md text-white border-white/20 text-xs font-black uppercase tracking-widest px-4 py-2">
                  <Tag className="w-3.5 h-3.5" /> {scheme.category}
                </span>
                <span className="badge bg-emerald-400 text-white border-none text-xs font-black uppercase tracking-widest px-4 py-2 shadow-lg shadow-emerald-500/30">
                  <Shield className="w-3.5 h-3.5" /> Active Scheme
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {scheme.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30 p-3">
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Department</p>
                    <p className="text-white font-black text-lg">Central Welfare</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-3">
                   <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30 p-3">
                      <IndianRupee className="w-full h-full text-white" />
                   </div>
                   <div>
                     <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Max Benefit</p>
                     <p className="text-white font-black text-lg">Direct Transfer</p>
                   </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex-shrink-0">
               <div className="bg-white/95 p-4 rounded-3xl flex flex-col gap-3 shadow-xl border border-slate-200/50">
                  <button 
                    onClick={handleSave}
                    className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                      isSavedLocal 
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' 
                        : 'bg-white text-orange-600 border border-orange-200 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    {isSavedLocal ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    {isSavedLocal ? 'Saved to Profile' : 'Save for Later'}
                  </button>
                  <a
                    href={scheme.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all no-underline"
                  >
                    Apply Now <ExternalLink className="w-5 h-5" />
                  </a>
                  <div className="flex items-center justify-center gap-2 mt-1 pt-1.5 border-t border-slate-100">
                     <button className="p-2 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all" aria-label="Share this scheme"><Share2 className="w-4 h-4" /></button>
                     <div className="w-px h-5 bg-slate-200" />
                     <button className="p-2 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all" aria-label="More information"><Info className="w-4 h-4" /></button>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── CONTENT BODY ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="lg:col-span-2 space-y-10"
          >
            {/* Description */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-left">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shadow-inner">
                    <BookOpen className="w-5 h-5 text-orange-500" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>About the Scheme</h2>
              </div>
              <p className="text-base text-slate-600 leading-relaxed font-medium mb-8">
                {scheme.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-6 rounded-2xl bg-orange-50/40 border border-orange-100/30">
                    <Sparkles className="w-6 h-6 text-orange-500 mb-3" />
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Scheme Status</h4>
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-widest">Active & Rolling</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-orange-50/40 border border-orange-100/30">
                    <Calendar className="w-6 h-6 text-orange-500 mb-3" />
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Launch Date</h4>
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-widest">Updated Jan 2024</p>
                 </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-left">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shadow-inner">
                    <Award className="w-5 h-5 text-emerald-500" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Key Benefits</h2>
              </div>
              <div className="space-y-4">
                {scheme.benefits?.map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-emerald-50/10 hover:border-emerald-100/50 transition-all group"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-slate-700 font-bold leading-relaxed">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar Column */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-8">
            
            {/* Eligibility Sidebar Card */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group text-left">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-105 transition-transform">
                 <Users className="w-20 h-20" />
              </div>
              <h3 className="text-lg font-bold mb-6 relative z-10" style={{ fontFamily: 'Outfit, sans-serif' }}>Who Can Apply?</h3>
              <div className="space-y-4 relative z-10">
                 <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5"><MapPin className="w-3 h-3" /></div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">State Eligibility</p>
                       <p className="text-sm font-bold">PAN India / Central</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5"><Info className="w-3 h-3" /></div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Target Group</p>
                       <p className="text-sm font-bold">{scheme.eligibility}</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-semibold leading-relaxed italic text-slate-300">
                      "Eligible citizens can apply through the nearest Seva Kendra or the official portal."
                    </p>
                 </div>
              </div>
            </div>

            {/* Document Checklist Modal / Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
               <DocumentChecklist documents={scheme.documents} />
            </motion.div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
               <h3 className="text-base font-bold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Helpful Resources</h3>
               <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-orange-50 transition-colors group">
                    <div className="flex items-center gap-3">
                       <FileText className="w-4 h-4 text-orange-500" />
                       <span className="text-xs font-semibold text-slate-700">Official Circular</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 transition-colors" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-orange-50 transition-colors group">
                    <div className="flex items-center gap-3">
                       <Landmark className="w-4 h-4 text-orange-500" />
                       <span className="text-xs font-semibold text-slate-700">Participating Banks</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 transition-colors" />
                  </a>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;
