<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Card } from '../../data/mockCards';
import { mockCards } from '../../data/mockCards';
import { mockSpots } from '../../data/mockSpots';
import Button from '../Button.vue';
import CardImage from '../CardImage.vue';
import RarityBadge from '../RarityBadge.vue';

const props = defineProps<{
  cardId?: string;
  card?: Card;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', data: any): void;
}>();

const card = computed(() => {
  if (props.card) return props.card;
  if (props.cardId) {
    return mockCards.find(c => c.id === props.cardId) || mockCards[0];
  }
  return mockCards[0];
});

interface CardEntry {
  id: string;
  quantity: number;
  spotId: string;
  forTrade: boolean;
  isFoil: boolean;
}

const standardCards = ref<CardEntry[]>([
  { id: '1', quantity: 2, spotId: '1', forTrade: false, isFoil: false }
]);

const foilCards = ref<CardEntry[]>([
  { id: '2', quantity: 1, spotId: '2', forTrade: true, isFoil: true }
]);

const addStandardCard = () => {
  standardCards.value.push({
    id: Date.now().toString(),
    quantity: 1,
    spotId: '1',
    forTrade: false,
    isFoil: false
  });
};

const addFoilCard = () => {
  foilCards.value.push({
    id: Date.now().toString(),
    quantity: 1,
    spotId: '1',
    forTrade: false,
    isFoil: true
  });
};

const removeStandardCard = (id: string) => {
  standardCards.value = standardCards.value.filter(c => c.id !== id);
};

const removeFoilCard = (id: string) => {
  foilCards.value = foilCards.value.filter(c => c.id !== id);
};

const handleSave = () => {
  emit('save', {
    cardId: card.value.id,
    standard: standardCards.value,
    foil: foilCards.value
  });
  emit('close');
};
</script>

<template>
  <div class="card-detail-flyout">
    <div class="flyout-card-preview">
      <CardImage
        :image-url="card.imageUrl"
        :card-name="card.name"
        :colour="card.colour"
        size="medium"
      />
        <div class="flyout-card-details">
        <h3>{{ card.name }}</h3>
        <div class="set-row">
          <span class="set-name">{{ card.setName }}</span>
        </div>
        <div class="flyout-stats">
          <div class="flyout-stat">
            <div class="flyout-stat-label">Rarity</div>
            <RarityBadge :rarity="card.rarity" />
          </div>
          <div class="flyout-stat">
            <div class="flyout-stat-label">Price</div>
            <div class="flyout-stat-value">${{ card.price?.toFixed(2) || '0.00' }}</div>
          </div>
          <div class="flyout-stat full-width">
            <div class="flyout-stat-label">Inventory</div>
            <div class="inventory-counts">
              <div class="inventory-count">
                <span class="inventory-label">Non-Foil</span>
                <span class="inventory-value">{{ card.nonFoilCount }}</span>
              </div>
              <div class="inventory-divider"></div>
              <div class="inventory-count">
                <span class="inventory-label">Foil</span>
                <span class="inventory-value">{{ card.foilCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flyout-scroll-content">
      <div class="card-management">
        <div class="management-section">
          <div class="section-header">
            <span class="section-title">Standard Cards</span>
            <Button variant="secondary" size="tiny" icon="plus" @click="addStandardCard">
              Add
            </Button>
          </div>
          
          <div v-for="entry in standardCards" :key="entry.id" class="card-entry">
            <div class="entry-row">
              <div class="qty-control">
                <Button 
                  variant="secondary" 
                  size="small" 
                  icon="minus" 
                  icon-only
                  sr-text="Decrease quantity"
                  @click="entry.quantity = Math.max(0, entry.quantity - 1)"
                />
                <input
                  v-model.number="entry.quantity"
                  type="number"
                  min="0"
                  class="qty-input"
                />
                <Button 
                  variant="secondary" 
                  size="small" 
                  icon="plus" 
                  icon-only
                  sr-text="Increase quantity"
                  @click="entry.quantity++"
                />
              </div>
              
              <select v-model="entry.spotId" class="form-select">
                <option v-for="spot in mockSpots" :key="spot.id" :value="spot.id">
                  {{ spot.name }}
                </option>
              </select>
              
              <button 
                class="trade-toggle" 
                :class="{ active: entry.forTrade }"
                @click="entry.forTrade = !entry.forTrade"
                title="For Trade"
              >
                <font-awesome-icon icon="exchange-alt" />
              </button>
              
              <Button 
                variant="danger" 
                size="small" 
                icon="trash" 
                icon-only
                sr-text="Remove card"
                @click="removeStandardCard(entry.id)"
              />
            </div>
          </div>
          
          <div v-if="standardCards.length === 0" class="empty-state">
            No standard copies added
          </div>
        </div>

        <div class="management-section">
          <div class="section-header">
            <span class="section-title">Foil Cards</span>
            <Button variant="secondary" size="tiny" icon="plus" @click="addFoilCard">
              Add
            </Button>
          </div>
          
          <div v-for="entry in foilCards" :key="entry.id" class="card-entry">
            <div class="entry-row">
              <div class="qty-control">
                <Button 
                  variant="secondary" 
                  size="small" 
                  icon="minus" 
                  icon-only
                  sr-text="Decrease quantity"
                  @click="entry.quantity = Math.max(0, entry.quantity - 1)"
                />
                <input
                  v-model.number="entry.quantity"
                  type="number"
                  min="0"
                  class="qty-input"
                />
                <Button 
                  variant="secondary" 
                  size="small" 
                  icon="plus" 
                  icon-only
                  sr-text="Increase quantity"
                  @click="entry.quantity++"
                />
              </div>
              
              <select v-model="entry.spotId" class="form-select">
                <option v-for="spot in mockSpots" :key="spot.id" :value="spot.id">
                  {{ spot.name }}
                </option>
              </select>
              
              <button 
                class="trade-toggle" 
                :class="{ active: entry.forTrade }"
                @click="entry.forTrade = !entry.forTrade"
                title="For Trade"
              >
                <font-awesome-icon icon="exchange-alt" />
              </button>
              
              <Button 
                variant="danger" 
                size="small" 
                icon="trash" 
                icon-only
                sr-text="Remove card"
                @click="removeFoilCard(entry.id)"
              />
            </div>
          </div>
          
          <div v-if="foilCards.length === 0" class="empty-state">
            No foil copies added
          </div>
        </div>
      </div>
    </div>

    <div class="flyout-actions">
      <Button variant="secondary" @click="$emit('close')">
        Cancel
      </Button>
      <Button variant="primary" @click="handleSave">
        Save Changes
      </Button>
    </div>
  </div>
</template>

<style scoped>
.card-detail-flyout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.flyout-card-preview {
  background: var(--tile-bg);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  gap: 20px;
  border: 1px solid var(--border);
  margin-bottom: 20px;
  flex-shrink: 0;
}

.flyout-card-details {
  flex: 1;
  min-width: 0;
}

.flyout-card-details h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.set-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.set-name {
  font-size: 13px;
  color: var(--text-secondary);
}

.flyout-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.flyout-stat {
  background: var(--tile-bg);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.flyout-stat.full-width {
  grid-column: 1 / -1;
}

.flyout-stat-label {
  font-size: 10px;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.flyout-stat-value {
  font-size: 16px;
  font-weight: 600;
}

.inventory-counts {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 4px;
}

.inventory-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.inventory-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.inventory-value {
  font-size: 18px;
  font-weight: 600;
}

.inventory-divider {
  width: 1px;
  height: 30px;
  background: var(--border);
}

.flyout-scroll-content {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
}

.card-management {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.management-section {
  background: var(--tile-bg);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  padding: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
}

.card-entry {
  margin-bottom: 8px;
}

.card-entry:last-child {
  margin-bottom: 0;
}

.entry-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-select {
  flex: 1;
}

.trade-toggle {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.trade-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.trade-toggle.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.empty-state {
  text-align: center;
  padding: 16px;
  color: var(--text-secondary);
  font-size: 13px;
}

.flyout-actions {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  background: var(--bg);
}

.flyout-actions .btn {
  flex: 1;
}
</style>
