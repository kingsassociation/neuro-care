import ShareButtons from "@/components/ShareButtons";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ContentBlock = 
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] };

// Mock database fetching based on slug
const getArticle = (slug: string) => {
  const articles: Record<string, {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    content: ContentBlock[];
  }> = {
    "science-of-modern-dental-implants": {
      title: "The Science of Modern Dental Implants: Why They Are the Best Solution",
      excerpt: "Advancements in dental implantology are revolutionizing how we replace missing teeth. Dr. Abdullah Al Masum explores the cutting-edge technology behind permanent smile restoration.",
      author: "Dr. Abdullah Al Masum",
      date: "Mar 20, 2026",
      category: "Innovation",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200",
      content: [
        { type: 'p', text: 'Dental implants have become the gold standard for tooth replacement, offering a permanent solution that looks, feels, and functions like natural teeth. Unlike bridges or dentures, implants are surgically placed into the jawbone, where they serve as the roots of missing teeth.' },
        { type: 'h2', text: 'Why Choose Implants?' },
        { type: 'p', text: 'One of the primary advantages of dental implants is their ability to preserve bone health. When a tooth is lost, the underlying bone can begin to deteriorate. Implants stimulate the bone, preventing this loss and maintaining the facial structure.' },
        { type: 'p', text: 'At Masum\'s Dental Clinic, we utilize advanced 3D imaging to plan each procedure with surgical precision. This ensures optimal placement and long-term success for our patients.' },
        { type: 'quote', text: 'A dental implant isn\'t just a replacement for a tooth; it\'s an investment in your oral health and self-confidence.' },
        { type: 'h2', text: 'The Procedure' },
        { type: 'p', text: 'The process involves placing a titanium post into the jaw. Once the post integrates with the bone (a process called osseointegration), a custom-made crown is attached. The result is a seamless restoration that can last a lifetime with proper care.' }
      ]
    },
    // Add default fallback for the other demo articles
    "default": {
      title: "Modern Dental Care & Breakthroughs",
      excerpt: "A deep dive into the latest advancements in dentistry and patient care protocols.",
      author: "Dr. Abdullah Al Masum",
      date: "Mar 15, 2026",
      category: "Dental Health",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
      content: [
        { type: 'p', text: 'Modern dentistry is about more than just fixing teeth; it\'s about comprehensive oral wellness. By combining advanced technology with patient-centric care, we can achieve outcomes that were once thought impossible.' },
        { type: 'h2', text: 'Commitment to Excellence' },
        { type: 'p', text: 'Our practice is built on a foundation of continuous learning and innovation. Whether it\'s a simple filling or a complex oral surgery, we approach every case with the same level of dedication and precision.' },
        { type: 'quote', text: 'Your smile is our priority, and excellence in dental care is our commitment.' },
        { type: 'p', text: 'We invite you to experience the difference that specialized, exclusive dental care can make for your life.' }
      ]
    }
  };

  return articles[slug as keyof typeof articles] || articles["default"];
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-6 px-4 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10 pt-4 pb-10">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:-translate-x-1 transition-transform bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
            <ArrowLeft size={20} /> Back to Journal
          </Link>
          <ShareButtons title={article.title} />
        </div>

        {/* Article Header */}
        <div className="space-y-6 text-center pt-6 md:pt-8">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase border border-primary/20">
            {article.category}
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.2] max-w-3xl mx-auto">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest pt-4">
            <span className="flex items-center gap-1.5 text-primary"><Calendar size={16} /> {article.date}</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full hidden sm:block"></span>
            <span className="flex items-center gap-1.5"><Clock size={16} /> {article.readTime}</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full hidden sm:block"></span>
            <span>By {article.author}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-video md:aspect-[21/9] relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white mt-6">
          <Image 
            src={article.image} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Content Area */}
        <div className="glass bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-sm mt-6">
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed md:text-xl">
            {article.content.map((block, idx) => {
              if (block.type === 'p') {
                return <p key={idx} className="mb-6">{block.text}</p>;
              }
              if (block.type === 'h2') {
                return <h2 key={idx} className="text-2xl lg:text-3xl font-bold text-slate-900 mt-8 mb-4 tracking-tight">{block.text}</h2>;
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={idx} className="my-6 border-l-4 border-primary pl-6 py-2 italic font-medium text-xl lg:text-2xl text-slate-800 bg-primary/5 rounded-r-2xl pr-6">
                    "{block.text}"
                  </blockquote>
                );
              }
              if (block.type === 'ul') {
                return (
                  <ul key={idx} className="mb-6 space-y-3 list-none pl-0">
                    {block.items.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Author Footer */}
        <div className="glass bg-slate-900 border border-slate-800 text-white rounded-[2rem] p-8 mt-6 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shrink-0 bg-slate-800 relative">
            <Image 
              src="/doctor.png" 
              alt={article.author} 
              fill
              className="object-cover object-top" 
            />
          </div>
          <div className="text-center sm:text-left space-y-2">
            <p className="text-sm font-bold text-primary uppercase tracking-widest">About the Author</p>
            <h4 className="text-xl font-bold text-white">{article.author}</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              Specialized Dental Surgeon with advanced training in Oral Surgery and Orthodontics. Dedicated to providing 'Exclusive Dental Solutions' and improving oral health outcomes in Chattogram.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
