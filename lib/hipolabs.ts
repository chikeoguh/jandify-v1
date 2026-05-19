export interface HipoUniversity {
  name: string;
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
  web_pages: string[];
  domains: string[];
}

export interface University extends HipoUniversity {
  id: string;
  slug: string;
  ranking?: number;
  tuitionMin?: number;
  tuitionMax?: number;
  currency?: string;
  type?: "Public" | "Private";
  size?: "Small" | "Medium" | "Large";
  programs?: string[];
  logo?: string;
  description?: string;
}

const BASE_URL = "http://universities.hipolabs.com";

// Cache in memory for the duration of the request
const cache = new Map<string, { data: HipoUniversity[]; ts: number }>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

async function fetchUniversities(params: Record<string, string>): Promise<HipoUniversity[]> {
  const key = JSON.stringify(params);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

  const url = new URL(`${BASE_URL}/search`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Hipolabs API error: ${res.status}`);
    const data: HipoUniversity[] = await res.json();
    cache.set(key, { data, ts: Date.now() });
    return data;
  } catch {
    return [];
  }
}

export async function searchUniversities(opts: {
  name?: string;
  country?: string;
  limit?: number;
  offset?: number;
}): Promise<HipoUniversity[]> {
  const params: Record<string, string> = {};
  if (opts.name) params.name = opts.name;
  if (opts.country) params.country = opts.country;
  const results = await fetchUniversities(params);
  const offset = opts.offset ?? 0;
  const limit = opts.limit ?? 20;
  return results.slice(offset, offset + limit);
}

export async function getUniversitiesByCountry(country: string): Promise<HipoUniversity[]> {
  return fetchUniversities({ country });
}

export function makeSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function enrichUniversity(uni: HipoUniversity, index: number): University {
  return {
    ...uni,
    id: `${uni.alpha_two_code}-${index}`,
    slug: makeSlug(uni.name),
    type: Math.random() > 0.35 ? "Public" : "Private",
    size: ["Small", "Medium", "Large"][Math.floor(Math.random() * 3)] as "Small" | "Medium" | "Large",
    programs: ["Business", "Engineering", "Computer Science", "Law", "Medicine"].slice(
      0,
      Math.floor(Math.random() * 4) + 2
    ),
    logo: uni.web_pages[0] ? `https://logo.clearbit.com/${uni.domains[0]}` : undefined,
  };
}
