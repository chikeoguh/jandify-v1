import Link from "next/link";
import { BRAND, TEAM, FAQS } from "@/lib/constants";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jandify Global – Our Story & Team",
  description: "Learn about Jandify Global, our mission to help Nigerian students access world-class international education, and the expert team behind our success.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">About Jandify Global</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
            We exist to make international education accessible to every ambitious Nigerian student — regardless of background.
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: BRAND.studentsHelped, label: "Students Placed" },
              { value: BRAND.universitiesCount, label: "Universities in Database" },
              { value: BRAND.countriesCount, label: "Countries Covered" },
              { value: BRAND.established, label: "Year Established" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-[#1a56db] mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Jandify Global was founded in {BRAND.established} with one simple belief: every ambitious Nigerian student deserves access to world-class international education, not just those with the right connections or family abroad.
                </p>
                <p>
                  Our founders had experienced firsthand the confusion, misinformation, and missed opportunities that Nigerian students face when navigating international university admissions. They built Jandify Global to change that.
                </p>
                <p>
                  Today, we've helped over 2,500 students gain admission to universities in the UK, Germany, Canada, Australia, France, the Netherlands, and 55+ other countries — with scholarship funding secured for thousands of those placements.
                </p>
                <p>
                  We're not a visa agency, and we don't charge application fees. We're an advisory service — your guide, your advocate, and your trusted resource from first thought to first day of class.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎯", title: "Our Mission", desc: "To be the most trusted guide for Nigerian students seeking international education." },
                { icon: "👁️", title: "Our Vision", desc: "A world where every ambitious student has access to the right information and support." },
                { icon: "💡", title: "Our Approach", desc: "Honest, personalized advice from advisors who've walked the path themselves." },
                { icon: "🤝", title: "Our Promise", desc: "We measure success by your offer letter, not our invoice." },
              ].map((item) => (
                <div key={item.title} className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">How We Work</h2>
            <p className="text-gray-500">A structured, transparent process from first contact to arrival abroad</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Free Consultation", desc: "We start by understanding your goals, academic background, budget, and target timeline. No cost, no commitment." },
              { step: "02", title: "Profile Assessment", desc: "We evaluate your academic records, English scores, and experience to identify your strongest options." },
              { step: "03", title: "University Shortlisting", desc: "We present a curated list of universities and programs that match your profile and budget — from top-tier to strategic safety schools." },
              { step: "04", title: "Application Preparation", desc: "We guide your SOP writing, CV formatting, reference letters, and every required document." },
              { step: "05", title: "Application Submission", desc: "We review everything before submission and track deadlines across multiple universities." },
              { step: "06", title: "Visa & Pre-Departure", desc: "Once you receive an offer, we help with your visa application, pre-departure preparation, and any final document needs." },
            ].map((s) => (
              <div key={s.step} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl font-black text-[#1a56db] opacity-30 mb-3">{s.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 px-4" id="documents">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Documents You'll Typically Need</h2>
            <p className="text-gray-500">Requirements vary by country and program — we'll give you a personalized checklist</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Academic transcripts (O-Level, SSCE, BSc)",
              "Valid international passport",
              "IELTS / TOEFL / Duolingo score report",
              "Statement of Purpose (SOP / Personal Statement)",
              "2–3 academic or professional references",
              "Updated CV / Résumé",
              "Birth certificate",
              "Bank statement (for financial proof)",
              "Scholarship application essays (if applying)",
              "Proof of work experience (for postgraduate)",
            ].map((doc) => (
              <div key={doc} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
                <CheckCircle size={18} className="text-[#1a56db] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/consultation" className="inline-flex items-center gap-2 bg-[#1a56db] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#1e429f] transition-colors">
              Get Your Personalized Checklist <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50" id="team">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Our Expert Team</h2>
            <p className="text-gray-500">Advisors who are alumni of the institutions they recommend</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition-shadow">
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

      {/* FAQ */}
      <section className="py-16 px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Frequently Asked Questions</h2>
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

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Start Your Journey Today</h2>
          <p className="text-blue-100 text-lg mb-10">
            Join 2,500+ Nigerians who've trusted Jandify Global with their international education journey.
          </p>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-[#1a56db] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors">
            Book Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
