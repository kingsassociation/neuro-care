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
    <section id="about" className="relative pt-4 pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 lg:p-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side - Visual */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-slate-100 p-2">
            <div className="rounded-[2.5rem] overflow-hidden relative">
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
          <div className="absolute -bottom-8 -right-8 glass p-8 rounded-[2rem] shadow-2xl z-20 space-y-2 border border-white/40">
            <p className="text-4xl font-bold text-primary tracking-tighter">15+</p>
            <p className="text-sm font-bold text-foreground/60 uppercase tracking-widest">Years Experience</p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        </div>

        {/* Right Side - Storytelling */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Know Your Surgeon</h2>
            <h3 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              A Journey Dedicated to Your <span className="text-gradient">Neurological Health</span>
            </h3>
          </div>

          <div className="space-y-6 text-lg lg:text-xl text-foreground/70 leading-relaxed">
            <p>
              As a dedicated Neurosurgeon at Chattogram Medical College, my entire career has been focused on mastering the immense complexities of the human brain and spine. 
            </p>
            <p>
              Thousands of successful surgeries later, my mission remains unchanged: to bring the world’s most advanced, minimally invasive surgical techniques directly to the people of Bangladesh with supreme care and zero compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            {milestones.map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="bg-primary/10 text-primary p-3 rounded-2xl h-fit group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-primary/10">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-foreground/60 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-6">
            <Link href="/about">
              <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 text-lg rounded-2xl font-bold shadow-xl shadow-primary/30 transition-all active:scale-95">
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
