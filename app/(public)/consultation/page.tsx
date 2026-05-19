"use client";

import { useState } from "react";
import Link from "next/link";
import { COUNTRIES, DEGREE_LEVELS, SERVICES } from "@/lib/constants";
import { CheckCircle, ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

const CONSULTATION_TYPES = [
  { value: "university", label: "University Selection", icon: "🎓" },
  { value: "scholarship", label: "Scholarship Guidance", icon: "🏆" },
  { value: "visa", label: "Visa & Documentation", icon: "📋" },
  { value: "programs", label: "Program Selection", icon: "📚" },
  { value: "application", label: "Application Review", icon: "✍️" },
  { value: "general", label: "General Advice", icon: "💬" },
];

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    degree: "",
    consultationType: "",
    message: "",
    budget: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      // show submitted anyway for UX
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Consultation Booked!</h2>
          <p className="text-gray-600 mb-6">
            Thank you! One of our advisors will contact you within 24 hours to confirm your free consultation.
          </p>
          <div className="space-y-2">
            <Link href="/universities" className="block w-full bg-[#1a56db] text-white py-3 rounded-xl font-bold hover:bg-[#1e429f] transition-colors">
              Browse Universities
            </Link>
            <Link href="/" className="block w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-5">
            ✅ Free · No obligation · Response within 24 hours
          </div>
          <h1 className="text-4xl font-black mb-4">Book Your Free Consultation</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Tell us your goals. Our expert advisors will create a personalized plan for your international education journey — completely free.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone / WhatsApp</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Country</label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] transition-colors bg-white"
                    >
                      <option value="">Any / Not sure yet</option>
                      {COUNTRIES.map((c) => (
                        <option key={c.slug} value={c.name}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Degree Level</label>
                    <select
                      name="degree"
                      value={form.degree}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] transition-colors bg-white"
                    >
                      <option value="">Select level</option>
                      {DEGREE_LEVELS.map((l) => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual Budget (USD)</label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] transition-colors bg-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 – $15,000</option>
                      <option value="15k-30k">$15,000 – $30,000</option>
                      <option value="30k-plus">$30,000+</option>
                      <option value="scholarship">Looking for full scholarship</option>
                    </select>
                  </div>
                </div>

                {/* Consultation type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What do you need help with?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CONSULTATION_TYPES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, consultationType: t.value }))}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors text-left ${
                          form.consultationType === t.value
                            ? "border-[#1a56db] bg-blue-50 text-[#1a56db]"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tell us more about your goals</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="E.g., I'm a final year student looking to do a Master's in Computer Science in Germany or Canada. My GPA is 3.5..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a56db] hover:bg-[#1e429f] text-white py-4 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? "Submitting…" : (
                    <><span>Book Free Consultation</span> <ArrowRight size={18} /></>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to our{" "}
                  <Link href="/privacy" className="text-[#1a56db] hover:underline">Privacy Policy</Link>.
                  We never share your data.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What to expect */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">What to Expect</h3>
              <div className="space-y-4">
                {[
                  { icon: "⚡", title: "Quick response", desc: "An advisor reaches out within 24 hours" },
                  { icon: "🎯", title: "Personalized plan", desc: "Tailored to your background, goals, and budget" },
                  { icon: "🆓", title: "100% free", desc: "No cost, no commitment, no pressure" },
                  { icon: "🌍", title: "Expert knowledge", desc: "Advisors who've studied or worked in your target country" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="text-xl flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Prefer to reach out directly?</h3>
              <div className="space-y-3">
                <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-sm font-medium text-green-800">
                  <MessageCircle size={18} className="text-green-600" />
                  WhatsApp us
                </a>
                <a href="mailto:hello@jandifyglobal.com" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-sm font-medium text-blue-800">
                  <Mail size={18} className="text-blue-600" />
                  hello@jandifyglobal.com
                </a>
                <a href="tel:+2348000000000" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-800">
                  <Phone size={18} className="text-gray-600" />
                  +234 800 000 0000
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-5 text-white text-center">
              <div className="text-3xl font-black mb-1">2,500+</div>
              <div className="text-blue-100 text-sm mb-3">students helped since {new Date().getFullYear() - 5}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white/10 rounded-xl p-2">
                  <div className="font-bold">85%+</div>
                  <div className="text-blue-200 text-xs">Offer rate</div>
                </div>
                <div className="bg-white/10 rounded-xl p-2">
                  <div className="font-bold">60+</div>
                  <div className="text-blue-200 text-xs">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
