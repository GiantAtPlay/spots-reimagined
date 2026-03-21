<template>
  <div class="chart-card">
    <div class="chart-title">
      <i :class="`fas fa-${icon}`"></i>
      {{ title }}
    </div>
    
    <div v-if="hasTrackers" class="tracker-list">
      <ProgressBar
        v-for="tracker in displayedTrackers"
        :key="tracker.id"
        :label="tracker.name"
        :percent="tracker.percentComplete"
      />
    </div>
    
    <div v-else class="empty-state">
      <p class="empty-message">{{ emptyMessage }}</p>
      <Button 
        variant="primary" 
        size="small" 
        @click="navigateToTrackers"
      >
        {{ emptyCtaText }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ProgressBar from './ProgressBar.vue';
import Button from '../Button.vue';
import type { Tracker } from '@/data/mockTrackers';

interface Props {
  title: string;
  icon: string;
  trackers: Tracker[];
  limit?: number;
  emptyMessage?: string;
  emptyCtaText?: string;
  emptyCtaRoute?: string;
}

const props = withDefaults(defineProps<Props>(), {
  limit: 5,
  emptyMessage: 'No trackers yet',
  emptyCtaText: 'View Trackers',
  emptyCtaRoute: '/trackers',
});

const router = useRouter();

const hasTrackers = computed(() => props.trackers.length > 0);

const displayedTrackers = computed(() => {
  return props.trackers.slice(0, props.limit);
});

const navigateToTrackers = () => {
  router.push(props.emptyCtaRoute);
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

.tracker-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
