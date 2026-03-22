<script setup lang="ts">
import { ref } from 'vue';
import Icon from '../Icon.vue';
import ViewControls from '../ViewControls.vue';

const props = defineProps<{
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

const handleSearch = () => {
  emit('search', searchQuery.value);
};
</script>

<template>
  <div class="toolbar">
    <div class="search-container">
      <div class="search-wrapper">
        <Icon icon="search" class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search cards..."
          @input="handleSearch"
        />
      </div>
    </div>

    <div class="toolbar-right">
      <div class="filters">
        <button class="filter-btn" :class="{ active: hasActiveFilters }" @click="emit('open-filters')">
          <Icon icon="filter" />
          Filters
        </button>
        <button class="filter-btn">
          <Icon icon="sort" />
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
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  max-width: 500px;
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
  transition: all 0.2s ease;
}

.search-input:focus {
  border-color: var(--accent);
}

.search-input::placeholder {
  color: var(--text-secondary);
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
