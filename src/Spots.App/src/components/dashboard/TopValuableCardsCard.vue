<template>
  <div class="chart-card">
    <div class="chart-title">
      <i class="fas fa-dollar-sign"></i>
      Top 10 Most Valuable Cards
    </div>
    
    <div v-if="hasCards" class="valuable-cards-list">
      <div 
        v-for="(card, index) in cards" 
        :key="card.id"
        class="valuable-card-row"
      >
        <span class="card-rank">{{ index + 1 }}</span>
        <div class="card-details">
          <span class="card-name">{{ card.name }}</span>
          <span class="card-set-badge">{{ card.setCode }}</span>
        </div>
        <div class="card-meta">
          <i v-if="card.isFoil" class="fas fa-gem foil-indicator" title="Foil"></i>
          <span class="card-price">{{ formatCurrency(card.price) }}</span>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <p class="empty-message">No cards with prices yet</p>
      <Button variant="primary" size="small" @click="navigateToAddCards">
        Add Cards
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../Button.vue';
import { formatCurrency } from '@/utils/formatters';
import type { ValuableCard } from '@/data/mockDashboardStats';

interface Props {
  cards: ValuableCard[];
}

const props = defineProps<Props>();
const router = useRouter();

const hasCards = computed(() => props.cards.length > 0);

const navigateToAddCards = () => {
  router.push('/collection/add');
};
</script>

<style scoped>
.chart-card {
  background: var(--tile-bg);
  border-radius: var(--radius);
  padding: 24px;
  border: 1px solid var(--border);
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-title i {
  color: var(--accent);
}

.valuable-cards-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 480px;
  overflow-y: auto;
}

.valuable-card-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-sm);
  transition: background 0.2s ease;
}

.valuable-card-row:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

.valuable-card-row:hover {
  background: rgba(155, 77, 202, 0.1);
}

.card-rank {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 24px;
  text-align: center;
}

.card-details {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.card-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-set-badge {
  font-size: 11px;
  padding: 2px 6px;
  background: rgba(155, 77, 202, 0.15);
  color: var(--accent);
  border-radius: 4px;
  text-transform: uppercase;
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.foil-indicator {
  color: var(--accent);
  font-size: 12px;
}

.card-price {
  font-size: 14px;
  font-weight: 600;
  color: var(--success);
  min-width: 70px;
  text-align: right;
}

.empty-state {
  text-align: center;
  padding: 24px 0;
}

.empty-message {
  color: var(--text-secondary);
  margin-bottom: 16px;
  font-size: 14px;
}
</style>
