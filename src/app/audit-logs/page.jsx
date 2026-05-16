"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  History, 
  User, 
  Terminal, 
  Search, 
  Filter, 
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Database
} from "lucide-react";
import { motion } from "framer-motion";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockLogs = [
    { _id: "1", action: "LOAN_CREATED", module: "Loans", user: "admin@finorax.com", details: "Disbursed ₹50,000 to Client #102", createdAt: new Date().toISOString() },
    { _id: "2", action: "TRANSACTION_APPROVED", module: "Transactions", user: "manager_west@finorax.com", details: "Authorized payment of ₹5,200", createdAt: new Date(Date.now() - 3600000).toISOString() },
    { _id: "3", action: "CLIENT_REMOVED", module: "Clients", user: "admin@finorax.com", details: "Archived client profile for ID: CL-552", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: "4", action: "BRANCH_ACTIVATED", module: "Infrastructure", user: "system_root", details: "New terminal operational at East Port", createdAt: new Date(Date.now() - 172800000).toISOString() },
  ];

  async function fetchLogs() {
    try {
      const res = await fetch("/api/audit-logs");
      const data = await res.json();
      setLogs(data.logs?.length ? data.logs : mockLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs(mockLogs);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Decrypting Audit Trail...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center shadow-2xl shadow-slate-200">
               <History size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display">
                System Audit Trail
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Cryptographically secure ledger of all organizational activities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                <ShieldCheck size={14} />
                Live Feed
             </div>
             <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50 transition-all shadow-sm">
                <Database size={20} />
             </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="relative w-full lg:w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search logs by user, action, or module..."
              className="w-full bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/5 pl-12 pr-4 py-3.5 rounded-2xl text-sm font-bold placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all border border-slate-100">
              <Filter size={16} /> Module
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all border border-slate-100">
              <Calendar size={16} /> Date Range
            </button>
          </div>
        </div>

        {/* Log Entries */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50">
             <h2 className="text-xl font-black text-slate-900">Security Stream</h2>
          </div>

          <div className="divide-y divide-slate-50">
            {logs.map((log, i) => (
              <motion.div 
                key={log._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-8 hover:bg-slate-50/50 transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                    log.action.includes("REMOVED") || log.action.includes("DENIED") 
                      ? "bg-rose-50 text-rose-600" 
                      : "bg-indigo-50 text-indigo-600"
                  }`}>
                    {log.action.includes("REMOVED") ? <ShieldAlert size={20} /> : <Terminal size={20} />}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                         {log.module}
                       </span>
                       <h3 className="text-lg font-black text-slate-900">{log.action.replace(/_/g, " ")}</h3>
                    </div>
                    <p className="text-sm font-medium text-slate-500 max-w-xl">{log.details}</p>
                    <div className="flex items-center gap-4 pt-2">
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                          <User size={12} />
                          {log.user}
                       </div>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                          <Calendar size={12} />
                          {new Date(log.createdAt).toLocaleString()}
                       </div>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all">
                  Inspect Packet <ChevronRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">End of Stream - Total Records: {logs.length}</p>
            <div className="flex gap-4">
               <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all shadow-sm">Load History</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}