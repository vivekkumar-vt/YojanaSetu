import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Calculator, User, MapPin, IndianRupee, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

const INDIAN_STATES = [
  "Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar",
  "Chandigarh","Chhattisgarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka",
  "Kerala","Ladakh","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya",
  "Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
];

const steps = [
  { icon: User, label: 'Fill your profile', color: 'text-orange-600', bg: 'bg-orange-50 border border-orange-100' },
  { icon: Search, label: 'We match schemes', color: 'text-orange-500', bg: 'bg-orange-50/60 border border-orange-100/50' },
  { icon: CheckCircle2, label: 'Apply & benefit', color: 'text-emerald-600', bg: 'bg-emerald-50 border border-emerald-100' },
];

const FIELDS = [
  { key: 'age', label: 'Age', placeholder: 'Enter your age', icon: Calculator, type: 'number', span: 1 },
  { key: 'gender', label: 'Gender', icon: User, type: 'select', options: ['Male','Female','Other'], span: 1 },
  { key: 'income', label: 'Annual Income (₹)', placeholder: 'e.g. 250000', icon: IndianRupee, type: 'number', span: 2 },
  { key: 'stateLocation', label: 'State / Location', icon: MapPin, type: 'state', span: 2 },
  { key: 'maritalStatus', label: 'Marital Status', icon: Heart, type: 'select', options: ['Single','Married','Widowed'], optionLabels: ['Single / Unmarried','Married','Widowed'], span: 1 },
];

const FindSchemes = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ age: '', gender: '', stateLocation: '', income: '', maritalStatus: '' });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.age || isNaN(parseInt(formData.age)) || parseInt(formData.age) < 0) newErrors.age = 'Please enter a valid age';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.income || isNaN(parseInt(formData.income)) || parseInt(formData.income) < 0) newErrors.income = 'Please enter a valid income';
    if (!formData.stateLocation) newErrors.stateLocation = 'Please select your state';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Please select your marital status';
    return newErrors;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    const params = new URLSearchParams({
      age: formData.age, gender: formData.gender,
      income: formData.income, state: formData.stateLocation, marital: formData.maritalStatus,
    });
    navigate(`/results?${params.toString()}`);
  };

  const inputBase = 'w-full rounded-xl px-4 py-3 text-slate-800 outline-none transition-all duration-200 border-2 text-sm font-medium bg-slate-50/40';
  const inputNormal = 'border-slate-200 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,74,0.08)]';
  const inputError = 'border-red-305 bg-red-50/60 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]';
  const getInputClass = (field) => `${inputBase} ${errors[field] ? inputError : inputNormal}`;

  const completedFields = Object.values(formData).filter(Boolean).length;
  const progress = (completedFields / 5) * 100;

  return (
    <div className="mesh-bg min-h-screen overflow-hidden">

      {/* ─── HEADER ───────────────────────────────────────── */}
      <section className="relative pt-16 pb-8 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-orange-200/20 blur-3xl float-anim-slow" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-200/15 blur-3xl float-anim" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center pt-6">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-primary mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" /> Smart Matching
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Find <span className="text-gradient">Matching Schemes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-slate-500 max-w-md mx-auto"
          >
            Fill in your details and we'll suggest the best government schemes perfectly matched to you.
          </motion.p>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 sm:gap-6 mt-6 flex-wrap"
          >
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${step.bg}`}>
                  <step.icon className={`w-3.5 h-3.5 ${step.color}`} />
                  <span className={`text-[11px] font-bold ${step.color}`}>{step.label}</span>
                </div>
                {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-300 hidden sm:block" />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FORM ─────────────────────────────────────────── */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden"
          >
            {/* Progress bar */}
            <div className="h-1.5 bg-slate-100">
              <motion.div
                className="h-full gradient-bg rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>

            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-orange-300/30">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Your Profile</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {completedFields} of 5 fields completed
                  </p>
                </div>
                {completedFields === 5 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="ml-auto"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleSearch} noValidate className="space-y-4">

                {/* Age + Gender row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Age */}
                  <div className="text-left">
                    <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                      <Calculator className="w-3.5 h-3.5 text-orange-400" /> Age <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number" name="age" min="0" max="120"
                      value={formData.age} onChange={handleInputChange}
                      onFocus={() => setFocusedField('age')} onBlur={() => setFocusedField(null)}
                      placeholder="Your age"
                      className={getInputClass('age')}
                    />
                    <AnimatePresence>
                      {errors.age && (
                        <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 text-xs text-red-500 font-medium">{errors.age}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Gender */}
                  <div className="text-left">
                    <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                      <User className="w-3.5 h-3.5 text-orange-400" /> Gender <span className="text-red-400">*</span>
                    </label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className={getInputClass('gender')}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <AnimatePresence>
                      {errors.gender && (
                        <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 text-xs text-red-500 font-medium">{errors.gender}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Income */}
                <div className="text-left">
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-orange-400" /> Annual Income (₹) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number" name="income" min="0"
                      value={formData.income} onChange={handleInputChange}
                      placeholder="0"
                      className={`${getInputClass('income')} pl-8`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.income && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 text-xs text-red-500 font-medium">{errors.income}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* State */}
                <div className="text-left">
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" /> State / Location <span className="text-red-400">*</span>
                  </label>
                  <select name="stateLocation" value={formData.stateLocation} onChange={handleInputChange} className={getInputClass('stateLocation')}>
                    <option value="">Select your state</option>
                    {INDIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.stateLocation && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 text-xs text-red-500 font-medium">{errors.stateLocation}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Marital Status */}
                <div className="text-left">
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                    <Heart className="w-3.5 h-3.5 text-orange-400" /> Marital Status <span className="text-red-400">*</span>
                  </label>
                  <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className={getInputClass('maritalStatus')}>
                    <option value="">Select status</option>
                    <option value="Single">Single / Unmarried</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  <AnimatePresence>
                    {errors.maritalStatus && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 text-xs text-red-500 font-medium">{errors.maritalStatus}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary text-sm py-3.5 mt-4 rounded-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  Find Matching Schemes
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-slate-400 mt-6"
          >
            🔒 Your data is anonymous and secure. We never share personal information.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default FindSchemes;
