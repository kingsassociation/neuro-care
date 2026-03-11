import { ArrowLeft, BookOpen, Globe2, GraduationCap, Microscope, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-6 px-4 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <Link href="/#about" className="inline-flex items-center gap-2 text-primary font-bold hover:-translate-x-1 transition-transform bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
          <ArrowLeft size={20} /> Back to Overview
        </Link>
        
        {/* Header Profile Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-slate-100 p-2 max-w-[320px] md:max-w-md mx-auto lg:mx-0">
              <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative bg-gradient-to-b from-slate-50 to-slate-100">
                <Image 
                  src="/doctor.png" 
                  alt="Dentist Portrait" 
                  width={600} 
                  height={800}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 object-cover" 
                />
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute top-1/2 -right-4 md:right-0 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl z-20 flex items-center gap-2 md:gap-3 border border-slate-100 animate-bounce-slow">
              <ShieldCheck className="text-green-500 w-5 h-5 md:w-6 md:h-6" />
              <div>
                <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">BMDC Registered</p>
                <p className="font-bold text-slate-800 text-xs md:text-sm">Dental Surgeon</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 space-y-4 md:space-y-8 text-center lg:text-left">
            <div className="inline-block bg-primary/10 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase border border-primary/20">
              Senior Consultant
            </div>
            <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.2] md:leading-[1.1]">
              Dr. <span className="text-primary italic">Abdullah Al Masum</span>
            </h1>
            <p className="text-base md:text-xl text-slate-600 leading-relaxed">
              A specialized Dental Surgeon with advanced training in Oral Surgery and Orthodontics, dedicated to providing exclusive dental solutions in Chattogram.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-slate-200">
              {[
                { label: "Experience", value: "15+ Yrs" },
                { label: "Surgeries", value: "500+" },
                { label: "Publications", value: "40+" },
                { label: "Awards", value: "12" }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-0.5 md:space-y-1">
                  <p className="text-xl md:text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clinical Philosophy */}
        <div className="glass bg-white p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-3xl space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Microscope className="text-primary w-7 h-7 md:w-8 md:h-8" /> Clinical Philosophy
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              "Every smile is unique and deserves the highest level of care. My philosophy is to combine advanced dental technology with a gentle, patient-centric approach. I am committed to providing painless and effective treatments that enhance both the health and aesthetics of your smile."
            </p>
          </div>
        </div>

        {/* Deep Details Timeline Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          
          {/* Column 1: Academics */}
          <div className="space-y-8 glass p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="flex items-center gap-4 text-primary border-b border-slate-100 pb-6">
              <div className="p-3 bg-primary/10 rounded-2xl"><GraduationCap size={28} /></div>
              <h2 className="text-2xl font-bold text-slate-900">Academic Excellence</h2>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-2 before:-translate-x-1/2 before:h-[90%] before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-slate-200 before:to-transparent">
              <div className="relative pl-8 hover:-translate-y-1 transition-transform">
                <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm -translate-x-1/2"></div>
                <h3 className="font-bold text-xl text-slate-900">BDS</h3>
                <p className="text-sm text-primary font-bold mb-3 uppercase tracking-wider">University of Dhaka (DU)</p>
                <p className="text-slate-600 text-sm leading-relaxed">Fundamental dental education with a focus on comprehensive patient care and clinical excellence.</p>
              </div>
              
              <div className="relative pl-8 hover:-translate-y-1 transition-transform">
                <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-white border-4 border-slate-300 shadow-sm -translate-x-1/2"></div>
                <h3 className="font-bold text-xl text-slate-900">PGT (Oral Surgery)</h3>
                <p className="text-sm text-slate-400 font-bold mb-3 uppercase tracking-wider">Post Graduate Training</p>
                <p className="text-slate-600 text-sm leading-relaxed">Advanced clinical training in complex oral surgerical procedures and emergency management.</p>
              </div>
            </div>
          </div>

          {/* Column 2: Global Fellowships */}
          <div className="space-y-8 glass p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="flex items-center gap-4 text-secondary border-b border-slate-100 pb-6">
              <div className="p-3 bg-secondary/10 rounded-2xl"><Globe2 size={28} /></div>
              <h2 className="text-2xl font-bold text-slate-900">Global Training</h2>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-2 before:-translate-x-1/2 before:h-[90%] before:w-0.5 before:bg-gradient-to-b before:from-secondary/50 before:via-slate-200 before:to-transparent">
              <div className="relative pl-8 hover:-translate-y-1 transition-transform">
                <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-white border-4 border-secondary shadow-sm -translate-x-1/2"></div>
                <h3 className="font-bold text-xl text-slate-900">Orthodontic Certification</h3>
                <p className="text-sm text-secondary font-bold mb-3 uppercase tracking-wider">Certified Training</p>
                <p className="text-slate-600 text-sm leading-relaxed">Specialized training in corrective dental alignment using the latest braces and aligner technologies.</p>
              </div>
              
              <div className="relative pl-8 hover:-translate-y-1 transition-transform">
                <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-white border-4 border-slate-300 shadow-sm -translate-x-1/2"></div>
                <h3 className="font-bold text-xl text-slate-900">Endodontic Specialized Training</h3>
                <p className="text-sm text-slate-400 font-bold mb-3 uppercase tracking-wider">India</p>
                <p className="text-slate-600 text-sm leading-relaxed">Advanced training in microscopic root canal treatments and conservative dentistry.</p>
              </div>
            </div>
          </div>

          {/* Column 3: Awards & Publications (Full Width) */}
          <div className="md:col-span-2 space-y-6 md:space-y-8 glass p-6 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-2xl"><Trophy size={28} /></div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Awards & Achievements</h2>
              </div>
              <p className="text-slate-500 text-xs md:text-sm md:ml-auto max-w-sm leading-relaxed">A track record of groundbreaking contributions to dental literature and clinical excellence.</p>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {[
                "Certified Specialist in Dental Implants and Aesthetic Dentistry.",
                "BMDC Registered Dental Practitioner (Reg No: 2677).",
                "Advanced training in Painless Root Canal Treatments (India).",
                "Expert in Oral and Maxillofacial Surgical procedures.",
                "Dedication to modern orthodontic solutions for children and adults.",
                "Providing an 'Exclusive Dental Solution' with a 100% patient-first approach."
              ].map((achievement, idx) => (
                <li key={idx} className="flex gap-3 md:gap-4 items-start bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:bg-slate-100 transition-colors cursor-default">
                  <BookOpen className="text-accent shrink-0 mt-1 w-4 h-4 md:w-[18px] md:h-[18px]" />
                  <span className="text-slate-700 text-xs md:text-sm font-medium leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
