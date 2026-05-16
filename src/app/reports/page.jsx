"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPdf";
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  Search,
  BarChart4,
  ArrowUpRight,
  Layers,
  Activity,
  ArrowDownCircle,
  TrendingUp,
  PieChart
} from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const reportData = transactions.map((transaction) => ({
    type: transaction.type,
    amount: transaction.amount,
    status: transaction.status,
    client: transaction.clientId?.name || "N/A",
    branch: transaction.branchId?.name || "N/A",
    date: new Date(transaction.createdAt).toLocaleDateString(),
  }));

  const totalValue = transactions.reduce((acc, t) => acc + (t.amount || 0), 0);

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Analyzing Intelligence...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header Hero Section */}
        <div className="bg-slate-950 p-12 rounded-3xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full -mr-32 -mt-32 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                  <BarChart4 size={20} className="text-indigo-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Analytics Engine v4.0</span>
              </div>
              <h1 className="text-5xl font-black text-white tracking-tight font-display">
                Financial Intelligence
              </h1>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Enterprise reporting with deep-dive analytics and cross-branch data transparency.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => exportToExcel(reportData, "FinoraX_Full_Report")}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/10 px-8 py-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 group/btn"
              >
                <FileSpreadsheet size={18} className="text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                Excel Export
              </button>

              <button
                onClick={() => exportToPDF(reportData, "FinoraX_Full_Report")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3 group/btn"
              >
                <FileText size={18} className="group-hover/btn:scale-110 transition-transform" />
                PDF Report
              </button>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Transaction Value</p>
              <h3 className="text-3xl font-black text-slate-900">₹{(totalValue / 100000).toFixed(1)}L</h3>
           </div>

           <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Activity size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Operations</p>
              <h3 className="text-3xl font-black text-slate-900">{transactions.length}</h3>
           </div>

           <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <PieChart size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Branch Coverage</p>
              <h3 className="text-3xl font-black text-slate-900">100%</h3>
           </div>

           <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
                <ArrowDownCircle size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Exposure</p>
              <h3 className="text-3xl font-black text-slate-900">Minimal</h3>
           </div>
        </div>

        {/* Data Filtering & Search */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="relative w-full lg:w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Query reports database..."
              className="w-full bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/5 pl-12 pr-4 py-3.5 rounded-2xl text-sm font-bold placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all border border-slate-100">
              <Filter size={16} /> Filter
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all border border-slate-100">
              <Calendar size={16} /> Period
            </button>
            <div className="h-10 w-px bg-slate-100 mx-2 hidden lg:block" />
            <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">
              <Layers size={14} /> Global View
            </div>
          </div>
        </div>

        {/* Report Table */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Classification</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Monetary Value</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lifecycle Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entity Account</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Region Origin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((t, i) => (
                  <motion.tr
                    key={t._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          t.type === "CREDIT" || t.type === "COLLECTION" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        }`}>
                          <Download size={18} className={t.type === "DEBIT" || t.type === "DISBURSEMENT" ? "rotate-180" : ""} />
                        </div>
                        <span className="font-black text-slate-900 text-xs uppercase tracking-widest font-display">{t.type}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-slate-900 font-black text-xl tracking-tight font-display">₹{t.amount?.toLocaleString()}</span>
                    </td>
                    <td className="px-10 py-8">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        t.status === "APPROVED" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${t.status === "APPROVED" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {t.status}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                          {t.clientId?.name?.substring(0, 2).toUpperCase() || "NA"}
                        </div>
                        <span className="text-slate-600 font-bold text-sm">{t.clientId?.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">{t.branchId?.name || "N/A"}</span>
                        <ArrowUpRight size={18} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}