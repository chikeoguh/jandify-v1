import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

const ARTICLES: Record<string, {
  title: string;
  category: string;
  country: string;
  readTime: string;
  date: string;
  content: string;
}> = {
  "how-to-study-in-germany-for-free": {
    title: "How to Study in Germany for Free in 2025",
    category: "Country Guide",
    country: "🇩🇪 Germany",
    readTime: "8 min read",
    date: "January 2025",
    content: `
Germany is one of the world's best-kept secrets for international students: public universities in Germany charge little to no tuition fees — even for non-EU students. Most public universities charge only a semester contribution of €150–€350, which covers administrative fees and often includes a public transport pass.

## Why Study in Germany?

Germany's universities are consistently ranked among the world's best. The Technical University of Munich, LMU Munich, and Heidelberg University regularly appear in global top 100 lists. More importantly, German degrees are recognized worldwide and open doors to jobs across Europe and beyond.

After graduation, Germany offers an 18-month residence permit to find work — one of the most generous post-study work arrangements in Europe.

## How to Apply to a German University

### Step 1: Choose Your Program
Germany offers thousands of English-taught programs, especially at the Master's level. Use websites like DAAD's database or UniAssist to find programs that match your background.

### Step 2: Check Admission Requirements
- Bachelor's degree with a minimum GPA (usually 3.0+)
- IELTS score of 6.0–6.5 for English programs (German programs need TestDaF or DSH)
- Motivation letter
- CV / Resume
- Letters of recommendation (2–3)
- Academic transcripts

### Step 3: Apply Through UniAssist
Many German universities use UniAssist to process international applications. Create an account, upload your documents, and submit your application with a small processing fee (€75–€150).

### Step 4: Secure Funding for Living Costs
Even without tuition, you'll need roughly €10,000–€13,000 per year for living expenses. Options include:
- **DAAD Scholarship** — Germany's most prestigious international scholarship. Covers living allowance, travel, health insurance.
- **Blocked account** — Open a blocked account (Sperrkonto) with ~€11,208 to show you can support yourself. Required for visa.
- **Student jobs** — International students can work up to 120 full days per year.

### Step 5: Apply for a German Student Visa
With your university admission letter in hand, apply at the German Embassy/Consulate in Nigeria. Required documents include:
- Valid passport (valid for 6+ months beyond your stay)
- University admission letter
- Proof of financial resources (blocked account statement)
- Health insurance
- Biometric photos
- Completed visa application form

The visa typically takes 4–8 weeks.

## Top Universities in Germany for International Students

| University | Location | Ranking | Speciality |
|---|---|---|---|
| LMU Munich | Munich | QS Top 60 | Medicine, Humanities |
| TU Munich | Munich | QS Top 50 | Engineering, Tech |
| Heidelberg | Heidelberg | QS Top 100 | Natural Sciences |
| Humboldt Berlin | Berlin | QS Top 150 | Social Sciences |
| KIT | Karlsruhe | QS Top 150 | Engineering |

## Common Mistakes to Avoid

1. **Applying too late** — German universities typically have deadlines in January (for summer semester) and July (for winter semester). Start early.
2. **Ignoring language requirements** — If applying to a German-language program, you'll need proof of German proficiency.
3. **Underestimating document requirements** — German universities are thorough. Start gathering documents 3–6 months in advance.
4. **Not applying for DAAD early enough** — DAAD application deadlines are usually 9–12 months before your intended start date.

## Need Help Applying?

Jandify Global has helped dozens of Nigerian students gain admission to German universities, many with DAAD scholarships. Our advisors know exactly what German admissions officers look for.

Book a free consultation to get your personalized Germany study plan.
    `,
  },
  "scholarship-guide": {
    title: "The Complete Scholarship Guide for Nigerian Students",
    category: "Scholarships",
    country: "🌍 International",
    readTime: "12 min read",
    date: "December 2024",
    content: `
Scholarships make international education possible for students who couldn't otherwise afford it. The good news: there are more fully funded scholarships for Nigerian students than most people realize — the challenge is knowing where to look and how to apply strategically.

## The Top Fully Funded Scholarships for Nigerians

### 1. Chevening Scholarship (UK)
**What it covers:** Full tuition, living allowance, travel, visa costs
**Who's eligible:** Nigerian nationals with 2+ years of work experience, strong academic record
**Deadline:** Typically November each year
**Application:** Online via the Chevening website

### 2. Commonwealth Scholarship (UK)
**What it covers:** Full tuition, airfare, living allowance
**Who's eligible:** Nigerian citizens for Master's and PhD study in the UK
**Deadline:** Varies by program (typically December–January)

### 3. DAAD Scholarship (Germany)
**What it covers:** Monthly stipend, travel allowance, health insurance
**Who's eligible:** Nigerian graduates applying for Master's or PhD in Germany
**Deadline:** October for the following academic year

### 4. Fulbright Program (USA)
**What it covers:** Full tuition, living expenses, health insurance, travel
**Who's eligible:** Nigerian graduates applying for Master's or PhD in the US
**Deadline:** May each year

### 5. Australia Awards
**What it covers:** Full tuition, living stipend, health cover, travel
**Who's eligible:** Nigerian citizens for undergraduate and postgraduate study in Australia
**Deadline:** April each year

### 6. Erasmus+ Scholarship (Europe)
**What it covers:** Tuition waiver + monthly stipend (€700–€1,000+)
**Who's eligible:** Varies; open to Nigerian applicants at participating universities
**Deadline:** Varies by program

## How to Write a Winning Scholarship Application

### Know What They're Looking For
Scholarship committees aren't just selecting the student with the highest GPA. They want:
- **Leadership potential** — Have you led teams, communities, organizations?
- **Social impact** — How will you use your degree to benefit Nigeria and Africa?
- **Academic excellence** — Strong GPA, recommendation from respected professors
- **Clarity of purpose** — You know exactly what you want to study and why

### Your Personal Statement / Essay
This is the most important part of your application. Key principles:
1. Start with a compelling story, not "My name is..."
2. Show the journey that led you to this field
3. Be specific about your research interests or career goals
4. Connect your goals to the scholarship's mission
5. End with what you'll do after the scholarship

### Getting Strong Recommendation Letters
- Ask professors who know your work well, not just famous names
- Give recommenders 4–6 weeks notice
- Provide them with your CV, personal statement draft, and the scholarship requirements
- Follow up politely one week before the deadline

## Application Timeline

Working backwards from a typical September start:
- **9–12 months before:** Research scholarships, shortlist 3–5 targets
- **6–8 months before:** Start drafting personal statements, request transcripts
- **4–6 months before:** Request recommendation letters, write application essays
- **2–3 months before:** Submit applications, track deadlines
- **After submission:** Prepare for interviews (many scholarships include an interview round)

## Need Help with Your Scholarship Application?

Our advisors have helped Nigerian students win DAAD, Chevening, Commonwealth, and Australia Awards scholarships. We review personal statements, provide mock interviews, and help you identify scholarships you have the strongest chance of winning.

Book a free consultation today.
    `,
  },
  "visa-guide": {
    title: "Student Visa Guide: How to Apply Without Getting Rejected",
    category: "Visa & Immigration",
    country: "🌍 International",
    readTime: "10 min read",
    date: "January 2025",
    content: `
Student visa rejections happen — but most are avoidable. This guide covers the most common rejection reasons and exactly how to prevent them for the UK, Canada, Germany, Australia, and France.

## The Most Common Rejection Reasons

### 1. Insufficient Financial Evidence
Every country wants to see that you can fund your studies and living costs without working illegally. What "sufficient funds" means:
- **UK:** Show £1,334/month for London, £1,023/month outside London, for the duration of your course (up to 9 months max shown)
- **Canada:** $10,000 CAD per year beyond tuition + return flight + first year tuition in your account
- **Germany:** €11,208 blocked account (plus tuition fees if applicable)
- **Australia:** AUD $21,041 per year + course fees + travel
- **France:** €615/month in your bank account

**How to avoid this:** Make sure your bank statement shows the required amount for 3–6 months consistently. A sudden large deposit a week before your visa interview is a red flag.

### 2. Weak Ties to Home Country
Visa officers need to believe you'll return to Nigeria after your studies. Weak ties are a major rejection reason.

**What strengthens your ties:**
- Family in Nigeria (especially dependents)
- Property or assets in Nigeria
- Job offer or family business in Nigeria
- Scholarship bond requiring you to return
- Clear career plan connected to Nigeria

### 3. Incomplete or Inconsistent Documents
Missing documents or information that doesn't match across documents leads to instant rejection.

**Create a checklist:**
- Passport (valid for 6+ months beyond your intended stay)
- University offer/acceptance letter
- Financial documents (bank statements, sponsorship letters)
- Academic transcripts and certificates
- Language test scores (IELTS/TOEFL)
- Proof of accommodation
- Completed application forms (double-check every field)

### 4. Insufficient English Proficiency Evidence
Most English-speaking countries require IELTS 6.0+. Applying without a valid score or with an expired score is an automatic rejection.

**Score requirements:**
- UK: Usually 5.5–6.5 IELTS
- Canada: 6.0–6.5 IELTS
- Australia: 5.5–6.5 IELTS
- Germany (English programs): 6.0–6.5 IELTS

### 5. No Credible Study Plan
Visa officers want to see that your study plan makes sense. If you have a Business degree and you're applying for a Master's in Physics with no explanation, it raises flags.

In your personal statement or cover letter, clearly explain:
- Why this specific course
- Why this specific country and university
- How it fits your career goals
- Why you'll return to Nigeria afterward

## Country-Specific Tips

### UK Student Visa (formerly Tier 4)
- Apply through the UK Visas and Immigration online portal
- Use the Confirmation of Acceptance for Studies (CAS) from your university
- Include a tuberculosis test if required (Nigeria is on the list)
- Apply no more than 6 months before your course starts

### Canada Study Permit
- Consider the Student Direct Stream (SDS) for faster processing if you have IELTS 6.0+ and a full GIB letter
- Use IRCC's online portal
- Provincial Attestation Letters (PAL) are now required for most applicants

### Germany Student Visa
- Apply at the German Embassy in Abuja or Consulate in Lagos
- Appointments can book up months in advance — start early
- Bring original documents AND certified copies

## What to Do After a Rejection

1. Read the rejection letter carefully — it tells you why
2. Address the specific issues (don't just reapply with the same documents)
3. Consider a reapplication or appeal if you believe the decision was wrong
4. Contact us — we've helped students successfully reapply after rejection

## Need Help?

Our document review service checks every document in your visa application before you submit it. We flag issues that could lead to rejection and help you present the strongest possible case.

Book a free consultation to get started.
    `,
  },
};

// Static slugs for other articles
const OTHER_SLUGS = [
  "writing-a-strong-sop",
  "uk-universities-2025",
  "canada-study-permit",
  "masters-vs-mba",
  "cheapest-countries-to-study",
];

export async function generateStaticParams() {
  return [...Object.keys(ARTICLES), ...OTHER_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: `Read our expert guide: ${article.title}`,
  };
}

function renderMarkdown(text: string): string {
  return text
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-black text-gray-900 mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">$1</h3>')
    .replace(/^\*\*(.+)\*\*$/gm, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-gray-700 text-sm">• <span>$1</span></li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="text-gray-700 text-sm list-decimal list-inside">$1</li>')
    .replace(/^(\|.+\|)$/gm, '<div class="overflow-x-auto"><table class="w-full border-collapse text-sm my-4"><tr class="bg-blue-50 border-b border-gray-200"><td class="p-3 font-semibold">$1</td></tr></table></div>')
    .replace(/\n\n/g, '</p><p class="text-gray-600 leading-relaxed mb-4">')
    .trim();
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article && !OTHER_SLUGS.includes(slug)) {
    notFound();
  }

  if (!article) {
    // Generic placeholder for other articles
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-4">Coming Soon</h1>
        <p className="text-gray-500 mb-6">This guide is being written by our advisors. Check back soon or book a consultation.</p>
        <Link href="/consultation" className="inline-flex items-center gap-2 bg-[#1a56db] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1e429f] transition-colors">
          Book Free Consultation <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Article header */}
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/articles" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Articles
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm bg-white/10 border border-white/20 px-3 py-1 rounded-full">{article.category}</span>
            <span className="text-blue-200 text-sm">{article.country}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-3 text-blue-200 text-sm">
            <span className="flex items-center gap-1"><Clock size={13} />{article.readTime}</span>
            <span>·</span>
            <span>Updated {article.date}</span>
            <span>·</span>
            <span>By Jandify Global Advisors</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Article content */}
          <article className="lg:col-span-3 prose prose-blue max-w-none">
            <div
              className="text-gray-600 leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{ __html: `<p class="text-gray-600 leading-relaxed mb-4">${renderMarkdown(article.content)}</p>` }}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* CTA */}
            <div className="bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-6 text-white sticky top-24">
              <h3 className="font-bold mb-2">Need personal guidance?</h3>
              <p className="text-blue-100 text-sm mb-4">Book a free consultation with an advisor who specializes in this area.</p>
              <Link href="/consultation" className="block text-center bg-white text-[#1a56db] py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors text-sm">
                Book Free Consultation
              </Link>
            </div>

            {/* Related */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Related Guides</h3>
              <div className="space-y-3">
                {["scholarship-guide", "visa-guide", "how-to-study-in-germany-for-free"]
                  .filter((s) => s !== slug)
                  .slice(0, 3)
                  .map((s) => (
                    <Link key={s} href={`/articles/${s}`} className="block text-sm text-gray-700 hover:text-[#1a56db] transition-colors leading-snug">
                      {ARTICLES[s]?.title || s}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
