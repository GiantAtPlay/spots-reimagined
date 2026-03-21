<template>
  <div class="chart-card">
    <div class="chart-title">
      <Icon icon="star" />
      Rarity Breakdown
    </div>
    
    <div class="rarity-breakdown">
      <!-- Top: Mythic -->
      <div class="rarity-item rarity-top">
        <div class="rarity-circle rarity-mythic">
          <Icon icon="gem" />
          <span class="rarity-count">{{ formatRarityCount(getMythic.count) }}</span>
        </div>
        <div class="rarity-label">{{ getMythic.label }}</div>
      </div>
      
      <!-- Middle Row: Rare and Uncommon -->
      <div class="rarity-row-middle">
        <div class="rarity-item">
          <div class="rarity-circle rarity-rare">
            <Icon icon="star" />
            <span class="rarity-count">{{ formatRarityCount(getRare.count) }}</span>
          </div>
          <div class="rarity-label">{{ getRare.label }}</div>
        </div>
        
        <div class="rarity-item">
          <div class="rarity-circle rarity-uncommon">
            <Icon icon="certificate" />
            <span class="rarity-count">{{ formatRarityCount(getUncommon.count) }}</span>
          </div>
          <div class="rarity-label">{{ getUncommon.label }}</div>
        </div>
      </div>
      
      <!-- Bottom: Common -->
      <div class="rarity-item rarity-bottom">
        <div class="rarity-circle rarity-common">
          <Icon icon="circle" />
          <span class="rarity-count">{{ formatRarityCount(getCommon.count) }}</span>
        </div>
        <div class="rarity-label">{{ getCommon.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '@/components/Icon.vue';
import { formatLargeNumber } from '@/utils/formatters';
import type { RarityStat } from '@/data/mockDashboardStats';

interface Props {
  rarities: RarityStat[];
}

const props = defineProps<Props>();

const formatRarityCount = (count: number): string => {
  return formatLargeNumber(count);
};

const getMythic = computed(() => props.rarities.find(r => r.rarity === 'mythic') || { rarity: 'mythic', label: 'Mythic', count: 0 });
const getRare = computed(() => props.rarities.find(r => r.rarity === 'rare') || { rarity: 'rare', label: 'Rare', count: 0 });
const getUncommon = computed(() => props.rarities.find(r => r.rarity === 'uncommon') || { rarity: 'uncommon', label: 'Uncommon', count: 0 });
const getCommon = computed(() => props.rarities.find(r => r.rarity === 'common') || { rarity: 'common', label: 'Common', count: 0 });
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
  color: var(--accent);
}

.rarity-breakdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 16px 0;
  min-height: 280px;
  justify-content: center;
}

.rarity-row-middle {
  display: flex;
  gap: 80px;
  align-items: center;
}

.rarity-item {
  text-align: center;
}

.rarity-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  gap: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.rarity-circle:hover {
  transform: scale(1.1);
}

/* Rarity circle icon sizing — targets svg rendered by Icon component */
.rarity-circle :deep(svg) {
  font-size: 20px;
  width: 20px;
  height: 20px;
}

.rarity-count {
  font-size: 18px;
  font-weight: 600;
}

.rarity-mythic { 
  background: rgba(255, 65, 108, 0.2); 
  color: #ff416c;
  box-shadow: 0 0 20px rgba(255, 65, 108, 0.3);
}

.rarity-rare { 
  background: rgba(255, 165, 2, 0.2); 
  color: #ffa502;
  box-shadow: 0 0 20px rgba(255, 165, 2, 0.3);
}

.rarity-uncommon { 
  background: rgba(0, 184, 148, 0.2); 
  color: #00b894;
  box-shadow: 0 0 20px rgba(0, 184, 148, 0.3);
}

.rarity-common { 
  background: rgba(116, 125, 140, 0.2); 
  color: #747d8c;
  box-shadow: 0 0 20px rgba(116, 125, 140, 0.3);
}

.rarity-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .rarity-row-middle {
    gap: 40px;
  }
  
  .rarity-circle {
    width: 70px;
    height: 70px;
  }
  
  .rarity-circle :deep(svg) {
    width: 18px;
    height: 18px;
  }
  
  .rarity-count {
    font-size: 16px;
  }
}
</style>
