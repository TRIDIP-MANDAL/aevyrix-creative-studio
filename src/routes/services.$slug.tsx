import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { FinalCta } from "@/components/site/FinalCta";
import { getPublicContent } from '@/lib/content.functions';

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const { services } = await getPublicContent();
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service not found — Aevyrix" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${s.name} Services — Aevyrix Creation Hub` },
        { name: "description", content: `${s.short} ${s.items.slice(0, 4).join(", ")} and more.` },
        { property: "og:title", content: `${s.name} — Aevyrix Creation Hub` },
        { property: "og:description", content: s.short },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:url', content: `/services/${s.slug}` },
        ...(s.image.startsWith('https://') ? [{property:'og:image',content:s.image},{name:'twitter:image',content:s.image}] : []),
      ],
      links: [{ rel: 'canonical', href: `/services/${s.slug}` }],
      scripts: [{ type: 'application/ld+json', children: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service', name: s.name,
        description: s.short, serviceType: s.name,
        provider: { '@type': 'Organization', name: 'Aevyrix Creation Hub' },
      }) }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Service" title={s.name} text={s.short} image={s.image} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold">What's included</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {s.items.map((i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <Check className="h-5 w-5 shrink-0 text-cyan" /> {i}
              </li>
            ))}
          </ul>
          {s.note && (
            <div className="mt-6 flex gap-3 rounded-xl border border-violet/40 bg-violet/10 p-5 text-sm">
              <Info className="h-5 w-5 shrink-0 text-violet" /><p>{s.note}</p>
            </div>
          )}
        </div>
        <aside className="glass h-fit rounded-2xl p-7 lg:sticky lg:top-24">
          <p className="eyebrow">Ready to start?</p>
          <h3 className="mt-2 text-2xl font-bold">Order {s.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">Share your brief and receive a written quotation. Submitting an inquiry doesn't commit you to pay.</p>
          <Button asChild variant="hero" size="lg" className="mt-6 w-full"><Link to="/start" search={{ service: s.slug }}>Order this service <ArrowRight /></Link></Button>
          <Link to="/pricing" className="mt-4 block text-center text-sm text-cyan hover:underline">View packages & pricing</Link>
        </aside>
      </section>
      <FinalCta />
    </>
  );
}
