<script setup lang="ts">
import { useFlyoutStore } from '../../stores/flyout';
import CardImage from '../CardImage.vue';
import type { Card } from '../../data/mockCards';

const props = defineProps<{
  card: Card;
}>();

const flyoutStore = useFlyoutStore();

const handleCardClick = () => {
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
  console.log('Add non-foil', props.card.id);
};

const handleAddFoil = (e: Event) => {
  e.stopPropagation();
  console.log('Add foil', props.card.id);
};
</script>

<template>
  <div class="card-tile" @click="handleCardClick">
    <div class="card-tile-image">
      <CardImage
        :image-url="card.imageUrl"
        :card-name="card.name"
        :colour="card.colour"
        size="large"
      />
      <span class="set-badge">{{ card.setCode }}</span>
    </div>
    
    <div class="card-tile-actions">
      <button class="action-btn" title="Add Non-Foil" @click="handleAddNonFoil">
        <font-awesome-icon icon="plus" />
      </button>
      <button class="action-btn foil" title="Add Foil" @click="handleAddFoil">
        <font-awesome-icon icon="gem" />
      </button>
    </div>

    <div class="card-tile-info">
      <h3 class="card-tile-name">{{ card.name }}</h3>
      <p class="card-tile-set">{{ card.setName }}</p>
      <div class="card-counts">
        <span class="count-badge count-nonfoil">
          <font-awesome-icon icon="box" class="count-icon" />
          {{ card.nonFoilCount }}
        </span>
        <span v-if="card.foilCount > 0" class="count-badge count-foil">
          <font-awesome-icon icon="gem" class="count-icon" />
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

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--border);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.action-btn.foil:hover {
  background: var(--accent-secondary);
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

.count-icon {
  font-size: 10px;
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
