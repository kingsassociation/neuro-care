"use client";

import { ArrowLeft, Calendar, Clock, Droplet, FileText, Phone } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PatientHistoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/patients/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        setPatient(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load patient");
        router.push("/dashboard/patients");
      });
  }, [id, router]);

  if (loading) return <div className="p-8">Loading history...</div>;
  if (!patient) return null;

  return (
    <div className="space-y-6 max-w-5xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition">
        <ArrowLeft size={20} /> Back to Patients
      </button>

      {/* Profile Card */}
      <div className="bg-white p-6 justify-between rounded-xl border shadow-sm flex items-start">
        <div className="flex gap-6">
          <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-3xl font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <div className="flex gap-4 mt-2 text-gray-600 font-medium">
              <span className="flex items-center gap-1"><Phone size={16} /> {patient.phone}</span>
              <span className="flex items-center gap-1"><Calendar size={16} /> {patient.age || '-'} yrs</span>
              <span className="flex items-center gap-1"><UserGender gender={patient.gender} /> {patient.gender || '-'}</span>
              <span className="flex items-center gap-1 text-red-500"><Droplet size={16} /> {patient.bloodGroup || 'Unknown'}</span>
            </div>
            {patient.historyNotes && (
              <p className="mt-4 text-sm bg-yellow-50 text-yellow-800 p-3 rounded-md border border-yellow-200">
                <strong>Medical History:</strong> {patient.historyNotes}
              </p>
            )}
            {patient.address && (
              <p className="mt-2 text-sm text-gray-500">Address: {patient.address}</p>
            )}
          </div>
        </div>
        
        <Link 
          href={`/dashboard/prescriptions/new?patientId=${patient.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 transition"
        >
          <FileText size={18} /> New Prescription
        </Link>
      </div>

      {/* History Timeline */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2">
          <Clock size={20} className="text-blue-600" /> Visit History
        </h2>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {(() => {
            const appointments = patient.appointments || [];
            const standalonePrescriptions = (patient.prescriptions || []).filter((p: any) => !p.appointmentId);
            
            const timelineEvents = [
              ...appointments.map((a: any) => ({
                type: 'Appointment',
                id: a.id,
                date: new Date(a.date),
                timeSlot: a.timeSlot,
                presc: a.prescription,
                chamberName: a.chamber?.name || "Sevron (Default)",
                source: a
              })),
              ...standalonePrescriptions.map((p: any) => ({
                type: 'Prescription (Walk-in)',
                id: p.id,
                date: new Date(p.createdAt),
                timeSlot: new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                presc: p,
                chamberName: p.chamber?.name || "Sevron (Default)",
                source: p
              }))
            ].sort((a, b) => b.date.getTime() - a.date.getTime());

            if (timelineEvents.length === 0) {
              return <p className="text-gray-500 italic pl-12 md:text-center md:pl-0 pt-4">No past visits recorded.</p>;
            }

            return timelineEvents.map((event: any, idx: number) => {
              const presc = event.presc;
              return (
                <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10 transition-transform group-hover:scale-110">
                    <Calendar size={18} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border shadow-sm group-hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{event.date.toLocaleDateString()}</span>
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] text-primary uppercase font-bold tracking-widest">{event.type}</span>
                          <span className="text-[10px] text-gray-400 font-bold">•</span>
                          <span className="text-[10px] text-gray-500 font-bold">{event.chamberName}</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 shadow-sm">{event.timeSlot}</span>
                    </div>
                    {presc ? (
                      <div className="mt-4 text-sm text-gray-700 space-y-3 border-t pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                             <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Diagnosis</p>
                             <p className="font-semibold text-slate-800">{presc.diagnosis || 'General checkup'}</p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                             <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Symptoms</p>
                             <p className="text-slate-700">{presc.symptoms || 'Routine follow-up'}</p>
                          </div>
                        </div>
                        
                        {presc.nextVisit && (
                          <div className="flex items-center gap-2 bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg border border-green-100 font-medium">
                            <Clock size={14} /> Next Visit: {new Date(presc.nextVisit).toLocaleDateString()}
                          </div>
                        )}
                        <div className="flex pt-2">
                          <Link 
                            href={`/dashboard/prescriptions/new?patientId=${patient.id}&prescriptionId=${presc.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition flex items-center gap-2 active:scale-95 shadow-lg shadow-blue-900/10"
                          >
                            <FileText size={14} /> View/Edit Prescription
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-center">
                         <p className="text-xs text-gray-400 italic">No prescription generated for this visit yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}

function UserGender({ gender }: { gender: string }) {
  if (gender === 'Male') return <span>M</span>;
  if (gender === 'Female') return <span>F</span>;
  return <span>O</span>;
}
