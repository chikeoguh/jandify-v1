"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, COUNTRIES, BRAND } from "@/lib/constants";
import {
  Menu, X, ChevronDown, Search, Globe, GraduationCap,
  BookOpen, Briefcase, FileText, MessageCircle, Send,
  Phone, ArrowRight,
} from "lucide-react";

const NAV_ICONS: Record<string, React.ReactNode> = {
  Countries: <Globe size={15} />,
  Universities: <GraduationCap size={15} />,
  Programs: <BookOpen size={15} />,
  Admission: <Briefcase size={15} />,
  Articles: <FileText size={15} />,
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
    setSearchOpen(false);
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

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 12); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#1E40AF] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-200 cursor-pointer"
              aria-label="WhatsApp"
            >
              <MessageCircle size={13} />
              <span className="hidden sm:inline">{BRAND.phone}</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
            <span className="text-blue-400 hidden sm:inline">·</span>
            <a
              href={BRAND.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 hover:text-blue-200 cursor-pointer"
              aria-label="Telegram"
            >
              <Send size={12} />
              Telegram Channel
            </a>
            <span className="text-blue-400 hidden md:inline">·</span>
            <a
              href={`tel:${BRAND.phone}`}
              className="hidden md:flex items-center gap-1.5 hover:text-blue-200 cursor-pointer"
            >
              <Phone size={12} />
              {BRAND.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hover:text-blue-200 cursor-pointer">
              Log in
            </Link>
            <Link
              href="/consultation"
              className="bg-[#22C55E] hover:bg-[#16a34a] text-white px-3 py-1 rounded-md font-semibold cursor-pointer"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav — glassmorphism when scrolled */}
      <div
        className={`transition-all duration-200 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4" ref={menuRef}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer"
            >
              <div className="w-8 h-8 bg-[#1E40AF] rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm">
                J
              </div>
              <span
                className="font-black text-lg text-gray-900"
                style={{ fontFamily: "var(--font-poppins, system-ui)" }}
              >
                Jandify <span className="text-[#1E40AF]">Global</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const active = item.href !== "#" && isActive(item.href);
                return (
                  <div key={item.label} className="relative">
                    {item.items.length > 0 ? (
                      <button
                        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                          activeMenu === item.label || active
                            ? "text-[#1E40AF] bg-blue-50"
                            : "text-gray-700 hover:text-[#1E40AF] hover:bg-blue-50"
                        }`}
                        onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                        aria-expanded={activeMenu === item.label}
                      >
                        {NAV_ICONS[item.label]}
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={`text-gray-400 transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                          active
                            ? "text-[#1E40AF] bg-blue-50"
                            : "text-gray-700 hover:text-[#1E40AF] hover:bg-blue-50"
                        }`}
                      >
                        {NAV_ICONS[item.label]}
                        {item.label}
                      </Link>
                    )}

                    {/* Dropdown */}
                    {activeMenu === item.label && item.items.length > 0 && (
                      <div
                        className={`absolute top-full left-0 mt-2 bg-white rounded-2xl z-50 overflow-hidden ${
                          item.label === "Countries"
                            ? "w-[520px] p-5"
                            : "w-56 p-2"
                        }`}
                        style={{ boxShadow: "0 8px 32px rgba(30,64,175,0.16), 0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(30,64,175,0.1)" }}
                      >
                        {item.label === "Countries" ? (
                          <>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                              Study Destinations
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                              {COUNTRIES.map((c) => (
                                <Link
                                  key={c.slug}
                                  href={`/countries/${c.slug}`}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-blue-50 text-sm text-gray-700 hover:text-[#1E40AF] transition-colors cursor-pointer group"
                                >
                                  <span className="text-xl leading-none">{c.flag}</span>
                                  <div>
                                    <div className="font-semibold group-hover:text-[#1E40AF]">{c.name}</div>
                                    <div className="text-xs text-gray-400">{c.region}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="border-t border-gray-100 mt-4 pt-3">
                              <Link
                                href="/countries"
                                className="flex items-center gap-1 text-sm text-[#1E40AF] font-semibold hover:underline cursor-pointer"
                              >
                                View all destinations <ArrowRight size={13} />
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="space-y-0.5">
                            {item.items.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-blue-50 text-sm text-gray-700 hover:text-[#1E40AF] transition-colors cursor-pointer"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-500 hover:text-[#1E40AF] hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search size={19} />
              </button>
              <Link
                href="/consultation"
                className="flex items-center gap-1.5 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer shadow-sm"
                style={{ boxShadow: "0 2px 8px rgba(30,64,175,0.3)" }}
              >
                Free Consultation
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Search expandable */}
          {searchOpen && (
            <div className="pb-4 pt-1">
              <div
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#1E40AF] focus-within:bg-white transition-all"
                style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <Search size={17} className="text-gray-400 flex-shrink-0" />
                <input
                  autoFocus
                  type="search"
                  placeholder="Search universities, countries, programs…"
                  className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                  aria-label="Site search"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 pb-6 shadow-lg" role="dialog" aria-label="Mobile navigation">
          <div className="px-4 pt-4 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-[#1E40AF] rounded-xl transition-colors cursor-pointer"
                  onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[#1E40AF]">{NAV_ICONS[item.label]}</span>
                    {item.label}
                  </span>
                  {item.items.length > 0 && (
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {activeMenu === item.label && item.items.length > 0 && (
                  <div className="ml-4 mt-0.5 mb-1 space-y-0.5">
                    {item.label === "Countries"
                      ? COUNTRIES.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/countries/${c.slug}`}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:text-[#1E40AF] rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <span className="text-base">{c.flag}</span>
                            {c.name}
                          </Link>
                        ))
                      : item.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#1E40AF] rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            {sub.label}
                          </Link>
                        ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2.5 border-t border-gray-100 mt-3">
              <Link
                href="/consultation"
                className="flex items-center justify-center gap-2 w-full bg-[#22C55E] hover:bg-[#16a34a] text-white py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
              >
                Book Free Consultation <ArrowRight size={15} />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center w-full border border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
