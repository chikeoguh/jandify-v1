"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";

const CATEGORIES = ["Country Guide", "Scholarships", "Visa & Immigration", "Application Tips", "Study Abroad", "Career", "General"];

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "General",
    tags: "",
    published: false,
    featured: false,
  });

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
  }

  async function handleSave(publish = false) {
    setSaving(true);
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug: form.slug || generateSlug(form.title),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        published: publish,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) router.push(`/admin/articles/${data.id}`);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={18} className="text-gray-600" />
          </Link>
          <h1 className="text-xl font-black text-gray-900">New Article</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPreview(!preview)} className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
            <Eye size={15} /> {preview ? "Edit" : "Preview"}
          </button>
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-70">
            <Save size={15} /> Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e429f] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-70">
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {!preview ? (
            <>
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  placeholder="Article title…"
                  className="w-full text-2xl font-black text-gray-900 outline-none placeholder-gray-300 border-b border-gray-100 pb-3 mb-4"
                />
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="url-slug"
                  className="w-full text-sm text-gray-500 outline-none font-mono bg-gray-50 px-3 py-2 rounded-lg"
                />
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <label className="block text-xs font-semibold text-gray-500 mb-2">Excerpt / Meta Description</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Brief description shown in search results and article listings…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] resize-none"
                />
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <label className="block text-xs font-semibold text-gray-500 mb-2">Content (Markdown supported)</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={20}
                  placeholder="Write your article content here. Markdown is supported:&#10;&#10;## Heading&#10;**Bold text**&#10;- List item&#10;&#10;Start writing…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a56db] resize-none font-mono leading-relaxed"
                />
              </div>
            </>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-8">
              <h1 className="text-3xl font-black text-gray-900 mb-4">{form.title || "Untitled"}</h1>
              {form.excerpt && <p className="text-gray-600 text-lg mb-6 italic">{form.excerpt}</p>}
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                {form.content || "No content yet…"}
              </div>
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
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Tags (comma separated)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="visa, germany, scholarship"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#1a56db]" />
                <span className="text-sm font-medium text-gray-700">Featured article</span>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700">
            <strong>Markdown tips:</strong>
            <ul className="mt-2 space-y-1 text-xs">
              <li><code>## Heading</code></li>
              <li><code>**bold**</code></li>
              <li><code>- list item</code></li>
              <li><code>[link text](url)</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
