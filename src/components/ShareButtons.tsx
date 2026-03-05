"use client";

import { Facebook, Link as LinkIcon, Linkedin, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import XIcon from "./icons/XIcon";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url,
      }).catch(console.error);
    } else {
      handleCopyLink();
    }
  };

  if (!url) return null;

  return (
    <div className="hidden sm:flex items-center gap-4 text-slate-400">
      <button onClick={handleNativeShare} className="hover:text-primary transition-colors" title="Share via Device"><Share2 size={20} /></button>
      <div className="w-px h-4 bg-slate-200"></div>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" title="Share on Facebook"><Facebook size={20} /></a>
      <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors" title="Share on X"><XIcon size={20} /></a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors" title="Share on LinkedIn"><Linkedin size={20} /></a>
      <button onClick={handleCopyLink} className="hover:text-primary transition-colors" title="Copy Link"><LinkIcon size={20} /></button>
    </div>
  );
}
