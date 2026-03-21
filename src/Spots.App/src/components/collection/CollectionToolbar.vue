<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '../Button.vue';
import ButtonGroup from '../ButtonGroup.vue';
import Icon from '../Icon.vue';

const props = defineProps<{
  viewMode: 'grid' | 'list';
  gridSize: number;
  totalResults: number;
  filteredResults: number;
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

const gridSizeLabel = computed(() => {
  const labels = {
    3: 'Small',
    4: 'Medium',
    5: 'Large',
    6: 'XL',
    7: 'XXL',
    8: 'Max'
  };
  return labels[props.gridSize as keyof typeof labels] || 'Medium';
});
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
        <button class="filter-btn" @click="emit('open-filters')">
          <Icon icon="filter" />
          Filters
        </button>
        <button class="filter-btn">
          <Icon icon="sort" />
          Sort
        </button>
      </div>

      <div v-if="viewMode === 'grid'" class="size-slider">
        <Icon icon="th" class="size-icon" />
        <input
          type="range"
          min="3"
          max="8"
          :value="gridSize"
          @input="emit('update:gridSize', parseInt(($event.target as HTMLInputElement).value))"
        />
        <span class="size-label">{{ gridSizeLabel }}</span>
      </div>

      <div class="view-toggle">
        <ButtonGroup>
          <Button
            :variant="viewMode === 'grid' ? 'primary' : 'secondary'"
            size="default"
            icon="th-large"
            icon-only
            :bounce="false"
            sr-text="Grid view"
            @click="emit('update:viewMode', 'grid')"
          />
          <Button
            :variant="viewMode === 'list' ? 'primary' : 'secondary'"
            size="default"
            icon="list"
            icon-only
            :bounce="false"
            sr-text="List view"
            @click="emit('update:viewMode', 'list')"
          />
        </ButtonGroup>
      </div>
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

.size-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.size-icon {
  color: var(--text-secondary);
}

.size-icon :deep(svg) {
  width: 14px;
  height: 14px;
}

.size-slider input[type="range"] {
  width: 80px;
  accent-color: var(--accent);
}

.size-label {
  font-size: 13px;
  color: var(--text-primary);
  width: 45px;
  text-align: center;
}

.view-toggle :deep(.active-view) {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
</style>
