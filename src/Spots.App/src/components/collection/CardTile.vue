<script setup lang="ts">
import { useFlyoutStore } from '../../stores/flyout';
import CardImage from '../CardImage.vue';
import Button from '../Button.vue';
import Icon from '../Icon.vue';
import type { Card } from '../../data/mockCards';
import type { TrackerCard } from '../../data/mockTrackers';

const props = defineProps<{
  card: Card;
  mode?: 'collection' | 'search' | 'tracker';
  trackerCard?: TrackerCard;
}>();

const emit = defineEmits<{
  (e: 'add-non-foil', card: Card): void;
  (e: 'add-foil', card: Card): void;
  (e: 'search-prints', card: Card): void;
  (e: 'untrack', card: TrackerCard): void;
}>();

const flyoutStore = useFlyoutStore();

const handleCardClick = () => {
  if (props.mode === 'search' || props.mode === 'tracker') return;
  flyoutStore.open({
    title: props.card.name,
    component: 'CardDetail',
    props: {
      card: props.card
    }
  });
};

const handleAddNonFoil = (e: Event) => {
  e.stopPropagation();
  if (props.mode === 'search') {
    emit('add-non-foil', props.card);
  } else {
    console.log('Add non-foil', props.card.id);
  }
};

const handleAddFoil = (e: Event) => {
  e.stopPropagation();
  if (props.mode === 'search') {
    emit('add-foil', props.card);
  } else {
    console.log('Add foil', props.card.id);
  }
};

const handleSearchPrints = (e: Event) => {
  e.stopPropagation();
  emit('search-prints', props.card);
};

const handleUntrack = (e: Event) => {
  e.stopPropagation();
  if (props.trackerCard) emit('untrack', props.trackerCard);
};
</script>

<template>
  <div
    class="card-tile"
    :class="{
      'card-tile--search': mode === 'search',
      'card-tile--tracker': mode === 'tracker',
      'card-tile--collected': mode === 'tracker' && trackerCard?.isCollected,
      'card-tile--missing': mode === 'tracker' && !trackerCard?.isCollected,
    }"
    @click="handleCardClick"
  >
    <div class="card-tile-image">
      <CardImage
        :image-url="card.imageUrl"
        :card-name="card.name"
        :colour="card.colour"
        size="large"
      />
      <span class="set-badge">{{ card.setCode }}</span>

      <!-- Tracker status overlay -->
      <span
        v-if="mode === 'tracker'"
        class="tracker-status-badge"
        :class="trackerCard?.isCollected ? 'tracker-status-badge--collected' : 'tracker-status-badge--missing'"
      >
        <Icon :icon="trackerCard?.isCollected ? 'check' : 'xmark'" />
      </span>
    </div>

    <!-- Collection / search actions -->
    <div v-if="mode !== 'tracker'" class="card-tile-actions">
      <Button
        variant="secondary"
        size="small"
        icon="plus"
        icon-only
        sr-text="Add Non-Foil"
        @click="handleAddNonFoil"
      />
      <Button
        variant="secondary"
        size="small"
        icon="gem"
        icon-only
        sr-text="Add Foil"
        class="foil-button"
        @click="handleAddFoil"
      />
      <Button
        v-if="mode === 'search'"
        variant="secondary"
        size="small"
        icon="search"
        icon-only
        sr-text="Search all prints"
        class="search-prints-button"
        @click="handleSearchPrints"
      />
    </div>

    <!-- Tracker actions -->
    <div v-if="mode === 'tracker'" class="card-tile-actions card-tile-actions--tracker">
      <Button
        variant="danger"
        size="small"
        icon="eye-slash"
        icon-only
        sr-text="Untrack card"
        @click="handleUntrack"
      />
    </div>

    <div class="card-tile-info">
      <h3 class="card-tile-name">{{ card.name }}</h3>
      <p class="card-tile-set">{{ card.setName }}</p>
      <div v-if="mode !== 'search' && mode !== 'tracker'" class="card-counts">
        <span class="count-badge count-nonfoil">
          <Icon icon="box" class="count-icon" />
          {{ card.nonFoilCount }}
        </span>
        <span v-if="card.foilCount > 0" class="count-badge count-foil">
          <Icon icon="gem" class="count-icon" />
          {{ card.foilCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-tile {
  background: var(--tile-bg);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-tile:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}

.card-tile--search {
  cursor: default;
}

.card-tile--tracker {
  cursor: default;
}

/* Collected cards — subtle green border */
.card-tile--tracker.card-tile--collected {
  border-color: rgba(16, 185, 129, 0.4);
}

/* Missing cards — desaturated */
.card-tile--tracker.card-tile--missing {
  opacity: 0.55;
}

.card-tile--tracker:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  opacity: 1;
}

.card-tile-image {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.set-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 10px;
  padding: 3px 6px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  color: var(--text-secondary);
  font-weight: 600;
}

/* Tracker status badge */
.tracker-status-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

.tracker-status-badge--collected {
  background: rgba(16, 185, 129, 0.85);
  color: white;
}

.tracker-status-badge--missing {
  background: rgba(100, 116, 139, 0.7);
  color: white;
}

.card-tile-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card-tile:hover .card-tile-actions {
  opacity: 1;
}

.card-tile-actions :deep(.btn) {
  background: rgba(0, 0, 0, 0.8);
}

.card-tile-actions--tracker :deep(.btn) {
  background: rgba(0, 0, 0, 0.8);
}

.card-tile-actions :deep(.foil-button:hover) {
  background: var(--accent-secondary);
  border-color: var(--accent-secondary);
}

.card-tile-info {
  padding: 12px;
}

.card-tile-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-tile-set {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-counts {
  display: flex;
  gap: 8px;
}

.count-badge {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.count-icon :deep(svg) {
  width: 10px;
  height: 10px;
}

.count-nonfoil {
  background: rgba(148, 163, 184, 0.15);
  color: var(--text-secondary);
}

.count-foil {
  background: rgba(155, 77, 202, 0.15);
  color: var(--accent);
}
</style>
