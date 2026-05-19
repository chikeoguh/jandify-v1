import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ClipboardList, ArrowRight, Plus } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-blue-50 text-blue-700",
  UNDER_REVIEW: "bg-amber-50 text-amber-700",
  DOCUMENTS_REQUESTED: "bg-orange-50 text-orange-700",
  DOCUMENTS_RECEIVED: "bg-yellow-50 text-yellow-700",
  SUBMITTED_TO_UNIVERSITY: "bg-indigo-50 text-indigo-700",
  AWAITING_DECISION: "bg-purple-50 text-purple-700",
  CONDITIONAL_OFFER: "bg-teal-50 text-teal-700",
  UNCONDITIONAL_OFFER: "bg-emerald-50 text-emerald-700",
  OFFER_ACCEPTED: "bg-green-50 text-green-700",
  VISA_APPLIED: "bg-cyan-50 text-cyan-700",
  VISA_APPROVED: "bg-green-100 text-green-800",
  VISA_REFUSED: "bg-red-50 text-red-700",
  ENROLLED: "bg-green-200 text-green-900",
  WITHDRAWN: "bg-gray-100 text-gray-600",
  REJECTED: "bg-red-100 text-red-800",
};

interface PageProps {
  searchParams: Promise<{ status?: string; q?: string }>;
}

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const statusFilter = params.status;
  const query = params.q;

  const applications = await prisma.application.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter as any } : {}),
      ...(query ? {
        OR: [
          { universityName: { contains: query, mode: "insensitive" } },
          { programName: { contains: query, mode: "insensitive" } },
          { client: { name: { contains: query, mode: "insensitive" } } },
        ],
      } : {}),
    },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    include: { client: { select: { name: true, email: true } } },
  });

  const stages = [
    { label: "In Progress", statuses: ["SUBMITTED", "UNDER_REVIEW", "DOCUMENTS_REQUESTED", "SUBMITTED_TO_UNIVERSITY", "AWAITING_DECISION"] },
    { label: "Offers", statuses: ["CONDITIONAL_OFFER", "UNCONDITIONAL_OFFER", "OFFER_ACCEPTED"] },
    { label: "Visa", statuses: ["VISA_APPLIED", "VISA_APPROVED"] },
    { label: "Enrolled", statuses: ["ENROLLED"] },
    { label: "Closed", statuses: ["WITHDRAWN", "REJECTED", "VISA_REFUSED"] },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Applications</h1>
          <p className="text-gray-500 text-sm mt-0.5">Track student university applications</p>
        </div>
      </div>

      {/* Stage overview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {stages.map((stage) => {
          const count = applications.filter((a) => stage.statuses.includes(a.status)).length;
          return (
            <div key={stage.label} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
              <div className="text-xl font-black text-gray-900">{count}</div>
              <div className="text-xs text-gray-500">{stage.label}</div>
            </div>
          );
        })}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        <Link href="/admin/applications" className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${!statusFilter ? "bg-[#1a56db] text-white border-[#1a56db]" : "bg-white text-gray-600 border-gray-200"}`}>
          All ({applications.length})
        </Link>
        {["SUBMITTED", "UNDER_REVIEW", "OFFER_ACCEPTED", "VISA_APPROVED", "ENROLLED"].map((s) => (
          <Link key={s} href={`/admin/applications?status=${s}`} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${statusFilter === s ? "bg-[#1a56db] text-white border-[#1a56db]" : "bg-white text-gray-600 border-gray-200"}`}>
            {s.replace(/_/g, " ")}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="text-left px-5 py-3.5">Client</th>
                <th className="text-left px-5 py-3.5">University</th>
                <th className="text-left px-5 py-3.5">Program</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5 hidden lg:table-cell">Applied</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.length === 0 ? (
                <tr><td colSpan={6} className="py-16 text-center">
                  <ClipboardList size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm">No applications found</p>
                </td></tr>
              ) : applications.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-sm text-gray-900">{a.client.name}</div>
                    <div className="text-xs text-gray-400">{a.client.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-semibold text-gray-800">{a.universityName}</div>
                    <div className="text-xs text-gray-400">{a.universityCountry}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-gray-700">{a.programName}</div>
                    <div className="text-xs text-gray-400">{a.degreeLevel}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[a.status] || "bg-gray-100 text-gray-600"}`}>
                      {a.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString("en-GB")}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/applications/${a.id}`} className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[#1a56db] text-xs font-semibold hover:underline transition-opacity">
                      View <ArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
