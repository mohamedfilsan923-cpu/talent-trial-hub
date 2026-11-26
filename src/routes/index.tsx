import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Award, BadgeCheck, Briefcase, Calculator, CheckCircle2, ClipboardCheck, Copy, Download, Globe2, Languages, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TalentSandbox — Risk-Free Trial-to-Hire for Refugee Talent" },
      { name: "description", content: "Test vetted refugee professionals in co-funded 10-day paid trials, with objective scorecards and one-click hiring." },
      { property: "og:title", content: "TalentSandbox — Risk-Free Trial-to-Hire" },
      { property: "og:description", content: "Co-funded 2-week paid trials, bias-free rubrics and portable scorecards. Aligned with SDGs 8, 10 & 17." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Candidate = { id: string; name: string; role: string; origin: string; credential: string; skills: string[]; languages: string[]; category: string; tier: number; initials: string };
const CANDIDATES: Candidate[] = [
  { id: "amina", name: "Amina Hassan", role: "Full-Stack Developer", origin: "Somalia → Kenya", credential: "BSc Computer Science, Univ. of Nairobi", skills: ["React", "Node.js", "PostgreSQL"], languages: ["English", "Somali", "Swahili"], category: "Engineering", tier: 1, initials: "AH" },
  { id: "tariq", name: "Tariq Al-Mansoor", role: "Financial Data Analyst", origin: "Syria → Jordan", credential: "MSc Finance, Damascus Univ. · CFA L2", skills: ["SQL", "Power BI", "Excel modelling"], languages: ["Arabic", "English"], category: "Finance", tier: 1, initials: "TA" },
  { id: "olena", name: "Olena Kovalenko", role: "Senior UX Designer", origin: "Ukraine → Poland", credential: "MA Interaction Design, KPI Kyiv", skills: ["Figma", "User research", "Design systems"], languages: ["Ukrainian", "English", "Polish"], category: "Design", tier: 2, initials: "OK" },
  { id: "jean", name: "Jean-Pierre Mugisha", role: "Junior Cloud Support Engineer", origin: "DRC → Uganda", credential: "AWS Cloud Practitioner · Diploma IT", skills: ["AWS", "Linux", "Bash"], languages: ["French", "English", "Lingala"], category: "Engineering", tier: 0, initials: "JM" },
];
const TIERS = ["Junior / Associate", "Mid-Level Specialist", "Senior Technical / Lead"];
const TIER_DEFAULT_RATE = [20, 25, 40];
const GRANTS = [
  { label: "Standard NGO Co-Fund", pct: 60 },
  { label: "ILO Cohort Partner Grant", pct: 80 },
  { label: "Full Impact Fellowship", pct: 100 },
];
const CRITERIA = [
  { key: "tech", label: "Technical & Tool Proficiency", weight: 0.3 },
  { key: "prob", label: "Structured Problem-Solving", weight: 0.25 },
  { key: "comm", label: "Workplace Communication & Async Updates", weight: 0.25 },
  { key: "adapt", label: "Adaptability & Deadline Reliability", weight: 0.2 },
] as const;
const MILESTONES = [
  { day: 1, title: "Onboarding & Scope", desc: "Access, tools, and trial brief agreed." },
  { day: 3, title: "First Deliverable Check-in", desc: "Initial output reviewed async." },
  { day: 7, title: "Mid-Trial Review", desc: "Structured feedback against rubric." },
  { day: 10, title: "Final Demo & Sign-off", desc: "Demo, final scores, decision." },
];
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const HOURS = 80;

export function readiness(scores: Record<string, number>) {
  const pct = Math.round(CRITERIA.reduce((a, c) => a + ((scores[c.key] ?? 0) / 5) * c.weight, 0) * 100);
  const tier = pct >= 85 ? "Hire Ready" : pct >= 70 ? "Strong Potential" : pct >= 50 ? "Developing" : "Not Yet Ready";
  return { pct, tier };
}

const TABS = [["overview", "Overview"], ["calculator", "Stipend Calculator"], ["rubric", "10-Day Rubric"], ["talent", "Candidate Sandbox"]] as const;
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Index() {
  const [candidate, setCandidate] = useState<Candidate>(CANDIDATES[0]!);
  const [tier, setTier] = useState(1);
  const [rate, setRate] = useState(25);
  const [grant, setGrant] = useState(1);
  const [reserve, setReserve] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({ tech: 5, prob: 5, comm: 4, adapt: 5 });
  const [offer, setOffer] = useState(false);
  const [cert, setCert] = useState(false);
  const [filter, setFilter] = useState("All");

  const total = rate * HOURS;
  const pct = GRANTS[grant]!.pct;
  const covered = (total * pct) / 100;
  const net = total - covered;
  const r = readiness(scores);
  const certId = useMemo(() => `TSB-${candidate.initials}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, [candidate, cert]);

  const startTrial = (c: Candidate) => {
    setCandidate(c); setTier(c.tier); setRate(TIER_DEFAULT_RATE[c.tier]!);
    toast.success(`${c.name} loaded into calculator & rubric`);
    go("calculator");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <a href="#overview" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><ShieldCheck className="h-4 w-4" /></span>
            TalentSandbox
          </a>
          <div className="hidden gap-1 lg:flex">{[8, 10, 17].map((n) => <span key={n} className="rounded-full bg-amber-soft px-2 py-0.5 text-[11px] font-bold text-amber">SDG {n}</span>)}</div>
          <nav className="mx-auto hidden gap-1 md:flex">
            {TABS.map(([id, l]) => <button key={id} onClick={() => go(id)} className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">{l}</button>)}
          </nav>
          <button onClick={() => go("talent")} className="ml-auto rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 md:ml-0">Launch a 2-Week Trial</button>
        </div>
      </header>

      {/* Hero */}
      <section id="overview" className="hero-grid scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-success"><BadgeCheck className="h-3.5 w-3.5" />Risk-free, co-funded trial-to-hire</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl">Hire Proven Talent Without the Local-Experience Guesswork.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Test vetted refugee professionals in a structured, 10-day paid work trial—subsidized up to 80% by NGO & cohort grants. Zero onboarding friction, objective scorecards, and one-click hiring.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => go("calculator")} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"><Calculator className="h-4 w-4" />Calculate Your Trial Cost</button>
            <button onClick={() => go("talent")} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-semibold hover:bg-muted"><Users className="h-4 w-4" />Explore Vetted Talent</button>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[["80%", "Grant Subsidy Available", "text-success"], ["10-Day", "Structured Evaluation", "text-foreground"], ["74%", "Trial-to-Hire Conversion Rate", "text-success"], ["SDGs 8·10·17", "Aligned with the Global Goals", "text-amber"]].map(([v, l, c]) => (
              <div key={l} className="bg-card p-6"><div className={`text-3xl font-extrabold ${c}`}>{v}</div><div className="mt-1 text-sm text-muted-foreground">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <Section id="calculator" eyebrow="Core Feature 1" title="Co-Funded Stipend Calculator" sub={`Estimate your out-of-pocket cost for a 2-week (${HOURS}-hour) trial with ${candidate.name}.`}>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-6 rounded-xl border border-border bg-card p-6 lg:col-span-3">
            <label className="block"><span className="text-sm font-semibold">Role Tier</span>
              <select value={tier} onChange={(e) => { const t = +e.target.value; setTier(t); setRate(TIER_DEFAULT_RATE[t]!); }} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5">
                {TIERS.map((t, i) => <option key={t} value={i}>{t}</option>)}
              </select>
            </label>
            <label className="block"><div className="flex justify-between text-sm font-semibold"><span>Hourly Stipend Rate</span><span>${rate}/hr</span></div>
              <input type="range" min={15} max={60} value={rate} onChange={(e) => setRate(+e.target.value)} className="mt-3 w-full accent-[var(--success)]" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>$15/hr</span><span>{HOURS} hrs over 2 weeks</span><span>$60/hr</span></div>
            </label>
            <div><span className="text-sm font-semibold">Grant / Cohort Subsidy Tier</span>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {GRANTS.map((g, i) => (
                  <button key={g.label} onClick={() => setGrant(i)} className={`rounded-lg border p-3 text-left transition ${grant === i ? "border-success bg-success-soft" : "border-border hover:bg-muted"}`}>
                    <div className="text-xl font-extrabold text-success">{g.pct}%</div><div className="text-xs text-muted-foreground">{g.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-primary p-6 text-primary-foreground lg:col-span-2">
            <div className="text-sm opacity-70">Total 2-Week Trial Value</div>
            <div className="text-3xl font-bold">{usd(total)}</div>
            <div className="mt-4 flex justify-between rounded-lg bg-success/20 px-3 py-2"><span className="text-sm">Partner Grant Coverage ({pct}%)</span><span className="font-bold text-success-soft">−{usd(covered)}</span></div>
            <div className="mt-6 text-sm opacity-70">Net Employer Out-of-Pocket</div>
            <div className="text-5xl font-extrabold">{usd(net)}</div>
            <div className="mt-2 text-sm opacity-70">{usd(net / 10)} per trial day · {usd(total / 10)} gross/day</div>
            <button onClick={() => setReserve(true)} className="mt-6 rounded-lg bg-success px-4 py-3 font-semibold text-primary-foreground hover:opacity-90">Reserve Subsidized Seat</button>
          </div>
        </div>
      </Section>

      {/* Rubric */}
      <Section id="rubric" eyebrow="Core Feature 2" title="10-Day Trial Rubric & Evaluation" sub="Standardized, bias-free criteria with a live weighted readiness score.">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar c={candidate} />
            <div><div className="text-lg font-bold">{candidate.name}</div><div className="text-sm text-muted-foreground">{candidate.role} · Active trial · Day 7 of 10</div></div>
            <div className="ml-auto text-right"><div className="text-4xl font-extrabold text-success">{r.pct}%</div><div className="text-sm font-semibold">{r.tier}</div></div>
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {MILESTONES.map((m) => (
              <li key={m.day} className={`rounded-lg border p-4 ${m.day <= 7 ? "border-success bg-success-soft" : "border-border"}`}>
                <div className="flex items-center gap-2 text-xs font-bold text-success">{m.day <= 7 && <CheckCircle2 className="h-3.5 w-3.5" />}DAY {m.day}</div>
                <div className="mt-1 font-semibold">{m.title}</div><div className="text-xs text-muted-foreground">{m.desc}</div>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CRITERIA.map((c) => (
              <div key={c.key} className="rounded-lg border border-border p-4">
                <div className="flex justify-between text-sm"><span className="font-semibold">{c.label}</span><span className="text-muted-foreground">{c.weight * 100}% weight</span></div>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} aria-label={`${c.label} ${n} stars`} onClick={() => setScores({ ...scores, [c.key]: n })}>
                      <Star className={`h-6 w-6 ${n <= (scores[c.key] ?? 0) ? "fill-amber text-amber" : "text-border"}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-success transition-all" style={{ width: `${r.pct}%` }} /></div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <ActionCard icon={<Briefcase />} eyebrow="Core Feature 3 · Card A" title="Extend Full-Time Offer" desc="Generate an instant offer summary with pre-filled role details and zero placement fees." cta="Generate Offer" onClick={() => setOffer(true)} />
          <ActionCard icon={<Award />} eyebrow="Core Feature 3 · Card B" title="Issue Verified Portable Scorecard" desc="Can't hire yet? Give the candidate verified local experience they can show future employers." cta="Issue Scorecard" onClick={() => setCert(true)} />
        </div>
      </Section>

      {/* Talent */}
      <Section id="talent" eyebrow="Vetted Talent" title="Candidate Sandbox Directory" sub="Pre-vetted professionals with international credentials, eligible for grant co-funding.">
        <div className="mb-6 flex flex-wrap gap-2">
          {["All", "Engineering", "Finance", "Design"].map((f) => <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`}>{f}</button>)}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CANDIDATES.filter((c) => filter === "All" || c.category === filter).map((c) => (
            <div key={c.id} className="flex flex-col rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between"><Avatar c={c} /><span className="rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-bold text-success">Grant Eligible</span></div>
              <div className="mt-4 font-bold">{c.name}</div><div className="text-sm text-muted-foreground">{c.role}</div>
              <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex gap-1.5"><Globe2 className="h-3.5 w-3.5 shrink-0" />{c.origin}</div>
                <div className="flex gap-1.5"><ClipboardCheck className="h-3.5 w-3.5 shrink-0" />{c.credential}</div>
                <div className="flex gap-1.5"><Languages className="h-3.5 w-3.5 shrink-0" />{c.languages.join(", ")}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">{c.skills.map((s) => <span key={s} className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[11px] font-medium"><BadgeCheck className="h-3 w-3 text-success" />{s}</span>)}</div>
              <button onClick={() => startTrial(c)} className="mt-5 rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Start 10-Day Trial</button>
            </div>
          ))}
        </div>
      </Section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-foreground"><ShieldCheck className="h-4 w-4" />TalentSandbox</div>
          <p className="mt-3">Public-private partnership: employers, NGOs and cohort grant partners co-fund fair, paid trials.</p>
          <p className="mt-2">Built for the ILO Cohort Mini-Hackathon • Advancing <span className="font-semibold text-amber">SDG 8</span> (Decent Work), <span className="font-semibold text-amber">SDG 10</span> (Reduced Inequalities), and <span className="font-semibold text-amber">SDG 17</span> (Partnerships for the Goals).</p>
        </div>
      </footer>

      <Dialog open={reserve} onOpenChange={setReserve}>
        <DialogContent>
          <DialogHeader><DialogTitle>Subsidized seat reserved</DialogTitle><DialogDescription>Your trial seat with {candidate.name} is on hold for 72 hours.</DialogDescription></DialogHeader>
          <Rows rows={[["Role tier", TIERS[tier]!], ["Rate", `$${rate}/hr × ${HOURS} hrs`], ["Grant", `${GRANTS[grant]!.label} (${pct}%)`], ["Your cost", usd(net)]]} />
          <button onClick={() => { setReserve(false); toast.success("Reservation confirmed"); }} className="rounded-lg bg-success py-2.5 font-semibold text-primary-foreground">Confirm Reservation</button>
        </DialogContent>
      </Dialog>

      <Dialog open={offer} onOpenChange={setOffer}>
        <DialogContent>
          <DialogHeader><DialogTitle>Offer summary</DialogTitle><DialogDescription>Pre-filled from the trial. No placement fees.</DialogDescription></DialogHeader>
          <Rows rows={[["Candidate", candidate.name], ["Position", `${candidate.role} (${TIERS[tier]})`], ["Type", "Full-time, permanent"], ["Start", "Within 2 weeks"], ["Readiness", `${r.pct}% — ${r.tier}`], ["Placement fee", "$0"]]} />
          <button onClick={() => { setOffer(false); toast.success(`Offer sent to ${candidate.name}`); }} className="rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground">Send Offer</button>
        </DialogContent>
      </Dialog>

      <Dialog open={cert} onOpenChange={setCert}>
        <DialogContent className="max-w-lg">
          <div className="rounded-xl border-2 border-success p-6">
            <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-success">Verified</span><span className="font-mono text-xs text-muted-foreground">{certId}</span></div>
            <DialogTitle className="mt-3 text-xl">Verified Local Experience Certificate & Portable Scorecard</DialogTitle>
            <DialogDescription className="mt-1">{candidate.name} completed a 10-day structured paid trial as {candidate.role}.</DialogDescription>
            <div className="mt-5 space-y-2">
              {CRITERIA.map((c) => <div key={c.key} className="flex justify-between text-sm"><span>{c.label}</span><span className="font-semibold">{scores[c.key]}/5</span></div>)}
              <div className="flex justify-between border-t border-border pt-2 font-bold"><span>Readiness</span><span className="text-success">{r.pct}% — {r.tier}</span></div>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-success-soft p-3 text-sm text-success"><Sparkles className="h-4 w-4" />Employer sign-off · TalentSandbox Partner</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { navigator.clipboard?.writeText(`https://talentsandbox.app/verify/${certId}`); toast.success("Share link copied"); }} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 font-semibold hover:bg-muted"><Copy className="h-4 w-4" />Copy Link</button>
            <button onClick={() => window.print()} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground"><Download className="h-4 w-4" />Download</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Section({ id, eyebrow, title, sub, children }: { id: string; eyebrow: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-xs font-bold uppercase tracking-widest text-amber">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{title}</h2>
        <p className="mt-2 mb-8 text-muted-foreground">{sub}</p>
        {children}
      </div>
    </section>
  );
}
function Avatar({ c }: { c: Candidate }) {
  return <div className="grid h-12 w-12 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{c.initials}</div>;
}
function ActionCard({ icon, eyebrow, title, desc, cta, onClick }: { icon: React.ReactNode; eyebrow: string; title: string; desc: string; cta: string; onClick: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-success-soft text-success [&_svg]:h-5 [&_svg]:w-5">{icon}</div>
      <div className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{eyebrow}</div>
      <div className="mt-1 text-lg font-bold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <button onClick={onClick} className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">{cta}</button>
    </div>
  );
}
function Rows({ rows }: { rows: [string, string][] }) {
  return <div className="divide-y divide-border rounded-lg border border-border">{rows.map(([k, v]) => <div key={k} className="flex justify-between px-4 py-2.5 text-sm"><span className="text-muted-foreground">{k}</span><span className="font-semibold">{v}</span></div>)}</div>;
}
