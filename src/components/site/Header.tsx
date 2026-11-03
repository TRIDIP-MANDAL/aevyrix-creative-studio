import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import mark from "@/assets/mark.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Our Team" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Aevyrix Creation Hub home">
          <img src={mark} alt="" width={36} height={36} className="h-9 w-9 rounded-md" />
          <span className="font-display text-lg font-bold tracking-wide">AEVYRIX<span className="ml-1.5 text-xs font-medium tracking-[0.25em] text-cyan">HUB</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-cyan" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild variant="hero" size="sm" className="rounded-full px-5"><Link to="/start">Start Your Project</Link></Button>
        </div>
        <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2.5 text-muted-foreground hover:text-foreground">{n.label}</Link>
          ))}
          <Button asChild variant="hero" className="mt-3 w-full rounded-full"><Link to="/start" onClick={() => setOpen(false)}>Start Your Project</Link></Button>
        </nav>
      )}
    </header>
  );
}
