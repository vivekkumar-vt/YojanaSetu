import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
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
                This is a <strong>demo project</strong> and not affiliated with any government body. The following privacy policy is a sample placeholder.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-indigo-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Privacy Policy
              </h1>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-50 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Information We Collect</h2>
                <p className="text-slate-600 leading-relaxed">
                  In this demo application, user data is stored locally in your browser's localStorage. No personal information is transmitted to any external server. The profile data you enter (age, gender, income, state, marital status) is used solely to match you with relevant government schemes within this demo.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Data Storage</h2>
                <p className="text-slate-600 leading-relaxed">
                  All data is stored in your browser's localStorage and can be cleared at any time by clearing your browser data. No cookies or tracking technologies are used beyond basic visitor counting stored locally.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Third-Party Services</h2>
                <p className="text-slate-600 leading-relaxed">
                  This demo does not integrate with any third-party analytics, advertising, or data-processing services. External links to official government scheme websites are provided for reference only.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2>
                <p className="text-slate-600 leading-relaxed">
                  For questions about this demo project, you can reach out via the contact information provided in the footer. This is not a government service.
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

export default Privacy;
