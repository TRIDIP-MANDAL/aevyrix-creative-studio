import { useState } from "react";
import { Brain, Clapperboard, Globe, Megaphone, Palette, PenLine, Sparkles } from "lucide-react";
import core from "@/assets/ai-core.jpg";
import { Button } from "@/components/ui/button";

// Quantize coordinates so server and browser math serialize identically.
const coordinate = (value: number) => Math.round(value * 10000) / 10000;

/** Horizontal animated pipeline (Diagram 1 & 4) */
export function Pipeline({ steps, label }: { steps: string[]; label: string }) {
  return (
    <ol aria-label={label} className="relative grid gap-4 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
      {steps.map((s, i) => (
        <li key={s} className="relative">
          <div className="glass relative rounded-xl p-5 transition-all hover:-translate-y-1 hover:shadow-glow">
            <span className="font-display text-xs tracking-[0.2em] text-cyan">STEP {String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 font-display text-lg font-semibold">{s}</p>
            <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-cyan animate-pulse-node" style={{ animationDelay: `${i * 0.3}s` }} />
          </div>
          {i < steps.length - 1 && (
            <svg className="absolute -right-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 lg:block" viewBox="0 0 16 16" aria-hidden>
              <path d="M2 8h10M8 3l5 5-5 5" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}

const engineNodes = [
  { label: "Video Production", icon: Clapperboard, text: "AI storyboards and concept frames, finished by human editors." },
  { label: "Graphic Design", icon: Palette, text: "Rapid visual exploration, refined by designers for your brand." },
  { label: "Website Creation", icon: Globe, text: "Design systems and code built for speed and conversion." },
  { label: "Branding", icon: Sparkles, text: "Identity concepts explored widely, then crafted precisely." },
  { label: "Content Writing", icon: PenLine, text: "Research-assisted drafts, edited for your brand voice." },
  { label: "Digital Marketing", icon: Megaphone, text: "Campaign creatives and reporting that connect the dots." },
];

/** Diagram 3: radial AI creative engine */
export function CreativeEngine() {
  const [active, setActive] = useState(0);
  const activeNode = engineNodes[active] ?? engineNodes[0];
  if (!activeNode) return null;
  const R = 40;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" stroke="var(--border)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="var(--primary)" strokeOpacity=".3" strokeWidth="0.2" strokeDasharray="1 2" className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }} />
          {engineNodes.map((_, i) => {
            const a = (i / engineNodes.length) * Math.PI * 2 - Math.PI / 2;
            return <line key={i} x1="50" y1="50" x2={coordinate(50 + R * Math.cos(a))} y2={coordinate(50 + R * Math.sin(a))}
              stroke={i === active ? "var(--cyan)" : "var(--primary)"} strokeOpacity={i === active ? 1 : 0.35} strokeWidth="0.35" className="animate-flow" />;
          })}
        </svg>
        <img src={core} alt="Glowing AI core" loading="lazy" width={1024} height={1024}
          className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full [mask-image:radial-gradient(circle,black_55%,transparent_72%)]" />
        {engineNodes.map((n, i) => {
          const a = (i / engineNodes.length) * Math.PI * 2 - Math.PI / 2;
          const Icon = n.icon;
          return (
            <Button variant="ghost" key={n.label} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-pressed={i === active}
              className={`absolute h-auto flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-xl px-2 py-2 text-center transition-all ${i === active ? "glass shadow-glow text-cyan" : "text-muted-foreground hover:text-foreground"}`}
              style={{ left: `${coordinate(50 + R * Math.cos(a))}%`, top: `${coordinate(50 + R * Math.sin(a))}%` }}>
              <Icon className="h-5 w-5" />
              <span className="max-w-[90px] text-[11px] font-medium leading-tight sm:text-xs">{n.label}</span>
            </Button>
          );
        })}
      </div>
      <div className="glass rounded-2xl p-8" aria-live="polite">
        <Brain className="h-8 w-8 text-cyan" />
        <p className="eyebrow mt-4">Engine module</p>
        <h3 className="mt-2 text-2xl font-bold">{activeNode.label}</h3>
        <p className="mt-3 text-muted-foreground">{activeNode.text}</p>
        <p className="mt-6 text-sm text-muted-foreground">Every module shares one brief, one brand system and one team — so your video, website and campaigns feel like the same brand.</p>
      </div>
    </div>
  );
}

/** Diagram 2: web architecture stack */
export function WebArchitecture() {
  const layers = [
    { t: "Client Requirements", d: "Goals, audience, content" },
    { t: "UI/UX Design", d: "Journeys, wireframes, design system" },
    { t: "Frontend Development", d: "Responsive, accessible interface" },
    { t: "Backend & Database", d: "Forms, data, authentication" },
    { t: "Testing & Security", d: "Performance, validation, access control" },
    { t: "Deployment", d: "Domain, hosting, monitoring" },
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
      <ol className="space-y-3" aria-label="Website development architecture">
        {layers.map((l, i) => (
          <li key={l.t} className="glass flex items-center gap-4 rounded-xl p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-background">{i + 1}</span>
            <div><p className="font-semibold">{l.t}</p><p className="text-sm text-muted-foreground">{l.d}</p></div>
          </li>
        ))}
      </ol>
      <svg viewBox="0 0 60 300" className="hidden h-72 w-14 lg:block" aria-hidden>
        <path d="M30 0 V300" stroke="var(--cyan)" strokeWidth="1.5" className="animate-flow" />
      </svg>
      <div className="grid grid-cols-2 gap-3" aria-label="System components">
        {["Frontend", "Backend API", "Database", "Integrations"].map((c, i) => (
          <div key={c} className="relative rounded-xl border border-border bg-card p-5 text-center">
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-success animate-pulse-node" style={{ animationDelay: `${i * .4}s` }} />
            <p className="font-display font-semibold">{c}</p>
            <p className="mt-1 text-xs text-muted-foreground">{["React · Tailwind", "Server functions", "Secure Postgres", "Payments · Email · AI"][i]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Diagram 5: growth ecosystem */
export function GrowthEcosystem() {
  const items = ["Website", "Content", "Branding", "SEO", "Social Media", "Digital Promotion"];
  const pos = items.map((_, i) => { const a = (i / items.length) * Math.PI * 2; return [coordinate(50 + 36 * Math.cos(a)), coordinate(50 + 36 * Math.sin(a))]; });
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {pos.map((p, i) => pos.slice(i + 1).map((q, j) => (
          <line key={`${i}-${j}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="var(--primary)" strokeOpacity=".25" strokeWidth=".25" />
        )))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-deep px-5 py-3 font-display text-sm font-bold shadow-glow">Your Brand</div>
      {items.map((t, i) => (
        <span key={t} className="glass absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-medium sm:text-sm" style={{ left: `${pos[i]?.[0]}%`, top: `${pos[i]?.[1]}%` }}>{t}</span>
      ))}
    </div>
  );
}
