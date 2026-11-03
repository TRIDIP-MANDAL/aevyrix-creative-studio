import video from "@/assets/svc-video.jpg";
import web from "@/assets/svc-web.jpg";
import design from "@/assets/svc-design.jpg";
import marketing from "@/assets/svc-marketing.jpg";
import core from "@/assets/ai-core.jpg";
import hero from "@/assets/hero-robot.jpg";

export type Service = {
  slug: string;
  name: string;
  short: string;
  image: string;
  items: string[];
  note?: string;
};

export const services: Service[] = [
  { slug: "video-editing", name: "Video Editing", image: video, short: "Reels, YouTube, ads and cinematic edits that hold attention.",
    items: ["Reels and Shorts", "YouTube videos", "Business advertisements", "Educational videos", "Promotional videos", "Podcast editing", "Event highlights", "Product videos", "Personal branding videos", "Motion graphics"] },
  { slug: "ai-videos", name: "AI-Generated & AI-Assisted Videos", image: core, short: "AI concepts and visual sequences, finished by human editors.",
    items: ["Promotional video concepts", "AI-assisted advertisements", "Explainer videos", "Product visualizations", "Brand introduction videos", "AI-assisted storyboards", "AI-generated visual sequences", "Voice-over integration", "Video post-production"],
    note: "AI-generated: storyboards, visual sequences and concept frames. Human-made: editing, pacing, sound design, colour and final delivery. We confirm the mix for every project before production." },
  { slug: "graphic-design", name: "Graphic Design", image: design, short: "Posts, posters, thumbnails and creatives with a clear message.",
    items: ["Social media posts", "Posters", "Flyers", "Carousels", "YouTube thumbnails", "Advertising creatives", "Business banners", "Presentation design", "Promotional materials"] },
  { slug: "website-development", name: "Website Development", image: web, short: "Fast, responsive websites and web apps built to convert.",
    items: ["Business websites", "Portfolio websites", "Landing pages", "Startup websites", "E-commerce websites", "Educational websites", "Clinic websites", "Restaurant websites", "Appointment booking websites", "Custom web applications"] },
  { slug: "ui-ux-design", name: "UI/UX Design", image: web, short: "Journeys, wireframes and design systems people enjoy using.",
    items: ["Wireframes", "Website layouts", "User journeys", "Interactive prototypes", "Design systems", "Mobile-first interfaces", "Conversion-focused landing pages"] },
  { slug: "branding", name: "Branding", image: design, short: "Logos, colour, type and guidelines for a consistent identity.",
    items: ["Logo design", "Color systems", "Typography", "Brand guidelines", "Social media brand kits", "Business presentations"] },
  { slug: "social-media-content", name: "Social Media Content", image: marketing, short: "Calendars, reels and posts that keep your brand visible.",
    items: ["Content calendars", "Reels editing", "Creative posts", "Captions", "Content repurposing", "Basic reporting"] },
  { slug: "digital-marketing", name: "Digital Marketing", image: marketing, short: "SEO, strategy and campaign creatives for steady growth.",
    items: ["SEO fundamentals", "Local SEO", "Social media strategy", "Advertising creatives", "Lead generation landing pages", "Campaign support", "Performance reporting"],
    note: "Our fees cover strategy, creative and management only. Advertising spend is paid separately, directly to the ad platform." },
  { slug: "ai-business-solutions", name: "AI-Assisted Business Solutions", image: hero, short: "Chatbots, FAQ automation and smarter inquiry workflows.",
    items: ["Website chatbot integration", "FAQ automation", "Content workflow automation", "AI-assisted research", "Customer inquiry workflows", "Selected business process automations"],
    note: "Scoped per project. We only deliver automations we've built and tested for your setup." },
];

export const packages = [
  { id: "starter", name: "Starter", price: "From ₹4,999", desc: "For a focused first project.", features: ["1 core deliverable", "2 revision rounds", "5–7 day timeline", "Email support"] },
  { id: "growth", name: "Growth", price: "From ₹14,999", desc: "For brands building momentum.", features: ["Up to 4 deliverables", "3 revision rounds", "2–3 week timeline", "Priority WhatsApp support"], featured: true },
  { id: "professional", name: "Professional", price: "From ₹34,999", desc: "For complete launches.", features: ["Multi-service bundle", "Unlimited minor tweaks for 14 days", "4–6 week timeline", "Dedicated project lead"] },
  { id: "custom", name: "Custom Project", price: "Request a Quote", desc: "Scoped exactly to your needs.", features: ["Tailored scope", "Milestone payments", "Flexible timeline", "Custom support terms"] },
];

export const faqs = [
  { q: "How is pricing decided?", a: "Package prices shown are draft starting points. Every project gets a written quotation after we review your brief, so you know the exact scope and cost before paying anything." },
  { q: "How long does delivery take?", a: "Small creatives take a few days; websites typically take 2–6 weeks. Your quotation includes a timeline for your specific project." },
  { q: "How many revisions do I get?", a: "Each package includes a set number of revision rounds, listed in your quotation. Extra rounds can be added." },
  { q: "How do payments work?", a: "Usually an advance to start and the balance on delivery, or milestone payments for larger projects. Online payments are being set up — until then we share secure payment details with your quotation." },
  { q: "Are there extra costs?", a: "Domains, hosting, paid APIs, stock assets, premium software, ad budgets and payment provider fees are third-party costs and are billed separately." },
  { q: "Do you work with clients outside India?", a: "Yes. We work remotely with clients anywhere; pricing is in Indian Rupees by default." },
];

export const portfolio = [
  { title: "Neon Pulse — Product Reel", category: "Video Editing", image: video },
  { title: "Synthetic Dawn — AI Brand Film", category: "AI Promotional Videos", image: hero },
  { title: "Prism — Identity System", category: "Branding", image: design },
  { title: "Nodeway — SaaS Landing Page", category: "Website Development", image: web },
  { title: "Orbit — Social Growth Kit", category: "Digital Marketing", image: marketing },
  { title: "Core — AI Visual Series", category: "AI Art and Visuals", image: core },
];

export const contact = {
  email: "aevyrixcreationhub@gmail.com",
  phones: ["+91 7029618002", "+91 8538014211", "+91 6284922078"],
  facebook: "https://www.facebook.com/share/14stCJzcjMj/",
  instagram: "https://www.instagram.com/aevyrixcreationhub?dlrf=cDc5NnAyc3c2YnQz",
};
