"use client";

import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Send, 
  MessageSquare, 
  Phone, 
  Users, 
  History, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SMSPage() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: string }

  async function handleSend() {
    if (!number || !message) {
      setStatus({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, message }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', text: 'SMS dispatched successfully via Fast2SMS gateway.' });
        setNumber("");
        setMessage("");
      } else {
        setStatus({ type: 'error', text: data.error || 'Failed to dispatch SMS' });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'System error during dispatch' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center shadow-2xl shadow-slate-200">
               <MessageSquare size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display">
                Communication Hub
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Enterprise SMS alerts and real-time client notifications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                <Zap size={14} className="fill-current" />
                API Active
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* SMS Composer */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-100 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <Smartphone size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Broadcast Composer</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="e.g. 9876543210"
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 pl-12 outline-none transition-all font-bold text-slate-700"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Content</label>
                    <textarea 
                      placeholder="Write your alert message here..."
                      rows={6}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-6 outline-none transition-all font-medium text-slate-700 leading-relaxed resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{message.length} / 160 Characters</span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {status && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-4 rounded-2xl flex items-center gap-3 border ${
                          status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                        }`}
                      >
                        {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span className="text-xs font-bold">{status.text}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={handleSend}
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {loading ? "Transmitting..." : "Dispatch SMS Alert"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats/Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-100 border border-slate-50">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Channel Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                      <History size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Dispatched Today</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">124</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Delivery Rate</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">99.2%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center">
                      <Users size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Avg. Recipients</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">1.2k</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-[32px] p-8 shadow-xl shadow-indigo-100 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Pro Tip</p>
                <p className="text-sm font-bold leading-relaxed">
                  Personalize alerts using the [CLIENT_NAME] tag to increase engagement and trust with your borrowers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}