"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Lock, ShieldAlert, LogIn, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function RoleGuard({
    allowedRoles,
    children,
}) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Authenticating...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner">
                        <Lock size={40} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight font-display">Identity Required</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10 px-4">
                        This terminal requires an authorized enterprise session to proceed. Please authenticate.
                    </p>
                    <Link href="/login" className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
                        <LogIn size={20} />
                        Go to Login
                    </Link>
                </motion.div>
            </div>
        );
    }

    const userRole = session.user.role;

    if (!allowedRoles.includes(userRole)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <ShieldAlert size={40} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight font-display">Clearance Required</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10 px-4">
                        Your account level (<span className="text-rose-600 font-bold">{userRole}</span>) does not have sufficient clearance for this resource.
                        Required: <span className="text-slate-900 font-bold uppercase tracking-wider">{allowedRoles.join(" or ")}</span>.
                    </p>
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
                    >
                        <ChevronLeft size={20} />
                        Request Clearance
                    </button>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}