import { notFound } from "next/navigation";
import Link from "next/link";
import { COUNTRIES } from "@/lib/constants";
import { ArrowRight, CheckCircle, XCircle, BookOpen, GraduationCap, Globe } from "lucide-react";
import { getUniversitiesByCountry } from "@/lib/hipolabs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) return {};
  return {
    title: `Study in ${country.name} – Universities, Visa & Costs`,
    description: `Complete guide to studying in ${country.name}. Tuition: ${country.tuitionRange}. Visa type: ${country.visaType}. Top universities, scholarships, and admission requirements.`,
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) notFound();

  const universities = await getUniversitiesByCountry(country.name);

  const related = COUNTRIES.filter((c) => c.region === country.region && c.slug !== country.slug).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-6">
            <Link href="/countries" className="hover:text-white transition-colors">Countries</Link>
            <span>/</span>
            <span className="text-white">{country.name}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl mb-4">{country.flag}</div>
              <h1 className="text-4xl font-black mb-4">Study in {country.name}</h1>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">{country.summary}</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "Language", value: country.language },
                  { label: "Currency", value: country.currency },
                  { label: "Intake", value: country.intakeMonths.join(", ") },
                  { label: "Visa Type", value: country.visaType },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-blue-200 text-xs mb-0.5">{item.label}</div>
                    <div className="font-semibold text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/consultation" className="bg-white text-[#1a56db] hover:bg-blue-50 font-bold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Get Free Guidance <ArrowRight size={16} />
                </Link>
                <Link href={`/universities?country=${encodeURIComponent(country.name)}`} className="border-2 border-white/30 hover:border-white text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Browse Universities
                </Link>
              </div>
            </div>

            {/* Cost box */}
            <div className="bg-white rounded-2xl p-6 text-gray-900">
              <h3 className="font-bold text-lg mb-4">💰 Cost Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Tuition fees</span>
                  <span className="font-bold text-[#1a56db]">{country.tuitionRange}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Living expenses</span>
                  <span className="font-bold text-gray-800">{country.livingCost}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">IELTS required</span>
                  <span className="font-bold text-gray-800">{country.ieltsRequired}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Visa processing</span>
                  <span className="font-bold text-gray-800">{country.processingTime}</span>
                </div>
              </div>
              <Link href="/consultation" className="block w-full text-center bg-[#1a56db] text-white py-3 rounded-xl font-bold mt-5 hover:bg-[#1e429f] transition-colors">
                Calculate My Budget →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Top universities */}
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="text-[#1a56db]" /> Top Universities
              </h2>
              <div className="space-y-3">
                {country.topUniversities.map((u, i) => (
                  <div key={u} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-[#1a56db] hover:shadow-md transition-all group">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#1a56db] font-black text-sm flex-shrink-0 group-hover:bg-[#1a56db] group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-[#1a56db] transition-colors">{u}</span>
                    <Link href={`/universities?q=${encodeURIComponent(u)}&country=${encodeURIComponent(country.name)}`} className="ml-auto text-xs text-[#1a56db] font-semibold hover:underline hidden sm:block">
                      View →
                    </Link>
                  </div>
                ))}
              </div>
              {universities.length > 0 && (
                <p className="text-sm text-gray-500 mt-3">
                  +{universities.length.toLocaleString()} more universities in {country.name} in our database.{" "}
                  <Link href={`/universities?country=${encodeURIComponent(country.name)}`} className="text-[#1a56db] font-semibold hover:underline">
                    Browse all
                  </Link>
                </p>
              )}
            </section>

            {/* Popular courses */}
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="text-[#1a56db]" /> Popular Study Fields
              </h2>
              <div className="flex flex-wrap gap-2">
                {country.popularCourses.map((course) => (
                  <Link
                    key={course}
                    href={`/programs?field=${encodeURIComponent(course)}&country=${encodeURIComponent(country.name)}`}
                    className="bg-blue-50 text-[#1a56db] border border-blue-100 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a56db] hover:text-white transition-colors"
                  >
                    {course}
                  </Link>
                ))}
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Advantages & Disadvantages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <CheckCircle size={18} /> Advantages
                  </h3>
                  <ul className="space-y-2">
                    {country.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-green-700">
                        <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                  <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                    <XCircle size={18} /> Challenges
                  </h3>
                  <ul className="space-y-2">
                    {country.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-red-700">
                        <XCircle size={14} className="mt-0.5 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Scholarships */}
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-6">🏆 Scholarships</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {country.scholarships.map((s) => (
                  <div key={s} className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <span className="text-amber-500 text-lg">🏆</span>
                    <span className="font-semibold text-gray-800 text-sm">{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-[#1a56db] rounded-xl p-5 text-white">
                <p className="font-semibold mb-2">We help you find scholarships you qualify for</p>
                <p className="text-blue-100 text-sm mb-3">Our advisors match your profile to fully funded and partial scholarship programs — for free.</p>
                <Link href="/consultation" className="inline-flex items-center gap-1 bg-white text-[#1a56db] text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Get Scholarship Guidance <ArrowRight size={14} />
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Consultation CTA */}
            <div className="bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Planning to study in {country.name}?</h3>
              <p className="text-blue-100 text-sm mb-5">Get a free consultation with an advisor who specializes in {country.name}.</p>
              <Link href="/consultation" className="block w-full text-center bg-white text-[#1a56db] py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Book Free Call
              </Link>
            </div>

            {/* At a glance */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe size={16} className="text-[#1a56db]" /> At a Glance
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Capital", value: country.capital },
                  { label: "Language", value: country.language },
                  { label: "Currency", value: country.currency },
                  { label: "Population", value: country.population },
                  { label: "Visa", value: country.visaType },
                  { label: "Processing", value: country.processingTime },
                  { label: "IELTS", value: country.ieltsRequired },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start gap-4 pb-2 border-b border-gray-50">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-semibold text-gray-900 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related countries */}
            {related.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-4">Similar Destinations</h3>
                <div className="space-y-2">
                  {related.map((c) => (
                    <Link key={c.slug} href={`/countries/${c.slug}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 transition-colors group">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900 group-hover:text-[#1a56db] transition-colors">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.tuitionRange.split("–")[0].trim()}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
