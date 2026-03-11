import { ArrowLeft, Eye, FileText, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="py-12 px-4 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:-translate-x-1 transition-transform bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="bg-white p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-xl space-y-8 md:space-y-10">
          <div className="space-y-3 md:space-y-4 text-center border-b border-slate-100 pb-8 md:pb-10">
            <div className="inline-flex p-3 md:p-4 bg-primary/10 text-primary rounded-xl md:rounded-2xl mb-1 md:mb-2">
              <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 text-xs md:text-sm font-medium uppercase tracking-[0.2em]">Last Updated: March 2026</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Eye className="text-primary" size={24} /> 1. Overview
              </h2>
              <p className="text-slate-600 leading-relaxed">
                At Masum's Dental Clinic, we prioritize the privacy and security of our patients' information. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our website and booking services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Lock className="text-primary" size={24} /> 2. Information We Collect
              </h2>
              <p className="text-slate-600 leading-relaxed">
                When you request a serial or book an appointment, we collect the following information:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  "Full Name & Age",
                  "Phone Number",
                  "Dental Concerns (Short description)",
                  "Appointment Preferences",
                  "Device & IP Information (for security)"
                ].map((item, idx) => (
                  <li key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 font-medium flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <FileText className="text-primary" size={24} /> 3. How We Use Your Data
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Your information is used strictly for medical coordination and service improvement:
              </p>
              <div className="space-y-3">
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">01</div>
                  <p className="text-slate-600 text-sm italic">To verify and confirm your dental serial/appointment via phone call.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">02</div>
                  <p className="text-slate-600 text-sm italic">To provide the chamber assistant with necessary patient context before your visit.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">03</div>
                  <p className="text-slate-600 text-sm italic">To enhance website security and prevent fraudulent booking attempts.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <ShieldCheck className="text-primary" size={24} /> 4. Data Protection
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We implement industry-standard encryption and security protocols to ensure that your medical and personal details are handled with the highest level of confidentiality. We never sell or share your data with third-party marketing agencies.
              </p>
            </section>

            <div className="pt-10 border-t border-slate-100">
              <p className="text-slate-500 text-sm text-center">
                For any privacy-related inquiries, please contact us at <span className="text-primary font-bold">info@masumsdental.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
