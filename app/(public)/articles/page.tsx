import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad Articles & Guides",
  description: "Expert guides on studying abroad, scholarship applications, visa processes, and international university admissions.",
};

const ARTICLES = [
  {
    slug: "how-to-study-in-germany-for-free",
    title: "How to Study in Germany for Free in 2025",
    excerpt: "Germany's public universities charge almost no tuition — even for international students. Here's exactly how to apply, what documents you need, and how to fund your living costs.",
    category: "Country Guide",
    country: "🇩🇪 Germany",
    readTime: "8 min read",
    date: "Jan 2025",
    featured: true,
  },
  {
    slug: "scholarship-guide",
    title: "The Complete Scholarship Guide for Nigerian Students",
    excerpt: "From DAAD to Chevening to Commonwealth — a comprehensive guide to the best fully funded scholarships available to Nigerian students, with application tips and deadlines.",
    category: "Scholarships",
    country: "🌍 International",
    readTime: "12 min read",
    date: "Dec 2024",
    featured: true,
  },
  {
    slug: "visa-guide",
    title: "Student Visa Guide: How to Apply Without Getting Rejected",
    excerpt: "The most common reasons student visas are rejected — and how to avoid every single one. Covers UK, Canada, Germany, Australia, and France.",
    category: "Visa & Immigration",
    country: "🌍 International",
    readTime: "10 min read",
    date: "Jan 2025",
    featured: true,
  },
  {
    slug: "writing-a-strong-sop",
    title: "How to Write a Statement of Purpose That Gets You Accepted",
    excerpt: "Your SOP is your chance to tell your story. We break down exactly what top universities want to see, common mistakes to avoid, and a proven structure that works.",
    category: "Application Tips",
    country: "🌍 International",
    readTime: "9 min read",
    date: "Nov 2024",
    featured: false,
  },
  {
    slug: "uk-universities-2025",
    title: "Best UK Universities for Nigerian Students in 2025",
    excerpt: "Rankings, tuition fees, acceptance rates, and scholarship opportunities at the top UK universities accepting Nigerian applicants.",
    category: "Country Guide",
    country: "🇬🇧 UK",
    readTime: "7 min read",
    date: "Dec 2024",
    featured: false,
  },
  {
    slug: "canada-study-permit",
    title: "Canada Study Permit: Step-by-Step Application Guide",
    excerpt: "Everything you need to know about applying for a Canadian study permit — from the required documents to the online portal, SDS streams, and common rejection reasons.",
    category: "Visa & Immigration",
    country: "🇨🇦 Canada",
    readTime: "11 min read",
    date: "Jan 2025",
    featured: false,
  },
  {
    slug: "masters-vs-mba",
    title: "Master's vs MBA: Which Is Right for You?",
    excerpt: "A practical comparison of Master's degrees vs MBA programs — cost, career outcomes, admission requirements, and how to decide based on where you want to be in 10 years.",
    category: "Career",
    country: "🌍 International",
    readTime: "6 min read",
    date: "Oct 2024",
    featured: false,
  },
  {
    slug: "cheapest-countries-to-study",
    title: "10 Affordable Countries to Study Abroad in 2025",
    excerpt: "World-class education doesn't have to cost a fortune. Here are 10 countries where you can earn an internationally recognized degree without breaking the bank.",
    category: "Study Abroad",
    country: "🌍 International",
    readTime: "8 min read",
    date: "Nov 2024",
    featured: false,
  },
];

const CATEGORIES = ["All", "Country Guide", "Scholarships", "Visa & Immigration", "Application Tips", "Study Abroad", "Career"];

export default function ArticlesPage() {
  const featured = ARTICLES.filter((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black mb-3">Study Abroad Guides</h1>
          <p className="text-blue-100 text-lg">
            Expert articles on universities, scholarships, visas, and everything you need to study internationally.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                cat === "All"
                  ? "bg-[#1a56db] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#1a56db]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured articles */}
        <h2 className="text-xl font-black text-gray-900 mb-6">Featured Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 h-36 flex items-center justify-center text-5xl">
                {article.country.split(" ")[0]}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-blue-50 text-[#1a56db] px-2 py-0.5 rounded-full font-medium">{article.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{article.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#1a56db] transition-colors leading-snug">{article.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center gap-1 text-[#1a56db] text-sm font-semibold mt-4">
                  Read guide <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All articles */}
        <h2 className="text-xl font-black text-gray-900 mb-6">All Articles</h2>
        <div className="space-y-4">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#1a56db] hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[#1a56db] transition-colors">
                <BookOpen size={20} className="text-[#1a56db] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{article.category}</span>
                  <span className="text-xs text-gray-400">{article.country}</span>
                  <span className="text-xs text-gray-400">· {article.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#1a56db] transition-colors mb-1">{article.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{article.excerpt}</p>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-[#1a56db] transition-colors flex-shrink-0 mt-1" />
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-14 bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-3">Get the latest guides in your inbox</h3>
          <p className="text-blue-100 mb-6">Scholarship deadlines, visa updates, and study abroad tips — straight to you.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white text-gray-800 rounded-xl px-4 py-3 text-sm outline-none placeholder-gray-400"
            />
            <button className="bg-[#1e429f] hover:bg-[#1e3a8a] text-white font-bold px-5 py-3 rounded-xl transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
