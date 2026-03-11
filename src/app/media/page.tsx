"use client";

import { ArrowLeft, Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const photos = [
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600", alt: "Modern Dental Clinic" },
  { src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600", alt: "Dental Surgery Equipment" },
  { src: "https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?auto=format&fit=crop&q=80&w=600", alt: "Patient Consultation" },
  { src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600", alt: "Dental Implants" },
  { src: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600", alt: "Sterilized Instruments" },
  { src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600", alt: "Smiling Patient" }
];

const videos = [
  { 
    title: "The Future of Dental Implants", 
    desc: "Dr. Abdullah Al Masum explains the benefits of modern dental implants.",
    duration: "10:20",
    thumb: "",
    video: `<iframe width="560" height="315" src="https://www.youtube.com/embed/5-7n9M-K6-I?si=WpXG2mFw0V8b6V7z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  { 
    title: "Painless Wisdom Tooth Surgery", 
    desc: "A seminar on the latest techniques for surgical tooth extraction.",
    duration: "15:45",
    thumb: "",
    video: `<iframe width="560" height="315" src="https://www.youtube.com/embed/j_N8lVp3p-k?si=E1nO9qD4uG6g9r8z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  { 
    title: "Corrective Braces for All Ages", 
    desc: "Educational content on orthodontic treatments and options.",
    duration: "07:30",
    thumb: "",
    video: `<iframe width="560" height="315" src="https://www.youtube.com/embed/9kaHD0uSBDQ?si=EmifKyH028qIVdO_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo");

  return (
    <div className="py-6 px-4 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:-translate-x-1 transition-transform bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 self-start md:self-auto">
            <ArrowLeft size={20} /> Back to Homepage
          </Link>
          
          {/* Custom Tab Switcher */}
          <div className="glass bg-white rounded-full p-2 flex gap-2 border border-slate-200 shadow-sm w-full md:w-auto">
            <button 
              onClick={() => setActiveTab("photo")}
              className={`flex-1 md:flex-none px-3 py-2 rounded-full font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'photo' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <ImageIcon size={18} /> Gallery
            </button>
            <button 
              onClick={() => setActiveTab("video")}
              className={`flex-1 md:flex-none px-3 py-2 rounded-full font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'video' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Video size={18} /> Seminars & TV
            </button>
          </div>
        </div>
        
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] whitespace-nowrap">
            Media & <span className="text-secondary italic">Gallery</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
            Explore our state-of-the-art dental clinic, surgical milestones, and educational health broadcasts by Dr. Abdullah Al Masum.
          </p>
        </div>

        {/* Photo Gallery (Masonry style layout) */}
        {activeTab === "photo" && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {photos.map((photo, idx) => (
              <div key={idx} className="break-inside-avoid relative rounded-[2rem] overflow-hidden border-4 border-white shadow-md group cursor-pointer hover:shadow-xl transition-shadow duration-500">
                <Image 
                  src={photo.src} 
                  alt={photo.alt} 
                  width={600}
                  height={idx % 2 === 0 ? 800 : 400}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-bold text-lg">{photo.alt}</p>
                    <p className="text-white/70 text-sm">Medical Gallery</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Gallery */}
        {activeTab === "video" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {videos.map((vid, idx) => (
              <div key={idx} className="glass rounded-[2rem] overflow-hidden border border-slate-200 shadow-md bg-white group hover:shadow-xl transition-all duration-500 flex flex-col">
                <div 
                  className="aspect-video relative overflow-hidden w-full [&>iframe]:absolute [&>iframe]:top-0 [&>iframe]:left-0 [&>iframe]:w-full [&>iframe]:h-full"
                  dangerouslySetInnerHTML={{ __html: vid.video || "" }}
                />
                
                <div className="p-8 space-y-4 flex-grow flex flex-col justify-start">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-xl text-slate-900 leading-snug transition-colors">{vid.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <span className="bg-slate-100 text-slate-600 text-[10px] uppercase font-bold px-2 py-1 rounded border border-slate-200 tracking-widest">{vid.duration}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{vid.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  );
}
