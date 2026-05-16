"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Building2, 
  MapPin, 
  User, 
  Phone, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  Activity,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    location: "",
    managerName: "",
    phone: "",
  });

  const mockBranches = [
    { _id: "1", name: "Main Headquarters", code: "HQ-01", location: "Downtown Central", managerName: "Alex Mercer", phone: "+91 98765 43210" },
    { _id: "2", name: "West Node Hub", code: "WH-02", location: "Industrial District", managerName: "Sarah Connor", phone: "+91 91234 56789" },
    { _id: "3", name: "East Port Office", code: "EP-03", location: "Commercial Bay", managerName: "James Bond", phone: "+91 99887 76655" },
  ];

  async function fetchBranches() {
    try {
      const res = await fetch("/api/branches");
      const data = await res.json();
      setBranches(data.branches?.length ? data.branches : mockBranches);
    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranches(mockBranches);
    }
  }

  useEffect(() => {
    fetchBranches();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/branches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", code: "", location: "", managerName: "", phone: "" });
        setShowForm(false);
        fetchBranches();
      }
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display">
              Branch Network
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage and scale your global organizational footprint.
            </p>
          </div>

          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Plus size={20} strokeWidth={3} />
            {showForm ? "Close Registry" : "Register New Branch"}
          </button>
        </div>

        {/* Form Container */}
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-100 border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Branch Registration</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  placeholder="e.g. Main Headquarters"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identifier Code</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  placeholder="e.g. HQ-01"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Geographic Location</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  placeholder="City, District"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch Manager</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  placeholder="Manager Full Name"
                  value={formData.managerName}
                  onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Terminal</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700"
                  placeholder="+91 XXXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>

              <div className="flex items-end">
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                  Authorize Activation
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Branch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <motion.div 
              key={branch._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
                    <Building2 size={24} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Operational
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900 leading-tight mb-1">{branch.name}</h2>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{branch.code}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <MapPin size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-600">{branch.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <User size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-600">{branch.managerName}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <Phone size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-600">{branch.phone}</span>
                  </div>
                </div>

                <button className="w-full mt-8 py-4 bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  Analytics Hub <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Empty Add State */}
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="group bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-10 min-h-[400px] hover:border-indigo-200 hover:bg-white transition-all"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all mb-4">
                <Plus size={32} />
              </div>
              <p className="text-sm font-bold text-slate-400 group-hover:text-indigo-600 transition-all">Add Expansion Branch</p>
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}