import Link from "next/link";
import { DEGREE_LEVELS, STUDY_FIELDS, COUNTRIES } from "@/lib/constants";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Programs – Bachelor, Master, MBA, PhD",
  description: "Browse international study programs by degree level and field of study. Find Bachelor's, Master's, MBA, and PhD programs worldwide.",
};

interface Props {
  searchParams: Promise<{ level?: string; field?: string; country?: string }>;
}

export default async function ProgramsPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeLevel = params.level || "";
  const activeField = params.field || "";
  const activeCountry = params.country || "";

  const activeInfo = DEGREE_LEVELS.find((l) => l.value === activeLevel);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black mb-3">Find Your Program</h1>
          <p className="text-blue-100 mb-8 max-w-xl">
            Browse international programs by degree level, field of study, and country.
          </p>

          {/* Degree level pills */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/programs"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                !activeLevel ? "bg-white text-[#1a56db]" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              All Programs
            </Link>
            {DEGREE_LEVELS.map((level) => (
              <Link
                key={level.value}
                href={`/programs?level=${level.value}${activeCountry ? `&country=${encodeURIComponent(activeCountry)}` : ""}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeLevel === level.value ? "bg-white text-[#1a56db]" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {level.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-24">
              {/* Fields */}
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Field of Study</h3>
              <div className="space-y-1 mb-6 max-h-64 overflow-y-auto">
                <Link
                  href={`/programs${activeLevel ? `?level=${activeLevel}` : ""}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    !activeField ? "bg-blue-50 text-[#1a56db] font-semibold" : "text-gray-700 hover:bg-blue-50 hover:text-[#1a56db]"
                  }`}
                >
                  All Fields
                </Link>
                {STUDY_FIELDS.map((f) => (
                  <Link
                    key={f}
                    href={`/programs?${activeLevel ? `level=${activeLevel}&` : ""}field=${encodeURIComponent(f)}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeField === f ? "bg-blue-50 text-[#1a56db] font-semibold" : "text-gray-700 hover:bg-blue-50 hover:text-[#1a56db]"
                    }`}
                  >
                    {f}
                  </Link>
                ))}
              </div>

              {/* Country */}
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide border-t border-gray-100 pt-4">Country</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                <Link
                  href={`/programs${activeLevel ? `?level=${activeLevel}` : ""}${activeField ? `${activeLevel ? "&" : "?"}field=${encodeURIComponent(activeField)}` : ""}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    !activeCountry ? "bg-blue-50 text-[#1a56db] font-semibold" : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  All Countries
                </Link>
                {COUNTRIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/programs?${activeLevel ? `level=${activeLevel}&` : ""}country=${encodeURIComponent(c.name)}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCountry === c.name ? "bg-blue-50 text-[#1a56db] font-semibold" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    <span>{c.flag}</span> {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-3">
            {activeInfo && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
                <h2 className="font-bold text-gray-900 mb-1">{activeInfo.label}</h2>
                <p className="text-sm text-gray-600">Duration: {activeInfo.duration} · Available in {activeCountry || "60+ countries"}</p>
              </div>
            )}

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {activeLevel ? `${activeInfo?.label} Programs` : "All Programs"}
              {activeField ? ` in ${activeField}` : ""}
              {activeCountry ? ` · ${activeCountry}` : ""}
            </h2>

            {/* Program cards per country */}
            <div className="space-y-4">
              {(activeCountry ? COUNTRIES.filter((c) => c.name === activeCountry) : COUNTRIES).map((country) => (
                <div key={country.slug} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{country.name}</h3>
                        <p className="text-sm text-gray-500">{country.tuitionRange}</p>
                      </div>
                    </div>
                    <Link
                      href={`/countries/${country.slug}`}
                      className="text-xs text-[#1a56db] font-semibold hover:underline"
                    >
                      Country Guide →
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(activeField ? country.popularCourses.filter((c) => c.toLowerCase().includes(activeField.toLowerCase())) : country.popularCourses).map((course) => (
                      <span key={course} className="text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-gray-700">
                        <BookOpen size={10} className="inline mr-1" />
                        {course}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/universities?country=${encodeURIComponent(country.name)}`}
                      className="text-sm text-[#1a56db] font-semibold hover:underline flex items-center gap-1"
                    >
                      Browse universities <ArrowRight size={12} />
                    </Link>
                    <span className="text-gray-300">·</span>
                    <Link
                      href="/consultation"
                      className="text-sm text-gray-500 hover:text-[#1a56db] transition-colors"
                    >
                      Get guidance
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-6 text-white text-center">
              <h3 className="font-bold text-xl mb-2">Not sure which program is right for you?</h3>
              <p className="text-blue-100 text-sm mb-4">Our advisors will match you to programs that fit your academic background, career goals, and budget.</p>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-[#1a56db] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                Book Free Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
