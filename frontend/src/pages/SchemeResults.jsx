import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, AlertCircle, X,
  User, Calculator, IndianRupee, MapPin, Heart, CheckCircle2, Tag,
  Sparkles, TrendingUp
} from 'lucide-react';
import { Activity, Tractor, BookOpen, Briefcase, Home as HomeIcon, Hammer, Monitor } from 'lucide-react';
import { schemesAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import CompareSchemes from '../components/CompareSchemes';

const ICON_MAP = { Activity, Tractor, BookOpen, Briefcase, Home: HomeIcon, Heart, Hammer, Monitor };

const scoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-500';
  return 'text-indigo-600';
};

const scoreBg = (score) => {
  if (score >= 80) return 'bg-emerald-50 border-emerald-100';
  if (score >= 50) return 'bg-amber-50 border-amber-100';
  return 'bg-indigo-50 border-indigo-100';
};

const scoreBar = (score) => {
  if (score >= 80) return 'from-emerald-400 to-green-500';
  if (score >= 50) return 'from-amber-400 to-orange-500';
  return 'from-indigo-400 to-violet-500';
};

const SchemeResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateSavedSchemes } = useAuth();
  const [savedSchemes, setSavedSchemes] = useState(user?.savedSchemes || []);
  const [showNoResultsPopup, setShowNoResultsPopup] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const age = searchParams.get('age');
  const gender = searchParams.get('gender');
  const income = searchParams.get('income');
  const state = searchParams.get('state');
  const marital = searchParams.get('marital');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const params = { age, gender, income, state, maritalStatus: marital };
        const data = await schemesAPI.getRecommendations(params);
        setRecommendations(data.recommendations);
        if (data.recommendations.length === 0) setShowNoResultsPopup(true);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [age, gender, income, state, marital]);

  const toggleComparison = (scheme) => {
    if (selectedForComparison.find(s => s.id === scheme.id)) {
      setSelectedForComparison(prev => prev.filter(s => s.id !== scheme.id));
    } else {
      if (selectedForComparison.length >= 3) { alert('You can compare up to 3 schemes at a time.'); return; }
      setSelectedForComparison(prev => [...prev, scheme]);
    }
  };

  const handleSave = async (e, schemeId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    try {
      const data = await schemesAPI.toggleSave(schemeId);
      updateSavedSchemes(data.savedSchemes);
      setSavedSchemes(data.savedSchemes);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const isSaved = (schemeId) => (user?.savedSchemes || savedSchemes)?.includes(schemeId);

  const chips = [
    age && { icon: Calculator, label: `Age: ${age}` },
    gender && { icon: User, label: gender },
    income && { icon: IndianRupee, label: `₹${parseInt(income).toLocaleString('en-IN')}/yr` },
    state && { icon: MapPin, label: state },
    marital && { icon: Heart, label: marital === 'Single' ? 'Single / Unmarried' : marital },
  ].filter(Boolean);

  return (
    <div className="mesh-bg min-h-screen pb-32">

      {/* ─── NO RESULTS POPUP ─────────────────────────────── */}
      <AnimatePresence>
        {showNoResultsPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-md"
            onClick={() => setShowNoResultsPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setShowNoResultsPopup(false)} className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 gradient-bg-warm rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-pink-200/50">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>No schemes found</h3>
              <p className="text-slate-500 mb-7 leading-relaxed">No government schemes match your current profile. Try adjusting your criteria to find more matches.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => { setShowNoResultsPopup(false); navigate('/find-schemes'); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Change Details
                </button>
                <Link to="/home"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white gradient-bg hover:opacity-90 transition-all text-center shadow-md shadow-indigo-300/30">
                  Browse All Schemes
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HEADER ───────────────────────────────────────── */}
      <div className="relative gradient-bg py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid2" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 pt-12">
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/find-schemes')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 text-sm font-semibold group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Change Search Criteria
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Recommended Schemes
              </h1>
            </div>
            <p className="text-white/75 text-base mb-7">Based on your profile, here are the most suitable government schemes for you.</p>

            {/* Profile chips */}
            <div className="flex flex-wrap gap-2">
              {chips.map(({ icon: Icon, label }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-3.5 py-1.5 rounded-full font-medium"
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" /> {label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── RESULTS ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 p-6 h-72">
                <div className="shimmer h-full rounded-2xl" />
              </div>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <>
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {recommendations.length} Scheme{recommendations.length !== 1 ? 's' : ''}{' '}
                  <span className="text-gradient">Recommended</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Personalized matching score based on your profile
                </p>
              </div>
              <Link to="/home" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                Browse All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((scheme, index) => {
                const IconComponent = ICON_MAP[scheme.icon] || Activity;
                const isSelected = selectedForComparison.some(s => s.id === scheme.id);
                return (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22,1,0.36,1] }}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    className={`scheme-card p-6 flex flex-col relative cursor-default ${isSelected ? 'ring-2 ring-indigo-400 border-indigo-200' : ''}`}
                  >
                    {/* Match score badge */}
                    <div className={`absolute -top-3.5 right-5 ${scoreBg(scheme.matchScore)} border rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm`}>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Match</span>
                      <span className={`text-sm font-black ${scoreColor(scheme.matchScore)}`}>{scheme.matchScore}%</span>
                    </div>

                    <div className="flex items-start justify-between mb-4 mt-2">
                      <div className={`p-3 rounded-2xl bg-indigo-50`}>
                        <IconComponent className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleComparison(scheme)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'gradient-bg text-white shadow-md shadow-indigo-300/30'
                              : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                          }`}
                        >
                          {isSelected ? '✓ Selected' : '+ Compare'}
                        </motion.button>
                        {isAuthenticated && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleSave(e, scheme.id)}
                            className={`p-2 rounded-xl transition-colors ${isSaved(scheme.id) ? 'text-indigo-600 bg-indigo-100' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
                            title={isSaved(scheme.id) ? 'Unsave' : 'Save'}
                          >
                            {isSaved(scheme.id) ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Score bar */}
                    <div className="mb-4">
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${scoreBar(scheme.matchScore)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${scheme.matchScore}%` }}
                          transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {scheme.title}
                    </h3>

                    {scheme.matchExplanation && (
                      <div className="bg-indigo-50/70 rounded-2xl p-3 mb-3 flex items-start gap-2 border border-indigo-100/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-indigo-700 font-medium leading-relaxed">{scheme.matchExplanation}</p>
                      </div>
                    )}

                    <p className="text-slate-500 flex-grow mb-4 text-sm leading-relaxed">{scheme.description}</p>

                    <div className="border-t border-slate-100 pt-4 mt-auto">
                      <p className="text-xs text-slate-400 mb-3">
                        <span className="font-semibold text-slate-600">Eligibility: </span>{scheme.eligibility}
                      </p>
                      <Link
                        to={`/scheme/${scheme.id}`}
                        className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-indigo-700 ring-1 ring-inset ring-slate-200 hover:gradient-bg hover:text-white hover:ring-0 hover:shadow-lg hover:shadow-indigo-300/40 transition-all duration-250"
                      >
                        View Full Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-16 rounded-3xl border border-slate-100 shadow-sm mt-4"
          >
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-amber-100/60">
              <AlertCircle className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>No matching schemes</h3>
            <p className="text-slate-500 mb-7 max-w-md mx-auto">No government schemes match your current profile. Try adjusting your criteria.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate('/find-schemes')} className="px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                Change Details
              </button>
              <Link to="/home" className="px-6 py-3 rounded-2xl text-sm font-bold text-white gradient-bg hover:opacity-90 transition-all text-center shadow-md shadow-indigo-300/30">
                Browse All Schemes
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─── COMPARISON BAR ───────────────────────────────── */}
      <AnimatePresence>
        {selectedForComparison.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white shadow-2xl shadow-indigo-200/60 border border-indigo-100 rounded-3xl p-4 flex items-center gap-6 max-w-sm sm:max-w-lg w-[90vw]"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex -space-x-2">
                {selectedForComparison.map((s) => (
                  <div key={s.id} className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center border-2 border-white shadow-sm">
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <div className="min-w-0">
                <p className="font-black text-slate-900 text-sm">{selectedForComparison.length} Schemes Selected</p>
                <p className="text-slate-400 text-xs truncate">Ready to compare side-by-side</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setSelectedForComparison([])} className="text-sm font-bold text-slate-400 hover:text-red-500 px-3 py-2 transition-colors rounded-xl hover:bg-red-50">
                Clear
              </button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowCompareModal(true)}
                className="gradient-bg text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-indigo-300/40 hover:opacity-90 transition-all text-sm"
              >
                Compare Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCompareModal && (
          <CompareSchemes
            schemes={selectedForComparison}
            onClose={() => setShowCompareModal(false)}
            onRemove={(id) => setSelectedForComparison(prev => prev.filter(s => s.id !== id))}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SchemeResults;
