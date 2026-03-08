"use client";

import { Calendar, Eye, FileText, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Prescription = {
  id: string;
  patientId: string;
  patient: {
    name: string;
    phone: string;
  };
  diagnosis: string;
  symptoms: string;
  nextVisit: string | null;
  createdAt: string;
};

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPrescriptions = async () => {
    try {
      const res = await fetch('/api/prescriptions');
      const data = await res.json();
      setPrescriptions(data);
    } catch (error) {
      console.error("Failed to fetch prescriptions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const filteredPrescriptions = prescriptions.filter(p => 
    p.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.patient.phone.includes(searchTerm) ||
    (p.diagnosis && p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Prescriptions...</div>;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issued Prescriptions</h1>
          <p className="text-gray-500 font-medium">History of all prescriptions generated in the system.</p>
        </div>
        <Link 
          href="/dashboard/prescriptions/new"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 flex items-center gap-2 transition shadow-lg shadow-primary/20 whitespace-nowrap active:scale-95"
        >
          <FileText size={20} /> Create New Rx
        </Link>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by patient name, phone or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition font-medium text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b">
                <th className="px-6 py-4">Patient Info</th>
                <th className="px-6 py-4">Diagnosis</th>
                <th className="px-6 py-4">Status & Follow-up</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPrescriptions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold shrink-0">
                        {p.patient.name.charAt(0)}
                      </div>
                      <div>
                        <Link href={`/dashboard/patients/${p.patientId}`} className="font-bold text-slate-900 hover:text-primary transition-colors block">
                          {p.patient.name}
                        </Link>
                        <span className="text-xs text-slate-500 font-medium">{p.patient.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-700 leading-snug">
                      {p.diagnosis || <span className="text-slate-400 italic font-normal">No diagnosis noted</span>}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      {p.nextVisit ? (
                        <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100 w-fit">
                          <Calendar size={12} /> Next Visit: {new Date(p.nextVisit).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">No follow-up set</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{new Date(p.createdAt).toLocaleDateString()}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        {new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/dashboard/prescriptions/new?patientId=${p.patientId}&prescriptionId=${p.id}`}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                        title="Edit Prescription"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                    <div className="group-hover:hidden text-slate-300">
                      <FileText size={18} className="ml-auto" />
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPrescriptions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                       <Search size={48} className="text-slate-200" />
                       <p className="text-slate-400 font-medium italic">No prescriptions found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
