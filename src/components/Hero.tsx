"use client";

import { CheckCircle2, MoveRight, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative pt-2 md:pt-4 pb-6 md:pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-[2rem] md:rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            {/* Content Left */}
            <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-16 space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/30 shadow-sm">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-foreground/70">Top Dental Specialist in Chattogram</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-[1.2] lg:leading-[1.1] tracking-tight text-foreground">
                An Exclusive <span className="text-primary italic">Dental</span> Solution.
              </h1>

              <p className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-xl">
                Delivering world-class dental care and advanced oral surgery by the leading specialist Dr. Abdullah Al Masum (BDS, PGT).
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <Link href="/#appointments" className="w-full sm:w-auto">
                  <button className="w-full bg-foreground text-background px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                    <span>Book Chamber Now</span>
                    <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <button className="w-full bg-white/20 backdrop-blur-md border border-white/30 px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-lg hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                    <span>View Treatments</span>
                  </button>
                </Link>
              </div>

              {/* Stats Overlay */}
              <div className="pt-4 md:pt-8 flex items-center gap-4 md:gap-6">
                <div className="flex -space-x-4 md:-space-x-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] md:border-4 border-background bg-slate-100/50 backdrop-blur-sm text-primary flex items-center justify-center shadow-sm">
                      <User size={16} />
                    </div>
                  ))}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] md:border-4 border-background bg-primary text-white flex items-center justify-center text-[10px] md:text-xs font-bold shadow-sm z-10">
                    500+
                  </div>
                </div>
                <div className="space-y-0.5 md:space-y-1">
                  <p className="text-xs md:text-sm font-bold text-foreground">Successful Dental Procedures</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-yellow-500 text-[10px]">★</span>
                    ))}
                    <span className="text-[8px] md:text-[10px] text-foreground/40 font-bold ml-1 uppercase">Top Rated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Right - Hero Image */}
            <div className="w-full lg:w-1/2 relative min-h-[400px] sm:min-h-[500px] lg:min-h-[650px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-overlay"></div>

              <div className="relative z-10 w-[70%] sm:w-[80%] aspect-square max-w-[500px] animate-bounce-slow">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] md:rounded-[3rem] rotate-6 scale-105 -z-10 blur-xl"></div>
                <div className="w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-[6px] md:border-8 border-white/60 shadow-2xl relative">
                  <Image
                    src="/hero-concept.png"
                    alt="Dental Surgery Expertise"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-1/4 left-4 lg:left-0 glass p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl z-20 animate-bounce-slow max-w-[160px] md:max-w-[200px] border border-white/40">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-secondary/20 p-1.5 md:p-2 rounded-lg md:rounded-xl text-secondary">
                    <Phone size={16} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Emergency</p>
                    <p className="text-[10px] md:text-sm font-bold text-foreground whitespace-nowrap">01712-260461</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/4 right-4 lg:right-0 glass p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl z-20 flex items-center gap-2 md:gap-3 border border-white/40">
                <div className="bg-primary/20 p-1.5 md:p-2 rounded-lg md:rounded-xl text-primary">
                  <CheckCircle2 size={18} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-foreground">Active Now</p>
                  <p className="text-[8px] md:text-[10px] text-foreground/50">Consultation Open</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
