export type SpotType = 'place' | 'person' | 'binder' | 'deck' | 'box' | 'other';

export const SPOT_TYPES: { value: SpotType; label: string }[] = [
  { value: 'place', label: 'Place' },
  { value: 'person', label: 'Person' },
  { value: 'binder', label: 'Binder' },
  { value: 'deck', label: 'Deck' },
  { value: 'box', label: 'Box' },
  { value: 'other', label: 'Other' },
];

export const SPOT_COLOURS: string[] = [
  '#9b4dca',
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#06b6d4',
  '#ec4899',
  '#f97316',
  '#84cc16',
  '#6366f1',
  '#14b8a6',
  '#94a3b8',
];

export interface Spot {
  id: string;
  name: string;
  type: SpotType;
  colour: string;
  description?: string;
  parentId?: string;
  trackerId?: string;
  createdAt: string;
}

export const mockSpots: Spot[] = [
  {
    id: '1',
    name: 'Office',
    type: 'place',
    colour: '#3b82f6',
    description: 'Home office location',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Main Shelf',
    type: 'place',
    colour: '#6366f1',
    description: 'Primary storage shelf',
    parentId: '1',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Trade Binder',
    type: 'binder',
    colour: '#f59e0b',
    description: 'Cards available for trading',
    parentId: '2',
    createdAt: '2024-01-03',
  },
  {
    id: '4',
    name: 'Standard Deck Box',
    type: 'deck',
    colour: '#10b981',
    description: 'Current standard deck',
    parentId: '1',
    trackerId: '1',
    createdAt: '2024-01-04',
  },
  {
    id: '5',
    name: 'Bulk Box',
    type: 'box',
    colour: '#94a3b8',
    description: 'Bulk common/uncommon storage',
    parentId: '2',
    createdAt: '2024-01-05',
  },
  {
    id: '6',
    name: 'Friends Collection',
    type: 'person',
    colour: '#ec4899',
    description: 'Cards stored for a friend',
    createdAt: '2024-01-06',
  },
  {
    id: '7',
    name: 'Commander Shelf',
    type: 'place',
    colour: '#ef4444',
    description: 'Shelf for commander decks',
    parentId: '1',
    createdAt: '2024-01-07',
  },
  {
    id: '8',
    name: 'Jund Deck',
    type: 'deck',
    colour: '#f97316',
    description: 'Jund commander deck',
    parentId: '7',
    trackerId: '4',
    createdAt: '2024-01-08',
  },
];
