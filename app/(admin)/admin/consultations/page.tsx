import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MessageSquare, Plus, Search, Filter, ArrowRight } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONTACTED: "bg-blue-100 text-blue-700 border-blue-200",
  SCHEDULED: "bg-purple-100 text-purple-700 border-purple-200",
  IN_PROGRESS: "bg-indigo-100 text-indigo-700 border-indigo-200",
  COMPLETED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  NO_SHOW: "bg-gray-100 text-gray-700 border-gray-200",
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-gray-50 text-gray-500",
  NORMAL: "bg-blue-50 text-blue-600",
  HIGH: "bg-orange-50 text-orange-600",
  URGENT: "bg-red-50 text-red-600",
};

interface PageProps {
  searchParams: Promise<{ status?: string; q?: string }>;
}

export default async function ConsultationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const statusFilter = params.status;
  const query = params.q;

  const consultations = await prisma.consultation.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter as any } : {}),
      ...(query ? {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { targetCountry: { contains: query, mode: "insensitive" } },
        ],
      } : {}),
    },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    include: { advisor: { select: { name: true } } },
  });

  const counts = await prisma.consultation.groupBy({
    by: ["status"],
    _count: true,
  });
  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count]));

  const STATUSES = ["PENDING", "CONTACTED", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Consultations</h1>
          <p className="text-gray-500 text-sm mt-0.5">{consultations.length} total records</p>
        </div>
        <Link
          href="/admin/consultations/new"
          className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e429f] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
        >
          <Plus size={16} /> New Consultation
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <Link
          href="/admin/consultations"
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
            !statusFilter ? "bg-[#1a56db] text-white border-[#1a56db]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          }`}
        >
          All ({consultations.length})
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/consultations?status=${s}`}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
              statusFilter === s ? "bg-[#1a56db] text-white border-[#1a56db]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            {s.replace(/_/g, " ")} {countMap[s] ? `(${countMap[s]})` : ""}
          </Link>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
        <Search size={16} className="text-gray-400" />
        <form className="flex-1">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search by name, email, country…"
            className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </form>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="text-left px-5 py-3.5">Client</th>
                <th className="text-left px-5 py-3.5">Target</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Type</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5 hidden lg:table-cell">Priority</th>
                <th className="text-left px-5 py-3.5 hidden lg:table-cell">Advisor</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Date</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 text-sm">No consultations found</p>
                  </td>
                </tr>
              ) : (
                consultations.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{c.name}</div>
                          <div className="text-xs text-gray-400">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-gray-700">{c.targetCountry || "—"}</div>
                      <div className="text-xs text-gray-400">{c.degreeLevel || ""}</div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-gray-600">{c.consultationType?.replace(/_/g, " ") || "General"}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${STATUS_COLORS[c.status]}`}>
                        {c.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${PRIORITY_COLORS[c.priority]}`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-600">{c.advisor?.name || "Unassigned"}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/consultations/${c.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[#1a56db] text-xs font-semibold hover:underline"
                      >
                        View <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
