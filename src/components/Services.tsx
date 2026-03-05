"use client";

import { Activity, ArrowUpRight, Brain, ShieldAlert, ZapIcon } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Brain Tumor Surgery",
    desc: "Advanced neuro-oncology techniques for the safe and precise removal of complex tumors with minimal neurological impact.",
    icon: <Brain className="text-primary" size={32} />,
    color: "bg-primary/10",
  },
  {
    title: "Spine & Disc Surgery",
    desc: "Minimally invasive operations for herniated discs, spinal stenosis, and complex spinal deformities to restore mobility.",
    icon: <Activity className="text-secondary" size={32} />,
    color: "bg-secondary/10",
  },
  {
    title: "Stroke Management",
    desc: "Critical emergency interventions and long-term vascular rehabilitation protocols to survive and beat stroke.",
    icon: <ShieldAlert className="text-accent" size={32} />,
    color: "bg-accent/10",
  },
  {
    title: "Epilepsy Treatment",
    desc: "Expert diagnosis and surgical/medical management of severe seizure disorders for a vastly improved quality of life.",
    icon: <ZapIcon className="text-blue-500" size={32} />,
    color: "bg-blue-500/10",
  }
];

const Services = () => {
  return (
    <section id="services" className="relative pt-4 pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 lg:p-16 space-y-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Our Specialties</h2>
          <h3 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
            Precision Neurosurgical & Brain Care
          </h3>
          <p className="text-foreground/60">
            Delivering the highest standard of neurological and spinal procedures using state-of-the-art microsurgical techniques in Chattogram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="group glass p-8 rounded-[32px] border border-white/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative bg-white/50"
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 ${service.color} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="space-y-6 relative z-10">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center border border-white/50 shadow-sm`}>
                  {service.icon}
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-foreground">{service.title}</h4>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Link href="/services">
            <button className="bg-white border text-lg border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
              View All Specialized Treatments <ArrowUpRight size={20}/>
            </button>
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
