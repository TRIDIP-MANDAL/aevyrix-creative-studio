import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Cpu, Layers, MessageSquare, MonitorSmartphone, Sparkles, Workflow, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/Section";
import { CreativeEngine, Pipeline } from "@/components/site/Diagrams";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { packages, faqs, contact } from "@/lib/site-data";
import { getPublicContent } from '@/lib/content.functions';
import hero from "@/assets/hero-robot.jpg";
import { FinalCta } from "@/components/site/FinalCta";
import { TeamGrid } from '@/components/site/TeamGrid';
import { mergeTeamProfiles } from '@/lib/team-data';

export const Route = createFileRoute("/")({
  loader: () => getPublicContent(),
  head: () => ({
    meta: [
      { title: "Aevyrix Creation Hub — AI-Powered Creative Agency" },
      { name: "description", content: "AI-powered creativity, cinematic content, professional websites and branding for ambitious brands. Create. Innovate. Elevate." },
      { property: "og:title", content: "Aevyrix Creation Hub — AI-Powered Creative Agency" },
      { property: "og:description", content: "Video editing, AI videos, graphic design, websites, UI/UX, branding and digital marketing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Organization',
      name: 'Aevyrix Creation Hub', description: 'AI-assisted creative agency offering video editing, design, website development, branding and digital marketing.',
      email: contact.email, telephone: contact.phones,
      sameAs: [contact.facebook, contact.instagram],
    }) }],
  }),
  component: Index,
});

const why = [
  { icon: Sparkles, t: "Creative thinking", d: "Ideas first, tools second." },
  { icon: Cpu, t: "AI-assisted production", d: "Faster exploration, human-finished quality." },
  { icon: Layers, t: "Customised solutions", d: "Scoped to your goals, not templates." },
  { icon: MessageSquare, t: "Clear communication", d: "One point of contact, regular updates." },
  { icon: MonitorSmartphone, t: "Responsive design", d: "Built for every screen size." },
  { icon: Workflow, t: "Structured workflow", d: "Brief → quote → build → review → deliver." },
  { icon: Eye, t: "Transparent scope", d: "Written quotations, no hidden fees." },
];

function Index() {
  const { services, portfolio, team } = Route.useLoaderData();
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
        <img src={hero} alt="Futuristic humanoid robot surrounded by holographic interface panels" width={1920} height={1088}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 tech-grid opacity-30 [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-20">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow">AI × Creativity × Technology</p>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] md:text-7xl">
              Imagine Beyond Limits. <span className="text-gradient">Create the Extraordinary.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              AI-powered creativity, cinematic content, professional websites, and digital experiences built to help ambitious brands move forward.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg"><Link to="/start">Start Your Project <ArrowRight /></Link></Button>
              <Button asChild variant="glass" size="lg"><Link to="/services">Explore Our Services</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="What we create" title="Services built for modern brands" text="From a single reel to a full launch — pick what you need, or let us shape a bundle." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-cyan/50">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={s.image} alt="" loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center"><Button asChild variant="glass" size="lg"><Link to="/services">View all services</Link></Button></div>
        </div>
      </section>

      {/* Creative engine */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 tech-grid opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Our creative engine" title={<>One intelligent core. <span className="text-gradient">Six disciplines.</span></>} text="Select a module to see how AI assistance and human craft work together." />
          <div className="mt-14"><CreativeEngine /></div>
        </div>
      </section>

      {/* Featured work */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Featured work" title="Visual direction showcase" text="Concept projects created for portfolio demonstration." />
            <Button asChild variant="glass"><Link to="/work">See all work</Link></Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {portfolio.slice(0, 3).map((p) => (
              <figure key={p.title} className="group relative overflow-hidden rounded-2xl border border-border">
                <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-16">
                  <p className="eyebrow text-[10px]">{p.category}</p>
                  <p className="mt-1 font-display text-lg font-semibold">{p.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Concept Project — Created for Portfolio Demonstration</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="How we work" title="Creative production system" text="A clear path from first idea to final delivery." />
          <div className="mt-12">
            <Pipeline label="Creative production workflow" steps={["Idea", "AI-Assisted Concept", "Design", "Production", "Quality Check", "Delivery"]} />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Why Aevyrix" title="What working with us feels like" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-cyan/40">
                <Icon className="h-6 w-6 text-cyan" />
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading center eyebrow="Pricing" title="Packages that scale with you" text="Draft starting prices in ₹. Every project receives a written quotation." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => (
              <div key={p.id} className={`relative rounded-2xl p-6 ${p.featured ? "glass shadow-glow" : "border border-border bg-card"}`}>
                {p.featured && <span className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-background">Popular</span>}
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-5 font-display text-2xl font-bold">{p.price}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-cyan" />{f}</li>)}
                </ul>
                <Button asChild variant={p.featured ? "hero" : "glass"} className="mt-6 w-full rounded-full"><Link to="/start" search={{ package: p.id }}>Choose {p.name}</Link></Button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm"><Link to="/pricing" className="text-cyan hover:underline">See inclusions, exclusions and third-party costs →</Link></p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading center eyebrow="The team" title="Real people behind the machines" text="Meet the people leading our creative, technology and business teams." />
          <div className="mt-12"><TeamGrid people={mergeTeamProfiles(team)} /></div>
          <div className="text-center"><Button asChild variant="glass" size="lg" className="mt-8"><Link to="/team">Meet the team</Link></Button></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHeading center eyebrow="FAQ" title="Questions, answered" />
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left font-display text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

