import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { packages } from "@/lib/site-data";
import { getPublicContent } from '@/lib/content.functions';
import { submitInquiry } from "@/lib/forms.functions";
import { inquirySchema } from "@/lib/form-schemas";

export const Route = createFileRoute("/start")({
  loader: () => getPublicContent(),
  validateSearch: z.object({ service: z.string().optional(), package: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Start Your Project — Aevyrix Creation Hub" },
      { name: "description", content: "Share your project brief and receive a written quotation from Aevyrix Creation Hub." },
      { property: "og:title", content: "Start Your Project — Aevyrix Creation Hub" },
      { property: "og:description", content: "Tell us about your idea. We'll reply with a plan and quotation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/start" },
    ],
    links: [{ rel: "canonical", href: "/start" }],
  }),
  component: Start,
});

const extra: Record<string, { key: string; label: string }[]> = {
  "video-editing": [
    { key: "video_duration", label: "Video duration" }, { key: "number_of_videos", label: "Number of videos" },
    { key: "aspect_ratio", label: "Aspect ratio (e.g. 9:16, 16:9)" }, { key: "source_footage", label: "Is source footage available?" },
    { key: "subtitles", label: "Subtitle requirements" },
  ],
  "ai-videos": [
    { key: "video_duration", label: "Video duration" }, { key: "number_of_videos", label: "Number of videos" },
    { key: "aspect_ratio", label: "Aspect ratio" }, { key: "voice_over", label: "Voice-over needed?" },
  ],
  "website-development": [
    { key: "website_type", label: "Website type" }, { key: "page_count", label: "Estimated page count" },
    { key: "functionality", label: "Required functionality" }, { key: "domain", label: "Do you have a domain?" },
    { key: "hosting", label: "Hosting requirements" }, { key: "design_refs", label: "Design references" },
  ],
  "graphic-design": [
    { key: "design_type", label: "Design type" }, { key: "number_of_creatives", label: "Number of creatives" },
    { key: "dimensions", label: "Dimensions" }, { key: "brand_assets", label: "Do you have brand assets?" },
    { key: "platform", label: "Intended platform" },
  ],
};

const field = "w-full rounded-lg border border-input bg-section px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:border-cyan focus:outline-none";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const httpsUrlPattern = /^https:\/\/[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(?:[/?#][^\s]*)?$/i;

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDeadlineBounds() {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tenYearsFromToday = new Date(tomorrow);
  tenYearsFromToday.setFullYear(tenYearsFromToday.getFullYear() + 10);
  tenYearsFromToday.setDate(tenYearsFromToday.getDate() - 1);

  return {
    min: formatDateInput(tomorrow),
    max: formatDateInput(tenYearsFromToday),
  };
}

function F({ label, name, error, children, required }: { label: string; name: string; error?: string | undefined; children: ReactNode; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">{label}{required && <span className="text-cyan"> *</span>}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive" role="alert">{error}</p>}
    </div>
  );
}

function Start() {
  const { services } = Route.useLoaderData();
  const search = Route.useSearch();
  const submit = useServerFn(submitInquiry);
  const [category, setCategory] = useState(services.find((s) => s.slug === search.service)?.slug ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const svc = services.find((s) => s.slug === category);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    const details: Record<string, string> = {};
    (extra[category] ?? []).forEach((x) => { const v = get(`d_${x.key}`); if (v) details[x.key] = v; });
    const payload = {
      full_name: get("full_name"), email: get("email"), phone: get("phone"), business_name: get("business_name"),
      country: get("country"), service_category: svc?.name ?? "", specific_service: get("specific_service"),
      package: get("package") || "custom", project_title: get("project_title"), project_description: get("project_description"),
      target_audience: get("target_audience"), preferred_style: get("preferred_style"), deliverables: get("deliverables"),
      budget_range: get("budget_range"), deadline: get("deadline"), reference_links: get("reference_links"),
      additional_requirements: get("additional_requirements"), service_details: details,
      privacy_consent: fd.get("privacy_consent") === "on", website: get("website"),
    };
    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { const k = String(i.path[0]); if (!errs[k]) errs[k] = i.message; });
      setErrors(errs);
      toast.error("Please check the highlighted fields.");
      return;
    }

    const clientErrors: Record<string, string> = {};
    if (!emailPattern.test(payload.email)) {
      clientErrors['email'] = "Enter a valid email address.";
    }

    const { min: earliestDeadline, max: latestDeadline } = getDeadlineBounds();
    if (payload.deadline && (payload.deadline < earliestDeadline || payload.deadline > latestDeadline)) {
      clientErrors['deadline'] = `Choose a date from ${earliestDeadline} through ${latestDeadline}.`;
    }

    const links = payload.reference_links.split(/\r?\n/).map((link) => link.trim()).filter(Boolean);
    if (links.some((link) => !httpsUrlPattern.test(link))) {
      clientErrors['reference_links'] = "Use one valid HTTPS URL per line.";
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await submit({ data: payload });
      setDone(res.reference);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <section className="mx-auto max-w-2xl px-5 pb-24 pt-36 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        <h1 className="mt-6 text-4xl font-bold">Inquiry received</h1>
        <p className="mt-4 text-muted-foreground">Thank you! Your inquiry has been saved. This is not yet a confirmed order — we'll review your brief and send a quotation.</p>
        <div className="glass mx-auto mt-8 inline-block rounded-2xl px-8 py-5">
          <p className="eyebrow">Your reference number</p>
          <p className="mt-2 font-display text-3xl font-bold text-gradient">{done}</p>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Please keep this reference when you contact us about your project.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="glass"><Link to="/">Back home</Link></Button>
          <Button asChild variant="hero" className="rounded-full"><Link to="/contact">Contact us</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Project inquiry" title={<>Start your <span className="text-gradient">project</span></>} text="Tell us about your idea. Submitting this form is free and doesn't commit you to anything — we'll reply with a written quotation." />
      <form onSubmit={onSubmit} noValidate className="mx-auto max-w-4xl space-y-10 px-5 pb-24">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <fieldset className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <legend className="px-2 font-display text-lg font-semibold">1. About you</legend>
          <div className="grid gap-5 md:grid-cols-2">
            <F label="Full name" name="full_name" required error={errors["full_name"]}><input id="full_name" name="full_name" className={field} autoComplete="name" /></F>
            <F label="Email" name="email" required error={errors["email"]}><input id="email" name="email" type="email" className={field} autoComplete="email" /></F>
            <F label="Phone number" name="phone" required error={errors["phone"]}><input id="phone" name="phone" type="tel" className={field} placeholder="+91 " autoComplete="tel" /></F>
            <F label="Business name" name="business_name"><input id="business_name" name="business_name" className={field} /></F>
            <F label="Country" name="country" required error={errors["country"]}><input id="country" name="country" defaultValue="India" className={field} /></F>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <legend className="px-2 font-display text-lg font-semibold">2. Service</legend>
          <div className="grid gap-5 md:grid-cols-2">
            <F label="Service category" name="service_category" required error={errors["service_category"]}>
              <select id="service_category" value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
                <option value="">Select a service</option>
                {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
            </F>
            <F label="Specific service" name="specific_service">
              <select id="specific_service" name="specific_service" className={field} disabled={!svc}>
                <option value="">{svc ? "Select (optional)" : "Choose a category first"}</option>
                {svc?.items.map((i) => <option key={i}>{i}</option>)}
              </select>
            </F>
            <F label="Package" name="package" required error={errors["package"]}>
              <select id="package" name="package" defaultValue={search.package ?? "custom"} className={field}>
                {packages.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.price}</option>)}
              </select>
            </F>
            <F label="Budget range" name="budget_range">
              <select id="budget_range" name="budget_range" className={field}>
                <option value="">Select</option>
                {["Under ₹5,000", "₹5,000 – ₹15,000", "₹15,000 – ₹35,000", "₹35,000 – ₹75,000", "₹75,000+", "Not sure yet"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </F>
          </div>
          {extra[category] && (
            <div className="mt-6 grid gap-5 border-t border-border pt-6 md:grid-cols-2">
              {extra[category].map((x) => (
                <F key={x.key} label={x.label} name={`d_${x.key}`}><input id={`d_${x.key}`} name={`d_${x.key}`} className={field} maxLength={300} /></F>
              ))}
            </div>
          )}
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <legend className="px-2 font-display text-lg font-semibold">3. Project brief</legend>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2"><F label="Project title" name="project_title" required error={errors["project_title"]}><input id="project_title" name="project_title" className={field} /></F></div>
            <div className="md:col-span-2"><F label="Project description" name="project_description" required error={errors["project_description"]}><textarea id="project_description" name="project_description" rows={5} className={field} /></F></div>
            <F label="Target audience" name="target_audience"><input id="target_audience" name="target_audience" className={field} /></F>
            <F label="Preferred style" name="preferred_style"><input id="preferred_style" name="preferred_style" className={field} placeholder="e.g. minimal, cinematic, bold" /></F>
            <F label="Deliverables" name="deliverables"><input id="deliverables" name="deliverables" className={field} /></F>
            <F label="Deadline" name="deadline" error={errors["deadline"]}><input id="deadline" name="deadline" type="date" min={getDeadlineBounds().min} max={getDeadlineBounds().max} className={field} /></F>
            <div className="md:col-span-2"><F label="Reference links" name="reference_links" error={errors["reference_links"]}><textarea id="reference_links" name="reference_links" rows={2} className={field} placeholder="One HTTPS URL per line" /></F></div>
            <div className="md:col-span-2"><F label="Additional requirements" name="additional_requirements"><textarea id="additional_requirements" name="additional_requirements" rows={3} className={field} /></F></div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Have files to share? Add links above (Google Drive, Dropbox) — direct file uploads are coming soon.</p>
        </fieldset>

        <div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="privacy_consent" className="mt-1 h-4 w-4 accent-[var(--cyan)]" />
            <span>I agree that Aevyrix Creation Hub may store and use these details to respond to my inquiry, as described in the <Link to="/privacy" className="text-cyan underline">Privacy Policy</Link>.</span>
          </label>
          {errors["privacy_consent"] && <p className="mt-1 text-xs text-destructive" role="alert">{errors["privacy_consent"]}</p>}
        </div>

        <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full md:w-auto">
          {loading ? <><Loader2 className="animate-spin" /> Submitting…</> : "Submit inquiry"}
        </Button>
      </form>
    </>
  );
}
