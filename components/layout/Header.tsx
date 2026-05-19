"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, COUNTRIES, BRAND } from "@/lib/constants";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Globe,
  GraduationCap,
  BookOpen,
  Briefcase,
  FileText,
  Users,
} from "lucide-react";

const COUNTRY_ICONS: Record<string, string> = {
  "united-kingdom": "🇬🇧",
  germany: "🇩🇪",
  canada: "🇨🇦",
  australia: "🇦🇺",
  "united-states": "🇺🇸",
  france: "🇫🇷",
  netherlands: "🇳🇱",
  ireland: "🇮🇪",
  portugal: "🇵🇹",
  sweden: "🇸🇪",
  poland: "🇵🇱",
  uae: "🇦🇪",
};

const NAV_ICONS: Record<string, React.ReactNode> = {
  Countries: <Globe size={16} />,
  Universities: <GraduationCap size={16} />,
  Programs: <BookOpen size={16} />,
  Admission: <Briefcase size={16} />,
  Articles: <FileText size={16} />,
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#1a56db] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors flex items-center gap-1">
              <span>💬</span> WhatsApp: {BRAND.phone}
            </a>
            <span className="text-blue-300 hidden sm:inline">|</span>
            <a href={BRAND.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors hidden sm:flex items-center gap-1">
              <span>✈️</span> Telegram Channel
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-200 hidden sm:inline">Prices in NGN (₦)</span>
            <Link href="/login" className="hover:text-blue-200 transition-colors">Log in</Link>
            <Link
              href="/consultation"
              className="bg-white text-[#1a56db] px-3 py-0.5 rounded text-xs font-semibold hover:bg-blue-50 transition-colors"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4" ref={menuRef}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center text-white font-black text-sm">J</div>
            <span className="font-black text-lg text-gray-900">
              Jandify <span className="text-[#1a56db]">Global</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                {item.items.length > 0 ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeMenu === item.label
                        ? "text-[#1a56db] bg-blue-50"
                        : "text-gray-700 hover:text-[#1a56db] hover:bg-blue-50"
                    }`}
                    onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                  >
                    {NAV_ICONS[item.label]}
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1a56db] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {NAV_ICONS[item.label]}
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {activeMenu === item.label && item.items.length > 0 && (
                  <div className={`absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 ${
                    item.label === "Countries" ? "w-[480px] p-4" : "w-56 p-2"
                  }`}>
                    {item.label === "Countries" ? (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-2">Popular Destinations</p>
                        <div className="grid grid-cols-2 gap-1">
                          {COUNTRIES.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/countries/${c.slug}`}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-sm text-gray-700 hover:text-[#1a56db] transition-colors"
                            >
                              <span className="text-lg">{c.flag}</span>
                              <span className="font-medium">{c.name}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 mt-3 pt-3 px-2">
                          <Link href="/countries" className="text-sm text-[#1a56db] font-semibold hover:underline">
                            View all countries →
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-sm text-gray-700 hover:text-[#1a56db] transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-500 hover:text-[#1a56db] hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              href="/consultation"
              className="bg-[#1a56db] hover:bg-[#1e429f] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4">
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[#1a56db] transition-colors">
              <Search size={18} className="text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search universities, countries, programs…"
                className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 pb-6">
          <div className="px-4 pt-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                >
                  <span className="flex items-center gap-2">{NAV_ICONS[item.label]}{item.label}</span>
                  {item.items.length > 0 && (
                    <ChevronDown size={14} className={`transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`} />
                  )}
                </button>
                {activeMenu === item.label && item.items.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.label === "Countries"
                      ? COUNTRIES.map((c) => (
                          <Link key={c.slug} href={`/countries/${c.slug}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-[#1a56db] rounded-lg hover:bg-blue-50 transition-colors">
                            <span>{c.flag}</span> {c.name}
                          </Link>
                        ))
                      : item.items.map((sub) => (
                          <Link key={sub.label} href={sub.href} className="block px-3 py-2 text-sm text-gray-600 hover:text-[#1a56db] rounded-lg hover:bg-blue-50 transition-colors">
                            {sub.label}
                          </Link>
                        ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/consultation" className="block w-full text-center bg-[#1a56db] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1e429f] transition-colors">
                Free Consultation
              </Link>
              <Link href="/login" className="block w-full text-center border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
