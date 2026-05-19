import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, Plus } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  CONSULTATION: "Consultation",
  FOLLOW_UP: "Follow-up",
  DOCUMENT_REVIEW: "Document Review",
  VISA_PREP: "Visa Prep",
  MOCK_INTERVIEW: "Mock Interview",
  ORIENTATION: "Orientation",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  NO_SHOW: "bg-orange-100 text-orange-700",
  RESCHEDULED: "bg-blue-100 text-blue-700",
};

interface PageProps {
  searchParams: Promise<{ status?: string; view?: string }>;
}

export default async function AppointmentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const statusFilter = params.status;

  const now = new Date();
  const upcoming = await prisma.appointment.findMany({
    where: {
      scheduledAt: { gte: now },
      ...(statusFilter ? { status: statusFilter as any } : {}),
    },
    orderBy: { scheduledAt: "asc" },
    include: { advisor: { select: { name: true } } },
  });

  const past = await prisma.appointment.findMany({
    where: {
      scheduledAt: { lt: now },
      ...(statusFilter ? { status: statusFilter as any } : {}),
    },
    orderBy: { scheduledAt: "desc" },
    take: 20,
    include: { advisor: { select: { name: true } } },
  });

  const AppointmentRow = ({ a }: { a: typeof upcoming[0] }) => (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
      {/* Date block */}
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-center flex-shrink-0">
        <div className="text-xs font-bold text-[#1a56db] uppercase leading-tight">
          {new Date(a.scheduledAt).toLocaleString("en-GB", { month: "short" })}
        </div>
        <div className="text-xl font-black text-gray-900 leading-tight">
          {new Date(a.scheduledAt).getDate()}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 text-sm">{a.clientName}</div>
        <div className="text-xs text-gray-400">
          {new Date(a.scheduledAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} · {a.duration} min · {TYPE_LABELS[a.type]}
        </div>
        {a.advisor && <div className="text-xs text-[#1a56db] mt-0.5">Advisor: {a.advisor.name}</div>}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[a.status]}`}>
          {a.status}
        </span>
        {a.meetLink && (
          <a href={a.meetLink} target="_blank" rel="noopener noreferrer"
            className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors">
            Join
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Appointments</h1>
          <p className="text-gray-500 text-sm mt-0.5">{upcoming.length} upcoming · {past.length} past</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e429f] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          <Plus size={16} /> New Appointment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Upcoming", value: upcoming.length, color: "text-[#1a56db]" },
          { label: "Confirmed", value: upcoming.filter((a) => a.status === "CONFIRMED").length, color: "text-green-600" },
          { label: "Today", value: upcoming.filter((a) => new Date(a.scheduledAt).toDateString() === now.toDateString()).length, color: "text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900 flex items-center gap-2"><Calendar size={16} className="text-[#1a56db]" />Upcoming</h2>
        </div>
        {upcoming.length === 0 ? (
          <div className="py-12 text-center">
            <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm">No upcoming appointments</p>
          </div>
        ) : upcoming.map((a) => <AppointmentRow key={a.id} a={a} />)}
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 text-sm text-gray-500">Past Appointments</h2>
          </div>
          {past.map((a) => <AppointmentRow key={a.id} a={a} />)}
        </div>
      )}
    </div>
  );
}
