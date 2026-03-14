<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Card } from '../../data/mockCards';
import { mockCards } from '../../data/mockCards';

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

const colourIconMap: Record<string, string> = {
  white: 'sun',
  blue: 'tint',
  black: 'skull',
  red: 'fire',
  green: 'leaf',
  colourless: 'gavel',
  gold: 'bolt',
  land: 'turn-down',
};

const colourIcon = computed(() => colourIconMap[card.value.colour] || 'question');

const mockSpots = [
  { id: '1', name: 'Main Box' },
  { id: '2', name: 'Trade Binder' },
  { id: '3', name: 'Deck Box' },
  { id: '4', name: 'Bulk' },
];

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
      <div class="flyout-card-image">
        <img
          v-if="card.imageUrl"
          :src="card.imageUrl"
          :alt="card.name"
          class="card-image"
        />
        <font-awesome-icon v-else :icon="colourIcon" class="colour-icon" />
      </div>
        <div class="flyout-card-details">
        <h3>{{ card.name }}</h3>
        <div class="set-row">
          <span class="set-name">{{ card.setName }}</span>
        </div>
        <div class="flyout-stats">
          <div class="flyout-stat">
            <div class="flyout-stat-label">Rarity</div>
            <span class="rarity-badge" :class="`rarity-${card.rarity}`">
              {{ card.rarity }}
            </span>
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
            <button class="add-btn" @click="addStandardCard">
              <font-awesome-icon icon="plus" />
              Add
            </button>
          </div>
          
          <div v-for="entry in standardCards" :key="entry.id" class="card-entry">
            <div class="entry-row">
              <div class="qty-control">
                <button class="qty-btn" @click="entry.quantity = Math.max(0, entry.quantity - 1)">
                  <font-awesome-icon icon="minus" />
                </button>
                <input
                  v-model.number="entry.quantity"
                  type="number"
                  min="0"
                  class="qty-input"
                />
                <button class="qty-btn" @click="entry.quantity++">
                  <font-awesome-icon icon="plus" />
                </button>
              </div>
              
              <select v-model="entry.spotId" class="spot-select">
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
              
              <button class="remove-btn" @click="removeStandardCard(entry.id)">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
          
          <div v-if="standardCards.length === 0" class="empty-state">
            No standard copies added
          </div>
        </div>

        <div class="management-section">
          <div class="section-header">
            <span class="section-title">Foil Cards</span>
            <button class="add-btn" @click="addFoilCard">
              <font-awesome-icon icon="plus" />
              Add
            </button>
          </div>
          
          <div v-for="entry in foilCards" :key="entry.id" class="card-entry">
            <div class="entry-row">
              <div class="qty-control">
                <button class="qty-btn" @click="entry.quantity = Math.max(0, entry.quantity - 1)">
                  <font-awesome-icon icon="minus" />
                </button>
                <input
                  v-model.number="entry.quantity"
                  type="number"
                  min="0"
                  class="qty-input"
                />
                <button class="qty-btn" @click="entry.quantity++">
                  <font-awesome-icon icon="plus" />
                </button>
              </div>
              
              <select v-model="entry.spotId" class="spot-select">
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
              
              <button class="remove-btn" @click="removeFoilCard(entry.id)">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
          
          <div v-if="foilCards.length === 0" class="empty-state">
            No foil copies added
          </div>
        </div>
      </div>
    </div>

    <div class="flyout-actions">
      <button class="btn btn-secondary" @click="$emit('close')">
        Cancel
      </button>
      <button class="btn btn-primary" @click="handleSave">
        Save Changes
      </button>
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

.flyout-card-image {
  width: 100px;
  height: 140px;
  background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.flyout-card-image .card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flyout-card-image .colour-icon {
  font-size: 32px;
  color: var(--accent);
  opacity: 0.7;
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

.rarity-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 600;
}

.rarity-common {
  background: rgba(148, 163, 184, 0.15);
  color: var(--text-secondary);
}

.rarity-uncommon {
  background: rgba(16, 185, 129, 0.15);
  color: var(--success);
}

.rarity-rare {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.rarity-mythic {
  background: rgba(155, 77, 202, 0.15);
  color: var(--accent);
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

.add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
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

.qty-control {
  display: flex;
  align-items: center;
  gap: 4px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 10px;
}

.qty-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.qty-input {
  width: 40px;
  padding: 4px;
  text-align: center;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 13px;
}

.spot-select {
  flex: 1;
  padding: 6px 8px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 12px;
  cursor: pointer;
}

.spot-select:focus {
  outline: none;
  border-color: var(--accent);
}

.trade-toggle {
  width: 28px;
  height: 28px;
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
  background: rgba(155, 77, 202, 0.15);
  border-color: var(--accent);
  color: var(--accent);
}

.remove-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  color: var(--danger);
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

.btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.btn-secondary:hover {
  border-color: var(--accent);
}
</style>
