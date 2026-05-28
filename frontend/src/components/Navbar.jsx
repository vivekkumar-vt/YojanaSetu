import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, Search, Home, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'All Schemes', href: '/home', icon: Home },
    { name: 'Find Schemes', href: '/find-schemes', icon: Search },
    { name: 'About', href: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/home' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed w-full z-50 glass-morphism border-b border-white/60 shadow-sm shadow-orange-100/30"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-9 h-9 rounded-xl flex flex-col overflow-hidden shadow-md shadow-orange-300/30 border border-slate-200"
              >
                {/* Saffron band */}
                <div className="h-3 bg-[#FF9933]" />
                {/* White band with Ashoka Chakra */}
                <div className="h-3 bg-white flex items-center justify-center relative">
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-[#000080]" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    {[...Array(24)].map((_, i) => (
                      <line key={i} x1="12" y1="3" x2="12" y2="5.5" transform={`rotate(${i * 15} 12 12)`} strokeWidth="0.7" />
                    ))}
                  </svg>
                </div>
                {/* Green band */}
                <div className="h-3 bg-[#138808]" />
              </motion.div>
              <span className="font-black text-xl tracking-tight text-slate-800" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Yojana&nbsp;<span className="text-gradient">Setu</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-orange-700 bg-orange-50'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/60'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-orange-100/60 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive('/dashboard')
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-black shadow-md shadow-orange-300/30 cursor-pointer"
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </motion.div>
                  <span className="text-sm font-semibold text-slate-700 hidden lg:block max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold rounded-xl text-white gradient-bg shadow-md shadow-orange-300/40 hover:shadow-orange-300/60 hover:opacity-95 transition-all duration-200"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden glass-morphism border-t border-white/60 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive(item.href)
                        ? 'bg-orange-50 text-orange-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-2 border-t border-slate-100 mt-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-3 mt-1">
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold shadow-md">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-base font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center mt-2 px-4 py-3 rounded-xl text-base font-bold text-white gradient-bg shadow-md"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
