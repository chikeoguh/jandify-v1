"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Calendar, MessageSquare, FileText,
  Settings, LogOut, GraduationCap, Star, ChevronRight,
  ClipboardList, Bell, Menu, X, UserCog, BookOpen,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Consultations", href: "/admin/consultations", icon: MessageSquare },
  { label: "Applications", href: "/admin/applications", icon: ClipboardList },
  { label: "Appointments", href: "/admin/appointments", icon: Calendar },
  { label: "Clients", href: "/admin/users", icon: Users },
  { label: "Articles", href: "/admin/articles", icon: BookOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Admin Users", href: "/admin/admins", icon: UserCog },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface Props {
  admin: { name: string | null; email: string; role: string };
}

export function AdminSidebar({ admin }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  function isActive(item: typeof NAV[0]) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  const RoleBadge = () => {
    const colors: Record<string, string> = {
      SUPER_ADMIN: "bg-purple-100 text-purple-700",
      ADMIN: "bg-blue-100 text-blue-700",
      ADVISOR: "bg-green-100 text-green-700",
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${colors[admin.role] || "bg-gray-100 text-gray-700"}`}>
        {admin.role.replace("_", " ")}
      </span>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5" target="_blank">
          <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center text-white font-black text-sm">J</div>
          <div>
            <div className="font-black text-gray-900 text-sm leading-tight">Jandify Global</div>
            <div className="text-xs text-gray-400 leading-tight">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-[#1a56db] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={17} className="flex-shrink-0" />
              <span>{item.label}</span>
              {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-gray-100 px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1a56db] to-[#7c3aed] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {(admin.name || admin.email).charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 truncate">{admin.name || "Admin"}</div>
            <div className="text-xs text-gray-400 truncate">{admin.email}</div>
          </div>
        </div>
        <RoleBadge />
        <button
          onClick={handleLogout}
          className="mt-3 flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 bg-white border-r border-gray-200 flex-col flex-shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#1a56db] rounded-lg flex items-center justify-center text-white font-black text-xs">J</div>
          <span className="font-bold text-gray-900 text-sm">Admin Panel</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-600">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-white h-full shadow-xl overflow-y-auto">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
