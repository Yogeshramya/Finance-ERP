"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CircleDollarSign, 
  ArrowLeftRight, 
  CheckSquare, 
  FileText, 
  ShieldCheck,
  CreditCard,
  Settings,
  HelpCircle,
  Send
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", path: "/clients", icon: Users },
  { name: "Loans", path: "/loans", icon: CircleDollarSign },
  { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
  { name: "Approvals", path: "/approvals", icon: CheckSquare },
  {name: "SMS", path: "/sms", icon: Send},
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Audit Logs", path: "/audit-logs", icon: ShieldCheck },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-72 min-h-screen bg-slate-950 text-slate-300 p-6 border-r border-white/5 flex flex-col sticky top-0 h-screen">
      <div className="mb-10 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <CreditCard size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">
            FinoraX
          </h1>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
          Enterprise Solutions
        </p>
      </div>

      <nav className="space-y-1 flex-1 overflow-y-auto no-scrollbar">
        <p className="px-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-4">Main Menu</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? "text-white bg-white/5"
                  : "hover:bg-white/5 hover:text-slate-100"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <Icon 
                size={20} 
                className={`transition-colors ${
                  isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                }`} 
              />

              <span className={`font-semibold text-sm ${isActive ? "text-white" : "text-slate-400"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all text-sm font-semibold">
          <Settings size={18} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all text-sm font-semibold">
          <HelpCircle size={18} />
          Support
        </button>
        
        <div className="mt-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            System Live
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Connected to Global Finance Node 01
          </p>
        </div>
      </div>
    </aside>
  );
}