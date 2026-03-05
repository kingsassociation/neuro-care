"use client";

import { ArrowUp, Facebook, Linkedin, Stethoscope, Youtube } from "lucide-react";
import Link from "next/link";
import XIcon from "./icons/XIcon";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-slate-900 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[20%] bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-primary p-2 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <Stethoscope size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                Neuro<span className="text-primary">Care</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Delivering world-class neurosurgical and brain care with unparalleled precision. Your trusted destination for complex neurological treatments.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Youtube, Linkedin, XIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-900">Quick Links</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "About Dr.", path: "/about" },
                { name: "Media", path: "/media" },
                { name: "Blogs", path: "/blog" },
                { name: "Book Serial", path: "/#appointments" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="hover:text-primary transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-900">Medical Services</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              {[
                { name: "Specialized Services", path: "/services" },
                { name: "Neurosurgery & Oncology", path: "/services/#neurosurgery-oncology" },
                { name: "Advanced Spine Surgery", path: "/services/#spine-surgery" },
                { name: "Vascular & Emergency Neurology", path: "/services/#vascular-emergency" },
                { name: "Functional Neurology", path: "/services/#functional-neurology" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="hover:text-primary transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-900">Newsletter</h4>
            <p className="text-slate-500 text-sm">Subscribe to get latest health tips and news directly.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex-grow focus:outline-none focus:ring-1 focus:ring-primary transition-all text-slate-900 placeholder:text-slate-400"
              />
              <button className="bg-primary p-3 rounded-xl hover:bg-primary/90 transition-all text-white">
                <ArrowUp className="rotate-90" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400 font-medium">
          <p>© 2026 NeuroCare Surgery. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              Back to Top
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-all text-slate-600 group-hover:text-slate-900">
                <ArrowUp size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
