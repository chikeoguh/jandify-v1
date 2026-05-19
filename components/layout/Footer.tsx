import Link from "next/link";
import { BRAND, COUNTRIES, NAV_ITEMS } from "@/lib/constants";
import { Camera, Send, MessageCircle, Play, Phone, Mail, MapPin } from "lucide-react";

const SOCIAL_LINKS = [
  { href: BRAND.instagram, icon: Camera,         label: "Instagram"  },
  { href: BRAND.telegram,  icon: Send,            label: "Telegram"   },
  { href: BRAND.whatsapp,  icon: MessageCircle,   label: "WhatsApp"   },
  { href: BRAND.youtube,   icon: Play,            label: "YouTube"    },
];

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-400" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 cursor-pointer group" aria-label="Jandify Global home">
              <div className="w-9 h-9 bg-[#1E40AF] rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:bg-[#2563eb] transition-colors">
                J
              </div>
              <span
                className="font-black text-lg text-white"
                style={{ fontFamily: "var(--font-poppins, system-ui)" }}
              >
                Jandify <span className="text-[#3B82F6]">Global</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-xs">
              Your trusted guide to universities worldwide. We&apos;ve helped {BRAND.studentsHelped}+ students
              from Nigeria gain admission to top universities in 60+ countries.
            </p>

            {/* Social icons — SVG only, no emojis */}
            <div className="flex items-center gap-3 mb-6">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-[#1E40AF] rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Icon size={16} className="text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>

            {/* Contact details */}
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Phone size={13} className="text-gray-500 flex-shrink-0" />
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Mail size={13} className="text-gray-500 flex-shrink-0" />
                {BRAND.email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-gray-500 flex-shrink-0" />
                <span>{BRAND.address}</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-5"
              style={{ fontFamily: "var(--font-poppins, system-ui)" }}
            >
              Study Destinations
            </h4>
            <ul className="space-y-2.5">
              {COUNTRIES.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/countries/${c.slug}`}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-5"
              style={{ fontFamily: "var(--font-poppins, system-ui)" }}
            >
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "University Search",   href: "/universities"                      },
                { label: "Program Search",      href: "/programs"                          },
                { label: "Free Consultation",   href: "/consultation"                      },
                { label: "Scholarship Guidance",href: "/articles/scholarship-guide"        },
                { label: "Visa Support",        href: "/articles/visa-guide"               },
                { label: "Document Services",   href: "/consultation"                      },
                { label: "Secondary Schools",   href: "/schools"                           },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-5"
              style={{ fontFamily: "var(--font-poppins, system-ui)" }}
            >
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Study Abroad Guides", href: "/articles"         },
                { label: "About Us",            href: "/about"            },
                { label: "Our Team",            href: "/about#team"       },
                { label: "FAQ",                 href: "/about#faq"        },
                { label: "Contact Us",          href: "/consultation"     },
                { label: "Client Portal",       href: "/login"            },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA block */}
            <div
              className="mt-6 p-4 rounded-xl border border-[#1E40AF]/30"
              style={{ background: "rgba(30,64,175,0.12)" }}
            >
              <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                Ready to start your journey?
              </p>
              <Link
                href="/consultation"
                className="inline-block text-xs bg-[#22C55E] hover:bg-[#16a34a] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition-colors"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Jandify Global. All rights reserved. Advisory services only — not a legal immigration firm.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy"       className="hover:text-gray-300 transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="/terms"         className="hover:text-gray-300 transition-colors cursor-pointer">Terms of Use</Link>
            <Link href="/cookie-policy" className="hover:text-gray-300 transition-colors cursor-pointer">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
