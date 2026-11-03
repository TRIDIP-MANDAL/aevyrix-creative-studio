import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import mark from "@/assets/mark.png";
import { services, contact } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-gradient-deep opacity-10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={mark} alt="" width={40} height={40} className="h-10 w-10 rounded-md" loading="lazy" />
            <span className="font-display text-lg font-bold">Aevyrix Creation Hub</span>
          </div>
          <p className="mt-3 text-sm text-gradient font-semibold tracking-wide">Create. Innovate. Elevate.</p>
          <p className="mt-3 text-sm text-muted-foreground">Where artificial intelligence meets human creativity.</p>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="text-muted-foreground hover:text-foreground">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/work" className="hover:text-foreground">Our Work</Link></li>
            <li><Link to="/team" className="hover:text-foreground">Our Team</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/start" className="hover:text-foreground">Start a Project</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan" /><a href={`mailto:${contact.email}`} className="break-all hover:text-foreground">{contact.email}</a></li>
            {contact.phones.map(phone => <li key={phone} className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-cyan" /><a href={`tel:${phone.replaceAll(' ', '')}`} className="hover:text-foreground">{phone}</a></li>)}
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="glass rounded-full p-2 hover:text-cyan"><Facebook className="h-4 w-4" /></a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="glass rounded-full p-2 hover:text-cyan"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Aevyrix Creation Hub. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
