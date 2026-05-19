"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Star, Trash2 } from "lucide-react";

export function TestimonialsActions({ id, approved, featured }: { id: string; approved: boolean; featured: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle(field: "approved" | "featured", value: boolean) {
    setLoading(true);
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: field === "approved" ? value : approved, featured: field === "featured" ? value : featured }),
    });
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {!approved ? (
        <button onClick={() => toggle("approved", true)} disabled={loading}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-70">
          <Check size={12} /> Approve
        </button>
      ) : (
        <button onClick={() => toggle("approved", false)} disabled={loading}
          className="flex items-center gap-1 border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-70">
          <X size={12} /> Unpublish
        </button>
      )}
      <button onClick={() => toggle("featured", !featured)} disabled={loading}
        className={`p-2 rounded-lg transition-colors ${featured ? "bg-amber-100 text-amber-600" : "text-gray-400 hover:bg-gray-100"}`}
        title={featured ? "Remove from featured" : "Mark as featured"}>
        <Star size={14} fill={featured ? "currentColor" : "none"} />
      </button>
      <button onClick={handleDelete} disabled={loading}
        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
        <Trash2 size={14} />
      </button>
    </div>
  );
}
