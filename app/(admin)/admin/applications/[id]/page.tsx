"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, FileText, User, Building, TrendingUp } from "lucide-react";

const APPLICATION_STATUSES = [
  "SUBMITTED", "UNDER_REVIEW", "DOCUMENTS_REQUESTED", "DOCUMENTS_RECEIVED",
  "SUBMITTED_TO_UNIVERSITY", "AWAITING_DECISION", "CONDITIONAL_OFFER",
  "UNCONDITIONAL_OFFER", "OFFER_ACCEPTED", "VISA_APPLIED", "VISA_APPROVED",
  "VISA_REFUSED", "ENROLLED", "WITHDRAWN", "REJECTED",
];

const STATUS_STEPS = [
  { status: "SUBMITTED", label: "Submitted" },
  { status: "UNDER_REVIEW", label: "Under Review" },
  { status: "SUBMITTED_TO_UNIVERSITY", label: "Sent to Uni" },
  { status: "AWAITING_DECISION", label: "Awaiting Decision" },
  { status: "UNCONDITIONAL_OFFER", label: "Offer Received" },
  { status: "OFFER_ACCEPTED", label: "Accepted" },
  { status: "VISA_APPROVED", label: "Visa Approved" },
  { status: "ENROLLED", label: "Enrolled" },
];

export default function ApplicationDetailPage() {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/applications/${id}`).then((r) => r.json()).then(setData);
  }, [id]);

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setData(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!data) return (
    <div className="p-6 flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-[#1a56db] border-t-transparent rounded-full" />
    </div>
  );

  const currentStepIdx = STATUS_STEPS.findIndex((s) => s.status === data.status);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/applications" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={18} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-gray-900">{data.client?.name} → {data.universityName}</h1>
            <p className="text-sm text-gray-400">{data.programName} · {data.degreeLevel} · {data.universityCountry}</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${saved ? "bg-green-600 text-white" : "bg-[#1a56db] hover:bg-[#1e429f] text-white"} disabled:opacity-70`}>
          <Save size={15} />
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      {/* Progress stepper */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-[#1a56db]" />Application Progress</h2>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {STATUS_STEPS.map((step, i) => {
            const done = i <= currentStepIdx;
            const current = i === currentStepIdx;
            return (
              <div key={step.status} className="flex items-center flex-shrink-0">
                <div className={`flex flex-col items-center gap-1 ${current ? "opacity-100" : done ? "opacity-80" : "opacity-40"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${current ? "bg-[#1a56db] text-white" : done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                    {done && !current ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${current ? "text-[#1a56db]" : done ? "text-green-700" : "text-gray-400"}`}>{step.label}</span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 flex-shrink-0 ${i < currentStepIdx ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Client info */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><User size={16} className="text-[#1a56db]" />Client</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: "Name", value: data.client?.name },
                { label: "Email", value: data.client?.email },
                { label: "Phone", value: data.client?.phone || "—" },
                { label: "Country", value: data.client?.country || "—" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                  <div className="font-semibold text-gray-800">{item.value}</div>
                </div>
              ))}
            </div>
            <Link href={`/admin/users/${data.clientId}`} className="mt-3 text-xs text-[#1a56db] font-semibold hover:underline">View full client profile →</Link>
          </div>

          {/* University details */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Building size={16} className="text-[#1a56db]" />University Details</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: "University", value: data.universityName },
                { label: "Country", value: data.universityCountry },
                { label: "Program", value: data.programName },
                { label: "Degree Level", value: data.degreeLevel },
                { label: "Intake Year", value: data.intakeYear || "—" },
                { label: "Semester", value: data.intakeSemester || "—" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                  <div className="font-semibold text-gray-800">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Financials */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4">Financials</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Tuition Fee (USD)</label>
                <input type="number" value={data.tuitionFee || ""} onChange={(e) => setData({ ...data, tuitionFee: e.target.value })}
                  placeholder="0" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Scholarship (USD)</label>
                <input type="number" value={data.scholarshipAmount || ""} onChange={(e) => setData({ ...data, scholarshipAmount: e.target.value })}
                  placeholder="0" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Offer Deadline</label>
                <input type="date" value={data.offerDeadline ? new Date(data.offerDeadline).toISOString().slice(0, 10) : ""} onChange={(e) => setData({ ...data, offerDeadline: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Visa Deadline</label>
                <input type="date" value={data.visaDeadline ? new Date(data.visaDeadline).toISOString().slice(0, 10) : ""} onChange={(e) => setData({ ...data, visaDeadline: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
            </div>
          </div>

          {/* Admin notes */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4">Internal Notes</h2>
            <textarea value={data.adminNotes || ""} onChange={(e) => setData({ ...data, adminNotes: e.target.value })}
              rows={4} placeholder="Add notes, action items, next steps…"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] resize-none" />
          </div>

          {/* Documents */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText size={16} className="text-[#1a56db]" />Documents ({data.documents?.length || 0})</h2>
            {data.documents?.length === 0 ? (
              <p className="text-sm text-gray-400">No documents uploaded yet</p>
            ) : (
              <div className="space-y-2">
                {data.documents?.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-800">{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${doc.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{doc.status}</span>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#1a56db] hover:underline">View</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status history */}
          {data.statusHistory?.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h2 className="font-bold text-gray-900 mb-4">Status History</h2>
              <div className="space-y-2">
                {data.statusHistory.map((h: any) => (
                  <div key={h.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 bg-[#1a56db] rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">{h.status.replace(/_/g, " ")}</span>
                      {h.note && <span className="text-gray-500"> — {h.note}</span>}
                      <div className="text-xs text-gray-400">{h.changedBy} · {new Date(h.createdAt).toLocaleDateString("en-GB")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-4">Manage Status</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current Status</label>
                <select value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] bg-white">
                  {APPLICATION_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Priority</label>
                <select value={data.priority || "NORMAL"} onChange={(e) => setData({ ...data, priority: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] bg-white">
                  {["LOW", "NORMAL", "HIGH", "URGENT"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status Note</label>
                <input value={data.statusNote || ""} onChange={(e) => setData({ ...data, statusNote: e.target.value })}
                  placeholder="Reason for status change…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
