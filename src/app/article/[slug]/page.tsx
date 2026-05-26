import React from "react";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Ticker from "../../../components/Ticker";
import ArticleReader from "../../../components/ArticleReader";
import { ARTICLES } from "../../../data/articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all articles in database for compile-time optimization
export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  // Find article matching slug
  const article = ARTICLES.find((a) => a.slug === slug);
  
  if (!article) {
    notFound();
  }

  // Get 3 related articles, preferring same category or latest
  const relatedArticles = ARTICLES.filter((a) => a.slug !== slug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === article.category && b.category !== article.category) return -1;
      if (b.category === article.category && a.category !== article.category) return 1;
      // Then prioritize trending score
      return b.trendingScore - a.trendingScore;
    })
    .slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#05070A] text-white flex flex-col justify-between selection:bg-blue-600/30">
      
      {/* Sticky blurred header */}
      <Navbar />

      <main className="flex-grow pt-20 relative z-10">
        {/* Breaking News Ticker */}
        <Ticker />

        {/* High-Fidelity Reading Engine */}
        <ArticleReader article={article} relatedArticles={relatedArticles} />
      </main>

      {/* SpaceX minimal dark footer */}
      <Footer />

    </div>
  );
}
