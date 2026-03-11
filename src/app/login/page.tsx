"use client";

import { AlertCircle, Loader2, Lock, Mail, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full relative z-10 px-4 md:px-0">
        <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 space-y-6 md:space-y-8">
          <div className="text-center space-y-1 md:space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20 mb-3 md:mb-4 transform -rotate-6">
              <Smile className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Masum's Dental Admin</h1>
            <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest">Clinical Access Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium text-slate-900"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium text-slate-900"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-primary active:scale-95 transition-all shadow-lg shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                "Initialize Dashboard"
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            Secured Clinical Access portal
          </p>
        </div>
      </div>
    </div>
  );
}
