"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";

export function UniversitySearchBar({
  initialQ = "",
  initialCountry = "",
}: {
  initialQ?: string;
  initialCountry?: string;
}) {
  const [q, setQ] = useState(initialQ);
  const [country, setCountry] = useState(initialCountry);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (country) params.set("country", country);
    router.push(`/universities?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-3xl">
      <div className="flex-1 bg-white rounded-xl flex items-center gap-2 px-4 py-3">
        <Search size={18} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="University name…"
          className="flex-1 outline-none text-gray-800 text-sm placeholder-gray-400"
        />
      </div>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="bg-white rounded-xl px-4 py-3 text-sm text-gray-700 outline-none min-w-[160px] border-0"
      >
        <option value="">All Countries</option>
        {COUNTRIES.map((c) => (
          <option key={c.slug} value={c.name}>
            {c.flag} {c.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-white text-[#1a56db] hover:bg-blue-50 px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
      >
        <Search size={16} /> Search
      </button>
    </form>
  );
}
