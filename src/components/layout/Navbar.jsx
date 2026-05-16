"use client";

import { Bell, Search, Plus, ChevronDown, User, LogOut, Settings, Globe, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const userName = session?.user?.name || "Admin User";
  const userRole = session?.user?.role || "Super Admin";
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <nav className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200/50 px-8 flex items-center justify-between sticky top-0 z-[90]">
      {/* Search Bar Section */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative group flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none">
            <Search size={16} strokeWidth={2.5} />
            <span className="text-[10px] font-bold border border-slate-200 px-1 rounded bg-slate-50 uppercase tracking-tighter">Ctrl + K</span>
          </div>
          <input 
            type="text" 
            placeholder="Search transactions, clients, or reports..." 
            className="w-full bg-slate-50/50 border border-slate-200/60 focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 rounded-xl py-2.5 pl-24 pr-4 outline-none transition-all text-sm text-slate-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4 ml-8">
        <button className="hidden lg:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-md active:scale-95">
          <Plus size={14} strokeWidth={3} />
          <span>New Entry</span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)} 
              className={`p-2.5 rounded-xl transition-all relative ${showNotifications ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <Bell size={20} strokeWidth={2} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)} 
              className={`flex items-center gap-3 p-1.5 pr-3 rounded-xl transition-all border ${showProfile ? "bg-white border-slate-200 shadow-sm" : "border-transparent hover:bg-slate-100"}`}
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {userInitials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold text-slate-900 leading-none">{userName}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1 leading-none">{userRole}</p>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-[100]"
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Organization</p>
                    <p className="text-sm font-bold text-slate-900">FinoraX Enterprise</p>
                  </div>
                  <div className="space-y-0.5">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors">
                      <User size={16} className="text-slate-400" /> Account Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors">
                      <Settings size={16} className="text-slate-400" /> System Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors">
                      <Globe size={16} className="text-slate-400" /> Language: English
                    </button>
                  </div>
                  <div className="h-px bg-slate-100 my-1 mx-2"></div>
                  <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 rounded-xl text-xs font-bold text-rose-600 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}