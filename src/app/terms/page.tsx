import { AlertCircle, ArrowLeft, Calendar, Gavel, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="py-12 px-4 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:-translate-x-1 transition-transform bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="bg-white p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-xl space-y-8 md:space-y-10">
          <div className="space-y-3 md:space-y-4 text-center border-b border-slate-100 pb-8 md:pb-10">
            <div className="inline-flex p-3 md:p-4 bg-secondary/10 text-secondary rounded-xl md:rounded-2xl mb-1 md:mb-2">
              <Gavel className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
            <p className="text-slate-500 text-xs md:text-sm font-medium uppercase tracking-[0.2em]">Last Updated: March 2026</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-10">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <AlertCircle className="text-red-500" size={24} /> 1. Medical Disclaimer
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
                <p className="text-red-900 font-bold mb-2 uppercase text-xs tracking-widest">Crucial Information</p>
                <p className="text-red-800 text-sm leading-relaxed">
                  The content on this website is for informational purposes only and does not constitute medical/dental advice, diagnosis, or treatment. Masum's Dental Clinic and Dr. Abdullah Al Masum are not liable for any actions taken based on website content without a personal clinical consultation.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Calendar className="text-primary" size={24} /> 2. Booking & Serials
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our online "Request Serial" system is a reservation tool. A submission does not guarantee an immediate appointment. 
              </p>
              <ul className="space-y-3 list-none p-0">
                <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  Chamber assistants will call you to finalize the serial timing.
                </li>
                <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  Cancellations should be informed at least 24 hours in advance.
                </li>
                <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  Emergency cases may cause delays in scheduled serial timings.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <ShieldAlert className="text-primary" size={24} /> 3. Responsible Use
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Users agree not to provide false information, spam our booking system, or attempt to compromise website security. Any fraudulent activity will result in permanent blocking of the associated phone number/IP.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <AlertCircle className="text-primary" size={24} /> 4. Limitation of Liability
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Masum's Dental Clinic shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our website or online reservation services.
              </p>
            </section>

            <div className="pt-10 border-t border-slate-100">
              <p className="text-slate-500 text-sm text-center italic">
                By using this website, you agree to these terms. If you do not agree, please discontinue use immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
