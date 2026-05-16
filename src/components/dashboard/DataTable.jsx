"use client";

import { motion } from "framer-motion";
import { MoreVertical, Download, Filter, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from "lucide-react";

export default function DataTable({ title, subtitle, columns, data }) {
  return (
    <div className="premium-card rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display">{title}</h3>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 transition-all border border-slate-200">
            <Filter size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 transition-all border border-slate-200">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                {columns.map((col, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(row) : (
                      <span className="text-sm text-slate-600">{row[col.key]}</span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-white rounded-md text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-200">
                         <Eye size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-white rounded-md text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-200">
                         <Edit size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-white rounded-md text-slate-400 hover:text-rose-600 transition-all border border-transparent hover:border-slate-200">
                         <Trash2 size={14} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
        <p className="text-[11px] font-medium text-slate-500">
          Showing <span className="text-slate-900 font-bold">1-10</span> of 248 results
        </p>
        <div className="flex items-center gap-2">
          <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all disabled:opacity-50" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
