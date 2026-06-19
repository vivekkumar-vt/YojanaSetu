import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/home';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl float-anim-slow" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-600/15 blur-3xl float-anim" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl float-anim-fast" style={{ animationDelay: '1s' }} />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-flex w-16 h-16 rounded-2xl gradient-bg items-center justify-center mb-5 shadow-2xl shadow-indigo-500/40"
            >
              <Landmark className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-orange-400 hover:text-orange-300 transition-colors">
                Register here
              </Link>
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/15 p-8 shadow-2xl shadow-black/40">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="text-left">
                <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="email" name="email" type="email" required
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/20 bg-white/12 text-white px-4 py-3.5 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="text-left">
                <label htmlFor="password" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password" name="password"
                    type={showPassword ? 'text' : 'password'}
                    required value={formData.password} onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-white/20 bg-white/12 text-white px-4 py-3.5 pr-12 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200 transition-colors">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit" disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="w-full flex justify-center items-center gap-2 rounded-2xl gradient-bg px-4 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Sign In Securely
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            Secure login · Your data is always protected
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
