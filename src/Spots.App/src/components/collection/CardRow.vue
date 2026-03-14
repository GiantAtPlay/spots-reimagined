<script setup lang="ts">
import { useFlyoutStore } from '../../stores/flyout';
import { useCardHelpers } from '../../composables/useCardHelpers';
import type { Card } from '../../data/mockCards';

const props = defineProps<{
  card: Card;
}>();

const flyoutStore = useFlyoutStore();
const { useColourIcon } = useCardHelpers();

const colourIcon = useColourIcon(() => props.card.colour);

const handleCardClick = () => {
  flyoutStore.open({
    title: props.card.name,
    component: 'CardDetail',
    props: {
      card: props.card
    }
  });
};
</script>

<template>
  <tr class="card-row" @click="handleCardClick">
    <td>
      <div class="table-card-info">
        <div class="table-card-image">
          <img
            v-if="card.imageUrl"
            :src="card.imageUrl"
            :alt="card.name"
            class="card-image"
          />
          <font-awesome-icon v-else :icon="colourIcon" class="colour-icon" />
        </div>
        <div class="table-card-details">
          <span class="table-card-name">{{ card.name }}</span>
          <span class="table-card-type">{{ card.type }}</span>
        </div>
      </div>
    </td>
    <td>{{ card.setCode }}</td>
    <td>
      <span class="count-cell">
        <font-awesome-icon icon="box" class="count-icon" />
        {{ card.nonFoilCount }}
      </span>
    </td>
    <td>
      <span class="count-cell" :class="{ 'has-foil': card.foilCount > 0 }">
        <font-awesome-icon icon="gem" class="count-icon" />
        {{ card.foilCount }}
      </span>
    </td>
    <td class="actions-col">
      <div class="table-actions">
        <button class="table-action-btn" title="Add">
          <font-awesome-icon icon="plus" />
          Add
        </button>
        <button class="table-action-btn foil" title="Add Foil">
          <font-awesome-icon icon="gem" />
          Foil
        </button>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.card-row {
  cursor: pointer;
}

.card-row:hover {
  background: var(--tile-bg);
}

.card-row td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.table-card-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-card-image {
  width: 40px;
  height: 56px;
  background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.colour-icon {
  font-size: 16px;
  color: var(--accent);
  opacity: 0.7;
}

.table-card-details {
  display: flex;
  flex-direction: column;
}

.table-card-name {
  font-weight: 500;
}

.table-card-type {
  font-size: 12px;
  color: var(--text-secondary);
}

.count-cell {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);
}

.count-cell.has-foil {
  color: var(--accent);
}

.count-icon {
  font-size: 10px;
}

.table-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.table-action-btn {
  padding: 6px 12px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
}

.table-action-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.table-action-btn.foil:hover {
  background: var(--accent-secondary);
}

.actions-col {
  text-align: right;
  width: 100px;
}
</style>
