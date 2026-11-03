import { z } from "zod";

const opt = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const inquirySchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  business_name: opt(120),
  country: z.string().trim().min(2, "Enter your country").max(60),
  service_category: z.string().trim().min(1, "Choose a service").max(60),
  specific_service: opt(120),
  package: z.enum(["starter", "growth", "professional", "custom"]),
  project_title: z.string().trim().min(3, "Give your project a title").max(150),
  project_description: z.string().trim().min(20, "Tell us a bit more (at least 20 characters)").max(4000),
  target_audience: opt(500),
  preferred_style: opt(500),
  deliverables: opt(1000),
  budget_range: opt(60),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date").refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Enter a real calendar date").optional().or(z.literal("")),
  reference_links: opt(1000),
  additional_requirements: opt(2000),
  service_details: z.record(z.string(), z.string().max(300)).default({}),
  privacy_consent: z.literal(true, { message: "Please accept the privacy policy" }),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export type InquiryInput = z.input<typeof inquirySchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: opt(150),
  message: z.string().trim().min(10, "Message is too short").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});
