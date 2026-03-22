export interface TrackerFilters {
  rarities: Array<'common' | 'uncommon' | 'rare' | 'mythic'>;
  status: 'all' | 'collected' | 'missing';
  foilPreference: 'all' | 'non-foil' | 'foil';
}

export function defaultTrackerFilters(): TrackerFilters {
  return { rarities: [], status: 'all', foilPreference: 'all' };
}
