import ShareButtons from "@/components/ShareButtons";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock database fetching based on slug
const getArticle = (slug: string) => {
  const articles = {
    "future-of-minimally-invasive-spine-surgery": {
      title: "The Future of Minimally Invasive Spine Surgery: What You Need to Know",
      excerpt: "Advancements in micro-neurosurgery are reducing recovery times from months to days. Dr. Name explores the cutting-edge technology that makes it possible.",
      author: "Dr. Neurologist",
      date: "Mar 20, 2024",
      category: "Medical Innovation",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200",
      content: [
        { type: 'p', text: 'Minimally invasive spine surgery (MISS) is rapidly transforming the landscape of neurological treatment. For decades, traditional open spine surgery required large incisions, significant muscle disruption, and prolonged recovery periods. Today, advancements in micro-neurosurgery are flipping that narrative completely on its head.' },
        { type: 'h2', text: 'The Evolution of Spinal Care' },
        { type: 'p', text: 'Unlike open surgery, MISS relies on small incisions—often less than an inch. Specialized tubular retractors are inserted through the skin and soft tissues down to the spinal column. This creates a tunnel through which the surgeon can operate, preserving the surrounding muscle architecture.' },
        { type: 'p', text: 'This technique significantly reduces postoperative pain and dramatically shortens recovery times. Patients who previously required months of intense physical therapy are now returning to their normal lives in a matter of weeks, sometimes days.' },
        { type: 'quote', text: 'The goal is no longer just to fix the spine, but to restore the patient’s life with as little disruption to their body as structurally possible.' },
        { type: 'h2', text: 'Key Technologies Driving the Change' },
        { type: 'p', text: 'Several groundbreaking technologies are making these procedures safer and more effective:' },
        { type: 'ul', items: [
          'Intraoperative 3D Imaging: Real-time, high-resolution scans allow surgeons to navigate the spine with pinpoint accuracy.',
          'Robotic-Assisted Navigation: Robotic arms provide unparalleled stability and precision during implant placement.',
          'Endoscopic Visualization: High-definition cameras inserted through tiny incisions give surgeons a magnified, clear view of the spinal nerves without needing to open the back.'
        ]},
        { type: 'h2', text: 'Is MISS Right for You?' },
        { type: 'p', text: 'While minimally invasive techniques are ideal for treating conditions like herniated discs, spinal stenosis, and spinal instability, they aren’t suitable for every patient. Complex deformities or severe revisions may still require traditional approaches.' },
        { type: 'p', text: 'A thorough consultation, coupled with advanced MRI and CT imaging, is absolutely essential to determine the best customized surgical strategy for your specific anatomy.' }
      ]
    },
    // Add default fallback for the other demo articles
    "default": {
      title: "Medical Insights & Surgical Breakthroughs",
      excerpt: "A deep dive into the latest advancements in neurosurgery and patient care protocols.",
      author: "Dr. Neurologist",
      date: "Mar 15, 2024",
      category: "Neurology",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80&w=1200",
      content: [
        { type: 'p', text: 'Modern neurosurgery fundamentally relies on a synthesis of advanced technology and rigorous clinical judgment. This synthesis allows us to treat complex conditions that were previously considered inoperable.' },
        { type: 'h2', text: 'Understanding the Complexities' },
        { type: 'p', text: 'Every patient is unique, and so is every surgical intervention. Our approach is characterized by detailed pre-operative planning, utilizing high-resolution imaging to map out the safest surgical corridors.' },
        { type: 'quote', text: 'Medical excellence is not a destination, but a continuous journey of learning and applying new knowledge to patient care.' },
        { type: 'p', text: 'As we continue to push the boundaries of medical science, the most important element remains the doctor-patient relationship—built on trust, transparency, and a shared goal of recovery.' }
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
              if (block.type === 'ul' && 'items' in block && block.items) {
                return (
                  <ul key={idx} className="mb-6 space-y-3 list-none pl-0">
                    {block.items.map((item, i) => (
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
            <h4 className="text-xl font-bold text-slate-600">{article.author}</h4>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
              Chief Neurosurgeon with 15+ years of experience specializing in complex brain and spine surgeries. Dedicated to advancing medical science and patient recovery in Bangladesh.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
