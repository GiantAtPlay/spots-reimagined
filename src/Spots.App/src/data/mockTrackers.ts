export interface Tracker {
  id: string;
  name: string;
  setCode?: string;
  setName?: string;
  totalCards: number;
  completedCards: number;
  percentComplete: number;
  isComplete: boolean;
}

export const mockTrackers: Tracker[] = [
  // Complete Trackers (100%)
  {
    id: '1',
    name: 'Kamigawa: Neon Dynasty Rares',
    setCode: 'NEO',
    setName: 'Kamigawa: Neon Dynasty',
    totalCards: 64,
    completedCards: 64,
    percentComplete: 100,
    isComplete: true
  },
  {
    id: '2',
    name: 'Creature - Cat Collection',
    totalCards: 42,
    completedCards: 42,
    percentComplete: 100,
    isComplete: true
  },
  {
    id: '3',
    name: 'Seb McKinnon Artwork',
    totalCards: 28,
    completedCards: 28,
    percentComplete: 100,
    isComplete: true
  },

  // Near Completion (75-99%)
  {
    id: '4',
    name: 'Innistrad: Midnight Hunt',
    setCode: 'MID',
    setName: 'Innistrad: Midnight Hunt',
    totalCards: 277,
    completedCards: 246,
    percentComplete: 89,
    isComplete: false
  },
  {
    id: '5',
    name: 'Theros Beyond Death',
    setCode: 'THB',
    setName: 'Theros Beyond Death',
    totalCards: 254,
    completedCards: 198,
    percentComplete: 78,
    isComplete: false
  },
  {
    id: '6',
    name: 'Planeswalker Collection',
    totalCards: 85,
    completedCards: 72,
    percentComplete: 85,
    isComplete: false
  },
  {
    id: '7',
    name: 'Modern Horizons 2 Mythics',
    setCode: 'MH2',
    setName: 'Modern Horizons 2',
    totalCards: 42,
    completedCards: 35,
    percentComplete: 83,
    isComplete: false
  },

  // In Progress (1-74%)
  {
    id: '8',
    name: 'Zendikar Rising',
    setCode: 'ZNR',
    setName: 'Zendikar Rising',
    totalCards: 280,
    completedCards: 126,
    percentComplete: 45,
    isComplete: false
  },
  {
    id: '9',
    name: 'Ravnica Allegiance',
    setCode: 'RNA',
    setName: 'Ravnica Allegiance',
    totalCards: 259,
    completedCards: 88,
    percentComplete: 34,
    isComplete: false
  },
  {
    id: '10',
    name: 'Lightning Bolt Collection',
    totalCards: 15,
    completedCards: 9,
    percentComplete: 60,
    isComplete: false
  },
  {
    id: '11',
    name: 'Dominaria United Rares',
    setCode: 'DMU',
    setName: 'Dominaria United',
    totalCards: 60,
    completedCards: 37,
    percentComplete: 62,
    isComplete: false
  },
  {
    id: '12',
    name: 'Legendary Creatures',
    totalCards: 156,
    completedCards: 42,
    percentComplete: 27,
    isComplete: false
  },
  {
    id: '13',
    name: 'Streets of New Capenna',
    setCode: 'SNC',
    setName: 'Streets of New Capenna',
    totalCards: 281,
    completedCards: 51,
    percentComplete: 18,
    isComplete: false
  },
  {
    id: '14',
    name: 'Rebecca Guay Artwork',
    totalCards: 32,
    completedCards: 12,
    percentComplete: 38,
    isComplete: false
  },
  {
    id: '15',
    name: 'The Brothers\' War',
    setCode: 'BRO',
    setName: 'The Brothers\' War',
    totalCards: 287,
    completedCards: 203,
    percentComplete: 71,
    isComplete: false
  }
];
