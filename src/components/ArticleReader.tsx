"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Article } from "../data/articles";
import { 
  ArrowLeft, Share2, Link2, BookMarked, 
  User, Calendar, Clock, Eye, Sparkles, ArrowRight 
} from "lucide-react";

interface ArticleReaderProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleReader({ article, relatedArticles }: ArticleReaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Tracking scroll depth for the premium progress indicator
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      
      {/* 1. Dynamic Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="orbital-grid opacity-10" />
        <div className="orbital-dots opacity-20" />
        <div className="space-glow-1" />
        <div className="noise-overlay" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-slate-500 hover:text-blue-400 uppercase transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>RETURN TO MISSION DECK</span>
          </Link>
        </div>

        {/* Article Core Layout */}
        <article className="space-y-8">
          
          {/* Header Metadata Block */}
          <div className="space-y-4 text-left">
            <span className="bg-blue-600/10 text-blue-400 font-mono text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded border border-blue-500/20 uppercase inline-block">
              {article.category} // MISSION RECORD
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-none text-white uppercase text-gradient">
              {article.title}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-3xl">
              {article.excerpt}
            </p>
          </div>

          {/* Author HUD Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-white/5 py-4 font-mono text-[10px] text-slate-500">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="h-9 w-9 rounded-full border border-white/10 object-cover"
              />
              <div className="space-y-0.5 text-left">
                <div className="text-white uppercase font-bold flex items-center gap-1">
                  <User className="h-3 w-3 text-blue-500" />
                  <span>{article.author}</span>
                </div>
                <div className="text-[9px] text-slate-500">{article.authorRole.toUpperCase()}</div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{article.date}</span>
              </div>
              <div className="h-2.5 w-[1px] bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime}</span>
              </div>
              <div className="h-2.5 w-[1px] bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-blue-400" />
                <span>{article.views.toLocaleString()} SYNCED</span>
              </div>
            </div>
          </div>

          {/* Cinematic Wide Image */}
          <div className="relative h-64 sm:h-[400px] w-full rounded-xl overflow-hidden border border-white/5 bg-space-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.featuredImage} 
              alt={article.title} 
              className="w-full h-full object-cover filter brightness-[0.85]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-black/40 to-transparent" />
          </div>

          {/* Structured Editorial Reading Space */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            
            {/* Left Column: Sticky Sharing Controls - Span 1 */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 flex lg:flex-col items-center justify-start gap-4 py-2 border-b lg:border-b-0 lg:border-r border-white/5 lg:pr-4">
              <span className="font-mono text-[8px] uppercase text-slate-500 tracking-wider hidden lg:block mb-2">SHARE</span>
              
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className={`p-2.5 rounded-lg border text-slate-400 hover:text-white transition-all cursor-pointer ${
                  copied ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-white/5 bg-white/[0.01] hover:bg-white/[0.04]"
                }`}
                title="Copy secure link"
              >
                <Link2 className="h-4 w-4" />
              </button>

              {/* Twitter/X - Custom Inline SVG */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-white/5 text-slate-400 hover:text-white transition-all bg-white/[0.01] hover:bg-white/[0.04] flex items-center justify-center cursor-pointer"
                title="Post to X"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Bookmark */}
              <button
                className="p-2.5 rounded-lg border border-white/5 text-slate-400 hover:text-white transition-all bg-white/[0.01] hover:bg-white/[0.04] cursor-pointer"
                title="Bookmark records"
              >
                <BookMarked className="h-4 w-4" />
              </button>

              {/* HUD clipboard alert */}
              {copied && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:-translate-x-0 z-50 bg-blue-600/90 text-white font-mono text-[9px] font-bold tracking-widest px-3 py-1.5 rounded uppercase shadow-2xl border border-blue-400/20">
                  LINK SECURED TO CLIPBOARD // SUCCESS
                </div>
              )}
            </div>

            {/* Right Column: Main Text Flow - Span 11 */}
            <div className="lg:col-span-11 space-y-6 font-sans text-slate-300 text-left leading-relaxed max-w-none text-base sm:text-lg">
              {article.content.map((node, index) => {
                switch (node.type) {
                  case "paragraph":
                    return (
                      <p key={index} className="text-slate-200">
                        {node.text}
                      </p>
                    );
                  
                  case "heading":
                    return (
                      <h2 key={index} className="font-heading font-black text-white uppercase text-xl sm:text-2xl mt-8 pt-4 mb-2 tracking-tight">
                        {node.text}
                      </h2>
                    );
                  
                  case "quote":
                    return (
                      <blockquote key={index} className="border-l-[3px] border-blue-600 bg-blue-500/[0.02] pl-5 py-3 my-8 text-slate-300 italic font-mono text-sm rounded-r-md">
                        &quot;{node.text}&quot;
                      </blockquote>
                    );
                  
                  case "bullet-list":
                    return (
                      <div key={index} className="my-6 space-y-3.5">
                        {node.text && <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">{node.text}</h4>}
                        <ul className="list-none pl-4 space-y-2.5 font-mono text-xs text-slate-300">
                          {node.items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="text-blue-500 font-bold shrink-0">&gt;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>

          </div>

        </article>

        {/* Bottom Section: Related Dispatches */}
        <section className="border-t border-white/5 pt-16 mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <h3 className="font-heading text-base font-black tracking-widest text-white uppercase">
                RECOMMENDED DISPATCHES // <span className="text-blue-500">RELATED ARCHIVE</span>
              </h3>
            </div>
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">COGNITIVE MATCH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relArt) => (
              <div 
                key={relArt.slug}
                className="bg-space-secondary/20 border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/20 hover:bg-space-secondary/30 transition-all group flex flex-col justify-between"
              >
                <div className="relative h-32 w-full overflow-hidden bg-space-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={relArt.featuredImage}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 filter brightness-90 group-hover:brightness-100"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600/90 text-white font-mono text-[7px] font-bold tracking-widest px-2 py-0.5 rounded uppercase">
                    {relArt.category}
                  </span>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <h4 className="text-xs font-heading font-black text-white hover:text-blue-400 uppercase leading-snug tracking-wide line-clamp-2 transition-colors">
                    <Link href={`/article/${relArt.slug}`}>
                      {relArt.title}
                    </Link>
                  </h4>
                  <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 border-t border-white/5 pt-2">
                    <span>{relArt.date}</span>
                    <span className="text-blue-400 font-bold group-hover:underline uppercase flex items-center gap-0.5">
                      <span>READ</span> <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
