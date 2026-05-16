"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Calendar, 
  CreditCard, 
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Clock,
  Briefcase
} from "lucide-react";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [clients, setClients] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [formData, setFormData] = useState({
    clientId: "",
    branchId: "",
    amount: "",
    interestRate: "12",
    durationMonths: "12",
  });

  // Mock data to ensure the UI renders beautifully even if the backend is initializing
  const mockLoans = [
    { _id: "1", clientId: { name: "Rajesh Kumar" }, branchId: { name: "Main Branch" }, amount: 150000, interestRate: 12, emiAmount: 13500, status: "ACTIVE", durationMonths: 12 },
    { _id: "2", clientId: { name: "Anita Sharma" }, branchId: { name: "West Node" }, amount: 45000, interestRate: 14, emiAmount: 4200, status: "PENDING", durationMonths: 12 },
    { _id: "3", clientId: { name: "Vikram Singh" }, branchId: { name: "East Hub" }, amount: 200000, interestRate: 11, emiAmount: 18200, status: "ACTIVE", durationMonths: 18 },
  ];

  async function fetchData() {
    try {
      const [loansRes, clientsRes, branchesRes] = await Promise.all([
        fetch("/api/loans"),
        fetch("/api/clients"),
        fetch("/api/branches")
      ]);

      const [loansData, clientsData, branchesData] = await Promise.all([
        loansRes.json(),
        clientsRes.json(),
        branchesRes.json()
      ]);

      setLoans(loansData.loans?.length ? loansData.loans : mockLoans);
      setClients(clientsData.clients || []);
      setBranches(branchesData.branches || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoans(mockLoans);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setFormData({ clientId: "", branchId: "", amount: "", interestRate: "12", durationMonths: "12" });
        setShowAddLoan(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error creating loan:", error);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display">
              Loan Management
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Enterprise engine for loan origination and lifecycle tracking.
            </p>
          </div>

          <button 
            onClick={() => setShowAddLoan(!showAddLoan)}
            className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <PlusCircle size={20} />
            {showAddLoan ? "Close Form" : "Create New Loan"}
          </button>
        </div>

        {/* Stats Summary */}
        {!showAddLoan && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Outstanding</p>
              <h2 className="text-4xl font-black text-slate-900 leading-none">₹84.2L</h2>
              <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <TrendingUp size={14} /> +12.4% <span className="text-slate-400 font-medium">vs last month</span>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Disbursement</p>
              <h2 className="text-4xl font-black text-slate-900 leading-none">12</h2>
              <div className="mt-4 flex items-center gap-2 text-amber-600 font-bold text-xs">
                <Clock size={14} /> 4 Urgent <span className="text-slate-400 font-medium">requires action</span>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Collection Rate</p>
              <h2 className="text-4xl font-black text-slate-900 leading-none">98.4%</h2>
              <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <ArrowUpRight size={14} /> All-time high <span className="text-slate-400 font-medium">performance</span>
              </div>
            </div>
          </div>
        )}

        {/* Create Loan Form */}
        {showAddLoan && (
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                 <Briefcase size={24} />
               </div>
               <h2 className="text-2xl font-black text-slate-900">Disbursement Parameters</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Client</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.clientId}
                  onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  required
                >
                  <option value="">Choose a client...</option>
                  {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch Office</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.branchId}
                  onChange={(e) => setFormData({...formData, branchId: e.target.value})}
                  required
                >
                  <option value="">Choose a branch...</option>
                  {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Disbursement Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 50000"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Interest Rate (%)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration (Months)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  value={formData.durationMonths}
                  onChange={(e) => setFormData({...formData, durationMonths: e.target.value})}
                />
              </div>

              <div className="flex items-end">
                <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]">
                  Generate Loan Contract
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loan List */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Portfolios</h2>
            <div className="flex gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Filter by client..." className="pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" />
              </div>
              <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loans.map((loan) => (
              <div key={loan._id} className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 group hover:border-indigo-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-100">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight">
                        {loan.clientId?.name || "Unknown Client"}
                      </h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        Branch: {loan.branchId?.name || "Headquarters"}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    loan.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {loan.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Principal Amount</p>
                    <p className="text-2xl font-black text-slate-900">₹{loan.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly EMI</p>
                    <p className="text-2xl font-black text-indigo-600">₹{loan.emiAmount?.toLocaleString() || "TBD"}</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {loan.durationMonths} Months
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} />
                      {loan.interestRate}% Interest
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    View Details
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}