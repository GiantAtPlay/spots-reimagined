<template>
  <div class="dashboard-page">
    <!-- Stat Cards Row -->
    <div class="stats-grid">
      <StatCard
        icon="cards"
        label="Total Cards"
        :value="formatNumber(stats.totalCards)"
      />
      <StatCard
        icon="dollar-sign"
        label="Collection Value"
        :value="formatCurrency(stats.collectionValue)"
        variant="success"
      />
      <StatCard
        icon="palette"
        label="Unique Cards"
        :value="formatNumber(stats.totalUniqueCards)"
      />
      <CompletionStatsCard
        :sets-complete="stats.setsComplete"
        :total-sets="stats.totalSets"
        :trackers-complete="stats.trackersComplete"
        :total-trackers="stats.totalTrackers"
      />
    </div>

    <!-- Charts Row 1: Color Distribution & Rarity Breakdown -->
    <div class="charts-row-1">
      <ColorDistributionCard :colors="stats.colorDistribution" />
      <RarityBreakdownCard :rarities="stats.rarityDistribution" />
    </div>

    <!-- Charts Row 2: Top Valuable Cards & Trackers Near Completion -->
    <div class="charts-row-2">
      <TopValuableCardsCard :cards="stats.topValuableCards" />
      <TrackerProgressCard
        title="Trackers Near Completion"
        icon="tasks"
        :trackers="trackersNearCompletion"
        :limit="5"
        empty-message="No trackers in progress"
        empty-cta-text="Create Tracker"
        empty-cta-route="/trackers"
      />
    </div>

    <!-- Charts Row 3: Complete Trackers -->
    <div class="charts-row-3">
      <TrackerProgressCard
        title="Complete Trackers"
        icon="check-circle"
        :trackers="trackersComplete"
        :limit="5"
        empty-message="No completed trackers yet"
        empty-cta-text="View All Trackers"
        empty-cta-route="/trackers"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { mockDashboardStats } from '@/data/mockDashboardStats';
import { mockTrackers } from '@/data/mockTrackers';
import { formatNumber, formatCurrency } from '@/utils/formatters';
import StatCard from '@/components/dashboard/StatCard.vue';
import CompletionStatsCard from '@/components/dashboard/CompletionStatsCard.vue';
import ColorDistributionCard from '@/components/dashboard/ColorDistributionCard.vue';
import RarityBreakdownCard from '@/components/dashboard/RarityBreakdownCard.vue';
import TopValuableCardsCard from '@/components/dashboard/TopValuableCardsCard.vue';
import TrackerProgressCard from '@/components/dashboard/TrackerProgressCard.vue';

const stats = computed(() => mockDashboardStats);

const trackersNearCompletion = computed(() => {
  return mockTrackers
    .filter(t => !t.isComplete && t.percentComplete >= 75)
    .sort((a, b) => b.percentComplete - a.percentComplete);
});

const trackersComplete = computed(() => {
  return mockTrackers
    .filter(t => t.isComplete)
    .sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  animation: fadeIn 0.5s ease-out;
}

.stats-grid > * {
  animation: fadeIn 0.5s ease-out backwards;
}

.stats-grid > *:nth-child(1) { animation-delay: 0.1s; }
.stats-grid > *:nth-child(2) { animation-delay: 0.15s; }
.stats-grid > *:nth-child(3) { animation-delay: 0.2s; }
.stats-grid > *:nth-child(4) { animation-delay: 0.25s; }

.charts-row-1 {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.charts-row-1 > * {
  animation: fadeIn 0.5s ease-out backwards;
}

.charts-row-1 > *:nth-child(1) { animation-delay: 0.3s; }
.charts-row-1 > *:nth-child(2) { animation-delay: 0.35s; }

.charts-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.charts-row-2 > * {
  animation: fadeIn 0.5s ease-out backwards;
}

.charts-row-2 > *:nth-child(1) { animation-delay: 0.4s; }
.charts-row-2 > *:nth-child(2) { animation-delay: 0.45s; }

.charts-row-3 {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.charts-row-3 > * {
  animation: fadeIn 0.5s ease-out backwards;
  animation-delay: 0.5s;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Tablet Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-row-1,
  .charts-row-2,
  .charts-row-3 {
    grid-template-columns: 1fr;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
