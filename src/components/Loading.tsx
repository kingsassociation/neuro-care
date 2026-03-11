"use client";

import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-4 animate-in fade-in duration-500">
      <div className="relative">
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
      </div>
      <div className="relative">
        {/* Spinner Ring */}
        <div className="relative w-16 h-16 rounded-full border-4 border-slate-100 border-t-primary animate-spin" />
        
        {/* Central Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-primary">
          <Activity size={24} className="animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-slate-800">Processing</h3>
        <p className="text-sm text-slate-500 font-medium animate-pulse">
          Carefully preparing your clinical data...
        </p>
      </div>
    </div>
  );
}
