import { FileText, CheckCircle2 } from 'lucide-react';

const DocumentChecklist = ({ documents = [] }) => {
  if (!documents || documents.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-left">
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
          <FileText className="w-4.5 h-4.5 text-orange-500" />
        </div>
        <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Required Documents
        </h3>
      </div>
      <ul className="space-y-2.5">
        {documents.map((doc, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>{doc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentChecklist;
