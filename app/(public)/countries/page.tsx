import Link from "next/link";
import { COUNTRIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad Destinations",
  description: "Explore country-specific guides for studying abroad. Compare tuition costs, visa requirements, top universities, and scholarships.",
};

export default function CountriesPage() {
  const byRegion = COUNTRIES.reduce((acc: Record<string, typeof COUNTRIES>, c) => {
    if (!acc[c.region]) acc[c.region] = [];
    acc[c.region].push(c);
    return acc;
  }, {} as Record<string, typeof COUNTRIES>);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#1a56db] to-[#2563eb] py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Study Abroad Destinations</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Compare tuition costs, visa requirements, top universities, and scholarship opportunities for 12+ popular destinations.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {Object.entries(byRegion).map(([region, countries]) => (
            <div key={region} className="mb-14">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#1a56db] rounded-full block" />
                {region}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {countries.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/countries/${c.slug}`}
                    className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#1a56db] hover:shadow-lg transition-all"
                  >
                    <div className="text-4xl mb-3">{c.flag}</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#1a56db] transition-colors mb-1">{c.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{c.language} · {c.currency}</p>
                    <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">{c.summary}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-400">Tuition from</div>
                        <div className="text-sm font-bold text-gray-900">{c.tuitionRange.split("–")[0].trim()}</div>
                      </div>
                      <div className="flex items-center gap-1 text-[#1a56db] text-sm font-semibold">
                        Guide <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-10 text-center text-white">
            <h3 className="font-black text-2xl mb-3">Can't decide? We'll help you choose.</h3>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Our advisors will match you to the best country and university based on your budget, goals, and academic background.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-white text-[#1a56db] font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Book Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
