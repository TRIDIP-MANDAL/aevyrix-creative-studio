import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { packages } from "@/lib/site-data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Packages (₹) — Aevyrix Creation Hub" },
      { name: "description", content: "Starter, Growth, Professional and Custom packages in Indian Rupees, with clear inclusions and third-party costs." },
      { property: "og:title", content: "Pricing — Aevyrix Creation Hub" },
      { property: "og:description", content: "Transparent starting prices and written quotations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title={<>Transparent <span className="text-gradient">packages</span></>} text="Prices below are draft starting points. Your final price is confirmed in a written quotation after we review your brief." />
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <div key={p.id} className={`relative flex flex-col rounded-2xl p-7 ${p.featured ? "glass shadow-glow" : "border border-border bg-card"}`}>
              {p.featured && <span className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-background">Popular</span>}
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <p className="mt-5 font-display text-3xl font-bold">{p.price}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-cyan" />{f}</li>)}
              </ul>
              <Button asChild variant={p.featured ? "hero" : "glass"} className="mt-6 w-full rounded-full"><Link to="/start" search={{ package: p.id }}>Choose {p.name}</Link></Button>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-bold">Every quotation lists</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["Included deliverables", "Exclusions", "Revision limits", "Expected timeline", "Support terms", "Payment schedule (advance / milestones / balance)"].map((t) => <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-cyan" />{t}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-bold">Third-party costs (billed separately)</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["Domain registration & hosting", "Paid APIs and AI credits", "Stock assets & premium software", "Advertising budgets (paid to ad platforms)", "Payment provider fees"].map((t) => <li key={t} className="flex gap-2"><X className="h-4 w-4 text-destructive" />{t}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
