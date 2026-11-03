import archit from '@/assets/team/archit-rana.jpeg';
import harsh from '@/assets/team/harsh-kumar-shah.jpeg';
import istekar from '@/assets/team/sk-istekar-hossein.jpeg';
import sarmad from '@/assets/team/sarmad-ali.jpeg';
import tridip from '@/assets/team/tridip-mandal.jpeg';

export type TeamProfile = { key: string; title: string; category: string; description: string; image: string };

export const officialTeam: TeamProfile[] = [
  { key: 'sk-istekar-hossein', title: 'SK ISTEKAR HOSSEIN', category: 'Chief Executive Officer (CEO)', image: istekar, description: "Leads the agency's vision, business strategy, overall operations, and organizational growth." },
  { key: 'tridip-mandal', title: 'Tridip Mandal', category: 'Chief Technology Officer (CTO)', image: tridip, description: 'Oversees technology strategy, technical development, digital solutions, and engineering initiatives.' },
  { key: 'harsh-kumar-shah', title: 'Harsh Kumar Shah', category: 'Digital Marketing Director', image: harsh, description: 'Leads digital marketing strategy, campaign planning, brand visibility, and digital audience engagement.' },
  { key: 'archit-rana', title: 'Archit Rana', category: 'Editing Director', image: archit, description: 'Oversees video editing, visual storytelling, multimedia production, and editing quality.' },
  { key: 'sarmad-ali', title: 'Sarmad Ali', category: 'Business Development Manager', image: sarmad, description: 'Focuses on business development, client communication, partnership opportunities, and project enquiries.' },
];

export function mergeTeamProfiles(published: TeamProfile[]): TeamProfile[] {
  const matches = (a: TeamProfile, b: TeamProfile) => a.key === b.key || a.title.toLowerCase() === b.title.toLowerCase();
  return [
    ...officialTeam.map(person => published.find(row => matches(person, row)) ?? person),
    ...published.filter(row => !officialTeam.some(person => matches(person, row))),
  ];
}