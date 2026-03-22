import type { Card } from './mockCards';

export type FoilPreference = 'non-foil' | 'foil' | 'any';
export type TrackerType = 'set' | 'custom';

export interface TrackerCard {
  scryfallId: string;
  name: string;
  setCode: string;
  setName: string;
  collectorNumber: string;
  imageUrl?: string;
  colour: Card['colour'];
  rarity: Card['rarity'];
  foilPreference: FoilPreference;
  isTracked: boolean;
  isCollected: boolean;
}

export interface Tracker {
  id: string;
  name: string;
  type: TrackerType;
  foilPreference: FoilPreference;
  setCode?: string;
  setName?: string;
  cards: TrackerCard[];
  createdAt: string;
}

export interface TrackerStats {
  totalCards: number;
  collectedCards: number;
  percentComplete: number;
  isComplete: boolean;
}

export function getTrackerStats(tracker: Tracker): TrackerStats {
  const tracked = tracker.cards.filter((c) => c.isTracked);
  const totalCards = tracked.length;
  const collectedCards = tracked.filter((c) => c.isCollected).length;
  const percentComplete = totalCards > 0 ? Math.round((collectedCards / totalCards) * 100) : 0;
  return {
    totalCards,
    collectedCards,
    percentComplete,
    isComplete: totalCards > 0 && collectedCards === totalCards,
  };
}

// ─── Mock Card Helpers ────────────────────────────────────────────────────────

function makeCard(
  id: string,
  name: string,
  setCode: string,
  setName: string,
  num: string,
  colour: Card['colour'],
  rarity: Card['rarity'],
  imageUrl: string | undefined,
  foilPreference: FoilPreference,
  isTracked: boolean,
  isCollected: boolean,
): TrackerCard {
  return { scryfallId: id, name, setCode, setName, collectorNumber: num, imageUrl, colour, rarity, foilPreference, isTracked, isCollected };
}

// ─── MID — Innistrad: Midnight Hunt (Full Set) ────────────────────────────────

const midCards: TrackerCard[] = [
  makeCard('mid-001', 'Tovolar, Dire Overlord', 'MID', 'Innistrad: Midnight Hunt', '246', 'red', 'mythic', 'https://cards.scryfall.io/normal/front/7/f/7fa73b80-4b83-4f22-8774-5b8aea39b769.jpg', 'non-foil', true, true),
  makeCard('mid-002', 'Wrenn and Seven', 'MID', 'Innistrad: Midnight Hunt', '208', 'green', 'mythic', 'https://cards.scryfall.io/normal/front/b/d/bd8fa4a1-1928-4b47-9f0e-ce6d1c6d615d.jpg', 'non-foil', true, true),
  makeCard('mid-003', 'Teferi, Who Slows the Sunset', 'MID', 'Innistrad: Midnight Hunt', '245', 'gold', 'mythic', 'https://cards.scryfall.io/normal/front/6/2/62df35db-b885-4026-9a9c-73c1eb16c4e2.jpg', 'non-foil', true, true),
  makeCard('mid-004', 'Intrepid Adversary', 'MID', 'Innistrad: Midnight Hunt', '24', 'white', 'mythic', undefined, 'non-foil', true, false),
  makeCard('mid-005', 'Lier, Disciple of the Drowned', 'MID', 'Innistrad: Midnight Hunt', '60', 'blue', 'mythic', undefined, 'non-foil', true, false),
  makeCard('mid-006', 'Champion of the Perished', 'MID', 'Innistrad: Midnight Hunt', '91', 'black', 'mythic', undefined, 'non-foil', true, true),
  makeCard('mid-007', 'Sunset Revelry', 'MID', 'Innistrad: Midnight Hunt', '38', 'white', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-008', 'Patrician Geist', 'MID', 'Innistrad: Midnight Hunt', '67', 'blue', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-009', 'Tainted Adversary', 'MID', 'Innistrad: Midnight Hunt', '117', 'black', 'rare', undefined, 'non-foil', true, false),
  makeCard('mid-010', 'Moonveil Regent', 'MID', 'Innistrad: Midnight Hunt', '154', 'red', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-011', 'Unnatural Growth', 'MID', 'Innistrad: Midnight Hunt', '206', 'green', 'rare', undefined, 'non-foil', true, false),
  makeCard('mid-012', 'Sigardian Savior', 'MID', 'Innistrad: Midnight Hunt', '37', 'white', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-013', 'Memory Deluge', 'MID', 'Innistrad: Midnight Hunt', '62', 'blue', 'rare', undefined, 'non-foil', true, false),
  makeCard('mid-014', 'Curse of Leeches', 'MID', 'Innistrad: Midnight Hunt', '96', 'black', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-015', 'Burn Down the House', 'MID', 'Innistrad: Midnight Hunt', '131', 'red', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-016', 'Outland Liberator', 'MID', 'Innistrad: Midnight Hunt', '188', 'green', 'rare', undefined, 'non-foil', true, false),
  makeCard('mid-017', 'Morbid Opportunist', 'MID', 'Innistrad: Midnight Hunt', '107', 'black', 'rare', undefined, 'non-foil', true, false),
  makeCard('mid-018', 'Tovolar\'s Huntmaster', 'MID', 'Innistrad: Midnight Hunt', '165', 'red', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-019', 'Augur of Autumn', 'MID', 'Innistrad: Midnight Hunt', '171', 'green', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-020', 'Graveyard Trespasser', 'MID', 'Innistrad: Midnight Hunt', '104', 'black', 'rare', undefined, 'non-foil', true, false),
  makeCard('mid-021', 'Cathar Commando', 'MID', 'Innistrad: Midnight Hunt', '9', 'white', 'uncommon', undefined, 'non-foil', true, true),
  makeCard('mid-022', 'Delver of Secrets', 'MID', 'Innistrad: Midnight Hunt', '47', 'blue', 'uncommon', undefined, 'non-foil', true, true),
  makeCard('mid-023', 'Eaten Alive', 'MID', 'Innistrad: Midnight Hunt', '98', 'black', 'uncommon', undefined, 'non-foil', true, true),
  makeCard('mid-024', 'Flame Channeler', 'MID', 'Innistrad: Midnight Hunt', '136', 'red', 'uncommon', undefined, 'non-foil', true, false),
  makeCard('mid-025', 'Briarbridge Tracker', 'MID', 'Innistrad: Midnight Hunt', '174', 'green', 'uncommon', undefined, 'non-foil', true, false),
  makeCard('mid-026', 'Devoted Grafkeeper', 'MID', 'Innistrad: Midnight Hunt', '218', 'gold', 'uncommon', undefined, 'non-foil', false, false),
  makeCard('mid-027', 'Arlinn, the Pack\'s Hope', 'MID', 'Innistrad: Midnight Hunt', '211', 'gold', 'mythic', undefined, 'non-foil', true, false),
  makeCard('mid-028', 'Cemetery Illuminator', 'MID', 'Innistrad: Midnight Hunt', '214', 'gold', 'rare', undefined, 'non-foil', true, true),
  makeCard('mid-029', 'Celestus Sanctifier', 'MID', 'Innistrad: Midnight Hunt', '11', 'white', 'common', undefined, 'non-foil', true, true),
  makeCard('mid-030', 'Duel for Dominance', 'MID', 'Innistrad: Midnight Hunt', '179', 'green', 'common', undefined, 'non-foil', true, true),
];

// ─── MID — Innistrad: Midnight Hunt (Foil Mythics) ────────────────────────────

const midFoilMythics: TrackerCard[] = midCards
  .filter((c) => c.rarity === 'mythic')
  .map((c) => ({ ...c, scryfallId: c.scryfallId + '-foil', foilPreference: 'foil' as FoilPreference, isCollected: c.scryfallId === 'mid-001' || c.scryfallId === 'mid-002' }));

// ─── NEO — Kamigawa: Neon Dynasty (Full Set) ─────────────────────────────────

const neoCards: TrackerCard[] = [
  makeCard('neo-001', 'Tezzeret, Betrayer of Flesh', 'NEO', 'Kamigawa: Neon Dynasty', '70', 'blue', 'mythic', 'https://cards.scryfall.io/normal/front/9/a/9a46efef-24db-4f41-a28b-e7e02cc82f72.jpg', 'non-foil', true, true),
  makeCard('neo-002', 'The Wandering Emperor', 'NEO', 'Kamigawa: Neon Dynasty', '42', 'white', 'mythic', 'https://cards.scryfall.io/normal/front/8/c/8c39f9b4-02b9-4d44-b8d6-4fd02ebbb0c5.jpg', 'non-foil', true, true),
  makeCard('neo-003', 'Jin-Gitaxias, Progress Tyrant', 'NEO', 'Kamigawa: Neon Dynasty', '62', 'blue', 'mythic', 'https://cards.scryfall.io/normal/front/c/e/ce22e4b5-c63e-4ce3-9ded-3e66e5e98918.jpg', 'non-foil', true, true),
  makeCard('neo-004', 'Kaito Shizuki', 'NEO', 'Kamigawa: Neon Dynasty', '226', 'gold', 'mythic', undefined, 'non-foil', true, true),
  makeCard('neo-005', 'Hidetsugu Consumes All', 'NEO', 'Kamigawa: Neon Dynasty', '221', 'gold', 'mythic', undefined, 'non-foil', true, false),
  makeCard('neo-006', 'Farewell', 'NEO', 'Kamigawa: Neon Dynasty', '13', 'white', 'rare', undefined, 'non-foil', true, true),
  makeCard('neo-007', 'Tameshi, Reality Architect', 'NEO', 'Kamigawa: Neon Dynasty', '75', 'blue', 'rare', undefined, 'non-foil', true, true),
  makeCard('neo-008', 'Junji, the Midnight Sky', 'NEO', 'Kamigawa: Neon Dynasty', '107', 'black', 'mythic', undefined, 'non-foil', true, true),
  makeCard('neo-009', 'Invoke Calamity', 'NEO', 'Kamigawa: Neon Dynasty', '143', 'red', 'rare', undefined, 'non-foil', true, false),
  makeCard('neo-010', 'Boseiju, Who Endures', 'NEO', 'Kamigawa: Neon Dynasty', '264', 'land', 'rare', undefined, 'non-foil', true, true),
  makeCard('neo-011', 'Takenuma, Abandoned Mire', 'NEO', 'Kamigawa: Neon Dynasty', '278', 'land', 'rare', undefined, 'non-foil', true, true),
  makeCard('neo-012', 'Eiganjo, Seat of the Empire', 'NEO', 'Kamigawa: Neon Dynasty', '268', 'land', 'rare', undefined, 'non-foil', true, false),
  makeCard('neo-013', 'Light-Paws, Emperor\'s Voice', 'NEO', 'Kamigawa: Neon Dynasty', '19', 'white', 'rare', undefined, 'non-foil', true, true),
  makeCard('neo-014', 'Spirited Companion', 'NEO', 'Kamigawa: Neon Dynasty', '39', 'white', 'common', undefined, 'non-foil', true, true),
  makeCard('neo-015', 'Colossal Skyturtle', 'NEO', 'Kamigawa: Neon Dynasty', '218', 'gold', 'uncommon', undefined, 'non-foil', true, true),
  makeCard('neo-016', 'Neon Dynasty full art basic island', 'NEO', 'Kamigawa: Neon Dynasty', '285', 'land', 'common', undefined, 'non-foil', false, false),
];

// ─── MH2 — Modern Horizons 2 (Custom — Lightning Matters) ────────────────────

const mh2LightningCards: TrackerCard[] = [
  makeCard('mh2-001', 'Lightning Bolt', 'MH2', 'Modern Horizons 2', '166', 'red', 'uncommon', 'https://cards.scryfall.io/normal/front/6/4/641b3de6-9b87-4b80-96c4-58249d8800a2.jpg', 'non-foil', true, true),
  makeCard('mh2-002', 'Ragavan, Nimble Pilferer', 'MH2', 'Modern Horizons 2', '138', 'red', 'mythic', 'https://cards.scryfall.io/normal/front/a/2/a2a55380-9571-4a0f-9b67-4f99e23a0528.jpg', 'non-foil', true, true),
  makeCard('mh2-003', 'Unholy Heat', 'MH2', 'Modern Horizons 2', '144', 'red', 'uncommon', undefined, 'non-foil', true, true),
  makeCard('mh2-004', 'Blazing Rootwalla', 'MH2', 'Modern Horizons 2', '116', 'red', 'common', undefined, 'non-foil', true, false),
  makeCard('mh2-005', 'Dragon\'s Rage Channeler', 'MH2', 'Modern Horizons 2', '121', 'red', 'uncommon', undefined, 'non-foil', true, true),
  makeCard('mh2-006', 'Thundering Djinn', 'MH2', 'Modern Horizons 2', '143', 'red', 'uncommon', undefined, 'non-foil', true, false),
  makeCard('mh2-007', 'Magmatic Channeler', 'MH2', 'Modern Horizons 2', '130', 'red', 'rare', undefined, 'non-foil', true, true),
  makeCard('mh2-008', 'Fury', 'MH2', 'Modern Horizons 2', '126', 'red', 'mythic', undefined, 'non-foil', true, false),
];

// ─── Custom — Seb McKinnon Artwork ────────────────────────────────────────────

const sebMckinnonCards: TrackerCard[] = [
  makeCard('seb-001', 'Shadowspear', 'THB', 'Theros Beyond Death', '236', 'colourless', 'rare', 'https://cards.scryfall.io/normal/front/f/7/f7b26bcc-8b76-4a8e-97b2-dd02bcf2dc0a.jpg', 'any', true, true),
  makeCard('seb-002', 'Elspeth Conquers Death', 'THB', 'Theros Beyond Death', '13', 'white', 'rare', 'https://cards.scryfall.io/normal/front/e/3/e31a49e1-e7b6-4c88-8e93-7d15c0fee4aa.jpg', 'any', true, true),
  makeCard('seb-003', 'Heliod, Sun-Crowned', 'THB', 'Theros Beyond Death', '18', 'white', 'mythic', 'https://cards.scryfall.io/normal/front/0/b/0bfb31e3-cf6e-476e-83bb-ef41a3cba1b5.jpg', 'any', true, true),
  makeCard('seb-004', 'Elspeth, Sun\'s Nemesis', 'THB', 'Theros Beyond Death', '14', 'white', 'mythic', undefined, 'any', true, false),
  makeCard('seb-005', 'Daxos, Blessed by the Sun', 'THB', 'Theros Beyond Death', '9', 'white', 'uncommon', undefined, 'any', true, true),
  makeCard('seb-006', 'Daybreak Chimera', 'THB', 'Theros Beyond Death', '8', 'white', 'common', undefined, 'any', true, true),
  makeCard('seb-007', 'Soul-Guide Lantern', 'THB', 'Theros Beyond Death', '237', 'colourless', 'common', undefined, 'any', true, false),
  makeCard('seb-008', 'Transcendent Envoy', 'THB', 'Theros Beyond Death', '37', 'white', 'common', undefined, 'any', true, true),
];

// ─── Custom — Legendary Creatures ─────────────────────────────────────────────

const legendaryCards: TrackerCard[] = [
  makeCard('leg-001', 'Atraxa, Praetors\' Voice', '2X2', 'Double Masters 2022', '196', 'gold', 'mythic', 'https://cards.scryfall.io/normal/front/5/6/5604a026-c9c0-4028-8ec2-8f50b0a02571.jpg', 'non-foil', true, true),
  makeCard('leg-002', 'Ur-Dragon, the', 'C17', 'Commander 2017', '48', 'gold', 'mythic', 'https://cards.scryfall.io/normal/front/b/0/b006ea74-7ee5-4e1d-b3b8-65dae7c5ff6c.jpg', 'non-foil', true, false),
  makeCard('leg-003', 'Breya, Etherium Shaper', 'C16', 'Commander 2016', '35', 'gold', 'mythic', undefined, 'non-foil', true, true),
  makeCard('leg-004', 'Omnath, Locus of Creation', 'ZNR', 'Zendikar Rising', '232', 'gold', 'mythic', undefined, 'non-foil', true, false),
  makeCard('leg-005', 'Kenrith, the Returned King', 'ELD', 'Throne of Eldraine', '303', 'gold', 'mythic', undefined, 'non-foil', true, true),
  makeCard('leg-006', 'Najeela, the Blade-Blossom', 'BBD', 'Battlebond', '20', 'gold', 'rare', undefined, 'non-foil', true, true),
  makeCard('leg-007', 'Edgar Markov', 'C17', 'Commander 2017', '5', 'gold', 'mythic', undefined, 'non-foil', true, false),
  makeCard('leg-008', 'The Ur-Dragon', 'C17', 'Commander 2017', '48', 'gold', 'mythic', undefined, 'non-foil', true, true),
  makeCard('leg-009', 'Yuriko, the Tiger\'s Shadow', 'C18', 'Commander 2018', '4', 'gold', 'rare', undefined, 'non-foil', true, false),
  makeCard('leg-010', 'Nekusar, the Mindrazer', 'C13', 'Commander 2013', '198', 'gold', 'mythic', undefined, 'non-foil', true, true),
];

// ─── Mock Trackers ─────────────────────────────────────────────────────────────

export const mockTrackers: Tracker[] = [
  {
    id: '1',
    name: 'Innistrad: Midnight Hunt',
    type: 'set',
    foilPreference: 'non-foil',
    setCode: 'MID',
    setName: 'Innistrad: Midnight Hunt',
    cards: midCards,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'MID Foil Mythics',
    type: 'custom',
    foilPreference: 'foil',
    setCode: 'MID',
    setName: 'Innistrad: Midnight Hunt',
    cards: midFoilMythics,
    createdAt: '2024-02-03',
  },
  {
    id: '3',
    name: 'Kamigawa: Neon Dynasty',
    type: 'set',
    foilPreference: 'non-foil',
    setCode: 'NEO',
    setName: 'Kamigawa: Neon Dynasty',
    cards: neoCards,
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Lightning Matters (MH2)',
    type: 'custom',
    foilPreference: 'non-foil',
    setCode: 'MH2',
    setName: 'Modern Horizons 2',
    cards: mh2LightningCards,
    createdAt: '2024-03-10',
  },
  {
    id: '5',
    name: 'Seb McKinnon Artwork',
    type: 'custom',
    foilPreference: 'any',
    cards: sebMckinnonCards,
    createdAt: '2024-02-28',
  },
  {
    id: '6',
    name: 'Legendary Creature Collection',
    type: 'custom',
    foilPreference: 'non-foil',
    cards: legendaryCards,
    createdAt: '2024-04-01',
  },
];
