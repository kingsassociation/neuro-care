"use client";

import { Calendar, Clock, Loader2, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function Booking() {
  const [chambers, setChambers] = useState<any[]>([]);
  const [selectedChamberId, setSelectedChamberId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    issue: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null);

  const formatTo12Hr = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    fetch('/api/chambers')
      .then(res => res.json())
      .then(data => {
        setChambers(data);
        if (data.length > 0) setSelectedChamberId(data[0].id);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedChamberId && date) {
      setSlotsLoading(true);
      fetch(`/api/availability?chamberId=${selectedChamberId}&date=${date}`)
        .then(res => res.json())
        .then(data => {
          setSlots(data.slots || []);
          setSelectedSlot(""); // reset selected slot
        })
        .catch(err => console.error(err))
        .finally(() => setSlotsLoading(false));
    } else {
      setSlots([]);
    }
  }, [selectedChamberId, date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChamberId || !date || !selectedSlot || !formData.name || !formData.phone) {
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // 1. Upsert Patient
      const patientRes = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          historyNotes: formData.issue
        })
      });
      const patient = await patientRes.json();
      if (!patientRes.ok) throw new Error(patient.error);

      // 2. Create Appointment
      const apptRes = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: patient.id,
          chamberId: selectedChamberId,
          date: date,
          timeSlot: selectedSlot
        })
      });
      
      const apptData = await apptRes.json();
      if (!apptRes.ok) throw new Error("Failed to book appointment");
      
      setBookingSuccessData(apptData);
      setDate("");
      setFormData({ name: "", phone: "", issue: "" });
      setSelectedSlot("");
    } catch (error: any) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="appointments" className="relative pt-2 md:pt-4 pb-6 md:pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-[2rem] md:rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 md:p-12 lg:p-16 relative shadow-2xl">
          {/* Background Decorative Circles */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px]"></div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10">
            {/* Left Side - Info */}
            <div className="w-full lg:w-1/2 space-y-5 md:space-y-6">
              <div className="space-y-2 md:space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.2]">
                  Book Your <span className="text-primary italic">Dental</span> Consultation
                </h3>
                <p className="text-slate-600 text-base md:text-lg lg:text-xl leading-relaxed">
                  Get priority serial booking for Dr. Abdullah Al Masum. Fill out the details to confirm your visit.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="glass-light bg-white/50 border border-white/60 p-4 md:p-6 rounded-[1.8rem] md:rounded-3xl relative overflow-hidden group shadow-sm flex gap-3 md:gap-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl transition-all duration-700"></div>
                  <div className="bg-primary text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl h-fit shadow-lg relative z-10">
                    <MapPin size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="space-y-1.5 md:space-y-2 relative z-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-lg md:text-xl text-slate-800">Masum's Dental Clinic</h4>
                      <span className="px-2 py-0.5 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                        Main Chamber
                      </span>
                    </div>
                    <p className="text-slate-600 text-[12px] md:text-sm">Gafur Mansion, 1107/A Love Lane, Chattogram</p>
                    <div className="flex flex-col gap-1 text-slate-500 text-[12px] md:text-sm font-medium">
                      <div className="flex items-center gap-2"><Phone size={12}/> 01712-260461</div>
                      <div className="flex items-center gap-2 space-x-4"><Clock size={12}/> 10:00 AM – 2:00 PM, 4:00 PM – 10:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form/Action */}
            <div className="w-full lg:w-1/2 pt-4 lg:pt-0">
              {bookingSuccessData ? (
                <div className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white text-slate-900 shadow-2xl border border-emerald-100 animate-in fade-in zoom-in duration-500">
                  <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    
                    <div className="space-y-1 md:space-y-2">
                      <h4 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h4>
                      <p className="text-[13px] md:text-sm text-slate-500 font-medium">Your request has been successfully recorded.</p>
                    </div>

                    <div className="w-full space-y-3 md:space-y-4 pt-2 md:pt-4">
                      <div className="p-4 md:p-5 bg-slate-50 rounded-[1.8rem] md:rounded-3xl border border-slate-100 flex flex-col gap-2 md:gap-3 text-left">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reference ID</span>
                          <span className="text-[12px] font-black text-primary px-2 py-0.5 md:py-1 bg-primary/5 rounded-lg border border-primary/10">#{bookingSuccessData.id.split('-')[0].toUpperCase()}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                          <div className="space-y-0.5">
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient</span>
                            <p className="text-[13px] md:text-sm font-bold text-slate-800">{bookingSuccessData.patient.name}</p>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timing</span>
                            <p className="text-[13px] md:text-sm font-bold text-slate-800">{formatTo12Hr(bookingSuccessData.timeSlot)}</p>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</span>
                            <p className="text-[13px] md:text-sm font-bold text-slate-800">{formatDate(bookingSuccessData.date)}</p>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chamber</span>
                            <p className="text-[13px] md:text-sm font-bold text-slate-800 underline decoration-primary/30">{bookingSuccessData.chamber.name}</p>
                          </div>
                        </div>

                        <div className="pt-1.5 flex items-start gap-2 text-[11px] md:text-xs text-slate-500 italic">
                          <MapPin size={12} className="mt-0.5 text-primary" />
                          <span>{bookingSuccessData.chamber.address}</span>
                        </div>
                      </div>

                      <div className="p-3 md:p-4 bg-primary/5 rounded-xl md:rounded-2xl border border-primary/10 text-[11px] md:text-xs text-primary font-bold text-center leading-relaxed">
                        The assistant will call at <span className="underline">{formData.phone}</span> for verification.
                      </div>
                    </div>

                    <button 
                      onClick={() => setBookingSuccessData(null)}
                      className="w-full bg-slate-900 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                    >
                      New Booking
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white text-slate-900 shadow-2xl space-y-4 md:space-y-6 border border-white/50 animate-in fade-in duration-500">
                  <h4 className="text-xl md:text-2xl font-bold tracking-tight">Request Serial Form</h4>
                  
                  {message && (
                    <div className={`p-3 rounded-lg text-sm font-bold border ${message.includes('Error') ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                      {message}
                    </div>
                  )}

                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Select Chamber</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                      <select 
                        required
                        value={selectedChamberId}
                        onChange={(e) => setSelectedChamberId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 md:py-4 pl-11 md:pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none transition-all font-medium text-slate-700 text-sm md:text-base"
                      >
                        <option value="" disabled>Select Chamber</option>
                        {chambers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.type})</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Target Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                        <input 
                          required
                          type="date" 
                          min={new Date().toISOString().split('T')[0]}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 md:py-4 pl-11 md:pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700 text-sm md:text-base" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Time Slot</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                        <select 
                          required
                          value={selectedSlot}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                          disabled={!date || slots.length === 0 || slotsLoading}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 md:py-4 pl-11 md:pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none transition-all font-medium text-slate-700 disabled:opacity-50 text-sm md:text-base"
                        >
                           <option value="" disabled>
                             {slotsLoading ? "Loading Slots..." : (slots.length === 0 ? (date ? "No Slots" : "Select Date First") : "Choose Slot")}
                           </option>
                           {slots.map(s => <option key={s} value={s}>{formatTo12Hr(s)}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Patient Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 md:py-4 px-5 md:px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700 text-sm md:text-base" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="01XXX-XXXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 md:py-4 pl-11 md:pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700 text-sm md:text-base" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Dental Issue (Short)</label>
                    <textarea value={formData.issue} onChange={e => setFormData({...formData, issue: e.target.value})} placeholder="e.g. Tooth ache, cleaning, or implants..." rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 md:py-4 px-5 md:px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium text-slate-700 text-sm md:text-base"></textarea>
                  </div>

                  <button disabled={loading} type="submit" className="w-full flex justify-center items-center gap-2 bg-primary text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-base md:text-lg tracking-wide disabled:opacity-75 disabled:scale-100">
                    {loading && <Loader2 className="animate-spin" size={20} />}
                    Confirm Booking Now
                  </button>

                  <p className="text-center text-xs text-slate-500 font-medium">
                    The chamber assistant will call your phone to verify the serial timing.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
