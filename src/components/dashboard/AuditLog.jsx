"use client";

import { Shield, User, Globe, History } from "lucide-react";

export default function AuditLog({ logs }) {
  return (
    <div className="premium-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
            <Shield size={18} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">System Audit</h3>
        </div>
        <History size={16} className="text-slate-400" />
      </div>

      <div className="space-y-4">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 relative pb-4 border-b border-slate-50 last:border-0 last:pb-0">
            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
              log.severity === 'high' ? 'bg-rose-500' : 
              log.severity === 'medium' ? 'bg-amber-500' : 'bg-indigo-500'
            }`} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold text-slate-800 truncate">{log.action}</p>
                <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{log.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">{log.details}</p>
              
              <div className="flex items-center gap-3 mt-2">
                 <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                   <User size={10} /> {log.user}
                 </div>
                 <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                   <Globe size={10} /> {log.ip}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
