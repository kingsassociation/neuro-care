"use client";

import { Activity, CalendarDays, FileText, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    newPrescriptions: 0,
    totalPatients: 0,
    totalChambers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [appts, prescriptions, patients, chambers] = await Promise.all([
          fetch('/api/appointments?date=' + new Date().toISOString().split('T')[0]).then(res => res.json()),
          fetch('/api/prescriptions').then(res => res.json()), // Ideally this should be filtered by date too
          fetch('/api/patients').then(res => res.json()),
          fetch('/api/chambers').then(res => res.json())
        ]);

        setStats({
          todayAppointments: appts.length || 0,
          newPrescriptions: prescriptions.length || 0,
          totalPatients: patients.length || 0,
          totalChambers: chambers.length || 0
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1 font-medium">Welcome back! Here's what's happening today.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Today's Appointments</p>
            <h3 className="text-3xl font-bold mt-2 text-slate-800">{loading ? "..." : stats.todayAppointments}</h3>
          </div>
          <div className="p-4 bg-primary/10 text-primary rounded-2xl">
            <CalendarDays size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Prescriptions</p>
            <h3 className="text-3xl font-bold mt-2 text-slate-800">{loading ? "..." : stats.newPrescriptions}</h3>
          </div>
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
            <FileText size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Patients</p>
            <h3 className="text-3xl font-bold mt-2 text-slate-800">{loading ? "..." : stats.totalPatients}</h3>
          </div>
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Chambers</p>
            <h3 className="text-3xl font-bold mt-2 text-slate-800">{loading ? "..." : stats.totalChambers}</h3>
          </div>
          <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl">
            <MapPin size={24} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
              <Activity size={180} />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h4 className="text-primary/70 font-bold uppercase tracking-widest text-xs">Quick Actions</h4>
                <h2 className="text-3xl font-bold tracking-tight">Streamline Your Practice</h2>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed">Masum's Dental Clinic helps you manage patients and prescriptions with minimal effort. Start a new dental visit now.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard/appointments" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/40 text-center active:scale-95">
                  View Appts
                </Link>
                <Link href="/dashboard/prescriptions/new" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl font-bold transition text-center active:scale-95">
                  Write Rx
                </Link>
              </div>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border shadow-sm space-y-6">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                 <MapPin size={20} />
              </div>
              <h4 className="font-bold text-lg text-slate-800">Your Chambers</h4>
           </div>
           
           <p className="text-slate-500 text-sm leading-relaxed">Manage your availability across multiple clinics and hospitals effortlessly.</p>
           
           <Link href="/dashboard/chambers" className="block w-full py-4 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl font-bold text-center hover:bg-slate-100 transition active:scale-95">
              Manage Locations
           </Link>
        </div>
      </div>
    </div>
  );
}
