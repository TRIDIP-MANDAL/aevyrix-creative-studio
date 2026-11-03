import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { GrowthEcosystem, WebArchitecture } from "@/components/site/Diagrams";
import { FinalCta } from "@/components/site/FinalCta";
import { getPublicContent } from '@/lib/content.functions';
import core from "@/assets/ai-core.jpg";

export const Route = createFileRoute("/services/")({
  loader: () => getPublicContent(),
  head: () => ({
    meta: [
      { title: "Services — Aevyrix Creation Hub" },
      { name: "description", content: "Video editing, AI videos, graphic design, website development, UI/UX, branding, social media and digital marketing services." },
      { property: "og:title", content: "Services — Aevyrix Creation Hub" },
      { property: "og:description", content: "Nine creative and digital services, one connected team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Service catalog" title={<>Everything your brand needs to <span className="text-gradient">stand out</span></>} text="Choose a single service or combine several into one connected launch." image={core} />
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-cyan/50">
              <img src={s.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold">{s.name}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan">Details & order <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Website architecture" title="How we build websites" text="Every layer is designed, built and tested as part of one system." />
          <div className="mt-12"><WebArchitecture /></div>
        </div>
      </section>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading center eyebrow="Growth ecosystem" title="Services that strengthen each other" />
          <div className="mt-10"><GrowthEcosystem /></div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
