"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  FileText, 
  Plus,
  CheckCircle2,
  Clock,
  IndianRupee,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [clients, setClients] = useState([]);
  const [loans, setLoans] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    clientId: "",
    loanId: "",
    branchId: "",
    type: "COLLECTION",
    amount: "",
    description: "",
  });

  const mockTransactions = [
    { _id: "1", type: "COLLECTION", clientId: { name: "Rajesh Kumar" }, amount: 5000, branchId: { name: "Main Branch" }, status: "APPROVED", createdAt: new Date().toISOString() },
    { _id: "2", type: "DISBURSEMENT", clientId: { name: "Anita Sharma" }, amount: 50000, branchId: { name: "West Node" }, status: "PENDING", createdAt: new Date().toISOString() },
    { _id: "3", type: "EXPENSE", clientId: { name: "Office Rent" }, amount: 12000, branchId: { name: "Main Branch" }, status: "APPROVED", createdAt: new Date().toISOString() },
  ];

  async function fetchData() {
    try {
      const [transRes, clientsRes, loansRes, branchesRes] = await Promise.all([
        fetch("/api/transactions"),
        fetch("/api/clients"),
        fetch("/api/loans"),
        fetch("/api/branches")
      ]);

      const [transData, clientsData, loansData, branchesData] = await Promise.all([
        transRes.json(),
        clientsRes.json(),
        loansRes.json(),
        branchesRes.json()
      ]);

      setTransactions(transData.transactions?.length ? transData.transactions : mockTransactions);
      setClients(clientsData.clients || []);
      setLoans(loansData.loans || []);
      setBranches(branchesData.branches || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTransactions(mockTransactions);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ clientId: "", loanId: "", branchId: "", type: "COLLECTION", amount: "", description: "" });
        setShowForm(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display">
              Transactions Hub
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Real-time ledger of collections, disbursements, and operational expenses.
            </p>
          </div>

          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-black/10 hover:bg-slate-800 transition-all active:scale-95"
          >
            <Plus size={20} strokeWidth={3} />
            {showForm ? "Close Ledger" : "Post New Entry"}
          </button>
        </div>

        {/* Transaction Form */}
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <IndianRupee size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">New Transaction Entry</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="COLLECTION">Collection (Repayment)</option>
                  <option value="DISBURSEMENT">Disbursement (New Loan)</option>
                  <option value="EXPENSE">Business Expense</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Client/Entity</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.clientId}
                  onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  required
                >
                  <option value="">Select party...</option>
                  {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Associated Loan (Optional)</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.loanId}
                  onChange={(e) => setFormData({...formData, loanId: e.target.value})}
                >
                  <option value="">No linked loan</option>
                  {loans.map(l => <option key={l._id} value={l._id}>Loan ID: {l._id.slice(-6)} - ₹{l.amount}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Origin Branch</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.branchId}
                  onChange={(e) => setFormData({...formData, branchId: e.target.value})}
                  required
                >
                  <option value="">Select branch...</option>
                  {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount (₹)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
              </div>

              <div className="flex items-end">
                <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]">
                  Authorize & Save
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Records Table Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Financial Records</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-all">
                <FileSpreadsheet size={16} />
                Excel
              </button>
              <button className="flex items-center gap-2 bg-rose-50 text-rose-700 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all">
                <FileText size={16} />
                PDF
              </button>
              <div className="w-px h-8 bg-slate-100 mx-2" />
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 uppercase text-[11px] font-bold tracking-widest border-b border-slate-50">
                  <th className="px-8 py-5">Entry Type</th>
                  <th className="px-8 py-5">Party/Entity</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Branch</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          t.type === "COLLECTION" ? "bg-emerald-50 text-emerald-600" : 
                          t.type === "DISBURSEMENT" ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"
                        }`}>
                          {t.type === "COLLECTION" ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm leading-none">{t.type}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">ID: {t._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-700 text-sm">{t.clientId?.name || "Unassigned"}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-900 text-lg">₹{t.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        {t.branchId?.name || "Main Branch"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        t.status === "APPROVED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {t.status === "APPROVED" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {t.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100">
                         <Plus className="rotate-45" size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              FinoraX Real-Time Ledger Protocol v2.4
            </p>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition-all shadow-sm">Previous</button>
               <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition-all shadow-sm">Next Page</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}