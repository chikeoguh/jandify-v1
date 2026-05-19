"use client";

import { useEffect, useState } from "react";
import { UserCog, Plus, Shield } from "lucide-react";

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "ADVISOR" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/admins").then((r) => r.json()).then((d) => setAdmins(d.admins || []));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setAdmins((prev) => [data, ...prev]);
      setForm({ name: "", email: "", password: "", role: "ADVISOR" });
      setShowForm(false);
    }
    setSaving(false);
  }

  const ROLE_COLORS: Record<string, string> = {
    SUPER_ADMIN: "bg-purple-100 text-purple-700",
    ADMIN: "bg-blue-100 text-blue-700",
    ADVISOR: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Admin Users</h1>
          <p className="text-gray-500 text-sm">{admins.length} team members</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e429f] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          <Plus size={16} /> Add Admin
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Create New Admin</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="advisor@jandifyglobal.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Password</label>
              <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 8 characters"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] bg-white">
                <option value="ADVISOR">Advisor</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="bg-[#1a56db] hover:bg-[#1e429f] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-70">
                {saving ? "Creating…" : "Create Admin"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="text-left px-5 py-3.5">Name</th>
              <th className="text-left px-5 py-3.5">Role</th>
              <th className="text-left px-5 py-3.5 hidden md:table-cell">Status</th>
              <th className="text-left px-5 py-3.5 hidden md:table-cell">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {admins.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#1a56db] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {(a.name || a.email).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{a.name || "—"}</div>
                      <div className="text-xs text-gray-400">{a.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 w-fit ${ROLE_COLORS[a.role] || "bg-gray-100 text-gray-600"}`}>
                    <Shield size={10} /> {a.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${a.isActive && !a.isSuspended ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {a.isSuspended ? "Suspended" : a.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString("en-GB")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
