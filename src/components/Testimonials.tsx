"use client";

import { Quote, Star, User } from "lucide-react";

const testimonials = [
  {
    name: "Rahim Uddin",
    role: "Wisdom Tooth Surgery",
    content: "I was very nervous about my wisdom tooth extraction, but Dr. Masum made it completely painless. I was back to my routine the next day!"
  },
  {
    name: "Ayesha Parveen",
    role: "Dental Implant Patient",
    content: "The dental implant procedure was seamless. My new tooth looks and feels completely natural. Truly an exclusive dental solution!"
  },
  {
    name: "Kamal Hossain",
    role: "Aesthetic Dentistry",
    content: "The smile makeover I received has given me a new level of confidence. Dr. Masum's attention to detail is truly world-class."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative pt-2 md:pt-4 pb-6 md:pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass overflow-hidden rounded-[2rem] md:rounded-2xl border border-white/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 md:p-12 lg:p-16 space-y-8 md:space-y-12">
        <div className="text-center space-y-2 md:space-y-4 max-w-2xl mx-auto">
          <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-sm">Patient Reviews</h2>
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
            Stories of <span className="text-gradient">Recovery & Hope</span>
          </h3>
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed px-4 md:px-0">
            Real experiences from patients who entrusted us with their smiles and complex oral surgeries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/40 shadow-sm relative group hover:shadow-xl transition-all duration-500"
            >
              <Quote className="absolute top-4 right-4 text-primary/10 group-hover:text-primary transition-colors duration-500" size={64} />
              
              <div className="space-y-6 relative z-10">
                <div className="flex gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                
                <p className="text-foreground/70 italic leading-relaxed">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-foreground/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg leading-tight">{t.name}</h4>
                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
