"use client";

import { Award, BookOpen, Globe, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const milestones = [
  {
    icon: <GraduationCap size={24} />,
    title: "Education",
    desc: "MBBS, FCPS (Neurosurgery) from Chattogram Medical College."
  },
  {
    icon: <Award size={24} />,
    title: "Current Role",
    desc: "Senior Consultant at Chattogram Medical College Hospital."
  },
  {
    icon: <Globe size={24} />,
    title: "Global Training",
    desc: "Fellowship in Minimally Invasive Spine Surgery from UK."
  },
  {
    icon: <BookOpen size={24} />,
    title: "Research & Media",
    desc: "Extensive publications in international neurology journals."
  }
];

const About = () => {
  return (
    <section id="about" className="relative pt-2 md:pt-4 pb-6 md:pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-[2rem] md:rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left Side - Visual */}
        <div className="w-full lg:w-1/2 relative space-y-4">
          <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-slate-100 p-2">
            <div className="rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 pointer-events-none"></div>
              <Image 
                src="/doctor.png" 
                alt="About Doctor" 
                width={600} 
                height={800}
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              />
            </div>
          </div>
          
          {/* Floating Stats */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 glass p-4 md:p-8 rounded-2xl md:rounded-[2rem] shadow-2xl z-20 space-y-1 md:space-y-2 border border-white/40">
            <p className="text-2xl md:text-4xl font-bold text-primary tracking-tighter">15+</p>
            <p className="text-[10px] md:text-sm font-bold text-foreground/60 uppercase tracking-widest">Years Experience</p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        </div>

        {/* Right Side - Storytelling */}
        <div className="w-full lg:w-1/2 space-y-5 md:space-y-6 pt-4 md:pt-0">
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-sm">Know Your Surgeon</h2>
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
              A Journey Dedicated to Your <span className="text-gradient">Neurological Health</span>
            </h3>
          </div>

          <div className="space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl text-foreground/70 leading-relaxed">
            <p>
              As a dedicated Neurosurgeon at Chattogram Medical College, my entire career has been focused on mastering the immense complexities of the human brain and spine. 
            </p>
            <p>
              Thousands of successful surgeries later, my mission remains unchanged: to bring the world’s most advanced, minimally invasive surgical techniques directly to the people of Bangladesh with supreme care and zero compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 pt-2 md:pt-4">
            {milestones.map((item, idx) => (
              <div key={idx} className="flex gap-3 md:gap-4 group">
                <div className="bg-primary/10 text-primary p-2.5 md:p-3 rounded-xl md:rounded-2xl h-fit group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-primary/10">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-foreground mb-0.5 md:mb-1">{item.title}</h4>
                  <p className="text-[12px] md:text-sm text-foreground/60 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 md:pt-6">
            <Link href="/about" className="block w-full sm:w-auto">
              <button className="w-full bg-primary hover:bg-primary/90 text-white px-8 md:px-10 py-3.5 md:py-4 text-base md:text-lg rounded-xl md:rounded-2xl font-bold shadow-xl shadow-primary/30 transition-all active:scale-95">
                Read My Full Academic Journey
              </button>
            </Link>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
