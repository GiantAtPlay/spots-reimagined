<script setup lang="ts">
import { ref, computed } from 'vue';
import { mockCards } from '../data/mockCards';
import CollectionToolbar from '../components/collection/CollectionToolbar.vue';
import CardTile from '../components/collection/CardTile.vue';
import CardRow from '../components/collection/CardRow.vue';
import Pagination from '../components/collection/Pagination.vue';

const viewMode = ref<'grid' | 'list'>('grid');
const gridSize = ref(5);
const currentPage = ref(1);
const itemsPerPage = 12;

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

const handleSearch = (query: string) => {
  console.log('Search:', query);
  currentPage.value = 1;
};
</script>

<template>
  <div class="collection-view">
    <CollectionToolbar
      v-model:view-mode="viewMode"
      v-model:grid-size="gridSize"
      :total-results="filteredCards.length"
      :filtered-results="paginatedCards.length"
      @search="handleSearch"
    />

    <div class="results-info">
      Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredCards.length) }} of {{ filteredCards.length }} cards
    </div>

    <div v-if="viewMode === 'grid'" class="card-grid" :style="{ '--card-grid-cols': gridSize }">
      <CardTile
        v-for="card in paginatedCards"
        :key="card.id"
        :card="card"
      />
    </div>

    <div v-else class="table-container">
      <table class="card-table">
        <thead>
          <tr>
            <th>Card</th>
            <th>Set</th>
            <th>Non-Foil</th>
            <th>Foil</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <CardRow
            v-for="card in paginatedCards"
            :key="card.id"
            :card="card"
          />
        </tbody>
      </table>
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--card-grid-cols, 5), 1fr);
  gap: 16px;
}

.table-container {
  overflow-x: auto;
  flex: 1;
}

.card-table {
  width: 100%;
  border-collapse: collapse;
}

.card-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
  font-weight: 600;
}

.card-table th:last-child,
.card-table th.actions-col {
  text-align: right;
}

.card-table td.actions-col {
  text-align: right;
  width: 100px;
}
</style>
