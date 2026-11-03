import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/Section";
import { FinalCta } from "@/components/site/FinalCta";
import { getPublicContent } from '@/lib/content.functions';
import design from "@/assets/svc-design.jpg";

export const Route = createFileRoute("/work")({
  loader: () => getPublicContent(),
  head: () => ({
    meta: [
      { title: "Our Work — Aevyrix Creation Hub" },
      { name: "description", content: "AI visuals, video, design, websites and branding concept projects from Aevyrix Creation Hub." },
      { property: "og:title", content: "Our Work — Aevyrix Creation Hub" },
      { property: "og:description", content: "A showcase of our visual direction across disciplines." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: Work,
});

const cats = ["All", "AI Art and Visuals", "Video Editing", "AI Promotional Videos", "Graphic Design", "Website Development", "UI/UX", "Branding", "Digital Marketing"];

function Work() {
  const { portfolio } = Route.useLoaderData();
  const [cat, setCat] = useState("All");
  const items = portfolio.filter((p) => cat === "All" || p.category === cat);
  return (
    <>
      <PageHero eyebrow="Portfolio" title={<>Our <span className="text-gradient">work</span></>} text="Concept projects that demonstrate our visual direction. Client case studies will be added as projects are published." image={design} />
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${cat === c ? "bg-gradient-brand font-semibold text-background" : "border border-border text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
        {items.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">No projects in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <figure key={p.title} className="group overflow-hidden rounded-2xl border border-border bg-card">
                <div className="overflow-hidden"><img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <figcaption className="p-5">
                  <p className="eyebrow text-[10px]">{p.category}</p>
                  <p className="mt-1 font-display text-lg font-semibold">{p.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Concept Project — Created for Portfolio Demonstration</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
      <FinalCta />
    </>
  );
}
