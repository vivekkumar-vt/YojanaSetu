import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Eye, EyeOff, UserPlus, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', aadhaar: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
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
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match.'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setIsLoading(true);
    try {
      await register({ name: formData.name, email: formData.email, password: formData.password, aadhaar: formData.aadhaar });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls = 'w-full rounded-2xl border border-white/20 bg-white/12 text-white px-4 py-3.5 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all';

  const perks = ['Free forever', 'Instant matching', 'Secure & private'];

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-3xl float-anim-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-pink-600/15 blur-3xl float-anim" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="dots2" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dots2)" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Logo + heading */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-flex w-16 h-16 rounded-2xl gradient-bg items-center justify-center mb-5 shadow-2xl shadow-indigo-500/40"
            >
              <Landmark className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Create your account</h1>
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="font-bold text-orange-400 hover:text-orange-300 transition-colors">Sign in here</Link>
            </p>
          </div>

          {/* Perks row */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {perks.map(p => (
              <span key={p} className="flex items-center gap-1.5 text-xs font-semibold text-orange-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> {p}
              </span>
            ))}
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
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-left">
                <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={inputCls} />
              </div>

              <div className="text-left">
                <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputCls} />
              </div>

              <div className="text-left">
                <label htmlFor="aadhaar" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Aadhaar Number <span className="text-slate-500 normal-case font-medium">(Optional)</span>
                </label>
                <input id="aadhaar" name="aadhaar" type="text" maxLength={12} value={formData.aadhaar} onChange={handleChange} placeholder="12-digit Aadhaar number" className={inputCls} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div>
                  <label htmlFor="password" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} placeholder="Min. 6 chars" className={`${inputCls} pr-10`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Confirm</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter" className={inputCls} />
                </div>
              </div>

              <motion.button
                type="submit" disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="w-full flex justify-center items-center gap-2 rounded-2xl gradient-bg px-4 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/45 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating Account...</>
                ) : (
                  <><UserPlus className="w-5 h-5" /> Create Account</>
                )}
              </motion.button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-xs text-slate-500">
                By registering, you agree to our{' '}
                <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Privacy Policy</a>
              </p>
            </div>

            <div className="mt-5 pt-5 border-t border-white/10 text-center">
              <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">← Back to Home</Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Secure registration · Your data is always protected
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
