<script setup lang="ts">
import { reactive } from 'vue';
import Button from '../Button.vue';
import { type TrackerFilters, defaultTrackerFilters } from '../../types/trackerFilters';

const props = defineProps<{
  initialFilters?: TrackerFilters;
  onApply?: (filters: TrackerFilters) => void;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const form = reactive<TrackerFilters>({
  ...defaultTrackerFilters(),
  ...props.initialFilters,
  rarities: [...(props.initialFilters?.rarities ?? [])],
});

const rarityOptions = ['common', 'uncommon', 'rare', 'mythic'] as const;

const toggleRarity = (r: typeof rarityOptions[number]) => {
  const idx = form.rarities.indexOf(r);
  if (idx >= 0) form.rarities.splice(idx, 1);
  else form.rarities.push(r);
};

const handleApply = () => {
  props.onApply?.({ ...form, rarities: [...form.rarities] });
  emit('close');
};

const handleClear = () => {
  const defaults = defaultTrackerFilters();
  form.rarities = defaults.rarities;
  form.status = defaults.status;
  form.foilPreference = defaults.foilPreference;
  props.onApply?.(defaultTrackerFilters());
  emit('close');
};
</script>

<template>
  <div class="filters-form">
    <div class="form-scroll-content">

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
              @change="toggleRarity(rarity)"
            />
            <span class="capitalize">{{ rarity }}</span>
          </label>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Status</h3>
        <div class="toggle-group">
          <button
            v-for="opt in (['all', 'collected', 'missing'] as const)"
            :key="opt"
            type="button"
            class="toggle-btn"
            :class="{ active: form.status === opt }"
            @click="form.status = opt"
          >
            {{ opt === 'all' ? 'All' : opt === 'collected' ? 'Collected' : 'Missing' }}
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Foil Preference</h3>
        <div class="toggle-group">
          <button
            v-for="opt in (['all', 'non-foil', 'foil'] as const)"
            :key="opt"
            type="button"
            class="toggle-btn"
            :class="{ active: form.foilPreference === opt }"
            @click="form.foilPreference = opt"
          >
            {{ opt === 'all' ? 'All' : opt === 'non-foil' ? 'Non-Foil' : 'Foil' }}
          </button>
        </div>
      </div>

    </div>

    <div class="form-actions">
      <Button variant="secondary" @click="handleClear">Clear</Button>
      <Button @click="handleApply">Apply Filters</Button>
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

.toggle-group {
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

.form-actions {
  display: flex;
  gap: 10px;
  padding-top: 16px;
}

.form-actions :deep(.btn) {
  flex: 1;
}

.capitalize {
  text-transform: capitalize;
}
</style>
