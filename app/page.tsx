import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Star, Search, CheckCircle, ChevronRight } from "lucide-react";
import { BRAND, COUNTRIES, SERVICES, TESTIMONIALS, TEAM, FAQS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        {/* ── HERO ── */}
        <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1a56db] to-[#2563eb] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Trusted by 2,500+ Nigerian students
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
                Find Your Perfect<br />
                <span className="text-yellow-400">University Abroad</span>
              </h1>
              <p className="text-xl text-blue-100 mb-10 max-w-xl leading-relaxed">
                Search 10,000+ universities in 60+ countries. Get expert guidance on admissions, scholarships, and visas — all in one place.
              </p>

              {/* Search bar */}
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 mb-8 max-w-2xl">
                <div className="flex items-center gap-2 px-4 py-3 flex-1">
                  <Search size={18} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search universities, countries, programs…"
                    className="flex-1 outline-none text-gray-800 text-sm placeholder-gray-400"
                  />
                </div>
                <Link
                  href="/universities"
                  className="bg-[#1a56db] hover:bg-[#1e429f] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap flex items-center gap-2 justify-center"
                >
                  Search <ArrowRight size={16} />
                </Link>
              </div>

              {/* Popular searches */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-blue-200 text-sm">Popular:</span>
                {["UK Universities", "Free in Germany", "Canada Visa", "MBA Programs", "Scholarships"].map((q) => (
                  <Link
                    key={q}
                    href={`/universities?q=${encodeURIComponent(q)}`}
                    className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1 rounded-full transition-colors"
                  >
                    {q}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="relative bg-white/10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { label: "Universities", value: BRAND.universitiesCount },
                  { label: "Countries", value: BRAND.countriesCount },
                  { label: "Students Helped", value: BRAND.studentsHelped },
                  { label: "Expert Advisors", value: BRAND.expertsCount },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── COUNTRIES ── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Study Destinations</h2>
                <p className="text-gray-500">Explore top countries for international education</p>
              </div>
              <Link href="/countries" className="hidden sm:flex items-center gap-1 text-[#1a56db] font-semibold text-sm hover:underline">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {COUNTRIES.slice(0, 12).map((c) => (
                <Link
                  key={c.slug}
                  href={`/countries/${c.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-4 hover:border-[#1a56db] hover:shadow-lg transition-all text-center"
                >
                  <div className="text-4xl mb-2">{c.flag}</div>
                  <div className="font-semibold text-sm text-gray-900 group-hover:text-[#1a56db] transition-colors">{c.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{c.region}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-3">How It Works</h2>
              <p className="text-gray-500 max-w-xl mx-auto">From deciding to study abroad to receiving your offer letter — we&apos;re with you at every step.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", icon: "🎯", title: "Book Free Consultation", desc: "Discuss your goals, budget, and target countries with an expert advisor." },
                { step: "02", icon: "🔍", title: "We Find Your Match", desc: "We shortlist universities that fit your academic profile, budget, and career goals." },
                { step: "03", icon: "📝", title: "Application Support", desc: "We help you craft your SOP, review documents, and submit strong applications." },
                { step: "04", icon: "🎓", title: "Visa & Departure", desc: "We guide you through the visa process and pre-departure preparation." },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-[#1a56db] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-blue-200">
                    {s.icon}
                  </div>
                  <div className="text-xs font-black text-[#1a56db] mb-1">{s.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e429f] text-white px-8 py-4 rounded-xl font-bold transition-colors">
                Book Free Consultation <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-3">What We Offer</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Complete end-to-end support for your international education journey.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#1a56db] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#1a56db] group-hover:scale-110 transition-all">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#1a56db] transition-colors">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                  <div className="flex items-center gap-1 text-[#1a56db] text-sm font-semibold mt-4">
                    Learn more <ChevronRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY JANDIFY ── */}
        <section className="py-16 px-4 bg-[#ebf5ff]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Why Students Choose Jandify Global</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Since {BRAND.established}, we&apos;ve guided thousands of Nigerian students to universities across Europe, North America, Australia, and beyond.
                </p>
                <div className="space-y-4">
                  {[
                    "Free initial consultation with no obligation",
                    "Advisors who are alumni of target universities",
                    "85%+ offer rate for students who follow our guidance",
                    "End-to-end support: from search to visa to departure",
                    "Scholarship-first approach — we find funding options first",
                    "Trusted by families across Nigeria",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-[#1a56db] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
                <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-[#1a56db] font-semibold hover:underline">
                  Learn about us <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2,500+", label: "Students Placed", color: "bg-[#1a56db]" },
                  { value: "85%+", label: "Offer Rate", color: "bg-emerald-600" },
                  { value: "60+", label: "Countries Covered", color: "bg-purple-600" },
                  { value: "100%", label: "Visa Success*", color: "bg-amber-500" },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.color} rounded-2xl p-6 text-white`}>
                    <div className="text-3xl font-black mb-1">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                ))}
                <p className="col-span-2 text-xs text-gray-400">*For students using our full document preparation service</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-3">Real Stories, Real Results</h2>
              <p className="text-gray-500">Hear from students who made it abroad with Jandify Global</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1a56db] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role} · {t.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-3">Meet Our Advisors</h2>
              <p className="text-gray-500">Alumni and experts who&apos;ve been where you want to go</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((m) => (
                <div key={m.name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1a56db] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {m.avatar}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{m.name}</h3>
                  <p className="text-sm text-[#1a56db] font-medium mb-3">{m.role}</p>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">{m.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {m.specialties.map((s) => (
                      <span key={s} className="text-xs bg-blue-50 text-[#1a56db] px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-3">Frequently Asked Questions</h2>
              <p className="text-gray-500">Everything you need to know before getting started</p>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    <span>{faq.q}</span>
                    <ChevronRight size={18} className="text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4 bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-4">Ready to Study Abroad?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
              Book a free 30-minute consultation with our advisors. No commitment, no pressure — just expert guidance tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation" className="bg-white text-[#1a56db] hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                Book Free Consultation <ArrowRight size={18} />
              </Link>
              <Link href="/universities" className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                Search Universities
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
