"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ARTICLES } from "../data/articles";
import { Cpu, Rocket, Sparkles, ArrowRight, Activity, Calendar } from "lucide-react";

export default function SectionFeed() {
  // Sift articles by category
  const aiArticles = ARTICLES.filter((a) => a.category === "AI" || a.category === "Robotics");
  const spaceCyberArticles = ARTICLES.filter((a) => a.category === "Space" || a.category === "Cyber");
  const futureGadgetArticles = ARTICLES.filter(
    (a) => a.category === "Future" || a.category === "Gadget"
  );

  return (
    <div className="bg-[#05070A] py-16 relative">
      <div className="orbital-grid opacity-[0.05]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ========================================================
            ROW 1: AI & ROBOTICS SECTOR - ASYMMETRICAL LAYOUT
           ======================================================== */}
        <section className="space-y-8">
          {/* Row header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-blue-500" />
              <h3 className="font-heading text-lg font-black tracking-widest text-white uppercase">
                COGNITIVE NODE // <span className="text-blue-500">AI & ROBOTICS</span>
              </h3>
            </div>
            <Link 
              href="/category/ai" 
              className="text-[10px] font-mono font-bold tracking-widest text-blue-400 hover:text-white transition-colors flex items-center gap-1 uppercase"
            >
              <span>Explore Domain</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Spotlight Big Column - Span 7 */}
            {aiArticles[0] && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 bg-space-secondary/20 border border-white/5 rounded-xl hover:border-blue-500/20 hover:bg-space-secondary/40 transition-all group cursor-pointer shadow-xl relative overflow-hidden flex flex-col"
              >
                <Link href={`/article/${aiArticles[0].slug}`} className="p-6 flex flex-col justify-between h-full w-full flex-grow">
                  {/* Visual Image Background overlay */}
                  <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-10 group-hover:opacity-20 transition-opacity">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={aiArticles[0].featuredImage}
                      alt=""
                      className="w-full h-full object-cover filter saturate-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-space-secondary via-transparent to-transparent" />
                  </div>

                  <div className="space-y-4 relative z-10 max-w-xl">
                    <span className="bg-blue-600/10 text-blue-400 font-mono text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded border border-blue-500/20 uppercase inline-block">
                      {aiArticles[0].category} // EXCLUSIVE INTEL
                    </span>
                    
                    <h4 className="text-xl sm:text-2xl font-heading font-black text-white uppercase leading-snug group-hover:text-blue-400 transition-colors">
                      {aiArticles[0].title}
                    </h4>
                    
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {aiArticles[0].excerpt}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[9px] font-mono text-slate-500 relative z-10">
                    <div className="flex items-center gap-3">
                      <span>BY {aiArticles[0].author.toUpperCase()}</span>
                      <span>{aiArticles[0].date}</span>
                    </div>
                    <span className="text-blue-500 font-bold group-hover:underline">OPEN SECTOR &gt;</span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Right Stacked Column - Span 5 */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {aiArticles.slice(1, 3).map((article, idx) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-space-secondary/10 border border-white/5 rounded-xl hover:border-blue-500/20 hover:bg-space-secondary/20 transition-all flex flex-col justify-between flex-grow group cursor-pointer"
                >
                  <Link href={`/article/${article.slug}`} className="p-5 flex flex-col justify-between h-full w-full flex-grow">
                    <div className="space-y-2">
                      <span className="text-[8px] font-mono text-slate-500 tracking-widest uppercase">
                        {article.category} // RE-ROUTE NODE
                      </span>
                      <h5 className="text-xs sm:text-sm font-heading font-black text-white uppercase group-hover:text-blue-400 transition-colors leading-snug">
                        {article.title}
                      </h5>
                    </div>
                    <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 border-t border-white/5 pt-2 mt-3">
                      <span>{article.date} // {article.readTime}</span>
                      <span className="text-blue-500 font-bold uppercase flex items-center gap-0.5">
                        <span>READ</span> <ArrowRight className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================
            ROW 2: SPACE TECH & CYBER DEFENSE - DUAL HUD LAYOUT
           ======================================================== */}
        <section className="space-y-8">
          {/* Row header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-blue-500" />
              <h3 className="font-heading text-lg font-black tracking-widest text-white uppercase">
                PROPULSION & CYBER // <span className="text-blue-500">SPACE & DEFENSE</span>
              </h3>
            </div>
            <Link 
              href="/category/space" 
              className="text-[10px] font-mono font-bold tracking-widest text-blue-400 hover:text-white transition-colors flex items-center gap-1 uppercase"
            >
              <span>Explore Domain</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spaceCyberArticles.slice(0, 2).map((article, idx) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-space-secondary/20 border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/25 transition-all group flex flex-col justify-between"
              >
                {/* Visual header */}
                <div className="relative h-44 w-full bg-space-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.featuredImage} 
                    alt="" 
                    className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-103 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-secondary to-transparent" />
                  
                  {/* Flight/Cyber Grid hud elements on top of image */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none m-3 rounded flex flex-col justify-between p-2 font-mono text-[8px] text-white/50">
                    <div className="flex justify-between items-center">
                      <span>HUD_SYS_CAL: OK</span>
                      <span className="flex items-center gap-1"><Activity className="h-2.5 w-2.5 text-blue-500 animate-pulse" /> GRID_v9</span>
                    </div>
                    <div className="text-right">PROPULSION MESH</div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[8px] font-mono text-blue-400 border border-blue-500/10 px-2 py-0.5 rounded bg-blue-500/5 uppercase inline-block font-bold">
                      {article.category} // ORBITAL DISPATCH
                    </span>
                    <h4 className="text-base font-heading font-black text-white uppercase group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      <Link href={`/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-white/5 pt-3 mt-4">
                    <span>{article.date} // BY {article.author.split(" ").pop()?.toUpperCase()}</span>
                    <span className="text-blue-400 font-bold group-hover:underline flex items-center gap-1">
                      <span>ENTER DATA</span> <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================
            ROW 3: FUTURE FRONTIERS & GADGETS - THREE COLUMN WIRED GRID
           ======================================================== */}
        <section className="space-y-8">
          {/* Row header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <h3 className="font-heading text-lg font-black tracking-widest text-white uppercase">
                EMERGING TECHNOLOGIES // <span className="text-blue-500">FUTURE & GADGET</span>
              </h3>
            </div>
            <Link 
              href="/category/future" 
              className="text-[10px] font-mono font-bold tracking-widest text-blue-400 hover:text-white transition-colors flex items-center gap-1 uppercase"
            >
              <span>Explore Domain</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {futureGadgetArticles.slice(0, 3).map((article, idx) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-space-card/20 border border-white/5 rounded-xl p-5 hover:border-blue-500/20 hover:bg-space-secondary/20 transition-all flex flex-col justify-between group cursor-pointer relative"
              >
                {/* Thin colored bar top */}
                <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-slate-500 tracking-widest uppercase">
                      {article.category} // METRIC_S
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  </div>
                  
                  <h4 className="text-xs sm:text-sm font-heading font-black text-white uppercase group-hover:text-blue-400 transition-colors leading-snug line-clamp-3">
                    <Link href={`/article/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>
                  
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 border-t border-white/5 pt-3.5 mt-5">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{article.date}</span>
                  <span className="text-blue-400 font-bold group-hover:underline uppercase">READ BRIEF &gt;</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
