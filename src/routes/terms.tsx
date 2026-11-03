import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Aevyrix Creation Hub" },
      { name: "description", content: "Terms for working with Aevyrix Creation Hub: inquiries, quotations, payments and delivery." },
      { property: "og:title", content: "Terms and Conditions — Aevyrix Creation Hub" },
      { property: "og:description", content: "The terms of our services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <article className="mx-auto max-w-3xl space-y-5 px-5 pb-24 pt-32 text-muted-foreground">
      <h1 className="text-4xl font-bold text-foreground">Terms and Conditions</h1>
      <p>Draft terms — to be reviewed before launch.</p>
      <h2 className="pt-4 text-xl font-semibold text-foreground">Inquiries and quotations</h2>
      <p>Submitting an inquiry does not create a binding order. A project is confirmed only after you approve a written quotation and any agreed advance payment is received.</p>
      <h2 className="pt-4 text-xl font-semibold text-foreground">Payments</h2>
      <p>Payment terms (advance, milestones, balance) are stated in each quotation. Third-party costs such as domains, hosting, paid APIs, stock assets, software and ad spend are billed separately.</p>
      <h2 className="pt-4 text-xl font-semibold text-foreground">Revisions and delivery</h2>
      <p>Revision limits and timelines are defined per project. Additional revisions may be charged.</p>
      <h2 className="pt-4 text-xl font-semibold text-foreground">AI-generated content</h2>
      <p>Where AI tools are used, we'll tell you which deliverables are AI-generated and which are produced by our team.</p>
    </article>
  ),
});
