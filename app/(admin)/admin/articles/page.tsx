import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Plus, Edit, Eye, ArrowRight } from "lucide-react";

export default async function ArticlesAdminPage() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  const published = articles.filter((a) => a.published).length;
  const drafts = articles.filter((a) => !a.published).length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Articles</h1>
          <p className="text-gray-500 text-sm">{published} published · {drafts} drafts</p>
        </div>
        <Link href="/admin/articles/new" className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e429f] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          <Plus size={16} /> New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: articles.length },
          { label: "Published", value: published },
          { label: "Drafts", value: drafts },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {articles.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center">
            <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 mb-4">No articles yet</p>
            <Link href="/admin/articles/new" className="inline-flex items-center gap-2 bg-[#1a56db] text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
              <Plus size={14} /> Write First Article
            </Link>
          </div>
        ) : articles.map((a) => (
          <div key={a.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📝</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 truncate">{a.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${a.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {a.published ? "Published" : "Draft"}
                </span>
                {a.featured && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">Featured</span>}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{a.category}</span>
                <span>{a.views} views</span>
                <span>{new Date(a.createdAt).toLocaleDateString("en-GB")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {a.published && (
                <Link href={`/articles/${a.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-[#1a56db] hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye size={16} />
                </Link>
              )}
              <Link href={`/admin/articles/${a.id}`} className="p-2 text-gray-400 hover:text-[#1a56db] hover:bg-blue-50 rounded-lg transition-colors">
                <Edit size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
