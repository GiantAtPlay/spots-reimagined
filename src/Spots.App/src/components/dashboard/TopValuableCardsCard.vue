<template>
  <ChartCard title="Top 10 Most Valuable Cards" icon="dollar-sign">
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
          <Icon v-if="card.isFoil" icon="gem" class="foil-indicator" title="Foil" />
          <span class="card-price">{{ formatCurrency(card.price) }}</span>
        </div>
      </div>
    </div>
    
    <EmptyState
      v-else
      variant="compact"
      icon="dollar-sign"
      message="No cards with prices yet"
    >
      <template #action>
        <Button variant="primary" size="small" @click="navigateToAddCards">
          Add Cards
        </Button>
      </template>
    </EmptyState>
  </ChartCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ChartCard from '../ChartCard.vue';
import Button from '../Button.vue';
import Icon from '../Icon.vue';
import EmptyState from '../EmptyState.vue';
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

.foil-indicator :deep(svg) {
  width: 12px;
  height: 12px;
  color: var(--accent);
}

.card-price {
  font-size: 14px;
  font-weight: 600;
  color: var(--success);
  min-width: 70px;
  text-align: right;
}

</style>
