<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ChartCard from '../ChartCard.vue';
import ProgressBar from './ProgressBar.vue';
import Button from '../Button.vue';
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

<template>
  <ChartCard title="Color Distribution" icon="paint-brush">
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
  </ChartCard>
</template>

<style scoped>
.color-distribution {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
