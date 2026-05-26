import React from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Ticker from "../../../components/Ticker";
import { ARTICLES } from "../../../data/articles";
import { Compass, Calendar, ArrowLeft, ArrowUpRight, Cpu, HelpCircle } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "ai" },
    { slug: "startup" },
    { slug: "cyber" },
    { slug: "gadget" },
    { slug: "robotics" },
    { slug: "space" },
    { slug: "future" },
    { slug: "reviews" },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Normalize category name
  const normalizedCategory = slug.toLowerCase();
  
  // Filter mock articles matching the slug (case insensitive)
  const categoryArticles = ARTICLES.filter((article) => {
    const artCat = article.category.toLowerCase();
    
    // Support grouping related domains if needed (e.g. AI covers robotics)
    if (normalizedCategory === "ai") return artCat === "ai" || artCat === "robotics";
    if (normalizedCategory === "cyber") return artCat === "cyber";
    if (normalizedCategory === "space") return artCat === "space";
    if (normalizedCategory === "future") return artCat === "future" || artCat === "reviews";
    return artCat === normalizedCategory;
  });

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case "ai": return "ARTIFICIAL INTELLIGENCE & HYPER-COMPUTING";
      case "startup": return "SPACE-TECH & AI ERA STARTUPS";
      case "cyber": return "CYBER DEFENSE & QUANTUM SECURITY";
      case "gadget": return "SPATIAL HARDWARE & DESIGN REVIEWS";
      case "robotics": return "AUTONOMOUS SYSTEM & HUMANOIDS";
      case "space": return "AEROSPACE ORBITAL OPERATIONS";
      case "future": return "FUTURE CIVILIZATION PARADIGMS";
      case "reviews": return "PREMIUM TECHNOLOGY ANALYSIS";
      default: return `${cat.toUpperCase()} COGNITIVE DOMAIN`;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070A] text-white flex flex-col justify-between selection:bg-blue-600/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="orbital-grid opacity-10" />
        <div className="orbital-dots opacity-25" />
        <div className="space-glow-1" />
        <div className="noise-overlay" />
      </div>

      {/* Sticky Header */}
      <Navbar />

      <main className="flex-grow pt-24 pb-16 relative z-10">
        <Ticker />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
          
          {/* Breadcrumb & Go Back */}
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-slate-500 hover:text-blue-400 uppercase transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>RETURN TO MAIN DECK</span>
            </Link>
          </div>

          {/* Sector Category Banner */}
          <div className="border-b border-white/5 pb-8 mb-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest">
              <Compass className="h-4 w-4" />
              <span>DOMAIN ARCHIVE // SECTOR: {normalizedCategory}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-none text-white uppercase text-gradient">
              {getCategoryTitle(normalizedCategory)}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
              Archived technical records, geopolitical analyses, and deep reporting indexes mapped under the {normalizedCategory.toUpperCase()} node clusters.
            </p>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Grid of Articles - Span 8 */}
            <div className="lg:col-span-8">
              {categoryArticles.length === 0 ? (
                <div className="bg-space-secondary/20 border border-white/5 rounded-xl p-12 text-center space-y-4">
                  <HelpCircle className="h-10 w-10 text-slate-500 mx-auto" />
                  <p className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                    NO DISPATCHES FILED IN THIS DOMAIN NODE
                  </p>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto font-sans leading-relaxed">
                    Our reporting assets have not filed telemetry logs for this segment within the current epoch. Check back shortly.
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[10px] tracking-widest px-4 py-2.5 rounded uppercase"
                  >
                    Return to Mission Control
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryArticles.map((article) => (
                    <article
                      key={article.slug}
                      className="group flex flex-col bg-space-secondary/30 rounded-xl border border-white/5 overflow-hidden hover:border-blue-500/20 hover:bg-space-secondary/50 transition-all duration-300 relative"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-space-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 filter brightness-90 group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-black/90 to-transparent" />
                        <span className="absolute top-4 left-4 bg-blue-600/90 text-white font-mono text-[8px] font-bold tracking-widest px-2.5 py-0.5 rounded uppercase">
                          {article.category}
                        </span>
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                            {article.date} // {article.readTime}
                          </span>
                          <h2 className="text-sm sm:text-base font-heading font-black text-white uppercase leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                            <Link href={`/article/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h2>
                          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="border-t border-white/5 pt-3.5 flex items-center justify-between text-[9px] font-mono text-slate-500">
                          <span>
                            BY <strong className="text-slate-300">{article.author.toUpperCase()}</strong>
                          </span>
                          <Link
                            href={`/article/${article.slug}`}
                            className="inline-flex items-center gap-1 text-blue-400 font-bold group-hover:underline"
                          >
                            <span>OPEN LOGS</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Telemetry Logs - Span 4 */}
            <div className="lg:col-span-4 bg-space-secondary/20 border border-white/5 rounded-xl p-5 md:p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-widest">
                  <Cpu className="h-4 w-4" />
                  <span>SECTOR HUD CONSOLE</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              </div>

              <div className="text-[9px] font-mono text-slate-400 space-y-4">
                <div className="space-y-1">
                  <div className="text-slate-500 uppercase tracking-widest">CURRENT DOMAIN SEGMENT</div>
                  <div className="text-white uppercase font-bold">{normalizedCategory} NODE</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 uppercase tracking-widest">TOTAL ARCHIVE DISPATCHES</div>
                  <div className="text-white font-bold">{categoryArticles.length} LOGS SECURED</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 uppercase tracking-widest">TRANSMISSION FREQUENCY</div>
                  <div className="text-blue-400 font-bold">144.6 MHZ // ULTRA-BAND</div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-3">
                <h4 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  SYSTEM SUGGESTIONS
                </h4>
                <ul className="text-[10px] font-mono text-slate-400 space-y-2">
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">&gt;</span>
                    <span>Review ASML silicon EUV lithography systems.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">&gt;</span>
                    <span>Read OpenAI Orion parameter details.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-space-black/60 border border-white/5 rounded-lg p-4 text-[9px] font-mono text-slate-500 space-y-2">
                <div className="text-blue-400 font-bold uppercase">
                  NODE TRANSMITTER
                </div>
                <p className="leading-relaxed">
                  Active connection to satellite nodes mapping space tech startups, deep robotic actuation, quantum decryption, and semiconductor foundry hot zones.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* SpaceX minimal footer */}
      <Footer />

    </div>
  );
}
