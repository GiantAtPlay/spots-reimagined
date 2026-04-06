<script setup lang="ts">
import { ref } from 'vue';
import SearchInput from '../SearchInput.vue';
import ViewControls from '../ViewControls.vue';

defineProps<{
  viewMode: 'grid' | 'list';
  gridSize: number;
  totalResults: number;
  filteredResults: number;
  hasActiveFilters?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:viewMode', value: 'grid' | 'list'): void;
  (e: 'update:gridSize', value: number): void;
  (e: 'search', value: string): void;
  (e: 'open-filters'): void;
}>();

const searchQuery = ref('');
</script>

<template>
  <div class="toolbar">
    <div class="search-container">
      <SearchInput
        v-model="searchQuery"
        variant="inline"
        placeholder="Search cards..."
        @update:model-value="emit('search', $event)"
      />
    </div>

    <div class="toolbar-right">
      <div class="filters">
        <button class="filter-btn" :class="{ active: hasActiveFilters }" @click="emit('open-filters')">
          <font-awesome-icon icon="filter" />
          Filters
        </button>
        <button class="filter-btn">
          <font-awesome-icon icon="sort" />
          Sort
        </button>
      </div>

      <ViewControls
        :view-mode="viewMode"
        :grid-size="gridSize"
        @update:view-mode="emit('update:viewMode', $event)"
        @update:grid-size="emit('update:gridSize', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  max-width: 500px;
}

.toolbar-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

.filters {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 14px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: var(--tile-hover);
  color: var(--text-primary);
  border-color: var(--accent);
}

.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.filter-btn.active:hover {
  background: var(--accent-secondary);
  border-color: var(--accent-secondary);
  color: white;
}
</style>
