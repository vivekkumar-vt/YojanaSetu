import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="mesh-bg min-h-screen overflow-hidden">
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl float-anim-slow" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-pink-200/25 blur-3xl float-anim" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm mb-8 hover:text-indigo-800 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            {/* Demo disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 mb-8 flex items-start gap-3">
              <span className="text-amber-500 text-lg mt-0.5">⚠️</span>
              <p className="text-sm text-amber-800 font-medium">
                This is a <strong>demo project</strong> and not affiliated with any government body. The following terms are sample placeholders.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <FileText className="w-7 h-7 text-indigo-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Terms of Service
              </h1>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-50 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Acceptance of Terms</h2>
                <p className="text-slate-600 leading-relaxed">
                  By using Yojana Setu, you acknowledge that this is a demonstration project created for educational and portfolio purposes. It is not a government service and does not process real applications for government schemes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Use of the Platform</h2>
                <p className="text-slate-600 leading-relaxed">
                  The scheme information displayed is sourced from publicly available government data and is provided for reference only. For official and up-to-date information, please visit the respective government portals linked within each scheme's details.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Disclaimer</h2>
                <p className="text-slate-600 leading-relaxed">
                  Yojana Setu makes no guarantees about the accuracy, completeness, or timeliness of the scheme information displayed. Users should verify all details with official government sources before making any decisions based on the information presented here.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Limitation of Liability</h2>
                <p className="text-slate-600 leading-relaxed">
                  This demo platform is provided "as-is" without any warranties. The creators shall not be liable for any damages arising from the use of this platform or reliance on information presented within it.
                </p>
              </div>

              <p className="text-sm text-slate-400 pt-4 border-t border-slate-100">
                Last updated: April 2026 · Sample document for demonstration purposes only.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
