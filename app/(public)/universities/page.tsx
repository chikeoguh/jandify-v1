import { Suspense } from "react";
import Link from "next/link";
import { searchUniversities, enrichUniversity } from "@/lib/hipolabs";
import { COUNTRIES, DEGREE_LEVELS, STUDY_FIELDS } from "@/lib/constants";
import { GraduationCap, ExternalLink, Filter, ChevronRight, ArrowRight } from "lucide-react";
import { UniversitySearchBar } from "@/components/university/UniversitySearchBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Universities Worldwide",
  description: "Search 10,000+ universities in 60+ countries. Filter by country, degree level, field of study, tuition, and more.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

async function UniversityResults({ name, country }: { name?: string; country?: string }) {
  const raw = await searchUniversities({ name, country, limit: 30 });
  const universities = raw.map((u, i) => enrichUniversity(u, i));

  if (universities.length === 0) {
    return (
      <div className="text-center py-16">
        <GraduationCap size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="font-bold text-gray-800 mb-2">No universities found</h3>
        <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <span>Showing <strong className="text-gray-800">{universities.length}</strong> universities</span>
        <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a56db]">
          <option>Sort: Relevance</option>
          <option>Sort: A–Z</option>
          <option>Sort: Country</option>
        </select>
      </div>
      <div className="space-y-3">
        {universities.map((u, i) => (
          <div
            key={`${u.name}-${i}`}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1a56db] hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Logo / initial */}
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#1a56db] font-black text-lg flex-shrink-0 group-hover:bg-[#1a56db] group-hover:text-white transition-colors">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#1a56db] transition-colors mb-1">
                    {u.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      {COUNTRIES.find((c) => c.name.toLowerCase().includes(u.country.toLowerCase()))?.flag || "🌍"}
                      {u.country}
                    </span>
                    {u["state-province"] && <span>{u["state-province"]}</span>}
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{u.type}</span>
                    <span className="bg-blue-50 text-[#1a56db] px-2 py-0.5 rounded-full text-xs">{u.size}</span>
                  </div>
                  {u.programs && u.programs.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {u.programs.slice(0, 4).map((p) => (
                        <span key={p} className="text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full text-gray-600">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {u.web_pages[0] && (
                  <a
                    href={u.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#1a56db] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={12} /> Website
                  </a>
                )}
                <Link
                  href="/consultation"
                  className="bg-[#1a56db] hover:bg-[#1e429f] text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap"
                >
                  Get Help Applying
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation CTA */}
      <div className="mt-8 bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-6 text-white text-center">
        <h3 className="font-bold mb-2">Need help choosing?</h3>
        <p className="text-blue-100 text-sm mb-4">Our advisors will shortlist the best universities for your specific profile — for free.</p>
        <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-[#1a56db] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
          Book Free Consultation <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default async function UniversitiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || params.name || "";
  const country = params.country || "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-black mb-2">Search Universities</h1>
          <p className="text-blue-100 mb-6">10,000+ universities across 60+ countries</p>
          <UniversitySearchBar initialQ={query} initialCountry={country} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Filter size={16} /> Filters
              </h3>

              {/* Country */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Country</label>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {COUNTRIES.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/universities?country=${encodeURIComponent(c.name)}`}
                      className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm hover:bg-blue-50 transition-colors ${
                        country === c.name ? "bg-blue-50 text-[#1a56db] font-semibold" : "text-gray-700"
                      }`}
                    >
                      <span>{c.flag}</span>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Degree level */}
              <div className="mb-5 border-t border-gray-100 pt-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Degree Level</label>
                <div className="space-y-1">
                  {DEGREE_LEVELS.map((l) => (
                    <Link
                      key={l.value}
                      href={`/programs?level=${l.value}`}
                      className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1a56db] transition-colors"
                    >
                      <span>{l.label}</span>
                      <span className="text-xs text-gray-400">{l.duration}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Institution type */}
              <div className="mb-5 border-t border-gray-100 pt-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Type</label>
                <div className="space-y-1">
                  {["Public", "Private", "Non-profit", "For-profit"].map((t) => (
                    <label key={t} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded accent-[#1a56db]" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <Link
                href="/consultation"
                className="block w-full text-center bg-[#1a56db] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1e429f] transition-colors mt-2"
              >
                Get Expert Advice
              </Link>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <Suspense
              key={`${query}-${country}`}
              fallback={
                <div className="space-y-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                          <div className="h-3 bg-gray-100 rounded w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <UniversityResults name={query || undefined} country={country || undefined} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
