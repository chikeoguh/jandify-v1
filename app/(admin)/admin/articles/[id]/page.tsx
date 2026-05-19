"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";

const CATEGORIES = ["Country Guide", "Scholarships", "Visa & Immigration", "Application Tips", "Study Abroad", "Career", "General"];

export default function EditArticlePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/articles/${id}`).then((r) => r.json()).then(setForm);
  }, [id]);

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/admin/articles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tags: Array.isArray(form.tags) ? form.tags : form.tags?.split(",").map((t: string) => t.trim()) }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete() {
    if (!confirm("Delete this article permanently?")) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    router.push("/admin/articles");
  }

  if (!form) return (
    <div className="p-6 flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-[#1a56db] border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={18} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-lg font-black text-gray-900">Edit Article</h1>
            <p className="text-xs text-gray-400">{form.published ? "Published" : "Draft"} · {new Date(form.updatedAt).toLocaleDateString("en-GB")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPreview(!preview)} className="flex items-center gap-2 border border-gray-300 text-gray-700 px-3 py-2 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
            <Eye size={14} /> {preview ? "Edit" : "Preview"}
          </button>
          <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <Trash2 size={16} />
          </button>
          <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${saved ? "bg-green-600 text-white" : "bg-[#1a56db] hover:bg-[#1e429f] text-white"} disabled:opacity-70`}>
            <Save size={14} /> {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {!preview ? (
            <>
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Article title…"
                  className="w-full text-2xl font-black text-gray-900 outline-none placeholder-gray-300 border-b border-gray-100 pb-3 mb-4" />
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="url-slug"
                  className="w-full text-sm text-gray-500 outline-none font-mono bg-gray-50 px-3 py-2 rounded-lg" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <label className="block text-xs font-semibold text-gray-500 mb-2">Excerpt</label>
                <textarea value={form.excerpt || ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2} placeholder="Brief description…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] resize-none" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <label className="block text-xs font-semibold text-gray-500 mb-2">Content (Markdown)</label>
                <textarea value={form.content || ""} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={24} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] resize-none font-mono leading-relaxed" />
              </div>
            </>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-8">
              <h1 className="text-3xl font-black text-gray-900 mb-4">{form.title}</h1>
              {form.excerpt && <p className="text-gray-600 text-lg mb-6 italic">{form.excerpt}</p>}
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{form.content}</div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] bg-white">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Tags</label>
                <input value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags || ""}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="visa, germany, scholarship"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 accent-[#1a56db]" />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#1a56db]" />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-xs text-gray-500">
            <div>Views: <strong>{form.views}</strong></div>
            <div>Created: <strong>{new Date(form.createdAt).toLocaleDateString("en-GB")}</strong></div>
            {form.publishedAt && <div>Published: <strong>{new Date(form.publishedAt).toLocaleDateString("en-GB")}</strong></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
