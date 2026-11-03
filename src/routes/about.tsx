import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { Pipeline } from "@/components/site/Diagrams";
import { FinalCta } from "@/components/site/FinalCta";
import hero from "@/assets/hero-robot.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aevyrix Creation Hub" },
      { name: "description", content: "Aevyrix Creation Hub transforms ideas into powerful digital experiences through creativity, intelligent technology and next-generation design." },
      { property: "og:title", content: "About Aevyrix Creation Hub" },
      { property: "og:description", content: "Where artificial intelligence meets human creativity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>Where AI meets <span className="text-gradient">human creativity</span></>}
        text="We transform ideas into powerful digital experiences through creativity, intelligent technology, and next-generation design." image={hero} />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 md:grid-cols-3">
        {[
          ["Imagine", "We start with your goals and audience, exploring bold directions quickly with AI-assisted concepting."],
          ["Create", "Designers, editors and developers craft every detail by hand, using AI where it genuinely helps."],
          ["Elevate", "We deliver work that's ready to launch — and stay available to help it grow."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-7">
            <h2 className="text-2xl font-bold text-gradient">{t}</h2>
            <p className="mt-3 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Customer journey" title="From inquiry to delivery" text="An inquiry is just a conversation. A project is confirmed only after you approve the quotation and payment." />
          <div className="mt-12"><Pipeline label="Customer order workflow" steps={["Service Selection", "Project Brief", "Quotation", "Approval", "Payment", "Production", "Review", "Delivery"]} /></div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
