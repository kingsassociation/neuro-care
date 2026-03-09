import { Activity, ArrowLeft, Brain, CalendarDays, Clock, FileSearch, ShieldAlert, ShieldCheck, UserCheck, ZapIcon } from "lucide-react";
import Link from "next/link";

const detailedServices = [
  {
    category: "Neurosurgery & Oncology",
    id: "neurosurgery-oncology",
    icon: <Brain className="text-primary" size={28} />,
    items: [
      {
        title: "Microscopic Brain Tumor Surgery",
        desc: "Advanced surgical resection of gliomas, meningiomas, and pituitary tumors utilizing state-of-the-art neuro-navigation and awake craniotomy techniques to ensure maximal tumor removal with zero neurological deficits.",
        recovery: "4-6 Weeks",
        hospitalDelay: "3-5 Days",
        focus: "Complete resection with functional preservation."
      },
      {
        title: "Cerebral Aneurysm Clipping",
        desc: "Emergency and elective microsurgical clipping of brain aneurysms to prevent catastrophic hemorrhages, performed with intraoperative indocyanine green (ICG) angiography.",
        recovery: "6-8 Weeks",
        hospitalDelay: "5-7 Days",
        focus: "Vascular securing and stroke prevention."
      }
    ]
  },
  {
    category: "Advanced Spine Surgery",
    id: "spine-surgery",
    icon: <Activity className="text-secondary" size={28} />,
    items: [
      {
        title: "Minimally Invasive Spine Surgery (MISS)",
        desc: "Keyhole surgery for herniated discs and spinal stenosis. Patients experience significantly less blood loss, negligible muscle damage, and can often walk within 24 hours of the operation.",
        recovery: "2-4 Weeks",
        hospitalDelay: "1-2 Days",
        focus: "Rapid mobility and pain relief."
      },
      {
        title: "Spinal Fusion & Deformity Correction",
        desc: "Complex reconstructive surgeries using pedicle screws and rods to correct scoliosis, kyphosis, and severe spinal trauma.",
        recovery: "8-12 Weeks",
        hospitalDelay: "4-6 Days",
        focus: "Structural stability and nerve decompression."
      }
    ]
  },
  {
    category: "Vascular & Emergency Neurology",
    id: "vascular-emergency",
    icon: <ShieldAlert className="text-accent" size={28} />,
    items: [
      {
        title: "Acute Stroke Intervention",
        desc: "Rapid response medical and surgical management for ischemic and hemorrhagic strokes, including decompressive craniectomy for massive brain swelling.",
        recovery: "Varies (Long Term)",
        hospitalDelay: "7-14 Days",
        focus: "Brain tissue salvage."
      },
      {
        title: "Traumatic Brain Injury (TBI)",
        desc: "Round-the-clock emergency surgical care for epidural, subdural hematomas, and skull fractures resulting from severe accidents.",
        recovery: "Varies",
        hospitalDelay: "7+ Days",
        focus: "Intracranial pressure management."
      }
    ]
  },
  {
    category: "Functional Neurology",
    id: "functional-neurology",
    icon: <ZapIcon className="text-blue-500" size={28} />,
    items: [
      {
        title: "Epilepsy Surgery",
        desc: "Lesionectomy and temporal lobectomy for patients suffering from medically refractory (drug-resistant) epilepsy.",
        recovery: "4-6 Weeks",
        hospitalDelay: "3-5 Days",
        focus: "Seizure freedom."
      },
      {
        title: "Peripheral Nerve Surgery",
        desc: "Microsurgical decompression for Carpal Tunnel Syndrome and complex nerve repairs following severe trauma.",
        recovery: "2-4 Weeks",
        hospitalDelay: "Outpatient",
        focus: "Nerve regeneration and pain cessation."
      }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="py-6 px-4 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <Link href="/#services" className="inline-flex items-center gap-2 text-primary font-bold hover:-translate-x-1 transition-transform bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
          <ArrowLeft size={20} /> Back to Overview
        </Link>

        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-block bg-primary/10 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-sm font-bold tracking-widest uppercase border border-primary/20">
            Surgical Offerings
          </div>
          <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.2] md:leading-[1.1]">
            Specialized <span className="text-primary italic">Treatments</span>
          </h1>
          <p className="text-base md:text-xl text-slate-600 leading-relaxed">
            A deeply detailed catalog of surgical methodologies and medical interventions performed with world-class precision at Sevron Hospital and Epic Health Care.
          </p>
        </div>

        <div className="space-y-6">
          {detailedServices.map((section, idx) => (
            <div key={idx} className="space-y-8" id={section.id}>
              <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-200">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100/50">
                  {section.icon}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{section.category}</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {section.items.map((item, i) => (
                   <div key={i} className="glass bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-500 space-y-5 md:space-y-6 group">
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-base md:text-lg">{item.desc}</p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-100 space-y-4">
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="flex items-start gap-2.5 md:gap-3">
                          <CalendarDays className="text-primary mt-0.5 w-4 h-4 md:w-[18px] md:h-[18px]" />
                          <div>
                            <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recovery Time</p>
                            <p className="text-xs md:text-sm font-bold text-slate-700">{item.recovery}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 md:gap-3">
                          <Clock className="text-secondary mt-0.5 w-4 h-4 md:w-[18px] md:h-[18px]" />
                          <div>
                            <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hospital Stay</p>
                            <p className="text-xs md:text-sm font-bold text-slate-700">{item.hospitalDelay}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-3 md:pt-4 border-t border-slate-200 flex items-start gap-3">
                        <ShieldCheck className="text-green-500 mt-0.5 w-4 h-4 md:w-[18px] md:h-[18px]" />
                        <div>
                          <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Focus</p>
                          <p className="text-xs md:text-sm font-bold text-slate-700">{item.focus}</p>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 md:space-y-3 pt-1">
                      <li className="flex items-center gap-3 text-xs md:text-sm font-medium text-slate-600 bg-white border border-slate-100 px-3.5 py-2 rounded-xl shadow-sm">
                        <UserCheck className="text-primary w-4 h-4 md:w-[18px] md:h-[18px]" /> Expert Consultation Available
                      </li>
                      <li className="flex items-center gap-3 text-xs md:text-sm font-medium text-slate-600 bg-white border border-slate-100 px-3.5 py-2 rounded-xl shadow-sm">
                        <FileSearch className="text-secondary w-4 h-4 md:w-[18px] md:h-[18px]" /> Diagnostic Imaging Required
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="glass bg-primary/5 border border-primary/20 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 text-center space-y-6 md:space-y-8 mt-8 md:mt-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-5 md:space-y-6">
            <h2 className="text-2xl md:text-5xl font-bold text-slate-900 leading-tight">Ready to take the next step?</h2>
            <p className="text-base md:text-lg text-slate-600">
              Schedule a comprehensive medical evaluation with our team to discuss your tailored treatment plan.
            </p>
            <div className="pt-2 md:pt-4">
              <Link href="/#appointments" className="inline-block">
                <button className="bg-primary text-white px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 active:scale-95 transition-all text-base md:text-lg flex items-center gap-2 md:gap-3 mx-auto">
                  <CalendarDays size={20} /> Book a Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
