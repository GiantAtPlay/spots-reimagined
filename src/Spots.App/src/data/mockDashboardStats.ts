import { mockCards, type Card, mockSets } from './mockCards';
import { mockTrackers, type Tracker } from './mockTrackers';

export interface ColorStat {
  color: string;
  label: string;
  count: number;
  total: number;
  gradient: string;
}

export interface RarityStat {
  rarity: 'common' | 'uncommon' | 'rare' | 'mythic';
  label: string;
  count: number;
}

export interface ValuableCard {
  id: string;
  name: string;
  setCode: string;
  setName: string;
  price: number;
  isFoil: boolean;
}

export interface DashboardStats {
  totalCards: number;
  totalUniqueCards: number;
  collectionValue: number;
  setsComplete: number;
  totalSets: number;
  trackersComplete: number;
  totalTrackers: number;
  colorDistribution: ColorStat[];
  rarityDistribution: RarityStat[];
  topValuableCards: ValuableCard[];
}

const colorGradients: Record<string, string> = {
  white: 'linear-gradient(90deg, #f6d365, #fda085)',
  blue: 'linear-gradient(90deg, #667eea, #764ba2)',
  black: 'linear-gradient(90deg, #f093fb, #f5576c)',
  red: 'linear-gradient(90deg, #fa709a, #fee140)',
  green: 'linear-gradient(90deg, #30cfd0, #330867)',
  colourless: 'linear-gradient(90deg, #9ca3af, #6b7280)',
  gold: 'linear-gradient(90deg, #f59e0b, #d97706)',
  land: 'linear-gradient(90deg, #84cc16, #65a30d)',
};

const colorLabels: Record<string, string> = {
  white: 'White',
  blue: 'Blue',
  black: 'Black',
  red: 'Red',
  green: 'Green',
  colourless: 'Colorless',
  gold: 'Multicolor',
  land: 'Land',
};

const rarityLabels: Record<string, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  mythic: 'Mythic',
};

function calculateTotalCards(): number {
  return mockCards.reduce((sum, card) => sum + card.nonFoilCount + card.foilCount, 0);
}

function calculateTotalUniqueCards(): number {
  return mockCards.filter(card => card.nonFoilCount > 0 || card.foilCount > 0).length;
}

function calculateCollectionValue(): number {
  return mockCards.reduce((sum, card) => {
    const cardValue = card.price || 0;
    return sum + (cardValue * card.nonFoilCount) + (cardValue * card.foilCount);
  }, 0);
}

function calculateSetsComplete(): number {
  // A set is complete if we have at least one tracker for it at 100%
  const completeSets = new Set<string>();
  
  mockTrackers.forEach(tracker => {
    if (tracker.isComplete && tracker.setCode) {
      completeSets.add(tracker.setCode);
    }
  });
  
  return completeSets.size;
}

function calculateColorDistribution(): ColorStat[] {
  const totalCards = calculateTotalCards();
  const colorCounts: Record<string, number> = {
    white: 0,
    blue: 0,
    black: 0,
    red: 0,
    green: 0,
    colourless: 0,
    gold: 0,
    land: 0,
  };

  mockCards.forEach(card => {
    const count = card.nonFoilCount + card.foilCount;
    colorCounts[card.colour] = (colorCounts[card.colour] || 0) + count;
  });

  return Object.entries(colorCounts).map(([color, count]) => ({
    color,
    label: colorLabels[color] || color,
    count,
    total: totalCards,
    gradient: colorGradients[color] || colorGradients.colourless,
  }));
}

function calculateRarityDistribution(): RarityStat[] {
  const rarityCounts: Record<string, number> = {
    common: 0,
    uncommon: 0,
    rare: 0,
    mythic: 0,
  };

  mockCards.forEach(card => {
    const count = card.nonFoilCount + card.foilCount;
    rarityCounts[card.rarity] = (rarityCounts[card.rarity] || 0) + count;
  });

  return Object.entries(rarityCounts).map(([rarity, count]) => ({
    rarity: rarity as 'common' | 'uncommon' | 'rare' | 'mythic',
    label: rarityLabels[rarity] || rarity,
    count,
  }));
}

function calculateTopValuableCards(): ValuableCard[] {
  // Create entries for each card considering foil and non-foil separately
  const allCardEntries: ValuableCard[] = [];

  mockCards.forEach(card => {
    if (card.price && card.price > 0) {
      // Add non-foil entry if we have any
      if (card.nonFoilCount > 0) {
        allCardEntries.push({
          id: `${card.id}-nonfoil`,
          name: card.name,
          setCode: card.setCode,
          setName: card.setName,
          price: card.price,
          isFoil: false,
        });
      }
      
      // Add foil entry if we have any
      if (card.foilCount > 0) {
        allCardEntries.push({
          id: `${card.id}-foil`,
          name: card.name,
          setCode: card.setCode,
          setName: card.setName,
          price: card.price,
          isFoil: true,
        });
      }
    }
  });

  // Sort by price descending and take top 10
  return allCardEntries
    .sort((a, b) => b.price - a.price)
    .slice(0, 10);
}

export function calculateDashboardStats(): DashboardStats {
  return {
    totalCards: calculateTotalCards(),
    totalUniqueCards: calculateTotalUniqueCards(),
    collectionValue: calculateCollectionValue(),
    setsComplete: calculateSetsComplete(),
    totalSets: mockSets.length,
    trackersComplete: mockTrackers.filter(t => t.isComplete).length,
    totalTrackers: mockTrackers.length,
    colorDistribution: calculateColorDistribution(),
    rarityDistribution: calculateRarityDistribution(),
    topValuableCards: calculateTopValuableCards(),
  };
}

// Export the calculated stats
export const mockDashboardStats = calculateDashboardStats();
