"use client";

import { Calendar, Clock, MapPin, Phone } from "lucide-react";

const Booking = () => {
  return (
    <section id="appointments" className="relative pt-4 pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 lg:p-16 relative shadow-2xl">
          {/* Background Decorative Circles */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px]"></div>

          <div className="flex flex-col lg:flex-row gap-16 relative z-10">
            {/* Left Side - Info */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900">
                  Book Your Chamber <span className="text-primary italic">Consultation</span>
                </h3>
                <p className="text-slate-600 text-lg lg:text-xl">
                  Get explicit priority booking at our Chattogram chambers. Fill out the details to lock your spot before arrival.
                </p>
              </div>

              <div className="space-y-6">
                {/* Primary Chamber */}
                <div className="glass-light bg-white/50 border border-white/60 p-6 rounded-3xl relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-700"></div>
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-primary text-white p-3 rounded-2xl h-fit shadow-lg">
                      <MapPin size={24} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-xl text-slate-800">Sevron Hospital</h4>
                        <span className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Primary</span>
                      </div>
                      <p className="text-slate-600 text-sm">Panchlaish Residential Area, Chattogram</p>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium pt-2 border-t border-slate-200">
                        <Clock size={14}/> Sat - Thu (4:00 PM - 9:00 PM)
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Phone size={14}/> +880 1812-345678 (Chamber specific)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visiting Chamber */}
                <div className="glass-light bg-white/50 border border-white/60 p-6 rounded-3xl relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/40 transition-all duration-700"></div>
                  <div className="flex gap-4 relative z-10">
                    <div className="bg-secondary text-white p-3 rounded-2xl h-fit shadow-lg">
                      <MapPin size={24} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-xl text-slate-800">Epic Health Care</h4>
                        <span className="bg-secondary/20 text-secondary border border-secondary/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Visiting</span>
                      </div>
                      <p className="text-slate-600 text-sm">O.R. Nizam Road, Chattogram</p>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium pt-2 border-t border-slate-200">
                        <Clock size={14}/> Fridays Only (10:00 AM - 1:00 PM)
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Phone size={14}/> +880 1812-987654 (Chamber specific)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form/Action */}
            <div className="w-full lg:w-1/2">
              <div className="glass p-8 rounded-[2.5rem] bg-white text-slate-900 shadow-2xl space-y-6 border border-white/50">
                <h4 className="text-2xl font-bold tracking-tight">Request Serial Form</h4>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Select Chamber</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none transition-all font-medium text-slate-700">
                      <option>Sevron Hospital (Primary)</option>
                      <option>Epic Health Care (Visiting - Fridays)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Target Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                      <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                      <input type="tel" placeholder="01XXX-XXXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Patient Name</label>
                  <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Medical Issue (Short)</label>
                  <textarea placeholder="e.g. Brain tumor consultation, severe headache..." rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium text-slate-700"></textarea>
                </div>

                <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg tracking-wide">
                  Confirm Booking Now
                </button>

                <p className="text-center text-xs text-slate-500 font-medium">
                  The chamber assistant will call your phone to verify the serial timing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
