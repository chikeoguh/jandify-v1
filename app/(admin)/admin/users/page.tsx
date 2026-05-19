import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, ArrowRight, Plus } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ClientsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q;

  const clients = await prisma.client.findMany({
    where: query ? {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    } : {},
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { consultations: true, applications: true, appointments: true } },
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Clients</h1>
          <p className="text-gray-500 text-sm mt-0.5">{clients.length} registered clients</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e429f] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Search */}
      <form className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2 mb-5">
        <span className="text-gray-400">🔍</span>
        <input name="q" defaultValue={query} placeholder="Search by name or email…"
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400" />
      </form>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="text-left px-5 py-3.5">Client</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Country</th>
                <th className="text-center px-5 py-3.5 hidden lg:table-cell">Consultations</th>
                <th className="text-center px-5 py-3.5 hidden lg:table-cell">Applications</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Joined</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clients.length === 0 ? (
                <tr><td colSpan={7} className="py-16 text-center">
                  <Users size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm">No clients found</p>
                </td></tr>
              ) : clients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#1a56db] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600">{c.country || "—"}</span>
                  </td>
                  <td className="px-5 py-4 text-center hidden lg:table-cell">
                    <span className="text-sm font-semibold text-gray-700">{c._count.consultations}</span>
                  </td>
                  <td className="px-5 py-4 text-center hidden lg:table-cell">
                    <span className="text-sm font-semibold text-gray-700">{c._count.applications}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString("en-GB")}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/users/${c.id}`} className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[#1a56db] text-xs font-semibold hover:underline transition-opacity">
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
