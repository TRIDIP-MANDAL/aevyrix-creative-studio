import { createFileRoute } from "@tanstack/react-router";
import { TeamGrid } from '@/components/site/TeamGrid';
import { mergeTeamProfiles } from '@/lib/team-data';
import { PageHero } from "@/components/site/Section";
import { FinalCta } from "@/components/site/FinalCta";
import { getPublicContent } from '@/lib/content.functions';

export const Route = createFileRoute("/team")({
  loader: () => getPublicContent(),
  head: () => ({
    meta: [
      { title: "Our Team — Aevyrix Creation Hub" },
      { name: "description", content: "Meet the creative, design and engineering roles behind Aevyrix Creation Hub." },
      { property: "og:title", content: "Our Team — Aevyrix Creation Hub" },
      { property: "og:description", content: "The people behind the work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: Team,
});

function Team() {
  const { team } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Our team" title={<>The people behind <span className="text-gradient">the work</span></>} text="Meet the people behind Aevyrix Creation Hub." />
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <TeamGrid people={mergeTeamProfiles(team)} />
      </section>
      <FinalCta />
    </>
  );
}
