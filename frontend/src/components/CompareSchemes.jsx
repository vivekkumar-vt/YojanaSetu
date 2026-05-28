import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Info, FileText, IndianRupee, Sparkles, AlertCircle, ChevronRight, Trophy } from 'lucide-react';

const CompareSchemes = ({ schemes, onClose, onRemove }) => {
    if (schemes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-[3rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── HEADER ─────────────────────────────────────────── */}
        <div className="p-8 lg:p-12 pb-8 gradient-bg text-white relative overflow-hidden flex-shrink-0">
           {/* Background Mesh Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
             <Sparkles className="absolute -top-10 -right-10 w-48 h-48 rotate-12" />
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <Trophy className="w-6 h-6 text-yellow-300" />
                 <span className="text-xs font-black uppercase tracking-widest text-white/70">Scheme Comparison</span>
              </div>
              <h2 className="text-4xl font-black mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Side-by-Side Analysis</h2>
              <p className="text-white/80 font-medium text-lg">Comparing {schemes.length} of 3 active government initiatives</p>
            </div>
            <button 
              onClick={onClose}
              className="w-14 h-14 rounded-2xl bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center border border-white/30 active:scale-95"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* ─── CONTENT ────────────────────────────────────────── */}
        <div className="overflow-auto p-2 sm:p-8 lg:p-12 pt-0 flex-1 no-scrollbar">
          <table className="w-full border-separate border-spacing-x-4 border-spacing-y-0 min-w-[900px]">
            <thead>
              <tr className="sticky top-0 z-20">
                <th className="p-6 text-left w-56 bg-white/80 backdrop-blur-md rounded-t-[2.5rem]"></th>
                {schemes.map((scheme) => (
                  <th key={scheme.id} className="p-6 text-left bg-white/80 backdrop-blur-md relative first:rounded-tl-[2.5rem] last:rounded-tr-[2.5rem] border-b-2 border-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge badge-primary px-3 py-1.5 uppercase font-black tracking-tighter shadow-sm">
                        {scheme.category}
                      </span>
                      <button 
                        onClick={() => onRemove(scheme.id)}
                        className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:text-red-500 hover:bg-red-100 transition-all shadow-sm active:scale-90"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{scheme.title}</h3>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full gradient-bg" />
                    </div>
                  </th>
                ))}
                {/* Empty placeholders */}
                {[...Array(Math.max(0, 3 - schemes.length))].map((_, i) => (
                  <th key={`empty-${i}`} className="p-6 bg-slate-50/50 rounded-t-[2.5rem] border border-dashed border-slate-200">
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 italic py-10 opacity-60">
                      <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-200 mb-4 flex items-center justify-center font-black">?</div>
                      <span className="text-xs font-black uppercase tracking-widest leading-none">Slot Open</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {/* Features Row */}
              <tr>
                <td className="p-10 font-black text-xs uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50/30 rounded-l-[1.5rem]">
                   Key Benefits
                </td>
                {schemes.map((scheme) => (
                  <td key={scheme.id} className="p-8 align-top bg-white transition-colors hover:bg-slate-50/30">
                    <ul className="space-y-4">
                      {scheme.benefits?.slice(0, 4).map((benefit, i) => (
                        <li key={i} className="text-sm font-bold text-slate-600 flex items-start gap-3 group">
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 p-1 bg-emerald-50 rounded-lg group-hover:scale-110 transition-transform" />
                          <span className="leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
                {[...Array(Math.max(0, 3 - schemes.length))].map((_, i) => <td key={i} className="p-8 bg-slate-50/20" />)}
              </tr>

              {/* Eligibility Row */}
              <tr>
                <td className="p-10 font-black text-xs uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50/30 rounded-l-[1.5rem]">
                   Eligibility
                </td>
                {schemes.map((scheme) => (
                  <td key={scheme.id} className="p-8 align-top bg-white transition-colors hover:bg-slate-50/30">
                    <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100/30 border-dashed">
                       <p className="text-sm font-black text-indigo-900 leading-relaxed italic">
                         "{scheme.eligibility}"
                       </p>
                    </div>
                  </td>
                ))}
                {[...Array(Math.max(0, 3 - schemes.length))].map((_, i) => <td key={i} className="p-8 bg-slate-50/20" />)}
              </tr>

              {/* Documents Row */}
              <tr>
                <td className="p-10 font-black text-xs uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50/30 rounded-l-[1.5rem]">
                   Required
                </td>
                {schemes.map((scheme) => (
                  <td key={scheme.id} className="p-8 align-top bg-white transition-colors hover:bg-slate-50/30">
                    <div className="flex flex-wrap gap-2">
                      {scheme.documents?.map((doc, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl font-black uppercase tracking-tight shadow-sm flex items-center gap-1">
                          <FileText className="w-3 h-3 opacity-40 " /> {doc}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
                {[...Array(Math.max(0, 3 - schemes.length))].map((_, i) => <td key={i} className="p-8 bg-slate-50/20" />)}
              </tr>

              {/* Income Limit */}
              <tr>
                <td className="p-10 font-black text-xs uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50/30 rounded-bl-[1.5rem]">
                   Criteria
                </td>
                {schemes.map((scheme) => (
                  <td key={scheme.id} className="p-8 bg-white transition-colors hover:bg-slate-50/30 last:rounded-br-[1.5rem]">
                    <div className="flex items-center gap-2">
                       <IndianRupee className="w-5 h-5 text-indigo-500 shadow-sm" />
                       <span className="text-base font-black text-slate-900">
                         {scheme.criteria?.incomeMax ? `Up to ₹${scheme.criteria.incomeMax.toLocaleString('en-IN')}` : 'No Limit'}
                       </span>
                    </div>
                  </td>
                ))}
                {[...Array(Math.max(0, 3 - schemes.length))].map((_, i) => <td key={i} className="p-8 bg-slate-50/20" />)}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ─── FOOTER ─────────────────────────────────────────── */}
        <div className="p-8 lg:p-12 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 flex-shrink-0">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse " />
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Realtime Data</span>
              </div>
              <div className="flex items-center gap-2">
                 <AlertCircle className="w-4 h-4 text-amber-500" />
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Always Verify Locally</span>
              </div>
           </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="px-10 py-5 rounded-[2rem] font-black text-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
            >
              Close Viewer
            </button>
            <button className="px-10 py-5 rounded-[2rem] font-black text-lg gradient-bg text-white shadow-xl shadow-indigo-300/40 hover:shadow-indigo-400/60 active:scale-95 transition-all">
               Download Report
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompareSchemes;
