<template>
  <div class="chart-card">
    <div class="chart-title">
      <i class="fas fa-star"></i>
      Rarity Breakdown
    </div>
    
    <div class="rarity-breakdown">
      <div 
        v-for="rarityStat in rarities" 
        :key="rarityStat.rarity"
        class="rarity-item"
      >
        <div :class="['rarity-circle', `rarity-${rarityStat.rarity}`]">
          {{ formatRarityCount(rarityStat.count) }}
        </div>
        <div class="rarity-label">{{ rarityStat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatLargeNumber } from '@/utils/formatters';
import type { RarityStat } from '@/data/mockDashboardStats';

interface Props {
  rarities: RarityStat[];
}

defineProps<Props>();

const formatRarityCount = (count: number): string => {
  return formatLargeNumber(count);
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

.rarity-breakdown {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px 0;
}

.rarity-item {
  text-align: center;
}

.rarity-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  font-size: 18px;
  font-weight: 600;
}

.rarity-mythic { 
  background: rgba(255, 65, 108, 0.2); 
  color: #ff416c; 
}

.rarity-rare { 
  background: rgba(255, 165, 2, 0.2); 
  color: #ffa502; 
}

.rarity-uncommon { 
  background: rgba(0, 184, 148, 0.2); 
  color: #00b894; 
}

.rarity-common { 
  background: rgba(116, 125, 140, 0.2); 
  color: #747d8c; 
}

.rarity-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
}
</style>
