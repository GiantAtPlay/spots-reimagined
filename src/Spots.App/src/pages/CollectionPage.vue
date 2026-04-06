<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter, type LocationQuery, type LocationQueryRaw } from 'vue-router';
import { useFlyoutStore } from '../stores/flyout';
import { useSettingsStore } from '../stores/settings';
import { mockCards, type Card } from '../data/mockCards';
import CollectionToolbar from '../components/collection/CollectionToolbar.vue';
import CardTile from '../components/collection/CardTile.vue';
import Pagination from '../components/collection/Pagination.vue';
import DataTable from '../components/DataTable.vue';
import CardGrid from '../components/CardGrid.vue';
import TableCardCell from '../components/TableCardCell.vue';
import Button from '../components/Button.vue';
import Icon from '../components/Icon.vue';
import { defaultCollectionFilters, type CollectionFilters } from '../types/collectionFilters';

const route = useRoute();
const router = useRouter();
const flyoutStore = useFlyoutStore();
const settingsStore = useSettingsStore();

const viewMode = ref<'grid' | 'list'>(settingsStore.defaultViewMode);
const gridSize = ref(5);
const currentPage = ref(1);
const itemsPerPage = 12;
const searchQuery = ref('');

const filters = ref<CollectionFilters>(defaultCollectionFilters());

const columns = [
  { key: 'card', label: 'Card' },
  { key: 'setCode', label: 'Set' },
  { key: 'nonFoilCount', label: 'Non-Foil' },
  { key: 'foilCount', label: 'Foil' },
  { key: 'actions', label: 'Actions', align: 'right' as const },
];

const filteredCards = computed(() => {
  return mockCards;
});

const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCards.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredCards.value.length / itemsPerPage);
});

const hasActiveFilters = computed(() => {
  return (
    filters.value.spotIds.length > 0 ||
    filters.value.trackerIds.length > 0 ||
    filters.value.forTrade !== null ||
    filters.value.rarities.length > 0
  );
});

const parseList = (value: unknown): string[] => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== 'string' || !raw.trim()) return [];
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBool = (value: unknown): boolean | null => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return null;
};

const isRarity = (value: string): value is Card['rarity'] => {
  return ['common', 'uncommon', 'rare', 'mythic'].includes(value);
};

const parseFiltersFromQuery = (query: LocationQuery): CollectionFilters => {
  const spotIds = parseList(query.spot);
  const trackerIds = parseList(query.tracker);
  const forTrade = parseBool(query.forTrade);
  const rarities = parseList(query.rarity).filter(isRarity);

  return {
    spotIds,
    trackerIds,
    forTrade,
    rarities,
  };
};

const serializeFiltersToQuery = (nextFilters: CollectionFilters): LocationQueryRaw => {
  const nextQuery: LocationQueryRaw = {
    ...route.query,
  };

  delete nextQuery.spot;
  delete nextQuery.tracker;
  delete nextQuery.forTrade;
  delete nextQuery.rarity;

  if (nextFilters.spotIds.length > 0) {
    nextQuery.spot = nextFilters.spotIds.join(',');
  }

  if (nextFilters.trackerIds.length > 0) {
    nextQuery.tracker = nextFilters.trackerIds.join(',');
  }

  if (nextFilters.forTrade !== null) {
    nextQuery.forTrade = String(nextFilters.forTrade);
  }

  if (nextFilters.rarities.length > 0) {
    nextQuery.rarity = nextFilters.rarities.join(',');
  }

  return nextQuery;
};

const requestCollectionData = () => {
  console.log('Request collection data', {
    page: currentPage.value,
    searchQuery: searchQuery.value,
    filters: filters.value,
  });
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1;
  requestCollectionData();
};

const handleCardClick = (card: Card) => {
  flyoutStore.open({
    title: card.name,
    component: 'CardDetail',
    props: {
      card,
    },
  });
};

const applyFilters = async (nextFilters: CollectionFilters) => {
  currentPage.value = 1;
  await router.replace({ query: serializeFiltersToQuery(nextFilters) });
};

const openFilters = () => {
  flyoutStore.open({
    title: 'Collection Filters',
    component: 'CollectionFiltersForm',
    props: {
      initialFilters: filters.value,
      onApply: applyFilters,
    },
  });
};

watch(
  () => route.query,
  (query) => {
    filters.value = parseFiltersFromQuery(query);
    requestCollectionData();
  },
  { immediate: true }
);

watch(currentPage, () => {
  requestCollectionData();
});
</script>

<template>
  <div class="collection-view">
    <CollectionToolbar
      v-model:view-mode="viewMode"
      v-model:grid-size="gridSize"
      :total-results="filteredCards.length"
      :filtered-results="paginatedCards.length"
      :has-active-filters="hasActiveFilters"
      @search="handleSearch"
      @open-filters="openFilters"
    />

    <div class="results-info">
      Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredCards.length) }} of {{ filteredCards.length }} cards
    </div>

    <CardGrid v-if="viewMode === 'grid'" :cols="gridSize">
      <CardTile
        v-for="card in paginatedCards"
        :key="card.id"
        :card="card"
      />
    </CardGrid>

    <div v-else>
      <DataTable
        :data="paginatedCards"
        :columns="columns"
        :row-clickable="true"
        @row-click="handleCardClick"
      >
        <template #cell(card)="{ row }">
          <TableCardCell
            :image-url="row.imageUrl"
            :name="row.name"
            :colour="row.colour"
            :subtitle="row.type"
          />
        </template>

        <template #cell(nonFoilCount)="{ value }">
          <span class="count-cell">
            <Icon icon="box" class="count-icon" />
            {{ value }}
          </span>
        </template>

        <template #cell(foilCount)="{ value }">
          <span class="count-cell" :class="{ 'has-foil': value > 0 }">
            <Icon icon="gem" class="count-icon" />
            {{ value }}
          </span>
        </template>

        <template #cell(actions)>
          <div class="table-actions">
            <Button variant="secondary" size="small" icon="plus" @click.stop>
              Add
            </Button>
            <Button variant="secondary" size="small" icon="gem" @click.stop>
              Foil
            </Button>
          </div>
        </template>
      </DataTable>
    </div>

    <Pagination
      v-model:current-page="currentPage"
      :total-pages="totalPages"
      :total-items="filteredCards.length"
    />
  </div>
</template>

<style scoped>
.collection-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.results-info {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.count-cell {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);
}

.count-cell.has-foil {
  color: var(--accent);
}

.count-icon :deep(svg) {
  width: 10px;
  height: 10px;
}

.table-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
