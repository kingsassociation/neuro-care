"use client";

import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    // Basic optimistic update
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    
    // Server update
    await fetch('/api/appointments', {
      method: 'POST', // or PUT if implemented
      body: JSON.stringify({ id, status }),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  const formatTo12Hr = (time24: string) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500">Manage all patient bookings</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 text-gray-700 border-b">
              <th className="p-4 font-semibold">Patient</th>
              <th className="p-4 font-semibold">Chamber</th>
              <th className="p-4 font-semibold">Date & Time</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{appt.patient?.name || 'Unknown'}</div>
                  <div className="text-sm text-gray-500">{appt.patient?.phone}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm border inline-block px-2 py-1 rounded bg-slate-50 font-medium">
                    {appt.chamber?.name || 'Main Chamber'}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-gray-800 font-medium">
                    <Calendar size={16} className="text-primary" />
                    {new Date(appt.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <Clock size={16} />
                    {formatTo12Hr(appt.timeSlot)}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appt.status === 'completed' ? 'bg-green-100 text-green-700' : 
                    appt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    appt.status === 'confirmed' ? 'bg-primary/10 text-primary' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {appt.status !== 'completed' && (
                     <button 
                       onClick={() => handleStatusChange(appt.id, 'completed')}
                       className="text-green-600 hover:bg-green-50 px-3 py-1 rounded-md text-sm font-medium transition"
                     >
                       Mark Completed
                     </button>
                  )}
                  {appt.status === 'pending' && (
                     <button 
                       onClick={() => handleStatusChange(appt.id, 'confirmed')}
                       className="text-primary hover:bg-primary/5 px-3 py-1 rounded-md text-sm font-medium transition ml-2"
                     >
                       Confirm
                     </button>
                  )}
                  
                  <a 
                    href={`/dashboard/prescriptions/new?patientId=${appt.patientId}&appointmentId=${appt.id}`}
                    className="text-secondary hover:bg-secondary/5 px-3 py-1 rounded-md text-sm font-medium transition ml-2 inline-block"
                  >
                    Write Rx
                  </a>
                </td>
              </tr>
            ))}
            
            {appointments.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
