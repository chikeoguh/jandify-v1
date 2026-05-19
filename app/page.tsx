import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight, Star, Search, CheckCircle, ChevronRight,
  BookOpen, Globe, Award, Users, FileText, Plane,
  GraduationCap, TrendingUp, Shield, Clock, MapPin, Mail,
} from "lucide-react";
import { BRAND, COUNTRIES, SERVICES, TESTIMONIALS, TEAM, FAQS } from "@/lib/constants";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "University Search":   <Search size={22} />,
  "Program Matching":    <BookOpen size={22} />,
  "Scholarship Guidance":<Award size={22} />,
  "Visa Support":        <Plane size={22} />,
  "Application Support": <FileText size={22} />,
  "Document Services":   <Shield size={22} />,
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">

        {/* ── HERO ── */}
        <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1E40AF] to-[#2563eb] text-white overflow-hidden">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-20">
            <div className="max-w-3xl">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-7 shadow-sm">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse flex-shrink-0" />
                <span className="font-medium">Trusted by {BRAND.studentsHelped} Nigerian students</span>
                <span className="flex items-center gap-0.5 text-yellow-300 ml-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl md:text-[3.5rem] font-black mb-5 leading-[1.15] tracking-tight"
                style={{ fontFamily: "var(--font-poppins, system-ui)" }}
              >
                Find Your Perfect
                <br />
                <span className="text-[#22C55E]">University Abroad</span>
              </h1>

              <p className="text-lg text-blue-100 mb-10 max-w-xl leading-relaxed">
                Search 10,000+ universities in 60+ countries. Expert guidance on admissions,
                scholarships, and visas — all in one place.
              </p>

              {/* Search bar */}
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 mb-7 max-w-2xl">
                <label className="flex items-center gap-2 px-4 py-3 flex-1 cursor-text" htmlFor="hero-search">
                  <Search size={17} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
                  <input
                    id="hero-search"
                    type="search"
                    placeholder="Search universities, countries, programs…"
                    className="flex-1 outline-none text-gray-800 text-sm placeholder-gray-400"
                    aria-label="Search universities"
                  />
                </label>
                <Link
                  href="/universities"
                  className="flex items-center gap-2 justify-center bg-[#22C55E] hover:bg-[#16a34a] text-white px-6 py-3 rounded-xl font-bold text-sm cursor-pointer whitespace-nowrap"
                  style={{ boxShadow: "0 2px 8px rgba(34,197,94,0.4)" }}
                >
                  Search <ArrowRight size={15} />
                </Link>
              </div>

              {/* Quick links */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-blue-300 text-sm font-medium">Popular:</span>
                {["UK Universities", "Free in Germany", "Canada Visa", "MBA Programs", "Scholarships"].map((q) => (
                  <Link
                    key={q}
                    href={`/universities?q=${encodeURIComponent(q)}`}
                    className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    {q}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative bg-[#1e3a8a]/60 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Universities", value: BRAND.universitiesCount, icon: <GraduationCap size={18} /> },
                  { label: "Countries",    value: BRAND.countriesCount,    icon: <Globe size={18} /> },
                  { label: "Students Helped", value: BRAND.studentsHelped, icon: <Users size={18} /> },
                  { label: "Expert Advisors", value: BRAND.expertsCount,   icon: <Award size={18} /> },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1">
                    <div
                      className="text-3xl font-black"
                      style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-200 text-sm">
                      <span className="opacity-70">{stat.icon}</span>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DESTINATIONS ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-widest mb-2">Study Destinations</p>
                <h2
                  className="text-3xl font-black text-gray-900"
                  style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                >
                  Explore Top Countries
                </h2>
                <p className="text-gray-500 mt-2 max-w-md">
                  From free education in Europe to world-class universities in North America
                </p>
              </div>
              <Link
                href="/countries"
                className="hidden sm:flex items-center gap-1.5 text-[#1E40AF] font-semibold text-sm hover:underline cursor-pointer"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {COUNTRIES.slice(0, 12).map((c) => (
                <Link
                  key={c.slug}
                  href={`/countries/${c.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#1E40AF]/30 hover:shadow-lg transition-all text-center cursor-pointer"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                >
                  <div className="text-4xl mb-3 leading-none">{c.flag}</div>
                  <div
                    className="font-semibold text-sm text-gray-900 group-hover:text-[#1E40AF] transition-colors"
                    style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                  >
                    {c.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{c.region}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 px-4 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-widest mb-2">The Process</p>
              <h2
                className="text-3xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-poppins, system-ui)" }}
              >
                How It Works
              </h2>
              <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                From deciding to study abroad to receiving your offer letter — we&apos;re with you every step.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#1E40AF]/20 via-[#1E40AF]/60 to-[#1E40AF]/20" />

              {[
                { step: "01", Icon: Users,          title: "Free Consultation",    desc: "Discuss your goals, budget, and target countries with an expert advisor." },
                { step: "02", Icon: Search,         title: "We Find Your Match",   desc: "We shortlist universities that fit your academic profile and career goals." },
                { step: "03", Icon: FileText,       title: "Application Support",  desc: "We craft your SOP, review documents, and submit strong applications." },
                { step: "04", Icon: GraduationCap,  title: "Visa & Departure",     desc: "We guide you through the visa process and pre-departure preparation." },
              ].map((s, i) => (
                <div key={i} className="text-center relative">
                  <div
                    className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mx-auto mb-5 relative z-10"
                    style={{
                      background: "linear-gradient(135deg, #1E40AF, #3B82F6)",
                      boxShadow: "0 6px 20px rgba(30,64,175,0.3)",
                    }}
                  >
                    <s.Icon size={26} className="text-white" />
                  </div>
                  <div className="text-xs font-black text-[#1E40AF] mb-1.5 tracking-widest">{s.step}</div>
                  <h3
                    className="font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white px-8 py-4 rounded-xl font-bold cursor-pointer"
                style={{ boxShadow: "0 4px 16px rgba(30,64,175,0.3)" }}
              >
                Book Free Consultation <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-widest mb-2">What We Offer</p>
              <h2
                className="text-3xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-poppins, system-ui)" }}
              >
                Complete End-to-End Support
              </h2>
              <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                Everything you need for your international education journey under one roof.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="hover-lift group bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)" }}
                  >
                    <span className="text-[#1E40AF]">
                      {SERVICE_ICONS[s.title] ?? <BookOpen size={22} />}
                    </span>
                  </div>
                  <h3
                    className="font-bold text-gray-900 mb-2 group-hover:text-[#1E40AF] transition-colors"
                    style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.description}</p>
                  <div className="flex items-center gap-1 text-[#1E40AF] text-sm font-semibold">
                    Learn more <ChevronRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY JANDIFY ── */}
        <section className="py-20 px-4 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-widest mb-3">Why Choose Us</p>
                <h2
                  className="text-3xl font-black text-gray-900 mb-5 leading-tight"
                  style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                >
                  Why Students Choose<br />Jandify Global
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Since {BRAND.established}, we&apos;ve guided thousands of Nigerian students to top
                  universities across Europe, North America, Australia, and beyond.
                </p>
                <div className="space-y-3.5">
                  {[
                    "Free initial consultation — no obligation, no pressure",
                    "Advisors who are alumni of target universities",
                    "85%+ offer rate for students following our guidance",
                    "End-to-end support: search to visa to departure",
                    "Scholarship-first approach — we find funding before fees",
                    "Trusted by families across Nigeria and West Africa",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#22C55E]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={13} className="text-[#22C55E]" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 mt-8 text-[#1E40AF] font-semibold hover:underline cursor-pointer"
                >
                  Learn about us <ArrowRight size={15} />
                </Link>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2,500+", label: "Students Placed",  icon: <Users size={22} />,      bg: "from-[#1E40AF] to-[#2563eb]" },
                  { value: "85%+",   label: "Offer Rate",       icon: <TrendingUp size={22} />, bg: "from-[#22C55E] to-[#16a34a]" },
                  { value: "60+",    label: "Countries Covered", icon: <Globe size={22} />,     bg: "from-[#7c3aed] to-[#6d28d9]" },
                  { value: "100%",   label: "Visa Success*",     icon: <Shield size={22} />,    bg: "from-[#f59e0b] to-[#d97706]" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 text-white`}
                    style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
                  >
                    <div className="opacity-70 mb-3">{stat.icon}</div>
                    <div
                      className="text-3xl font-black mb-1"
                      style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm opacity-85">{stat.label}</div>
                  </div>
                ))}
                <p className="col-span-2 text-xs text-gray-400">*For students using our full document preparation service</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-widest mb-2">Success Stories</p>
              <h2
                className="text-3xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-poppins, system-ui)" }}
              >
                Real Stories, Real Results
              </h2>
              <p className="text-gray-500 mt-3">Hear from students who made it abroad with Jandify Global</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="hover-lift bg-white border border-gray-100 rounded-2xl p-6 cursor-default transition-all"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={13} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #1E40AF, #7c3aed)" }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        className="font-bold text-sm text-gray-900"
                        style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                      >
                        {t.name}
                      </div>
                      <div className="text-xs text-gray-500">{t.role} · {t.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="py-20 px-4 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-widest mb-2">Our Team</p>
              <h2
                className="text-3xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-poppins, system-ui)" }}
              >
                Meet Our Advisors
              </h2>
              <p className="text-gray-500 mt-3">Alumni and experts who&apos;ve been where you want to go</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  className="bg-white rounded-2xl p-6 border border-gray-100 text-center transition-all hover:border-[#1E40AF]/20 cursor-default"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                    style={{ background: "linear-gradient(135deg, #1E40AF, #7c3aed)" }}
                  >
                    {m.avatar}
                  </div>
                  <h3
                    className="font-bold text-gray-900 mb-1"
                    style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                  >
                    {m.name}
                  </h3>
                  <p className="text-sm text-[#1E40AF] font-semibold mb-3">{m.role}</p>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">{m.bio}</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {m.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="text-xs bg-blue-50 text-[#1E40AF] px-2.5 py-0.5 rounded-full font-medium"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-widest mb-2">FAQ</p>
              <h2
                className="text-3xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-poppins, system-ui)" }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 mt-3">Everything you need to know before getting started</p>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-[#1E40AF]/30 transition-colors"
                >
                  <summary className="flex items-center justify-between px-6 py-5 list-none font-semibold text-gray-900 hover:bg-gray-50/50 transition-colors select-none">
                    <span
                      className="text-sm"
                      style={{ fontFamily: "var(--font-poppins, system-ui)" }}
                    >
                      {faq.q}
                    </span>
                    <ChevronRight
                      size={17}
                      className="text-[#1E40AF] group-open:rotate-90 transition-transform duration-200 flex-shrink-0 ml-4"
                    />
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1E40AF 50%, #2563eb 100%)" }}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
              <Clock size={14} />
              <span>30-minute sessions · Free · No commitment</span>
            </div>
            <h2
              className="text-4xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-poppins, system-ui)" }}
            >
              Ready to Study Abroad?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute consultation with our advisors. Expert guidance tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold cursor-pointer"
                style={{ boxShadow: "0 4px 16px rgba(34,197,94,0.4)" }}
              >
                Book Free Consultation <ArrowRight size={17} />
              </Link>
              <Link
                href="/universities"
                className="flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold transition-colors cursor-pointer hover:bg-white/5"
              >
                <Search size={17} />
                Search Universities
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
              {[
                { icon: <Users size={15} />,    text: "2,500+ students helped" },
                { icon: <MapPin size={15} />,   text: "60+ countries" },
                { icon: <Mail size={15} />,     text: "hello@jandifyglobal.com" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-blue-200 text-sm">
                  <span className="opacity-60">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
