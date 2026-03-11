"use client";

import { AlertCircle, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Schedule = {
  id?: string;
  dayOfWeek: number;
  chamberId: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isAvailable: boolean;
};

type Chamber = {
  id: string;
  name: string;
  type: string;
};

export default function SchedulePage() {
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/chambers').then(res => res.json()),
      fetch('/api/schedule').then(res => res.json())
    ]).then(([chambersData, schedulesData]) => {
      setChambers(chambersData);
      setSchedules(schedulesData);
      setLoading(false);
    });
  }, []);

  const handleUpdate = (id: string | number, field: keyof Schedule, value: any) => {
    setSchedules(prev => prev.map(s => (s.id === id || (typeof id === 'number' && schedules.indexOf(s) === id)) ? { ...s, [field]: value } : s));
    setError(null);
  };

  const addShift = (dayIndex: number) => {
    if (chambers.length === 0) return;
    const newShift: Schedule = {
      dayOfWeek: dayIndex,
      chamberId: chambers[0].id,
      startTime: "09:00",
      endTime: "13:00",
      slotDuration: 20,
      isAvailable: true
    };
    setSchedules(prev => [...prev, newShift]);
  };

  const removeShift = (index: number) => {
    const shift = schedules[index];
    if (shift.id) {
      setDeletedIds(prev => [...prev, shift.id!]);
    }
    setSchedules(prev => prev.filter((_, i) => i !== index));
  };

  const checkOverlaps = () => {
    for (let day = 0; day < 7; day++) {
      const dayShifts = schedules.filter(s => s.dayOfWeek === day && s.isAvailable);
      for (let i = 0; i < dayShifts.length; i++) {
        for (let j = i + 1; j < dayShifts.length; j++) {
          const s1 = dayShifts[i];
          const s2 = dayShifts[j];
          
          if ((s1.startTime < s2.endTime) && (s2.startTime < s1.endTime)) {
            return `Conflict: Overlapping shifts detected on ${daysOfWeek[day]}. Please fix timing before saving.`;
          }
        }
      }
    }
    return null;
  };

  const handleSave = async () => {
    const overlapError = checkOverlaps();
    if (overlapError) {
      setError(overlapError);
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      // 1. Delete removed shifts
      for (const id of deletedIds) {
        await fetch(`/api/schedule?id=${id}`, { method: 'DELETE' });
      }

      // 2. Upsert remaining shifts
      for (const schedule of schedules) {
        const res = await fetch('/api/schedule', {
          method: 'POST',
          body: JSON.stringify(schedule),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        // Update local state with new IDs to prevent duplicates if saved twice
        if (!schedule.id && data.id) {
           schedule.id = data.id;
        }
      }
      
      setDeletedIds([]);
      alert('Schedules updated successfully!');
    } catch (err) {
      setError('Failed to save schedules. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading schedules...</div>;

  return (
    <div className="max-w-5xl space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weekly Schedule</h1>
          <p className="text-gray-500">Manage multi-chamber shifts and availability.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm disabled:opacity-50 transition-all"
        >
          <Save size={18} /> {isSaving ? 'Saving...' : 'Save All Shifts'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {daysOfWeek.map((dayName, dayIndex) => {
          const dayShifts = schedules.filter(s => s.dayOfWeek === dayIndex);
          
          return (
            <div key={dayIndex} className="bg-white rounded-xl border shadow-sm overflow-hidden transition-all hover:border-gray-300">
              <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
                <h3 className="font-bold text-gray-800">{dayName}</h3>
                <button 
                  onClick={() => addShift(dayIndex)}
                  className="text-primary hover:bg-primary/5 px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors border border-primary/20"
                >
                  <Plus size={14} /> Add Shift
                </button>
              </div>

              <div className="divide-y">
                {dayShifts.length > 0 ? (
                  dayShifts.map((shift, sIdx) => {
                    const globalIdx = schedules.indexOf(shift);
                    return (
                      <div key={sIdx} className="p-4 sm:px-6 flex flex-wrap items-center gap-4 sm:gap-6 hover:bg-gray-50/50 transition">
                        
                        <div className="flex items-center gap-2 min-w-[140px]">
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Chamber</span>
                           <select 
                             value={shift.chamberId}
                             onChange={(e) => handleUpdate(globalIdx, "chamberId", e.target.value)}
                             className="text-sm font-semibold text-gray-700 border-none bg-transparent p-0 focus:ring-0 cursor-pointer hover:text-primary transition"
                           >
                             {chambers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                           </select>
                        </div>

                        <div className="flex items-center gap-3">
                           <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">From</span>
                              <input 
                                type="time" 
                                value={shift.startTime}
                                onChange={(e) => handleUpdate(globalIdx, "startTime", e.target.value)}
                                className="border rounded px-2 py-1 text-sm font-medium outline-none focus:border-primary"
                              />
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">To</span>
                              <input 
                                type="time" 
                                value={shift.endTime}
                                onChange={(e) => handleUpdate(globalIdx, "endTime", e.target.value)}
                                className="border rounded px-2 py-1 text-sm font-medium outline-none focus:border-primary"
                              />
                           </div>
                        </div>

                        <div className="flex items-center gap-2">
                           <span className="text-xs text-gray-400">Duration</span>
                           <select 
                             value={shift.slotDuration}
                             onChange={(e) => handleUpdate(globalIdx, "slotDuration", parseInt(e.target.value))}
                             className="border rounded px-2 py-1 text-sm font-medium outline-none focus:border-primary"
                           >
                              <option value={10}>10m</option>
                              <option value={15}>15m</option>
                              <option value={20}>20m</option>
                              <option value={30}>30m</option>
                              <option value={60}>1h</option>
                           </select>
                        </div>

                        <div className="ml-auto flex items-center gap-4">
                           <label className="flex items-center gap-2 cursor-pointer group">
                             <input 
                               type="checkbox" 
                               checked={shift.isAvailable}
                               onChange={(e) => handleUpdate(globalIdx, "isAvailable", e.target.checked)}
                               className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                             />
                             <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700 transition">Active</span>
                           </label>
                           
                           <button 
                             onClick={() => removeShift(globalIdx)}
                             className="text-gray-400 hover:text-red-500 transition-colors p-1"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-gray-400 text-sm italic">
                    No shifts scheduled for this day.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex items-start gap-3">
         <AlertCircle size={18} className="text-primary/70 mt-0.5" />
         <div className="text-xs text-primary/80 leading-relaxed font-medium">
            <strong>Conflict Prevention:</strong> The system automatically blocks overlapping shifts on the same day across all your chambers to ensure realistic availability.
         </div>
      </div>
    </div>
  );
}
