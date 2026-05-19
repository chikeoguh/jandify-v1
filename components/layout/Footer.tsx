import Link from "next/link";
import { BRAND, COUNTRIES, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center text-white font-black text-sm">J</div>
              <span className="font-black text-lg text-white">Jandify Global</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-xs">
              Your trusted guide to universities worldwide. We've helped 2,500+ students from Nigeria gain admission to top universities in 60+ countries.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm hover:bg-[#1a56db] transition-colors">📷</a>
              <a href={BRAND.telegram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm hover:bg-[#1a56db] transition-colors">✈️</a>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm hover:bg-[#1a56db] transition-colors">💬</a>
              <a href={BRAND.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm hover:bg-[#1a56db] transition-colors">▶️</a>
            </div>
            <div className="text-sm text-gray-400">
              <p>📞 {BRAND.phone}</p>
              <p>✉️ {BRAND.email}</p>
              <p>📍 {BRAND.address}</p>
            </div>
          </div>

          {/* Countries */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Study Destinations</h4>
            <ul className="space-y-2">
              {COUNTRIES.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/countries/${c.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>{c.flag}</span> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/universities" className="hover:text-white transition-colors">University Search</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Program Search</Link></li>
              <li><Link href="/consultation" className="hover:text-white transition-colors">Free Consultation</Link></li>
              <li><Link href="/articles/scholarship-guide" className="hover:text-white transition-colors">Scholarship Guidance</Link></li>
              <li><Link href="/articles/visa-guide" className="hover:text-white transition-colors">Visa Support</Link></li>
              <li><Link href="/schools" className="hover:text-white transition-colors">Secondary Schools</Link></li>
              <li><Link href="/consultation" className="hover:text-white transition-colors">Document Services</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/articles" className="hover:text-white transition-colors">Study Abroad Guides</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about#team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/about#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/consultation" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Client Portal</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Jandify Global. All rights reserved. Advisory services only — not a legal immigration firm.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link href="/cookie-policy" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
