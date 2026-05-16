"use client";

import { useEffect, useState } from "react";
import FileUpload from "../../components/FileUpload";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Search, 
  UserPlus, 
  Filter, 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Building2,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchClients() {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-slate-900 p-10 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <UserCheck size={20} className="text-indigo-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Registry System v2.0</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight font-display">Clients Management</h1>
            <p className="text-slate-400 mt-2 font-medium max-w-lg">Centralized repository for customer profiles, KYC documentation, and cross-branch account tracking.</p>
          </div>

          <button className="relative z-10 flex items-center gap-3 bg-indigo-600 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95 group">
            <UserPlus size={18} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
            Initialize Client Profile
          </button>
        </div>

        {/* Clients Table Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Table Header / Controls */}
          <div className="p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-slate-50 bg-slate-50/30">
            <div className="relative w-full lg:w-[500px] group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Query by name, identifier, or terminal..."
                className="w-full pl-16 pr-8 py-4.5 bg-white border-2 border-transparent focus:border-indigo-500/10 focus:ring-4 focus:ring-indigo-500/5 rounded-2xl outline-none transition-all text-sm font-bold placeholder:text-slate-400 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
               <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white text-slate-600 px-8 py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all border border-slate-100 shadow-sm">
                  <Filter size={16} /> Advanced Filters
               </button>
               <div className="h-10 w-px bg-slate-200 hidden lg:block" />
               <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  <ShieldCheck size={14} /> Live Sync
               </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Profile</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Communication</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Branch Access</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lifecycle Status</th>
                  <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest pr-12">Action Terminal</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-10 py-8">
                        <div className="h-12 bg-slate-100 rounded-2xl w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredClients.map((client, index) => (
                  <motion.tr 
                    key={client._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-slate-50/80 transition-all group cursor-pointer"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-xl shadow-slate-200 group-hover:scale-105 transition-transform">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-base tracking-tight leading-none mb-2">{client.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">PID: {client._id.substring(client._id.length - 6).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                          <Phone size={14} className="text-slate-300" />
                          {client.phone}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Verified Terminal</p>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3 bg-slate-50 w-fit px-4 py-2 rounded-xl border border-slate-100">
                        <Building2 size={14} className="text-indigo-400" />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                          {client.branchId?.name || "Global Head"}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        client.isActive 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${client.isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                        {client.isActive ? "Active Account" : "Suspended"}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right pr-12">
                      <div className="flex items-center justify-end gap-3">
                        <button className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                          <Eye size={14} strokeWidth={3} /> View
                        </button>
                        <button 
                          onClick={() => handleDelete(client._id)}
                          className="flex items-center gap-2 bg-rose-50 text-rose-700 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 size={14} strokeWidth={3} /> Terminate
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-10 border-t border-slate-50 bg-slate-50/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              Cataloged: <span className="text-slate-900">{filteredClients.length}</span> Records in active registry
            </p>
            
            <div className="flex items-center gap-3">
              <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-300 hover:text-slate-900 disabled:opacity-40 transition-all shadow-sm" disabled>
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                <button className="w-12 h-12 bg-slate-900 text-white rounded-2xl font-black text-xs">01</button>
                <button className="w-12 h-12 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-xs hover:bg-slate-50 transition-all shadow-sm">02</button>
              </div>
              <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 transition-all shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* KYC Repository Section */}
        <FileUpload />
      </div>
    </DashboardLayout>
  );
}