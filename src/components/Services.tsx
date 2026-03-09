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
    <section id="services" className="relative pt-2 md:pt-4 pb-6 md:pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-[2rem] md:rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 md:p-12 lg:p-16 space-y-8 md:space-y-12">
        <div className="text-center space-y-2 md:space-y-4 max-w-2xl mx-auto">
          <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-sm">Our Specialties</h2>
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
            Precision Neurosurgical & Brain Care
          </h3>
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed px-4 md:px-0">
            Delivering the highest standard of neurological and spinal procedures using state-of-the-art microsurgical techniques in Chattogram.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="group glass p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative bg-white/50"
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 ${service.color} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="space-y-4 md:space-y-6 relative z-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${service.color} rounded-xl md:rounded-2xl flex items-center justify-center border border-white/50 shadow-sm`}>
                   {service.icon && <service.icon.type {...service.icon.props} size={28} className="md:w-8 md:h-8" />}
                </div>
                <div className="space-y-1.5 md:space-y-3">
                  <h4 className="text-lg md:text-xl font-bold text-foreground">{service.title}</h4>
                  <p className="text-[12px] md:text-sm text-foreground/60 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4 md:pt-8">
          <Link href="/services" className="w-full sm:w-auto">
            <button className="w-full bg-white border text-base md:text-lg border-slate-200 text-slate-900 px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center md:justify-start gap-2">
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
