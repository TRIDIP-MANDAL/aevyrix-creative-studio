import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/start-server-core/request-response";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { inquirySchema, contactSchema } from "./form-schemas";

const FORM_RATE_LIMIT = 5;
const FORM_RATE_WINDOW_MS = 60 * 60 * 1000;
const formRequestsByIp = new Map<string, number[]>();

function enforceFormRateLimit() {
  const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
  const now = Date.now();
  const windowStart = now - FORM_RATE_WINDOW_MS;
  const recentRequests = (formRequestsByIp.get(ip) ?? []).filter((timestamp) => timestamp > windowStart);

  if (recentRequests.length >= FORM_RATE_LIMIT) {
    throw new Error("Too many form submissions from this network. Please try again later.");
  }

  recentRequests.push(now);
  formRequestsByIp.set(ip, recentRequests);
}

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  if (!url || !key) {
    throw new Error("Server is Under Maintainance. Please try again later.");
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

function makeReference() {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(3))).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  return `AVX-${ymd}-${rand}`;
}

async function sendEmail(options: { subject: string; replyTo: string; text: string }) {
  const host = process.env["SMTP_HOST"];
  const port = Number(process.env["SMTP_PORT"] || "465");
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  const receiver = process.env["CONTACT_RECEIVER_EMAIL"];
  const sender = process.env["EMAIL_FROM"];

  if (!host || !Number.isInteger(port) || port <= 0 || !user || !pass || !receiver || !sender) {
    const missing = [
      ...(!host ? ["SMTP_HOST"] : []),
      ...(!Number.isInteger(port) || port <= 0 ? ["SMTP_PORT"] : []),
      ...(!user ? ["SMTP_USER"] : []),
      ...(!pass ? ["SMTP_PASS"] : []),
      ...(!receiver ? ["CONTACT_RECEIVER_EMAIL"] : []),
      ...(!sender ? ["EMAIL_FROM"] : []),
    ];
    console.error(`Missing email environment variable(s): ${missing.join(", ")}`);
    throw new Error("Email service is not configured. Please try again later.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: sender,
      to: receiver,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
    });
  } catch (error) {
    console.error("email delivery failed", error);
    throw new Error("We couldn't send your message. Please try again.");
  }
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    enforceFormRateLimit();
    if (data.website) return { reference: makeReference() }; // honeypot: silently drop bots
    const reference = makeReference();
    const { error } = await publicClient().from("inquiries").insert({
      reference,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      business_name: data.business_name || null,
      country: data.country,
      service_category: data.service_category,
      specific_service: data.specific_service || null,
      package: data.package,
      project_title: data.project_title,
      project_description: data.project_description,
      target_audience: data.target_audience || null,
      preferred_style: data.preferred_style || null,
      deliverables: data.deliverables || null,
      budget_range: data.budget_range || null,
      deadline: data.deadline || null,
      reference_links: data.reference_links || null,
      additional_requirements: data.additional_requirements || null,
      service_details: data.service_details,
      privacy_consent: true,
    });
    if (error) {
      console.error("inquiry insert failed", error.message);
      throw new Error("We couldn't save your inquiry. Please try again.");
    }

    await sendEmail({
      replyTo: data.email,
      subject: `New project inquiry: ${data.project_title}`,
      text: [
        `Reference: ${reference}`,
        `Name: ${data.full_name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Business: ${data.business_name || "-"}`,
        `Country: ${data.country}`,
        `Service: ${data.service_category}`,
        `Specific service: ${data.specific_service || "-"}`,
        `Package: ${data.package}`,
        `Project title: ${data.project_title}`,
        "",
        `Project description:\n${data.project_description}`,
        `Target audience: ${data.target_audience || "-"}`,
        `Preferred style: ${data.preferred_style || "-"}`,
        `Deliverables: ${data.deliverables || "-"}`,
        `Budget: ${data.budget_range || "-"}`,
        `Deadline: ${data.deadline || "-"}`,
        `Reference links: ${data.reference_links || "-"}`,
        `Additional requirements: ${data.additional_requirements || "-"}`,
        `Service details: ${JSON.stringify(data.service_details)}`,
      ].join("\n"),
    });

    return { reference };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    enforceFormRateLimit();
    if (data.website) return { ok: true };

    const { error } = await publicClient().from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) {
      console.error("contact insert failed", error.message);
      throw new Error("We couldn't save your message. Please try again.");
    }

    await sendEmail({
      replyTo: data.email,
      subject: data.subject ? `Contact message: ${data.subject}` : "New contact message",
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject || "-"}`,
        "",
        data.message,
      ].join("\n"),
    });

    return { ok: true };
  });
