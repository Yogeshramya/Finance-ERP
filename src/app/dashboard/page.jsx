"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import KpiCard from "../../components/dashboard/KpiCard";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalLoans: 0,
    totalCollections: 0,
    pendingApprovals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Loading System...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display">
              Executive Overview
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Welcome back to FinoraX Enterprise.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-400">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* KPI Stats Grid - Live Updated */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard 
            title="Total Clients" 
            value={stats.totalClients.toLocaleString()} 
            icon="👥" 
            growth="Real-time registration count" 
          />
          <KpiCard 
            title="Active Loans" 
            value={`₹${(stats.totalLoans / 100000).toFixed(1)}L`} 
            icon="💰" 
            growth="Live portfolio exposure" 
          />
          <KpiCard 
            title="Pending Approvals" 
            value={stats.pendingApprovals} 
            icon="⏳" 
            growth="Requiring manager clearance" 
          />
          <KpiCard 
            title="Total Collections" 
            value={`₹${(stats.totalCollections / 100000).toFixed(1)}L`} 
            icon="📈" 
            growth="Real-time recovery tracking" 
          />
        </div>

        {/* Analytics and Activities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Financial Analytics
                </h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-Branch Performance</p>
              </div>

              <select className="border-2 border-slate-100 p-3 px-5 rounded-2xl bg-slate-50 text-xs font-black uppercase tracking-widest text-slate-500 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>

            <div className="h-96 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <div className="w-2 h-8 bg-indigo-500 rounded-full mx-0.5 animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-10 bg-indigo-600 rounded-full mx-0.5 animate-bounce [animation-delay:-0.1s]" />
                <div className="w-2 h-6 bg-indigo-400 rounded-full mx-0.5 animate-bounce [animation-delay:0.1s]" />
              </div>
              <p className="text-sm font-black uppercase tracking-[0.2em]">Synthesizing Chart Data</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
              Live Feed
            </h2>

            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="flex items-start gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-emerald-500 ring-8 ring-emerald-50 z-10" />
                <div>
                  <p className="font-black text-slate-900 text-sm">
                    Loan Approved
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-bold">
                    ₹50,000 disbursement authorized for Client #78.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-indigo-500 ring-8 ring-indigo-50 z-10" />
                <div>
                  <p className="font-black text-slate-900 text-sm">
                    Client Initialized
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-bold">
                    Profile created via mobile terminal by Manager.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-amber-500 ring-8 ring-amber-50 z-10" />
                <div>
                  <p className="font-black text-slate-900 text-sm">
                    Audit Triggered
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-bold">
                    12 pending entries flagged for manual oversight.
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full mt-12 py-5 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all border border-transparent active:scale-[0.98]">
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}