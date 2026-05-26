"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ARTICLES } from "../data/articles";
import { Newspaper, TrendingUp, Eye, ArrowUpRight } from "lucide-react";

export default function Articles() {
  // Pull all articles except the main featured one for the grid/sidebar
  const gridArticles = ARTICLES.filter(
    (a) => a.slug !== "silicon-hegemony-asml-taiwan-lithography"
  ).slice(0, 4);

  // Sort articles by views/trendingScore for the sidebar
  const trendingArticles = [...ARTICLES]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 5);

  return (
    <section className="py-20 relative overflow-hidden bg-[#05070A] text-left">
      <div className="orbital-grid opacity-10" />
      <div className="orbital-dots opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="border-b border-white/5 pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest">
              <Newspaper className="h-3.5 w-3.5" />
              <span>JOURNAL DISPATCHES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight">
              LATEST <span className="text-blue-500">INTELLIGENCE</span>
            </h2>
            <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-xl">
              Deep reporting at the intersection of orbital flight operations, multi-planetary technology, and advanced neural architectures.
            </p>
          </div>
          
          <div className="text-[10px] font-mono text-slate-500 shrink-0 uppercase tracking-widest hidden md:block">
            FEED FREQUENCY: REAL-TIME // SECURE
          </div>
        </div>

        {/* Dual Column Layout: News Grid (Left) + Trending Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main News Grid (Left) - Span 8 */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridArticles.map((article, idx) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col bg-space-secondary/30 rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-blue-500/20 hover:bg-space-secondary/50 hover:-translate-y-1 relative"
              >
                <Link href={`/article/${article.slug}`} className="flex flex-col h-full w-full">
                  {/* Visual Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-space-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent" />
                    
                    {/* Category Badge overlay */}
                    <span className="absolute top-4 left-4 bg-blue-600/90 text-white font-mono text-[8px] font-bold tracking-widest px-2.5 py-0.5 rounded uppercase border border-blue-400/20">
                      {article.category}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                        {article.date} // {article.readTime}
                      </span>
                      <h3 className="text-sm sm:text-base font-heading font-black text-white uppercase leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Card Bottom Meta */}
                    <div className="border-t border-white/5 pt-3.5 flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <span className="uppercase">
                        BY <strong className="text-slate-300">{article.author}</strong>
                      </span>
                      
                      <div className="inline-flex items-center gap-1 text-blue-400 font-bold group-hover:underline">
                        <span>READ DISPATCH</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Trending Sidebar (Right) - Span 4 */}
          <div className="lg:col-span-4 bg-space-secondary/10 border border-white/5 rounded-xl p-5 md:p-6 space-y-6 relative overflow-hidden">
            {/* Subtle blue accent glow inside sidebar */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full filter blur-xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-widest">
                <TrendingUp className="h-4 w-4" />
                <span>TRENDING CORES</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-blue-500" />
            </div>

            {/* Trending Items List */}
            <div className="space-y-5">
              {trendingArticles.map((article, index) => (
                <div
                  key={article.slug}
                  className="flex gap-4 group items-start border-b border-white/5 pb-4 last:border-0 last:pb-0"
                >
                  {/* Number Indicator */}
                  <span className="font-heading text-2xl font-black text-blue-500/30 group-hover:text-blue-500 transition-colors tracking-tighter leading-none shrink-0 font-mono">
                    0{index + 1}
                  </span>

                  {/* Title & Metadata */}
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">
                      {article.category} // VIEWS: {article.views.toLocaleString()}
                    </span>
                    <h4 className="text-xs font-heading font-black text-white hover:text-blue-400 transition-colors uppercase leading-snug tracking-wide line-clamp-2">
                      <Link href={`/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>
                    <div className="flex items-center justify-between text-[8px] font-mono text-slate-500">
                      <span>BY {article.author.split(" ").pop()}</span>
                      <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {article.trendingScore}% SYNC</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Futuristic Telemetry HUD Widget inside Sidebar */}
            <div className="bg-space-black/60 border border-white/5 rounded-lg p-3.5 text-[9px] font-mono text-slate-500 space-y-2">
              <div className="flex justify-between items-center text-blue-400 font-bold uppercase">
                <span>ORBITAL SECTOR UPDATE</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="leading-relaxed text-slate-500">
                Cognitive telemetry loops mapping ASML, SpaceX Raptor engines, and GPT-6 parameters running smoothly. Sync score nominal.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
