import type { TeamProfile } from '@/lib/team-data';
import { UserRound } from 'lucide-react';

export function TeamGrid({ people }: { people: TeamProfile[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {people.map(person => (
        <article key={person.key} className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-cyan/50">
          <div className="aspect-[4/5] overflow-hidden bg-section">
            {person.image ? <img src={person.image} alt={`${person.title}, ${person.category}`} width={768} height={960} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105" /> : <UserRound className="mx-auto mt-16 h-20 w-20 text-muted-foreground" />}
          </div>
          <div className="p-6">
            <h2 className="break-words text-xl font-semibold">{person.title}</h2>
            <p className="mt-2 text-sm text-cyan">{person.category}</p>
            <p className="mt-3 text-sm text-muted-foreground">{person.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}