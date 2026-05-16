"use client";

import { useState, useRef } from "react";
import { Upload, File, CheckCircle2, AlertCircle, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadedUrl(data.fileUrl);
        setFile(null);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("System error during upload");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-100 border border-slate-100 p-10 mt-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <File size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">KYC Document Repository</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Authorized Document Upload</p>
          </div>
        </div>

        <div 
          className={`relative border-2 border-dashed rounded-[32px] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center ${
            dragActive ? "border-indigo-500 bg-indigo-50/50 scale-[0.99]" : "border-slate-200 bg-slate-50/30 hover:bg-white hover:border-slate-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept="image/*,.pdf"
          />

          {!file && !uploadedUrl && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-lg border border-slate-100 text-slate-400 group-hover:text-indigo-600 transition-colors">
                <Upload size={32} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">Drag & drop document here</p>
                <p className="text-xs font-medium text-slate-400 mt-1">or click to browse from system (Max 10MB)</p>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 px-8 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
              >
                Browse Files
              </button>
            </motion.div>
          )}

          {file && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 w-full max-w-xs"
            >
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl relative group">
                <button 
                  onClick={() => setFile(null)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
                >
                  <X size={14} strokeWidth={3} />
                </button>
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ImageIcon size={24} />
                </div>
                <p className="text-xs font-black text-slate-900 truncate px-2">{file.name}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>

              <button 
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Commit Document"}
              </button>
            </motion.div>
          )}

          {uploadedUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-sm font-black text-emerald-700">Verification Successful</p>
              
              <div className="relative group">
                <img 
                  src={uploadedUrl} 
                  alt="KYC Preview" 
                  className="w-48 h-48 object-cover rounded-[32px] border-4 border-white shadow-2xl mx-auto group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="text-white font-black text-[10px] uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30">View Original</button>
                </div>
              </div>

              <button 
                onClick={() => setUploadedUrl("")}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
              >
                Upload Another Document
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}