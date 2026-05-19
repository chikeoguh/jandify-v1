import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth-admin";
import Link from "next/link";
import {
  Users, MessageSquare, ClipboardList, Calendar,
  TrendingUp, Clock, CheckCircle, AlertCircle, ArrowRight,
} from "lucide-react";

async function getStats() {
  const [
    totalConsultations, pendingConsultations, totalApplications,
    activeApplications, totalClients, todayAppointments,
    totalArticles, pendingTestimonials,
  ] = await Promise.all([
    prisma.consultation.count(),
    prisma.consultation.count({ where: { status: "PENDING" } }),
    prisma.application.count(),
    prisma.application.count({ where: { status: { notIn: ["ENROLLED", "WITHDRAWN", "REJECTED"] } } }),
    prisma.client.count(),
    prisma.appointment.count({
      where: {
        scheduledAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: "CONFIRMED",
      },
    }),
    prisma.article.count({ where: { published: true } }),
    prisma.testimonial.count({ where: { approved: false } }),
  ]);

  return {
    totalConsultations, pendingConsultations, totalApplications,
    activeApplications, totalClients, todayAppointments,
    totalArticles, pendingTestimonials,
  };
}

async function getRecentActivity() {
  const [consultations, applications, appointments] = await Promise.all([
    prisma.consultation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, targetCountry: true, status: true, createdAt: true },
    }),
    prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, universityName: true, programName: true, status: true, createdAt: true, client: { select: { name: true } } },
    }),
    prisma.appointment.findMany({
      take: 5,
      orderBy: { scheduledAt: "asc" },
      where: { scheduledAt: { gte: new Date() }, status: "CONFIRMED" },
      select: { id: true, clientName: true, type: true, scheduledAt: true, advisor: { select: { name: true } } },
    }),
  ]);
  return { consultations, applications, appointments };
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  SCHEDULED: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  CONFIRMED: "bg-green-100 text-green-700",
  UNDER_REVIEW: "bg-blue-100 text-blue-700",
  OFFER_ACCEPTED: "bg-emerald-100 text-emerald-700",
  ENROLLED: "bg-green-100 text-green-700",
};

export default async function AdminDashboard() {
  const session = await getAdminSession();
  const stats = await getStats();
  const { consultations, applications, appointments } = await getRecentActivity();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">{greeting}, {session?.name?.split(" ")[0] || "Admin"} 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening on Jandify Global today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Consultations",
            value: stats.totalConsultations,
            sub: `${stats.pendingConsultations} pending`,
            icon: MessageSquare,
            color: "bg-blue-500",
            href: "/admin/consultations",
            alert: stats.pendingConsultations > 0,
          },
          {
            label: "Applications",
            value: stats.totalApplications,
            sub: `${stats.activeApplications} active`,
            icon: ClipboardList,
            color: "bg-purple-500",
            href: "/admin/applications",
          },
          {
            label: "Clients",
            value: stats.totalClients,
            sub: "total registered",
            icon: Users,
            color: "bg-emerald-500",
            href: "/admin/users",
          },
          {
            label: "Today's Appointments",
            value: stats.todayAppointments,
            sub: "confirmed today",
            icon: Calendar,
            color: "bg-amber-500",
            href: "/admin/appointments",
            alert: stats.todayAppointments > 0,
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                {s.alert && (
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
              <div className="text-2xl font-black text-gray-900 mb-0.5">{s.value}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
              <div className="text-xs text-gray-400 mt-1 font-medium">{s.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Published Articles", value: stats.totalArticles, icon: "📝", href: "/admin/articles" },
          { label: "Pending Testimonials", value: stats.pendingTestimonials, icon: "⭐", href: "/admin/testimonials" },
          { label: "Total Revenue", value: "₦0", icon: "💰", href: "/admin/settings" },
          { label: "Avg. Offer Rate", value: "85%", icon: "📈", href: "/admin/applications" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-black text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent activity grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent consultations */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Recent Consultations</h2>
            <Link href="/admin/consultations" className="text-xs text-[#1a56db] font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {consultations.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-400">No consultations yet</div>
            ) : (
              consultations.map((c) => (
                <Link key={c.id} href={`/admin/consultations/${c.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{c.name}</div>
                    <div className="text-xs text-gray-400 truncate">{c.targetCountry || c.email}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_COLORS[c.status] || "bg-gray-100 text-gray-600"}`}>
                    {c.status}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent applications */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Recent Applications</h2>
            <Link href="/admin/applications" className="text-xs text-[#1a56db] font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {applications.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-400">No applications yet</div>
            ) : (
              applications.map((a) => (
                <Link key={a.id} href={`/admin/applications/${a.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm flex-shrink-0">
                    {a.client.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{a.client.name}</div>
                    <div className="text-xs text-gray-400 truncate">{a.universityName}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_COLORS[a.status] || "bg-gray-100 text-gray-600"}`}>
                    {a.status.replace(/_/g, " ")}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Upcoming Appointments</h2>
            <Link href="/admin/appointments" className="text-xs text-[#1a56db] font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {appointments.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-400">No upcoming appointments</div>
            ) : (
              appointments.map((a) => (
                <Link key={a.id} href={`/admin/appointments`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
                    {a.clientName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{a.clientName}</div>
                    <div className="text-xs text-gray-400 truncate">
                      {new Date(a.scheduledAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                    {a.type.replace(/_/g, " ")}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-6">
        <h2 className="font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "New Consultation", href: "/admin/consultations", icon: "💬" },
            { label: "Add Client", href: "/admin/users", icon: "👤" },
            { label: "New Article", href: "/admin/articles/new", icon: "✍️" },
            { label: "Schedule Appointment", href: "/admin/appointments", icon: "📅" },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-3 text-center transition-colors"
            >
              <div className="text-xl mb-1">{a.icon}</div>
              <div className="text-white text-xs font-semibold">{a.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
