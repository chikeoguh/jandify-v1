"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, User, Mail, Phone, Globe, FileText,
  Calendar, ClipboardList, Save, CheckCircle, Ban, RotateCcw
} from "lucide-react";
import Link from "next/link";

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  notes: string | null;
  isActive: boolean;
  createdAt: string;
  consultations: Array<{ id: string; type: string; status: string; targetCountry: string | null; createdAt: string }>;
  applications: Array<{ id: string; universityName: string; program: string; status: string; createdAt: string }>;
  appointments: Array<{ id: string; type: string; status: string; scheduledAt: string }>;
  documents: Array<{ id: string; name: string; type: string; status: string; uploadedAt: string }>;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  CONFIRMED: "bg-green-100 text-green-700",
  SUBMITTED: "bg-gray-100 text-gray-700",
  OFFER_RECEIVED: "bg-purple-100 text-purple-700",
  ENROLLED: "bg-green-100 text-green-700",
};

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", country: "", notes: "" });
  const [activeTab, setActiveTab] = useState<"consultations" | "applications" | "appointments" | "documents">("consultations");

  useEffect(() => {
    fetch(`/api/admin/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setClient(data);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          country: data.country || "",
          notes: data.notes || "",
        });
        setLoading(false);
      });
  }, [id]);

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function toggleStatus() {
    if (!client) return;
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !client.isActive }),
    });
    setClient({ ...client, isActive: !client.isActive });
  }

  if (loading) return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded-xl w-48" />
        <div className="h-48 bg-gray-200 rounded-2xl" />
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );

  if (!client) return (
    <div className="p-6 text-center">
      <p className="text-gray-500">Client not found.</p>
      <button onClick={() => router.back()} className="mt-4 text-[#1a56db] text-sm font-semibold">← Go back</button>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/users" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={18} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">{client.name}</h1>
            <p className="text-gray-400 text-sm">{client.email} · Joined {new Date(client.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${client.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {client.isActive ? "Active" : "Inactive"}
          </span>
          <button onClick={toggleStatus}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-xl text-xs font-semibold transition-colors">
            {client.isActive ? <><Ban size={13} /> Deactivate</> : <><RotateCcw size={13} /> Reactivate</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><User size={16} /> Client Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
                <input value={client.email} disabled
                  className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Country</label>
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="Nigeria"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Internal Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3} placeholder="Private notes visible only to admins…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] transition-colors resize-none" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={handleSave} disabled={saving}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${saved ? "bg-green-600 text-white" : "bg-[#1a56db] hover:bg-[#1e429f] text-white"} disabled:opacity-70`}>
                {saved ? <><CheckCircle size={15} /> Saved</> : <><Save size={15} /> {saving ? "Saving…" : "Save Changes"}</>}
              </button>
            </div>
          </div>

          {/* Activity Tabs */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="flex border-b border-gray-100">
              {(["consultations", "applications", "appointments", "documents"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-xs font-semibold capitalize transition-colors ${activeTab === tab ? "text-[#1a56db] border-b-2 border-[#1a56db]" : "text-gray-500 hover:text-gray-700"}`}>
                  {tab} ({tab === "consultations" ? client.consultations.length : tab === "applications" ? client.applications.length : tab === "appointments" ? client.appointments.length : client.documents.length})
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === "consultations" && (
                client.consultations.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">No consultations yet</p>
                ) : (
                  <div className="space-y-2">
                    {client.consultations.map((c) => (
                      <Link key={c.id} href={`/admin/consultations/${c.id}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors group">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{c.type.replace(/_/g, " ")}</div>
                          <div className="text-xs text-gray-400">{c.targetCountry || "General"} · {new Date(c.createdAt).toLocaleDateString("en-GB")}</div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[c.status] || "bg-gray-100 text-gray-600"}`}>
                          {c.status.replace(/_/g, " ")}
                        </span>
                      </Link>
                    ))}
                  </div>
                )
              )}

              {activeTab === "applications" && (
                client.applications.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">No applications yet</p>
                ) : (
                  <div className="space-y-2">
                    {client.applications.map((a) => (
                      <Link key={a.id} href={`/admin/applications/${a.id}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{a.universityName}</div>
                          <div className="text-xs text-gray-400">{a.program} · {new Date(a.createdAt).toLocaleDateString("en-GB")}</div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[a.status] || "bg-gray-100 text-gray-600"}`}>
                          {a.status.replace(/_/g, " ")}
                        </span>
                      </Link>
                    ))}
                  </div>
                )
              )}

              {activeTab === "appointments" && (
                client.appointments.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">No appointments yet</p>
                ) : (
                  <div className="space-y-2">
                    {client.appointments.map((a) => (
                      <div key={a.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{a.type.replace(/_/g, " ")}</div>
                          <div className="text-xs text-gray-400">{new Date(a.scheduledAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[a.status] || "bg-gray-100 text-gray-600"}`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}

              {activeTab === "documents" && (
                client.documents.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">No documents uploaded yet</p>
                ) : (
                  <div className="space-y-2">
                    {client.documents.map((d) => (
                      <div key={d.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-gray-400" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{d.name}</div>
                            <div className="text-xs text-gray-400">{d.type} · {new Date(d.uploadedAt).toLocaleDateString("en-GB")}</div>
                          </div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[d.status] || "bg-gray-100 text-gray-600"}`}>
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { icon: ClipboardList, label: "Consultations", value: client.consultations.length, color: "text-blue-600 bg-blue-50" },
                { icon: FileText, label: "Applications", value: client.applications.length, color: "text-purple-600 bg-purple-50" },
                { icon: Calendar, label: "Appointments", value: client.appointments.length, color: "text-green-600 bg-green-50" },
                { icon: FileText, label: "Documents", value: client.documents.length, color: "text-amber-600 bg-amber-50" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
                      <Icon size={13} />
                    </div>
                    <span className="text-sm text-gray-600">{label}</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-3">Contact</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={13} className="text-gray-400" />
                <a href={`mailto:${client.email}`} className="hover:text-[#1a56db] transition-colors truncate">{client.email}</a>
              </div>
              {client.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={13} className="text-gray-400" />
                  <a href={`tel:${client.phone}`} className="hover:text-[#1a56db] transition-colors">{client.phone}</a>
                </div>
              )}
              {client.country && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe size={13} className="text-gray-400" />
                  <span>{client.country}</span>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <a href={`mailto:${client.email}`}
                className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-700 hover:bg-gray-50 py-2.5 rounded-xl text-xs font-semibold transition-colors">
                <Mail size={13} /> Send Email
              </a>
              {client.phone && (
                <a href={`https://wa.me/${client.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#22c55e] text-white py-2.5 rounded-xl text-xs font-semibold transition-colors">
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
