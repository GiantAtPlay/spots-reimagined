import { ref } from 'vue';
import type { Card } from '../data/mockCards';

const SCRYFALL_API = 'https://api.scryfall.com/cards/search';

interface ScryfallCard {
  id: string;
  name: string;
  set: string;
  set_name: string;
  colors: string[];
  color_identity: string[];
  rarity: string;
  type_line: string;
  image_uris?: {
    small?: string;
    normal?: string;
    large?: string;
  };
  card_faces?: Array<{
    image_uris?: {
      normal?: string;
    };
  }>;
  prices?: {
    usd?: string | null;
    usd_foil?: string | null;
  };
}

interface ScryfallResponse {
  object: string;
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: ScryfallCard[];
}

type CardColour = Card['colour'];

function mapColour(colors: string[], colorIdentity: string[]): CardColour {
  const source = colors.length > 0 ? colors : colorIdentity;
  if (source.length === 0) return 'colourless';
  if (source.length > 1) return 'gold';
  const [c] = source;
  const map: Record<string, CardColour> = {
    W: 'white',
    U: 'blue',
    B: 'black',
    R: 'red',
    G: 'green',
  };
  return map[c] ?? 'colourless';
}

function mapRarity(rarity: string): Card['rarity'] {
  const valid = ['common', 'uncommon', 'rare', 'mythic'] as const;
  return (valid as readonly string[]).includes(rarity)
    ? (rarity as Card['rarity'])
    : 'common';
}

function mapScryfallCard(sc: ScryfallCard): Card {
  const imageUrl =
    sc.image_uris?.normal ??
    sc.card_faces?.[0]?.image_uris?.normal ??
    undefined;

  // Detect land by type line before colour mapping
  const isLand = sc.type_line?.toLowerCase().includes('land') ?? false;

  const colour: CardColour = isLand
    ? 'land'
    : mapColour(sc.colors ?? [], sc.color_identity ?? []);

  return {
    id: sc.id,
    name: sc.name,
    setCode: sc.set.toUpperCase(),
    setName: sc.set_name,
    colour,
    rarity: mapRarity(sc.rarity),
    type: sc.type_line ?? '',
    imageUrl,
    price: sc.prices?.usd ? parseFloat(sc.prices.usd) : undefined,
    nonFoilCount: 0,
    foilCount: 0,
  };
}

export function useScryfall() {
  const cards = ref<Card[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalCards = ref(0);
  const hasMore = ref(false);
  const currentQuery = ref('');

  async function searchCards(query: string, page = 1): Promise<void> {
    if (!query.trim()) return;

    loading.value = true;
    error.value = null;
    currentQuery.value = query;

    try {
      const params = new URLSearchParams({
        q: query,
        unique: 'prints',
        page: String(page),
      });

      const response = await fetch(`${SCRYFALL_API}?${params}`);

      if (!response.ok) {
        if (response.status === 404) {
          // Scryfall returns 404 when no cards match — treat as empty result
          cards.value = [];
          totalCards.value = 0;
          hasMore.value = false;
          return;
        }
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.details ?? `Request failed (${response.status})`);
      }

      const data: ScryfallResponse = await response.json();
      cards.value = data.data.map(mapScryfallCard);
      totalCards.value = data.total_cards;
      hasMore.value = data.has_more;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unexpected error occurred.';
      cards.value = [];
      totalCards.value = 0;
      hasMore.value = false;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    cards.value = [];
    loading.value = false;
    error.value = null;
    totalCards.value = 0;
    hasMore.value = false;
    currentQuery.value = '';
  }

  return {
    cards,
    loading,
    error,
    totalCards,
    hasMore,
    currentQuery,
    searchCards,
    reset,
  };
}
