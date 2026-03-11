import { ArrowLeft, BookOpen, ChevronRight, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredArticle = {
  title: "The Science of Modern Dental Implants: Why They Are the Best Solution",
  excerpt: "Advancements in dental implantology are revolutionizing how we replace missing teeth. Dr. Abdullah Al Masum explores the cutting-edge technology behind permanent smile restoration.",
  date: "Mar 20, 2026",
  category: "Innovation",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200",
  slug: "science-of-modern-dental-implants"
};

const articles = [
  {
    title: "Wisdom Tooth Extraction: When Is Surgery Necessary?",
    excerpt: "Learn about the symptoms that indicate your wisdom teeth need to be removed and what to expect during the painless procedure.",
    date: "Mar 12, 2026",
    category: "Oral Surgery",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
    slug: "wisdom-tooth-extraction-guide"
  },
  {
    title: "Orthodontics for Adults: It's Never Too Late for a Perfect Smile",
    excerpt: "Discover modern alignment options from ceramic braces to clear aligners that fit your professional lifestyle.",
    date: "Feb 28, 2026",
    category: "Orthodontics",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    slug: "orthodontics-for-adults"
  },
  {
    title: "Root Canal Treatment: Debunking Common Pain Myths",
    excerpt: "Many fear root canals, but with modern anesthesia and techniques, it's no more uncomfortable than a standard filling.",
    date: "Jan 15, 2026",
    category: "Endodontics",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=800",
    slug: "root-canal-myths-vs-facts"
  },
  {
    title: "Aesthetic Dentistry: Smile Makeovers That Change Lives",
    excerpt: "A comprehensive look at veneers, whitening, and contouring to achieve the exclusive dental solution you deserve.",
    date: "Nov 30, 2025",
    category: "Aesthetics",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    slug: "aesthetic-dentistry-makeovers"
  }
];

export default function BlogPage() {
  return (
    <div className="py-6 px-4 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:-translate-x-1 transition-transform bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
          <ArrowLeft size={20} /> Back to Homepage
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 border-b-4 border-primary pb-4 inline-block leading-[1.1]">
              Oral Health Journal
            </h1>
            <p className="text-lg lg:text-xl text-slate-600">
              Expert dental insights, preventative care tips, and breakthrough surgical news directly from Dr. Abdullah Al Masum.
            </p>
          </div>
          
          <div className="glass bg-white p-2 rounded-2xl flex border border-slate-200 shadow-sm w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="px-4 py-2 w-full md:w-64 bg-transparent focus:outline-none text-slate-700 placeholder:text-slate-400"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Featured Article */}
        <Link href={`/blog/${featuredArticle.slug}`} className="block glass bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg group cursor-pointer hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/5 relative h-64 lg:h-[500px] overflow-hidden">
              <Image 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/80 md:from-transparent to-transparent"></div>
              <div className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <Tag size={12} fill="currentColor" /> Featured
              </div>
            </div>
            
            <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Tag size={14} className="text-primary"/> {featuredArticle.category}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="flex items-center gap-1.5"><Clock size={14}/> {featuredArticle.readTime}</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>
              
              <div className="pt-6">
                <button className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all">
                  Read Full Article <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </Link>

        {/* Latest Articles Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">Latest Insights</h2>
            <div className="h-0.5 flex-grow mx-8 bg-slate-100 hidden sm:block"></div>
            <button className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, idx) => (
              <Link href={`/blog/${article.slug}`} key={idx} className="block glass bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md group hover:-translate-y-2 hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm border border-slate-100">
                    <Tag size={12} className="text-primary"/> {article.category}
                  </div>
                </div>
                
                <div className="p-6 space-y-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1"><BookOpen size={12}/> {article.readTime}</span>
                  </div>
                  
                  <div className="space-y-2 flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-50">
                    <button className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                      Read More <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
