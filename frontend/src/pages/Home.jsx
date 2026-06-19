import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, ArrowRight, ChevronRight, Bookmark, BookmarkCheck, Sparkles, SlidersHorizontal, LayoutGrid, AlertCircle } from 'lucide-react';
import { Activity, Tractor, BookOpen, Briefcase, Home as HomeIcon, Heart, Hammer, Monitor } from 'lucide-react';
import { schemesAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const ICON_MAP = {
  Activity, Tractor, BookOpen, Briefcase, Home: HomeIcon, Heart, Hammer, Monitor
};

const CATEGORIES = [
  { name: 'All', icon: LayoutGrid },
  { name: 'Health', icon: Activity },
  { name: 'Agriculture', icon: Tractor },
  { name: 'Education', icon: BookOpen },
  { name: 'Business', icon: Briefcase },
  { name: 'Housing', icon: HomeIcon },
  { name: 'Women & Child', icon: Heart },
  { name: 'Employment', icon: Hammer },
  { name: 'Technology', icon: Monitor }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated, updateSavedSchemes } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchTerm) params.search = searchTerm;

        const data = await schemesAPI.getAll(params);
        setSchemes(data.schemes);
      } catch (err) {
        setError('Failed to load schemes. Please check your connection.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSchemes, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCategory]);

  const handleSave = async (e, schemeId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: location } });
      return;
    }
    try {
      const data = await schemesAPI.toggleSave(schemeId);
      updateSavedSchemes(data.savedSchemes);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const isSaved = (schemeId) => user?.savedSchemes?.includes(schemeId);

  return (
    <div className="mesh-bg min-h-screen pb-24 transition-colors">
      {/* ─── HEADER SECTION ───────────────────────────────────── */}
      <div className="relative gradient-bg py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Mesh/Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl float-anim-slow" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl float-anim" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Empowering Citizens
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl font-black text-white sm:text-5xl md:text-6xl tracking-tight mb-6 leading-[1.1]"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Find Your <span className="text-white">Future Benefits</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg text-white/80 font-medium max-w-2xl mx-auto mb-10"
          >
            Browse through hundreds of central and state government schemes tailored to your needs.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative group" role="search">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="pl-6 pointer-events-none">
                  <Search className="h-6 w-6 text-orange-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-4 pr-4 py-5 outline-none text-lg text-slate-800 bg-transparent placeholder-slate-400 font-semibold"
                  placeholder="What are you looking for?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search government schemes"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Horizontal Category Chips */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mb-10 pb-4 border-b border-slate-200/50">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              <category.icon className="w-3.5 h-3.5" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <motion.div 
                 key={selectedCategory}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-2 mb-1"
              >
                <span className="w-8 h-1 bg-orange-500 rounded-full" />
                <span className="text-orange-600 font-black text-sm uppercase tracking-widest">
                  {selectedCategory} Schemes
                </span>
              </motion.div>
              <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {searchTerm ? `Searching for "${searchTerm}"` : 'Recommended For You'}
              </h2>
              <p className="text-slate-500 mt-1.5 text-sm font-medium">
                {loading ? 'Curating best schemes...' : `Showing ${schemes.length} active government initiatives`}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
              <button className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <LayoutGrid className="w-4 h-4 " />
              </button>
              <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center gap-4"
            >
              <div className="p-2.5 bg-red-100 rounded-xl">
                 <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-base">{error}</p>
                <p className="text-xs opacity-85 mt-0.5">Please ensure your network connection is stable or server is active.</p>
              </div>
            </motion.div>
          )}

          {/* Schemes Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="skeleton"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 h-[260px] shadow-sm">
                    <div className="shimmer h-full rounded-xl" />
                  </div>
                ))}
              </motion.div>
            ) : schemes.length > 0 ? (
              <motion.div 
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {schemes.map((scheme, index) => {
                  const IconComponent = ICON_MAP[scheme.icon] || Activity;
                  return (
                    <motion.div
                      key={scheme.id}
                      variants={itemVariants}
                      whileHover={{ y: -4, transition: { duration: 0.25 } }}
                      className="scheme-card group flex flex-col p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-[0_16px_36px_-12px_rgba(255,107,74,0.12)] hover:border-orange-200/60"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 rounded-xl bg-orange-50 transition-colors group-hover:bg-orange-500`}>
                          <IconComponent className="w-5 h-5 text-orange-600 transition-colors group-hover:text-white" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isAuthenticated && (
                            <button
                              onClick={(e) => handleSave(e, scheme.id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isSaved(scheme.id) 
                                  ? 'text-orange-600 bg-orange-50' 
                                  : 'text-slate-400 hover:text-orange-500 hover:bg-slate-50'
                              }`}
                              title={isSaved(scheme.id) ? 'Unsave scheme' : 'Save scheme'}
                            >
                              {isSaved(scheme.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                            </button>
                          )}
                          <span className="inline-flex px-2 py-0.5 rounded-md bg-orange-50 border border-orange-100 text-[10px] font-bold text-orange-600 uppercase tracking-wide">
                            {scheme.category}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-orange-600 transition-colors leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {scheme.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex-grow mb-4 leading-relaxed line-clamp-3">
                        {scheme.description}
                      </p>
                      
                      <div className="border-t border-slate-100 pt-3.5 mt-auto">
                        <p className="text-[11px] text-slate-400 mb-3 truncate">
                          <span className="font-semibold text-slate-600">Eligibility:</span> {scheme.eligibility}
                        </p>
                        <Link
                          to={`/scheme/${scheme.id}`}
                          className="btn-light-red w-full py-2.5 rounded-xl text-xs shadow-none hover:shadow-orange-100 hover:bg-orange-50 hover:border-orange-200 font-bold transition-all"
                        >
                          Explore Benefits
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center bg-white/50 backdrop-blur-xl p-14 rounded-3xl border border-slate-200 border-dashed shadow-sm"
              >
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 mb-4 shadow-inner">
                  <Search className="h-8 w-8 text-orange-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>No matches found</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">We couldn't find any schemes matching your filters. Try exploring different categories!</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl font-bold text-sm text-orange-600 bg-white border border-orange-100 hover:bg-orange-50 transition-all shadow-sm active:scale-95"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
