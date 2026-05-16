"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import RoleGuard from "../../components/auth/RoleGuard";
import { 
  CheckCircle2, 
  XCircle, 
  History, 
  UserCircle, 
  IndianRupee, 
  MapPin,
  Clock,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApprovalsPage() {
  const [transactions, setTransactions] = useState([]);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      if (data.success && Array.isArray(data.transactions)) {
        const pending = data.transactions.filter(
          (transaction) => transaction.status === "PENDING"
        );
        setTransactions(pending);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function updateStatus(id, status) {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchTransactions();
  }

  return (
    <RoleGuard allowedRoles={["ADMIN", "MANAGER"]}>
      <DashboardLayout>
        <div className="flex flex-col gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-600">Verification Engine</span>
              </div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter font-outfit">
                Approval Queue
              </h1>
              <p className="text-gray-400 mt-2 text-lg font-medium">
                Manager-level verification for financial disbursements.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
              <button className="px-6 py-3 bg-gray-50 text-gray-900 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
                All Requests
              </button>
              <button className="px-6 py-3 bg-black text-white rounded-xl text-sm font-bold shadow-lg shadow-black/10">
                Pending ({transactions.length})
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <AnimatePresence mode="popLayout">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[40px] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 p-8">
                    <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} strokeWidth={3} />
                      Waiting for Review
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1 space-y-8">
                      <div>
                        <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-3">Transaction ID</p>
                        <h3 className="text-2xl font-black text-gray-900 font-outfit uppercase">
                          {transaction._id.substring(18)}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Client</p>
                          <div className="flex items-center gap-2">
                            <UserCircle size={14} className="text-indigo-500" />
                            <span className="text-sm font-bold text-gray-900">{transaction.clientId?.name || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Amount</p>
                          <div className="flex items-center justify-end gap-1 text-xl font-black text-gray-900">
                            <IndianRupee size={16} />
                            {transaction.amount.toLocaleString()}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Location</p>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-rose-500" />
                            <span className="text-sm font-bold text-gray-900">{transaction.branchId?.name || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Type</p>
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            transaction.type === "CREDIT" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                          }`}>
                            {transaction.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-gray-50">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateStatus(transaction._id, "APPROVED")}
                          className="flex-1 bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-black/10 flex items-center justify-center gap-2 hover:bg-gray-900 transition-all"
                        >
                          <CheckCircle2 size={18} />
                          Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateStatus(transaction._id, "REJECTED")}
                          className="flex-1 bg-rose-50 text-rose-600 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-rose-100 transition-all"
                        >
                          <XCircle size={18} />
                          Reject
                        </motion.button>
                      </div>
                    </div>

                    <div className="w-full md:w-48 bg-gray-50 rounded-3xl p-6 relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-6">
                        <History size={16} className="text-gray-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Timeline</span>
                      </div>
                      <div className="space-y-6">
                        <div className="relative pl-4 border-l-2 border-emerald-500">
                          <div className="absolute -left-[7px] top-0 w-3 h-3 bg-emerald-500 rounded-full" />
                          <p className="text-[10px] font-bold text-gray-900">Request Created</p>
                          <p className="text-[9px] text-gray-400">10:42 AM</p>
                        </div>
                        <div className="relative pl-4 border-l-2 border-indigo-500">
                          <div className="absolute -left-[7px] top-0 w-3 h-3 bg-indigo-500 rounded-full" />
                          <p className="text-[10px] font-bold text-gray-900">KYC Verified</p>
                          <p className="text-[9px] text-gray-400">11:15 AM</p>
                        </div>
                        <div className="relative pl-4 border-l-2 border-gray-200">
                          <div className="absolute -left-[7px] top-0 w-3 h-3 bg-gray-200 rounded-full" />
                          <p className="text-[10px] font-bold text-gray-400">Final Review</p>
                          <p className="text-[9px] text-gray-400">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {transactions.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center text-5xl mb-8 grayscale opacity-50">
                  📂
                </div>
                <h3 className="text-3xl font-black text-gray-900 font-outfit">Clear as Crystal</h3>
                <p className="text-gray-400 mt-3 text-lg max-w-sm">
                  You&apos;ve processed all pending approvals. Your branch operations are fully synchronized.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}