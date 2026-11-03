import { createFileRoute } from "@tanstack/react-router";
import { contact } from '@/lib/site-data';

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Aevyrix Creation Hub" },
      { name: "description", content: "How Aevyrix Creation Hub collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — Aevyrix Creation Hub" },
      { property: "og:description", content: "How we handle your data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <article className="mx-auto max-w-3xl space-y-5 px-5 pb-24 pt-32 text-muted-foreground">
      <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
      <p>Draft policy — to be reviewed before launch.</p>
      <h2 className="pt-4 text-xl font-semibold text-foreground">What we collect</h2>
      <p>When you submit a project inquiry or contact form, we collect the details you provide: name, email, phone number, business details and your project brief.</p>
      <h2 className="pt-4 text-xl font-semibold text-foreground">How we use it</h2>
      <p>We use your details only to respond to your inquiry, prepare quotations and deliver your project. We do not sell your data.</p>
      <h2 className="pt-4 text-xl font-semibold text-foreground">Storage and retention</h2>
      <p>Submissions are stored securely and are accessible only to authorised team members. You can ask us to delete your data at any time.</p>
      <h2 className="pt-4 text-xl font-semibold text-foreground">Contact</h2>
      <p>For privacy requests, email <a href={`mailto:${contact.email}`} className="break-all text-cyan underline">{contact.email}</a>.</p>
    </article>
  ),
});
