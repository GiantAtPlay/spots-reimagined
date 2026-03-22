<template>
  <ChartCard :title="title" :icon="icon">
    <div v-if="hasTrackers" class="tracker-list">
      <ProgressBar
        v-for="tracker in displayedTrackers"
        :key="tracker.id"
        :label="tracker.name"
        :percent="getTrackerStats(tracker).percentComplete"
      />
    </div>
    
    <EmptyState
      v-else
      variant="compact"
      :icon="icon"
      :message="emptyMessage"
    >
      <template #action>
        <Button 
          variant="primary" 
          size="small" 
          @click="navigateToTrackers"
        >
          {{ emptyCtaText }}
        </Button>
      </template>
    </EmptyState>
  </ChartCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ChartCard from '../ChartCard.vue';
import ProgressBar from './ProgressBar.vue';
import Button from '../Button.vue';
import EmptyState from '../EmptyState.vue';
import type { Tracker } from '@/data/mockTrackers';
import { getTrackerStats } from '@/data/mockTrackers';

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
.tracker-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
}

</style>
