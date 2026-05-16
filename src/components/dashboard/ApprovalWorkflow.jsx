"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, User, ShieldCheck } from "lucide-react";

export default function ApprovalWorkflow({ approvals }) {
  return (
    <div className="premium-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Approvals</h3>
          <p className="text-[10px] text-slate-500 font-medium">Pending verification</p>
        </div>
        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">
          {approvals.length} Requests
        </span>
      </div>

      <div className="space-y-3">
        {approvals.map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.client}</p>
                  <p className="text-[10px] text-slate-500">${item.amount.toLocaleString()} • {item.type}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold text-[10px] hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all">
                Approve
              </button>
              <button className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold text-[10px] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
