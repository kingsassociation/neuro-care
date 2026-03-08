"use client";

import { ArrowLeft, BrainCircuit, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10 space-y-12">
        {/* Visual Header */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-indigo-700">4</span>
              <div className="relative">
                <div className="absolute inset-0 animate-ping opacity-20 bg-blue-400 rounded-full" />
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-3xl text-white shadow-xl">
                  <BrainCircuit size={48} strokeWidth={1.5} />
                </div>
              </div>
              <span className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-indigo-700">4</span>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              SYSTEM_RECOVERY_MODE
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
             Diagnostic: <span className="text-blue-600">Path Not Found</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            The neural pathway you're seeking seem to have drifted. Let's redirect you back to the main core.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Link 
            href="/"
            className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/20 active:scale-95"
          >
            <Home size={20} className="group-hover:-translate-y-1 transition-transform" /> 
            <span>Initialize Recovery</span>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 bg-white text-slate-600 border border-slate-200 px-8 py-5 rounded-2xl font-bold hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-lg shadow-slate-200/50 active:scale-95"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <span>Return to Origin</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-12 flex items-center justify-center gap-8">
            <div className="px-4 py-2 rounded-lg bg-slate-100/50 border border-slate-200/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Secured Connection
            </div>
            <div className="px-4 py-2 rounded-lg bg-slate-100/50 border border-slate-200/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Neural Network Active
            </div>
        </div>
      </div>
    </div>
  );
}
