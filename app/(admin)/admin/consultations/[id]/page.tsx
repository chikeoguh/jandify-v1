"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Calendar, User, Mail, Phone, Globe, MessageSquare, AlertCircle } from "lucide-react";

const STATUSES = ["PENDING", "CONTACTED", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "NO_SHOW"];
const PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"];

export default function ConsultationDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [advisors, setAdvisors] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/consultations/${id}`).then((r) => r.json()).then(setData);
    fetch("/api/admin/admins").then((r) => r.json()).then((d) => setAdvisors(d.admins || []));
  }, [id]);

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/admin/consultations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!data) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-[#1a56db] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/consultations" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={18} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-gray-900">{data.name}</h1>
            <p className="text-sm text-gray-400">{data.email} · Submitted {new Date(data.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
            saved ? "bg-green-600 text-white" : "bg-[#1a56db] hover:bg-[#1e429f] text-white"
          } disabled:opacity-70`}
        >
          <Save size={15} />
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Client info */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><User size={16} className="text-[#1a56db]" />Client Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", key: "name", icon: User },
                { label: "Email", key: "email", icon: Mail },
                { label: "Phone", key: "phone", icon: Phone },
                { label: "Target Country", key: "targetCountry", icon: Globe },
                { label: "Degree Level", key: "degreeLevel", icon: null },
                { label: "Budget", key: "budget", icon: null },
              ].map(({ label, key, icon: Icon }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#1a56db] transition-colors">
                    {Icon && <Icon size={14} className="text-gray-400 mr-2 flex-shrink-0" />}
                    <input
                      value={data[key] || ""}
                      onChange={(e) => setData({ ...data, [key]: e.target.value })}
                      className="flex-1 outline-none text-sm text-gray-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><MessageSquare size={16} className="text-[#1a56db]" />Client Message</h2>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
              {data.message || "No message provided."}
            </div>
          </div>

          {/* Admin notes */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4">Internal Notes</h2>
            <textarea
              value={data.adminNotes || ""}
              onChange={(e) => setData({ ...data, adminNotes: e.target.value })}
              rows={5}
              placeholder="Add notes, next steps, follow-up actions…"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] transition-colors resize-none"
            />
          </div>

          {/* Schedule */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar size={16} className="text-[#1a56db]" />Scheduling</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Scheduled Date & Time</label>
                <input
                  type="datetime-local"
                  value={data.scheduledAt ? new Date(data.scheduledAt).toISOString().slice(0, 16) : ""}
                  onChange={(e) => setData({ ...data, scheduledAt: e.target.value ? new Date(e.target.value).toISOString() : null })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Follow-Up Date</label>
                <input
                  type="date"
                  value={data.followUpAt ? new Date(data.followUpAt).toISOString().slice(0, 10) : ""}
                  onChange={(e) => setData({ ...data, followUpAt: e.target.value ? new Date(e.target.value).toISOString() : null })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Meet / Zoom Link</label>
                <input
                  value={data.meetLink || ""}
                  onChange={(e) => setData({ ...data, meetLink: e.target.value })}
                  placeholder="https://meet.google.com/…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar controls */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-4">Status & Priority</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status</label>
                <select
                  value={data.status}
                  onChange={(e) => setData({ ...data, status: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] bg-white"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Priority</label>
                <select
                  value={data.priority}
                  onChange={(e) => setData({ ...data, priority: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] bg-white"
                >
                  {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Assign Advisor</label>
                <select
                  value={data.advisorId || ""}
                  onChange={(e) => setData({ ...data, advisorId: e.target.value || null })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] bg-white"
                >
                  <option value="">Unassigned</option>
                  {advisors.map((a: any) => (
                    <option key={a.id} value={a.id}>{a.name || a.email}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Source */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-4">Details</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Source", value: data.source },
                { label: "Type", value: data.consultationType?.replace(/_/g, " ") },
                { label: "Budget", value: data.budget },
                { label: "Degree", value: data.degreeLevel },
              ].map((item) => (
                item.value ? (
                  <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                    <span className="text-gray-500 text-xs">{item.label}</span>
                    <span className="font-semibold text-gray-800 text-xs">{item.value}</span>
                  </div>
                ) : null
              ))}
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-500 text-xs">Submitted</span>
                <span className="font-semibold text-gray-800 text-xs">
                  {new Date(data.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-gray-900 mb-3">Actions</h3>
            <a
              href={`mailto:${data.email}?subject=Your Jandify Global Consultation`}
              className="flex items-center justify-center gap-2 w-full bg-blue-50 hover:bg-blue-100 text-[#1a56db] py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              <Mail size={14} /> Send Email
            </a>
            {data.phone && (
              <a
                href={`https://wa.me/${data.phone.replace(/\D/g, "")}?text=Hello ${data.name}, this is Jandify Global regarding your consultation request.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-50 hover:bg-green-100 text-green-700 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                💬 WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
