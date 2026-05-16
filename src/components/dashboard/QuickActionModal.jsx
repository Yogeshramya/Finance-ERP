"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, FilePlus, ArrowUpRight, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";

export default function QuickActionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-modal rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.2)] overflow-hidden border border-white/50"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">Quick Actions</h2>
              <p className="text-sm text-slate-500 font-medium">Streamlined enterprise workflows</p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-rose-500 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Grid Actions */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: UserPlus, title: "Client Onboarding", desc: "Register a new borrower profile", color: "indigo" },
              { icon: FilePlus, title: "New Loan Request", desc: "Create a disbursement application", color: "emerald" },
              { icon: CreditCard, title: "Post Transaction", desc: "Record manual collection or fee", color: "amber" },
              { icon: ShieldCheck, title: "KYC Verification", desc: "Upload and verify identity docs", color: "blue" },
            ].map((action, i) => (
              <button 
                key={i}
                className="group flex items-start gap-4 p-5 bg-slate-50/50 hover:bg-white rounded-3xl border border-transparent hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all text-left"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                   <action.icon size={24} className={`text-${action.color}-500`} />
                </div>
                <div className="flex-1">
                   <p className="text-sm font-bold text-slate-800">{action.title}</p>
                   <p className="text-xs text-slate-500 mt-1">{action.desc}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 mt-1 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active System Status</span>
             </div>
             <button className="text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
               Advanced Settings
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
