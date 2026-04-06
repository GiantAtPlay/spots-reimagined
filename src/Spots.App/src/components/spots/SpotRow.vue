<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../Icon.vue';
import Button from '../Button.vue';
import type { Spot, SpotType } from '../../data/mockSpots';
import { mockTrackers } from '../../data/mockTrackers';

const SPOT_TYPE_ICONS: Record<SpotType, string> = {
  place: 'map-marker',
  person: 'user',
  binder: 'book',
  deck: 'layer-group',
  box: 'archive',
  other: 'circle',
};

const props = defineProps<{
  spot: Spot;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle', spot: Spot): void;
  (e: 'addChild', spot: Spot): void;
  (e: 'edit', spot: Spot): void;
  (e: 'delete', spot: Spot): void;
}>();

const tracker = computed(() => {
  if (!props.spot.trackerId) return null;
  return mockTrackers.find(t => t.id === props.spot.trackerId);
});

const handleToggle = () => {
  emit('toggle', props.spot);
};

const handleAddChild = (e: MouseEvent) => {
  e.stopPropagation();
  emit('addChild', props.spot);
};

const handleEdit = (e: MouseEvent) => {
  e.stopPropagation();
  emit('edit', props.spot);
};

const handleDelete = (e: MouseEvent) => {
  e.stopPropagation();
  emit('delete', props.spot);
};
</script>

<template>
  <div class="spot-row" :style="{ paddingLeft: `${depth * 24 + 12}px` }">
    <div class="spot-row-main">
      <button
        v-if="hasChildren"
        class="spot-toggle"
        type="button"
        @click="handleToggle"
      >
        <Icon
          icon="chevron-right"
          class="spot-chevron"
          :class="{ 'spot-chevron--open': isExpanded }"
        />
      </button>
      <span v-else class="spot-toggle-placeholder" />

      <span class="spot-colour" :style="{ backgroundColor: spot.colour }" />

      <Icon :icon="SPOT_TYPE_ICONS[spot.type]" class="spot-type-icon" />

      <span class="spot-name">{{ spot.name }}</span>

      <span v-if="tracker" class="spot-tracker-badge">
        <Icon icon="chart-line" size="xs" />
        {{ tracker.name }}
      </span>
    </div>

    <div class="spot-row-actions">
      <Button
        variant="secondary"
        size="tiny"
        icon="plus"
        icon-only
        sr-text="Add child spot"
        class="spot-action-btn"
        @click="handleAddChild"
      />
      <Button
        variant="secondary"
        size="tiny"
        icon="pencil"
        icon-only
        sr-text="Edit spot"
        class="spot-action-btn"
        @click="handleEdit"
      />
      <Button
        variant="secondary"
        size="tiny"
        icon="trash"
        icon-only
        sr-text="Delete spot"
        class="spot-action-btn spot-action-btn--danger"
        @click="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped>
.spot-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  padding-right: 12px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 12px;
}

.spot-row:hover {
  border-color: var(--accent);
  background: var(--tile-hover);
}

.spot-row:hover .spot-row-actions {
  opacity: 1;
}

.spot-row-main {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.spot-toggle {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.spot-toggle:hover {
  color: var(--accent);
}

.spot-toggle-placeholder {
  width: 20px;
  flex-shrink: 0;
}

.spot-chevron {
  font-size: 12px;
  transition: transform 0.2s ease;
}

.spot-chevron--open {
  transform: rotate(90deg);
}

.spot-colour {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.spot-type-icon {
  font-size: 14px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.spot-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spot-tracker-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-secondary);
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 2px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.spot-row-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.spot-action-btn {
  opacity: 0;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.spot-row:hover .spot-action-btn {
  opacity: 1;
}

.spot-action-btn--danger:hover {
  color: var(--danger);
}
</style>
