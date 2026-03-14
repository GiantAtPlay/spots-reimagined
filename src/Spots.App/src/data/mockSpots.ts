export interface Spot {
  id: string;
  name: string;
  description?: string;
}

export const mockSpots: Spot[] = [
  {
    id: '1',
    name: 'Main Box',
    description: 'Primary storage for collection'
  },
  {
    id: '2',
    name: 'Trade Binder',
    description: 'Cards available for trading'
  },
  {
    id: '3',
    name: 'Deck Box',
    description: 'Cards currently in decks'
  },
  {
    id: '4',
    name: 'Bulk',
    description: 'Bulk common/uncommon storage'
  },
];
