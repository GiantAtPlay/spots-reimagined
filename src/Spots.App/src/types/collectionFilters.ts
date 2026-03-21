import type { Card } from '../data/mockCards';

export interface CollectionFilters {
  spotIds: string[];
  trackerIds: string[];
  forTrade: boolean | null;
  rarities: Card['rarity'][];
}

export const defaultCollectionFilters = (): CollectionFilters => ({
  spotIds: [],
  trackerIds: [],
  forTrade: null,
  rarities: [],
});
