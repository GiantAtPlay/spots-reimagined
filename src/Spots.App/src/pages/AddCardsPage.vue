<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useFlyoutStore } from '../stores/flyout';
import { useScryfall } from '../composables/useScryfall';
import CardTile from '../components/collection/CardTile.vue';
import ViewControls from '../components/collection/ViewControls.vue';
import Pagination from '../components/collection/Pagination.vue';
import DataTable from '../components/DataTable.vue';
import CardImage from '../components/CardImage.vue';
import Button from '../components/Button.vue';
import Icon from '../components/Icon.vue';
import type { Card } from '../data/mockCards';

const flyoutStore = useFlyoutStore();
const { cards, loading, error, totalCards, searchCards } = useScryfall();

const viewMode = ref<'grid' | 'list'>('grid');
const gridSize = ref(5);
const currentPage = ref(1);
const searchInput = ref('');

// Scryfall returns 175 cards per page
const SCRYFALL_PAGE_SIZE = 175;

const totalPages = computed(() =>
  totalCards.value > 0 ? Math.ceil(totalCards.value / SCRYFALL_PAGE_SIZE) : 0
);

const hasResults = computed(() => cards.value.length > 0);
const hasSearched = ref(false);

const columns = [
  { key: 'card', label: 'Card' },
  { key: 'setCode', label: 'Set' },
  { key: 'type', label: 'Type' },
  { key: 'rarity', label: 'Rarity' },
  { key: 'actions', label: 'Actions', align: 'right' as const },
];

const openSearchGuide = () => {
  flyoutStore.open({
    title: 'Search Syntax Guide',
    component: 'ScryfallSearchGuide',
    props: {},
  });
};

const handleSearch = async () => {
  if (!searchInput.value.trim()) return;
  currentPage.value = 1;
  hasSearched.value = true;
  await searchCards(searchInput.value, 1);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') handleSearch();
};

// When page changes, re-run the search for the new page
watch(currentPage, async (page) => {
  if (hasSearched.value && searchInput.value.trim()) {
    await searchCards(searchInput.value, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

const handleAddNonFoil = (card: Card) => {
  console.log('Add non-foil to collection:', card.id, card.name);
};

const handleAddFoil = (card: Card) => {
  console.log('Add foil to collection:', card.id, card.name);
};

// Search all unique prints of a specific card by exact name
const handleSearchPrints = async (card: Card) => {
  const query = `!"${card.name}"`;
  searchInput.value = query;
  currentPage.value = 1;
  hasSearched.value = true;
  await searchCards(query, 1);
};

const resultsStart = computed(() =>
  totalCards.value > 0 ? (currentPage.value - 1) * SCRYFALL_PAGE_SIZE + 1 : 0
);
const resultsEnd = computed(() =>
  Math.min(currentPage.value * SCRYFALL_PAGE_SIZE, totalCards.value)
);
</script>

<template>
  <div class="add-cards-view">
    <!-- Search bar row -->
    <div class="search-row">
      <div class="search-wrapper">
        <Icon icon="search" class="search-icon" />
        <input
          v-model="searchInput"
          type="text"
          class="search-input"
          placeholder="Search Scryfall — e.g. t:creature c:red r:rare"
          @keydown="handleKeydown"
        />
      </div>
      <Button variant="primary" size="default" icon="search" :bounce="false" @click="handleSearch">
        Search
      </Button>
      <button class="info-btn" title="Search syntax guide" @click="openSearchGuide">
        <Icon icon="circle-info" class="info-icon" />
      </button>
    </div>

    <!-- Results toolbar (only shown after first search) -->
    <div v-if="hasSearched" class="results-bar">
      <span v-if="!loading && !error && hasResults" class="results-info">
        Showing {{ resultsStart }}–{{ resultsEnd }} of {{ totalCards.toLocaleString() }} cards
      </span>
      <span v-else-if="!loading && !error && !hasResults" class="results-info">
        No cards found
      </span>
      <span v-else class="results-info">&nbsp;</span>

      <ViewControls
        v-model:view-mode="viewMode"
        v-model:grid-size="gridSize"
      />
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="state-panel">
      <Icon icon="spinner" class="state-icon state-icon--spin" />
      <p class="state-title">Searching Scryfall...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="state-panel state-panel--error">
      <Icon icon="exclamation-circle" class="state-icon state-icon--error" />
      <p class="state-title">Search failed</p>
      <p class="state-message">{{ error }}</p>
      <Button variant="secondary" size="default" @click="handleSearch">Try again</Button>
    </div>

    <!-- Empty results -->
    <div v-else-if="hasSearched && !hasResults" class="state-panel">
      <Icon icon="inbox" class="state-icon state-icon--muted" />
      <p class="state-title">No cards found</p>
      <p class="state-message">Try adjusting your search query or use different filters.</p>
    </div>

    <!-- Initial state (before first search) -->
    <div v-else-if="!hasSearched" class="state-panel">
      <Icon icon="search" class="state-icon state-icon--muted" />
      <p class="state-title">Search for cards</p>
      <p class="state-message">
        Enter a card name or use Scryfall filters to find cards to add to your collection.
        <button class="inline-link" @click="openSearchGuide">View search syntax guide</button>
      </p>
    </div>

    <!-- Grid results -->
    <div v-else-if="viewMode === 'grid'" class="card-grid" :style="{ '--card-grid-cols': gridSize }">
      <CardTile
        v-for="card in cards"
        :key="card.id"
        :card="card"
        mode="search"
        @add-non-foil="handleAddNonFoil"
        @add-foil="handleAddFoil"
        @search-prints="handleSearchPrints"
      />
    </div>

    <!-- List results -->
    <div v-else>
      <DataTable
        :data="cards"
        :columns="columns"
        :row-clickable="false"
      >
        <template #cell(card)="{ row }">
          <div class="table-card-info">
            <CardImage
              :image-url="row.imageUrl"
              :card-name="row.name"
              :colour="row.colour"
              size="small"
            />
            <div class="table-card-details">
              <span class="table-card-name">{{ row.name }}</span>
              <span class="table-card-type">{{ row.type }}</span>
            </div>
          </div>
        </template>

        <template #cell(rarity)="{ value }">
          <span class="rarity-badge" :class="`rarity-${value}`">{{ value }}</span>
        </template>

        <template #cell(actions)="{ row }">
          <div class="table-actions">
            <Button variant="secondary" size="small" icon="search" @click.stop="handleSearchPrints(row)">
              Prints
            </Button>
            <Button variant="secondary" size="small" icon="plus" @click.stop="handleAddNonFoil(row)">
              Add
            </Button>
            <Button variant="secondary" size="small" icon="gem" class="foil-btn" @click.stop="handleAddFoil(row)">
              Foil
            </Button>
          </div>
        </template>
      </DataTable>
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="hasResults && totalPages > 1"
      v-model:current-page="currentPage"
      :total-pages="totalPages"
      :total-items="totalCards"
    />
  </div>
</template>

<style scoped>
.add-cards-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Search row */
.search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-wrapper {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
}

.search-icon :deep(svg) {
  width: 14px;
  height: 14px;
}

.search-input {
  width: 100%;
  padding: 10px 16px;
  padding-left: 40px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: var(--accent);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.info-btn {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.info-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.info-icon :deep(svg) {
  width: 16px;
  height: 16px;
}

/* Results bar */
.results-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.results-info {
  font-size: 13px;
  color: var(--text-secondary);
}

/* State panels */
.state-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 64px 32px;
  text-align: center;
}

.state-icon :deep(svg) {
  width: 40px;
  height: 40px;
}

.state-icon--muted {
  color: var(--text-secondary);
  opacity: 0.4;
}

.state-icon--error {
  color: var(--danger, #ef4444);
}

.state-icon--spin :deep(svg) {
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  color: var(--accent);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.state-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.state-message {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  max-width: 400px;
  line-height: 1.6;
}

.inline-link {
  background: none;
  border: none;
  padding: 0;
  color: var(--accent);
  cursor: pointer;
  font-size: inherit;
  text-decoration: underline;
}

/* Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--card-grid-cols, 5), 1fr);
  gap: 16px;
}

/* Table */
.table-card-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-card-details {
  display: flex;
  flex-direction: column;
}

.table-card-name {
  font-weight: 500;
}

.table-card-type {
  font-size: 12px;
  color: var(--text-secondary);
}

.rarity-badge {
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
  padding: 2px 7px;
  border-radius: 3px;
}

.rarity-common    { background: rgba(148, 163, 184, 0.15); color: var(--text-secondary); }
.rarity-uncommon  { background: rgba(148, 199, 148, 0.15); color: #7ec67e; }
.rarity-rare      { background: rgba(99, 160, 230, 0.15);  color: #63a0e6; }
.rarity-mythic    { background: rgba(230, 140, 60, 0.15);  color: #e68c3c; }

.table-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.table-actions :deep(.foil-btn:hover) {
  background: var(--accent-secondary);
  border-color: var(--accent-secondary);
}
</style>
