import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Loader2, Minimize2, ExternalLink, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { chatbotAPI } from '../api';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! I'm Yojana Setu Assistant. How can I help you find the right government schemes today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const data = await chatbotAPI.sendMessage(input);
      const botMessage = { 
        id: Date.now() + 1, 
        text: data.reply, 
        sender: 'bot',
        schemes: data.schemes 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Sorry, I'm having trouble connecting. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="glass-card rounded-[2.5rem] shadow-2xl w-[380px] sm:w-[420px] h-[600px] flex flex-col overflow-hidden mb-6 transition-all border-white/40"
          >
            {/* Header */}
            <div className="gradient-bg p-6 flex items-center justify-between text-white relative overflow-hidden">
               {/* Decorative dots */}
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <Sparkles className="w-20 h-20" />
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/80 font-black uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-xl transition-colors relative z-10"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 no-scrollbar">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${msg.sender === 'user' ? 'gradient-bg text-white' : 'bg-white text-indigo-500 border border-indigo-50'}`}>
                      {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className="space-y-3">
                      <div className={`px-5 py-4 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm ${
                        msg.sender === 'user' 
                          ? 'gradient-bg text-white rounded-tr-none' 
                          : 'bg-white text-slate-700 border border-slate-100/50 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      
                      {msg.schemes && msg.schemes.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col gap-3 mt-3 px-1"
                        >
                          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                            <TrendingUp className="w-3 h-3" /> Top Matches for you
                          </p>
                          {msg.schemes.map(scheme => (
                            <Link 
                              key={scheme.id}
                              to={`/scheme/${scheme.id}`}
                              className="bg-white p-4 rounded-2xl border border-indigo-50 hover:border-indigo-200 hover:shadow-md transition-all group"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{scheme.title}</span>
                                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-[9px] text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-black uppercase tracking-tighter shadow-sm">{scheme.category}</span>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-9 h-9 rounded-2xl bg-white text-indigo-500 border border-indigo-50 flex items-center justify-center shadow-sm">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-white px-6 py-4 rounded-3xl rounded-tl-none border border-slate-100 flex items-center gap-3 shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                      <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Assistant is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-slate-100">
               <form onSubmit={handleSend} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                  <div className="relative bg-slate-50 rounded-[1.5rem] flex items-center px-5 py-2 border border-slate-100 focus-within:bg-white focus-within:border-indigo-200 transition-all">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent text-slate-800 border-none focus:ring-0 text-sm py-3 font-semibold placeholder-slate-400"
                    />
                    <button 
                      type="submit" 
                      disabled={!input.trim() || loading}
                      className="p-3 ml-3 rounded-2xl gradient-bg text-white shadow-lg shadow-indigo-300/30 hover:shadow-indigo-400/50 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:scale-95 disabled:hover:translate-y-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
               </form>
               <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Yojana Setu AI
                  </span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 rounded-[2rem] gradient-bg shadow-[0_20px_50px_rgba(99,102,241,0.4)] flex items-center justify-center text-white ring-4 ring-white transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="w-8 h-8 relative z-10" />
        ) : (
          <div className="relative w-10 h-10 flex items-center justify-center">
             <MessageCircle className="w-10 h-10 group-hover:rotate-12 transition-transform relative z-10" />
             <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 bg-white/30 rounded-full" 
             />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
