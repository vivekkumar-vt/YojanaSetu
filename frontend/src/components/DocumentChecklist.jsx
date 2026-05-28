import { useState, useEffect } from 'react';
import { FileText, CheckCircle2, Circle, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DocumentChecklist = ({ schemeId, documents = [] }) => {
  const [completedDocs, setCompletedDocs] = useState([]);
  const storageKey = `yojana_docs_${schemeId}`;

  useEffect(() => {
    // Always start at 0% — do not restore from saved state
    setCompletedDocs([]);
    localStorage.removeItem(storageKey);
  }, [schemeId]);

  const toggleDoc = (doc) => {
    const newCompleted = completedDocs.includes(doc)
      ? completedDocs.filter((d) => d !== doc)
      : [...completedDocs, doc];
    
    setCompletedDocs(newCompleted);
    localStorage.setItem(storageKey, JSON.stringify(newCompleted));
  };

  const progress = documents.length > 0 
    ? Math.round((completedDocs.length / documents.length) * 100) 
    : 0;

  return (
    <div className="glass-card rounded-[2.5rem] p-8 lg:p-10 shadow-xl border-white/60 relative overflow-hidden group/card transition-colors">
       <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover/card:scale-110 transition-transform">
          <FileText className="w-24 h-24" />
       </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600/60">Preparation Tracking</span>
           </div>
           <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
             Document Checklist
           </h2>
        </div>
        <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
          <span className="text-xl font-black text-orange-600" style={{ fontFamily: 'Outfit, sans-serif' }}>{progress}% <span className="text-xs uppercase tracking-widest text-orange-400">Ready</span></span>
          <div className="w-32 h-2.5 bg-slate-100 rounded-full mt-2 overflow-hidden shadow-inner border border-slate-200/50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full gradient-bg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 relative z-10">
        {documents.map((doc, i) => {
          const isDone = completedDocs.includes(doc);
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleDoc(doc)}
              className={`flex items-center gap-4 px-6 py-5 rounded-[1.5rem] border transition-all text-left group/item ${
                isDone 
                  ? 'bg-emerald-50/50 border-emerald-100/50 text-emerald-800' 
                  : 'bg-white border-slate-100 text-slate-700 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all ${
                 isDone ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 text-slate-300 group-hover/item:text-orange-400 group-hover/item:bg-orange-50'
              }`}>
                {isDone ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" strokeWidth={2.5} />
                )}
              </div>
              <span className={`text-base font-bold leading-tight ${isDone ? 'line-through opacity-60' : ''}`}>
                {doc}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-10 p-6 bg-emerald-600 rounded-[2rem] flex items-center gap-4 text-white shadow-xl shadow-emerald-600/30 border-2 border-emerald-400/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
               <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
               <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-0.5">Perfect!</p>
               <p className="text-sm font-bold leading-relaxed">You have all the required documents. You are ready to apply for this scheme!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentChecklist;
