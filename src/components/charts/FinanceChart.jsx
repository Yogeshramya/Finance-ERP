"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function FinanceChart({ title, subtitle }) {
  const data = [
    { name: "Jan", loans: 4000, collections: 2400 },
    { name: "Feb", loans: 3000, collections: 1398 },
    { name: "Mar", loans: 2000, collections: 9800 },
    { name: "Apr", loans: 2780, collections: 3908 },
    { name: "May", loans: 1890, collections: 4800 },
    { name: "Jun", loans: 2390, collections: 3800 },
  ];

  return (
    <div className="premium-card rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display">{title || "Performance Analysis"}</h3>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subtitle || "Monthly disbursement vs recovery"}</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Loans</span>
           </div>
           <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Collections</span>
           </div>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f4" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
            />
            <Tooltip 
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{ 
                borderRadius: "12px", 
                border: "1px solid #f1f1f4", 
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                fontSize: "12px"
              }}
            />
            <Bar dataKey="loans" fill="#4f46e5" radius={[2, 2, 0, 0]} barSize={16} />
            <Bar dataKey="collections" fill="#10b981" radius={[2, 2, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}