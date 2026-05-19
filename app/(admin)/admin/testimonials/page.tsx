import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import { TestimonialsActions } from "./TestimonialsActions";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  const pending = testimonials.filter((t) => !t.approved).length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Testimonials</h1>
          <p className="text-gray-500 text-sm">{testimonials.length} total · {pending} pending approval</p>
        </div>
      </div>

      {pending > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 flex items-center gap-2 mb-6">
          ⚠️ {pending} testimonial{pending > 1 ? "s" : ""} awaiting approval
        </div>
      )}

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className={`bg-white border rounded-2xl p-5 ${t.approved ? "border-gray-100" : "border-amber-200"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1a56db] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{t.name}</span>
                    <span className="text-sm text-gray-500">·</span>
                    <span className="text-sm text-gray-500">{t.role}</span>
                    <span className="text-sm text-gray-500">·</span>
                    <span className="text-sm text-gray-500">{t.country}</span>
                    {t.service && <span className="text-xs bg-blue-50 text-[#1a56db] px-2 py-0.5 rounded-full">{t.service}</span>}
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.content}</p>
                </div>
              </div>
              <TestimonialsActions id={t.id} approved={t.approved} featured={t.featured} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
