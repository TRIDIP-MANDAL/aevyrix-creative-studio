import { describe, expect, it } from 'vitest';
import { mergeTeamProfiles, officialTeam } from '@/lib/team-data';

describe('Official portrait mapping', () => {
  const ordered = ['sk-istekar-hossein', 'tridip-mandal', 'harsh-kumar-shah', 'archit-rana', 'sarmad-ali'];
  for (const [index, key] of ordered.entries()) {
    it(`preserves uploaded portrait ${index + 1} for ${key}`, () => {
      expect(officialTeam[index]?.key).toBe(key);
      expect(officialTeam[index]?.image.endsWith(`/${key}.jpeg`)).toBe(true);
    });
  }
  it('keeps five official profiles when no owner overrides exist', () => {
    expect(mergeTeamProfiles([])).toHaveLength(5);
  });
  it('updates an official profile without adding a duplicate or changing its position', () => {
    const base = officialTeam[0];
    if (!base) throw new Error('Missing official profile');
    const updated = { ...base, image: 'https://example.com/approved-portrait.jpg' };
    const result = mergeTeamProfiles([updated]);
    expect(result).toHaveLength(5);
    expect(result[0]?.image).toBe(updated.image);
  });
});