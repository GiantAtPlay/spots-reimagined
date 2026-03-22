<template>
  <div class="chart-card">
    <div class="chart-title">
      <Icon icon="paint-brush" />
      Color Distribution
    </div>
    
    <div v-if="hasCards" class="color-distribution">
      <ProgressBar
        v-for="colorStat in colors"
        :key="colorStat.color"
        :label="colorStat.label"
        :value="colorStat.count"
        :max="colorStat.total"
        :color="colorStat.gradient"
      />
    </div>
    
    <EmptyState
      v-else
      variant="compact"
      icon="paint-brush"
      message="No cards in your collection yet"
    >
      <template #action>
        <Button variant="primary" size="small" @click="navigateToAddCards">
          Add Cards
        </Button>
      </template>
    </EmptyState>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ProgressBar from './ProgressBar.vue';
import Button from '../Button.vue';
import Icon from '../Icon.vue';
import EmptyState from '../EmptyState.vue';
import type { ColorStat } from '@/data/mockDashboardStats';

interface Props {
  colors: ColorStat[];
}

const props = defineProps<Props>();
const router = useRouter();

const hasCards = computed(() => {
  return props.colors.some(c => c.count > 0);
});

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
  color: var(--accent);
}

.color-distribution {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
