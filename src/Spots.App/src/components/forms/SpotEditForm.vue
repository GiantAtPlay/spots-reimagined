<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '../Button.vue';
import type { Spot, SpotType } from '../../data/mockSpots';
import { SPOT_TYPES, SPOT_COLOURS, mockSpots } from '../../data/mockSpots';
import { mockTrackers } from '../../data/mockTrackers';

const props = defineProps<{
  spot?: Spot;
  mode?: 'create' | 'edit';
  parentId?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', data: Partial<Spot>): void;
}>();

const generateId = () => Math.random().toString(36).substring(2, 11);

interface FormData {
  id: string;
  name: string;
  type: SpotType;
  colour: string;
  description: string;
  parentId: string | undefined;
  trackerId: string | undefined;
}

const form = ref<FormData>({
  id: props.spot?.id || generateId(),
  name: props.spot?.name || '',
  type: props.spot?.type || 'place',
  colour: props.spot?.colour || SPOT_COLOURS[0],
  description: props.spot?.description || '',
  parentId: props.spot?.parentId || props.parentId || '',
  trackerId: props.spot?.trackerId || '',
});

const isSaving = ref(false);

const selectedParentId = computed({
  get: () => form.value.parentId || '',
  set: (val: string) => { form.value.parentId = val || undefined; }
});

const selectedTrackerId = computed({
  get: () => form.value.trackerId || '',
  set: (val: string) => { form.value.trackerId = val || undefined; }
});

const parentOptions = computed(() => {
  const spots = getAllSpots();
  return spots.map(s => ({
    value: s.id,
    label: getSpotPath(s.id, spots)
  }));
});

const trackerOptions = computed(() => {
  return [
    { value: '', label: 'No tracker' },
    ...mockTrackers.map(t => ({ value: t.id, label: t.name }))
  ];
});

function getAllSpots(): Spot[] {
  const currentId = props.spot?.id;
  if (!currentId) return mockSpots;
  return mockSpots.filter(s => s.id !== currentId);
}

function getSpotPath(spotId: string, spots: Spot[]): string {
  const path: string[] = [];
  let current = spots.find(s => s.id === spotId);
  while (current) {
    path.unshift(current.name);
    current = current.parentId ? spots.find(s => s.id === current!.parentId) : undefined;
  }
  return path.join(' → ');
}

const handleSubmit = () => {
  isSaving.value = true;
  setTimeout(() => {
    isSaving.value = false;
    emit('save', form.value);
    emit('close');
  }, 500);
};

const isColourSelected = (colour: string) => form.value.colour === colour;

const selectColour = (colour: string) => {
  form.value.colour = colour;
};
</script>

<template>
  <div class="flyout-form" @submit.prevent="handleSubmit">
    <div class="form-scroll-content">
      <div class="form-group">
        <label for="spot-name" class="form-label">Name</label>
        <input
          id="spot-name"
          v-model="form.name"
          type="text"
          class="form-input"
          placeholder="Enter spot name"
          required
        />
      </div>

      <div class="form-group">
        <label for="spot-type" class="form-label">Type</label>
        <select id="spot-type" v-model="form.type" class="form-select">
          <option v-for="t in SPOT_TYPES" :key="t.value" :value="t.value">
            {{ t.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Colour</label>
        <div class="colour-swatches">
          <button
            v-for="colour in SPOT_COLOURS"
            :key="colour"
            type="button"
            class="colour-swatch"
            :class="{ 'colour-swatch--selected': isColourSelected(colour) }"
            :style="{ backgroundColor: colour }"
            @click="selectColour(colour)"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="spot-description" class="form-label">Description</label>
        <textarea
          id="spot-description"
          v-model="form.description"
          class="form-textarea"
          placeholder="Optional description"
          rows="3"
        />
      </div>

      <div class="form-group">
        <label for="spot-parent" class="form-label">Parent Spot</label>
        <select id="spot-parent" v-model="selectedParentId" class="form-select">
          <option value="">None (root level)</option>
          <option v-for="p in parentOptions" :key="p.value" :value="p.value">
            {{ p.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="spot-tracker" class="form-label">Tracker</label>
        <select id="spot-tracker" v-model="selectedTrackerId" class="form-select">
          <option v-for="t in trackerOptions" :key="t.value" :value="t.value">
            {{ t.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-actions">
      <Button
        variant="secondary"
        @click="$emit('close')"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
        :disabled="isSaving || !form.name.trim()"
      >
        {{ isSaving ? 'Saving...' : (mode === 'edit' ? 'Save Changes' : 'Create Spot') }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.flyout-form {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form-scroll-content {
  flex: 1;
  overflow-y: auto;
}

.form-textarea {
  width: 100%;
  padding: 10px 12px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.colour-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.colour-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.colour-swatch:hover {
  transform: scale(1.1);
}

.colour-swatch--selected {
  border-color: var(--text-primary);
  box-shadow: 0 0 0 2px var(--accent);
}

.form-actions .btn {
  flex: 1;
}
</style>
