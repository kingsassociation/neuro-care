"use client";

import { CheckCircle2, MoveRight, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative pt-4 pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            {/* Content Left */}
            <div className="w-full lg:w-1/2 p-8 lg:p-16 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-sm">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                <span className="text-xs font-bold tracking-wider uppercase text-foreground/70">Top Neurosurgeon in Chattogram</span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
                Expert <span className="text-primary italic">Neurosurgery</span> & Brain Care.
              </h1>

              <p className="text-lg text-foreground/60 leading-relaxed max-w-xl">
                Delivering world-class neurological care and minimally invasive spine surgery by the leading specialist from Chattogram Medical College.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/#appointments" className="w-full sm:w-auto">
                  <button className="w-full bg-foreground text-background px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                    <span>Book Chamber Now</span>
                    <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <button className="w-full bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                    <span>View Treatments</span>
                  </button>
                </Link>
              </div>

              {/* Stats Overlay */}
              <div className="pt-8 flex items-center gap-6">
                <div className="flex -space-x-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-slate-100/50 backdrop-blur-sm text-primary flex items-center justify-center shadow-sm">
                      <User size={20} />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-background bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm z-10">
                    500+
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Successful Complex Surgeries</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-yellow-500 text-xs">★</span>
                    ))}
                    <span className="text-[10px] text-foreground/40 font-bold ml-1">TOP RATED NEUROLOGIST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Right - Hero Image */}
            <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-[650px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-overlay"></div>
              
              <div className="relative z-10 w-[80%] aspect-square max-w-[500px] animate-bounce-slow">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] rotate-6 scale-105 -z-10 blur-xl"></div>
                <div className="w-full h-full rounded-[3rem] overflow-hidden border-8 border-white/60 shadow-2xl relative">
                  <Image 
                    src="/hero-concept.png"
                    alt="Neurosurgery Expertise" 
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-1/4 left-4 lg:left-0 glass p-4 rounded-2xl shadow-xl z-20 animate-bounce-slow max-w-[200px] border border-white/40">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/20 p-2 rounded-xl text-secondary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Emergency & Info</p>
                    <p className="text-sm font-bold text-foreground whitespace-nowrap">+880 1812-345678</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/4 right-4 lg:right-0 glass p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-white/40">
                <div className="bg-green-500/20 p-2 rounded-xl text-green-500">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Chambers Active</p>
                  <p className="text-[10px] text-foreground/50">Sevron & Epic Health</p>
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
