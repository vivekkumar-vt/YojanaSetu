import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccessibilityPage = () => {
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
                This is a <strong>demo project</strong> and not affiliated with any government body. The following accessibility statement is a sample placeholder.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-indigo-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Accessibility
              </h1>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-50 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Our Commitment</h2>
                <p className="text-slate-600 leading-relaxed">
                  Yojana Setu is committed to ensuring digital accessibility for people of all abilities. We strive to continually improve the user experience for everyone and apply relevant accessibility standards.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Accessibility Features</h2>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <span>Semantic HTML5 elements for proper document structure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <span>ARIA labels on interactive elements and navigation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <span>Keyboard-navigable interface components</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <span>Responsive design that adapts to different screen sizes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <span>Sufficient color contrast ratios for text readability</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Feedback</h2>
                <p className="text-slate-600 leading-relaxed">
                  We welcome your feedback on the accessibility of Yojana Setu. If you encounter any accessibility barriers or have suggestions for improvement, please contact us using the information provided in the footer.
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

export default AccessibilityPage;
