import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-robot.jpg";

export function FinalCta() {
  return (
    <section className="px-5 pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-cyan/30 p-10 text-center md:p-16">
        <img src={hero} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
        <div className="relative">
          <h2 className="text-3xl font-bold md:text-5xl">Your Next Big Idea <span className="text-gradient">Starts Here.</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Tell us what you're building. We'll reply with a clear plan and quotation.</p>
          <Button asChild variant="hero" size="lg" className="mt-8"><Link to="/start">Let's Build Something Extraordinary <ArrowRight /></Link></Button>
        </div>
      </div>
    </section>
  );
}
