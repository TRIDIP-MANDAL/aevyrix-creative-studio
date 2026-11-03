import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Facebook, Instagram, Loader2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { submitContact } from "@/lib/forms.functions";
import { contactSchema } from "@/lib/form-schemas";
import { contact } from "@/lib/site-data";
import core from "@/assets/ai-core.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aevyrix Creation Hub" },
      { name: "description", content: "Get in touch with Aevyrix Creation Hub by email, phone or the contact form." },
      { property: "og:title", content: "Contact Aevyrix Creation Hub" },
      { property: "og:description", content: "Let's talk about your next project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const field = "w-full rounded-lg border border-input bg-section px-3.5 py-2.5 text-sm focus:border-cyan focus:outline-none";

function Contact() {
  const send = useServerFn(submitContact);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(["name", "email", "subject", "message", "website"].map((k) => [k, String(fd.get(k) ?? "")]));
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] ??= i.message; });
      setErrors(errs); return;
    }
    setErrors({}); setLoading(true);
    try { await send({ data: payload }); setSent(true); form.reset(); }
    catch (err) { toast.error(err instanceof Error ? err.message : "Something went wrong."); }
    finally { setLoading(false); }
  }

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let's Create Something <span className="text-gradient">Exceptional.</span></>} text="Have a project in mind? Get in touch with Aevyrix Creation Hub to discuss your ideas, requirements, and potential collaboration." image={core} />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-24 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[{ icon: Mail, l: "Email", v: contact.email, href: `mailto:${contact.email}` }, ...contact.phones.map(phone => ({ icon: Phone, l: 'Phone', v: phone, href: `tel:${phone.replaceAll(' ', '')}` }))].map(({ icon: Icon, l, v, href }) => (
            <a key={v} href={href} className="glass flex items-center gap-4 rounded-lg p-5 transition-colors hover:border-cyan/50">
              <Icon className="h-6 w-6 shrink-0 text-cyan" /><div className="min-w-0"><p className="text-sm text-muted-foreground">{l}</p><p className="break-all font-medium">{v}</p></div>
            </a>
          ))}
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="glass"><a href={contact.facebook} target="_blank" rel="noopener noreferrer"><Facebook />Facebook</a></Button>
            <Button asChild variant="glass"><a href={contact.instagram} target="_blank" rel="noopener noreferrer"><Instagram />Instagram</a></Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-display text-lg font-semibold">Have a project in mind?</p>
            <p className="mt-1 text-sm text-muted-foreground">Our project form gets you a reference number and a faster quotation.</p>
            <Button asChild variant="hero" className="mt-4 rounded-full"><Link to="/start">Start Your Project</Link></Button>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          {sent ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl font-bold">Message sent</p>
              <p className="mt-2 text-muted-foreground">Thanks — we've received your message and will get back to you soon.</p>
              <Button variant="glass" className="mt-6" onClick={() => setSent(false)}>Send another</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <div className="grid gap-5 md:grid-cols-2">
                {(["name", "email"] as const).map((k) => (
                  <div key={k}>
                    <label htmlFor={k} className="mb-1.5 block text-sm font-medium capitalize">{k} <span className="text-cyan">*</span></label>
                    <input id={k} name={k} type={k === "email" ? "email" : "text"} className={field} />
                    {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
                  </div>
                ))}
              </div>
              <div><label htmlFor="subject" className="mb-1.5 block text-sm font-medium">Subject</label><input id="subject" name="subject" className={field} /></div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message <span className="text-cyan">*</span></label>
                <textarea id="message" name="message" rows={6} className={field} />
                {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={loading}>{loading ? <><Loader2 className="animate-spin" /> Sending…</> : "Send message"}</Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
