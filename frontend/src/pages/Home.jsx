import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, ArrowRight, ChevronRight, Bookmark, BookmarkCheck, Sparkles, SlidersHorizontal, LayoutGrid } from 'lucide-react';
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ─── SIDEBAR / CATEGORIES ────────────────────────────── */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-3xl p-6 sticky top-24 shadow-xl border border-white/50"
            >
              <h3 className="font-black text-slate-900 text-xl flex items-center gap-2 mb-8 uppercase tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                 Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-5 py-4 rounded-2xl transition-all font-bold flex items-center gap-3 group relative overflow-hidden ${
                      selectedCategory === category.name
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                        : 'text-slate-600 hover:bg-white hover:text-orange-600 hover:shadow-md'
                    }`}
                  >
                    <category.icon className={`w-5 h-5 ${selectedCategory === category.name ? 'text-white' : 'text-orange-400 group-hover:text-orange-600'}`} />
                    <span className="relative z-10 text-sm">{category.name}</span>
                    {selectedCategory === category.name && (
                      <motion.div layoutId="active-cat" className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 -z-0" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── MAIN CONTENT ────────────────────────────────────── */}
          <div className="flex-1">
            
            {/* Mobile Categories Scroll */}
            <div className="lg:hidden flex overflow-x-auto pb-4 gap-3 no-scrollbar mb-8 -mx-4 px-4">
               {CATEGORIES.map(category => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`whitespace-nowrap px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-sm ${
                      selectedCategory === category.name
                        ? 'bg-orange-600 text-white shadow-orange-200'
                        : 'bg-white text-slate-600 border border-slate-100 hover:border-orange-200'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </button>
                ))}
            </div>

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
                <h2 className="text-3xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {searchTerm ? `Searching for "${searchTerm}"` : 'Recommended For You'}
                </h2>
                <p className="text-slate-500 mt-2 font-medium">
                  {loading ? 'Curating best schemes...' : `Showing ${schemes.length} active government initiatives`}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                <button className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                  <LayoutGrid className="w-5 h-5 " />
                </button>
                <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-100 text-red-700 px-8 py-6 rounded-3xl mb-8 flex items-center gap-4"
              >
                <div className="p-3 bg-red-100 rounded-2xl">
                   <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{error}</p>
                  <p className="text-sm opacity-80 mt-1">Please ensure your network connection is stable or server is active.</p>
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-[2rem] shadow-xl border border-slate-50 p-8 h-[320px]">
                      <div className="shimmer h-full rounded-3xl" />
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {schemes.map((scheme, index) => {
                    const IconComponent = ICON_MAP[scheme.icon] || Activity;
                    return (
                      <motion.div
                        key={scheme.id}
                        variants={itemVariants}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className="scheme-card group flex flex-col p-8 bg-white border border-slate-100/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.2)]"
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-4 rounded-2xl bg-orange-50 transition-colors group-hover:bg-orange-600`}>
                            <IconComponent className="w-7 h-7 text-orange-600 transition-colors group-hover:text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            {isAuthenticated && (
                              <button
                                onClick={(e) => handleSave(e, scheme.id)}
                                className={`p-3 rounded-2xl transition-all duration-300 ${
                                  isSaved(scheme.id) 
                                    ? 'text-orange-600 bg-orange-50 translate-x-0' 
                                    : 'text-slate-400 hover:text-orange-600 hover:bg-orange-50'
                                }`}
                                title={isSaved(scheme.id) ? 'Unsave scheme' : 'Save scheme'}
                              >
                                {isSaved(scheme.id) ? <BookmarkCheck className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
                              </button>
                            )}
                            <span className="badge badge-primary px-4 py-2">
                              {scheme.category}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-orange-700 transition-colors leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {scheme.title}
                        </h3>
                        <p className="text-slate-500 flex-grow mb-6 text-base leading-relaxed line-clamp-3">
                          {scheme.description}
                        </p>
                        
                        <div className="border-t border-slate-50 pt-6 mt-auto">
                          <div className="flex items-center gap-2 mb-6 p-3 bg-slate-50 rounded-2xl">
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest pl-2">For</span>
                            <span className="text-sm font-bold text-slate-700 truncate">{scheme.eligibility}</span>
                          </div>
                          <Link
                            to={`/scheme/${scheme.id}`}
                            className="btn-light-red w-full py-4 rounded-2xl shadow-none hover:shadow-red-200"
                          >
                            Explore Benefits
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
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
                  className="text-center bg-white/50 backdrop-blur-xl p-20 rounded-[3rem] border border-white border-dashed shadow-sm"
                >
                   <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 mb-6 shadow-inner">
                    <Search className="h-10 w-10 text-orange-300" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>No matches found</h3>
                  <p className="text-slate-500 max-w-sm mx-auto mb-10 text-lg">We couldn't find any schemes matching your filters. Try exploring different categories!</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-orange-600 bg-white border-2 border-orange-100 hover:bg-orange-50 transition-all shadow-md active:scale-95"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
