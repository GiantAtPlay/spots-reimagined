<script setup lang="ts">
import { reactive } from 'vue';
import Button from '../Button.vue';
import { mockSpots } from '../../data/mockSpots';
import { mockTrackers } from '../../data/mockTrackers';
import { defaultCollectionFilters, type CollectionFilters } from '../../types/collectionFilters';

const props = defineProps<{
  initialFilters?: CollectionFilters;
  onApply?: (filters: CollectionFilters) => void;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const form = reactive<CollectionFilters>({
  ...defaultCollectionFilters(),
  ...props.initialFilters,
  spotIds: [...(props.initialFilters?.spotIds ?? [])],
  trackerIds: [...(props.initialFilters?.trackerIds ?? [])],
  rarities: [...(props.initialFilters?.rarities ?? [])],
});

const rarityOptions: CollectionFilters['rarities'] = ['common', 'uncommon', 'rare', 'mythic'];

const toggleSelection = (list: string[], value: string) => {
  const index = list.indexOf(value);
  if (index >= 0) {
    list.splice(index, 1);
  } else {
    list.push(value);
  }
};

const handleApply = () => {
  props.onApply?.({
    spotIds: [...form.spotIds],
    trackerIds: [...form.trackerIds],
    forTrade: form.forTrade,
    rarities: [...form.rarities],
  });
  emit('close');
};

const handleClear = () => {
  form.spotIds = [];
  form.trackerIds = [];
  form.forTrade = null;
  form.rarities = [];

  props.onApply?.(defaultCollectionFilters());
  emit('close');
};
</script>

<template>
  <div class="filters-form">
    <div class="form-scroll-content">
      <div class="section">
        <h3 class="section-title">Spot</h3>
        <div class="options-grid options-grid--stacked">
          <label
            v-for="spot in mockSpots"
            :key="spot.id"
            class="option-chip"
            :class="{ active: form.spotIds.includes(spot.id) }"
          >
            <input
              type="checkbox"
              :checked="form.spotIds.includes(spot.id)"
              @change="toggleSelection(form.spotIds, spot.id)"
            >
            <span>{{ spot.name }}</span>
          </label>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Tracker</h3>
        <div class="options-grid options-grid--stacked">
          <label
            v-for="tracker in mockTrackers"
            :key="tracker.id"
            class="option-chip"
            :class="{ active: form.trackerIds.includes(tracker.id) }"
          >
            <input
              type="checkbox"
              :checked="form.trackerIds.includes(tracker.id)"
              @change="toggleSelection(form.trackerIds, tracker.id)"
            >
            <span>{{ tracker.name }}</span>
          </label>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">For Trade</h3>
        <div class="for-trade-toggle">
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: form.forTrade === null }"
            @click="form.forTrade = null"
          >
            Any
          </button>
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: form.forTrade === true }"
            @click="form.forTrade = true"
          >
            Yes
          </button>
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: form.forTrade === false }"
            @click="form.forTrade = false"
          >
            No
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Rarity</h3>
        <div class="options-grid">
          <label
            v-for="rarity in rarityOptions"
            :key="rarity"
            class="option-chip"
            :class="{ active: form.rarities.includes(rarity) }"
          >
            <input
              type="checkbox"
              :checked="form.rarities.includes(rarity)"
              @change="toggleSelection(form.rarities, rarity)"
            >
            <span class="capitalize">{{ rarity }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <Button variant="secondary" @click="handleClear">
        Clear
      </Button>
      <Button @click="handleApply">
        Apply Filters
      </Button>
    </div>
  </div>
</template>

<style scoped>
.filters-form {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form-scroll-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.options-grid--stacked {
  grid-template-columns: 1fr;
  max-height: 140px;
  overflow-y: auto;
  padding-right: 4px;
}

.option-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  font-size: 13px;
  color: var(--text-primary);
  background: var(--tile-bg);
  cursor: pointer;
}

.option-chip input {
  margin: 0;
}

.option-chip.active {
  border-color: var(--accent);
  background: rgba(155, 77, 202, 0.12);
}

.for-trade-toggle {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  flex: 1;
  height: 34px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--tile-bg);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.toggle-btn.active {
  border-color: var(--accent);
  background: rgba(155, 77, 202, 0.18);
  color: var(--text-primary);
}

.form-actions :deep(.btn) {
  flex: 1;
}

.capitalize {
  text-transform: capitalize;
}
</style>
