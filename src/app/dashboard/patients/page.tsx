"use client";

import { Calendar, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PatientsListPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data));
  }, []);

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Patient Directory</h1>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search patients..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 text-gray-700 border-b">
              <th className="p-4 font-semibold">Patient</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Age/Gender</th>
              <th className="p-4 font-semibold">Visits</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(patient => (
              <tr key={patient.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{patient.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{patient.phone}</td>
                <td className="p-4 text-gray-600">{patient.age || '-'} / {patient.gender || '-'}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm font-medium">
                    <Calendar size={14} /> {patient._count?.appointments || 0}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/patients/${patient.id}`} className="text-primary hover:text-secondary text-sm font-medium">
                      View History
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
