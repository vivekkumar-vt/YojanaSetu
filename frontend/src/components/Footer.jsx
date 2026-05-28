import { Landmark, MessageSquare, Share2, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE } from '../siteConfig';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10 relative overflow-hidden" role="contentinfo">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5" aria-hidden="true">
         <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500 rounded-full blur-[100px]" />
         <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 transition-transform group-hover:scale-110 duration-300">
                <Landmark className="h-7 w-7 text-white" />
              </div>
              <span className="font-black text-2xl text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                 Yojana Setu
              </span>
            </Link>
            <p className="text-slate-400 mb-4 max-w-sm text-lg leading-relaxed font-medium">
              A comprehensive digital bridge connecting citizens to government opportunities, empowering lives through accessible welfare.
            </p>
            {/* Demo disclaimer */}
            <p className="text-xs text-slate-500 mb-8 max-w-sm font-medium italic">
              {SITE.demoBanner}
            </p>
            <div className="flex space-x-4">
              <button
                aria-label="Community chat"
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                aria-label="Share this platform"
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
              >
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                aria-label="Visit our website"
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
              >
                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          <div>
             <h3 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-6">Navigation</h3>
             <ul className="space-y-4">
              <li>
                <Link to="/home" className="text-slate-400 hover:text-orange-400 font-bold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-orange-400 font-bold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-slate-400 hover:text-orange-400 font-bold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Citizen Login
                </Link>
              </li>
              <li>
                <Link to="/find-schemes" className="text-slate-400 hover:text-orange-400 font-bold transition-colors flex items-center gap-2 group">
                   <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Smart Search
                </Link>
              </li>
            </ul>
          </div>


        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
             <p className="text-sm text-slate-500 font-bold">
               &copy; {new Date().getFullYear()} Yojana Setu Platform
             </p>
             <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Secure Portal</span>
             </div>
          </div>
          <nav className="flex space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-600" aria-label="Legal pages">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-orange-500" /> Accessibility</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
