<template>
  <div class="stat-card completion-card">
    <div class="stat-icon">
      <i class="fas fa-trophy"></i>
    </div>
    <div class="stat-label">Completion Progress</div>
    <div class="completion-stats">
      <div class="completion-row">
        <span class="completion-label">Sets Complete</span>
        <span class="completion-value">{{ setsComplete }} / {{ totalSets }}</span>
        <div class="completion-bar">
          <div 
            class="completion-fill" 
            :style="{ width: `${setsPercentage}%` }"
          />
        </div>
      </div>
      <div class="completion-row">
        <span class="completion-label">Trackers Complete</span>
        <span class="completion-value">{{ trackersComplete }} / {{ totalTrackers }}</span>
        <div class="completion-bar">
          <div 
            class="completion-fill" 
            :style="{ width: `${trackersPercentage}%` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  setsComplete: number;
  totalSets: number;
  trackersComplete: number;
  totalTrackers: number;
}

const props = defineProps<Props>();

const setsPercentage = computed(() => {
  if (props.totalSets === 0) return 0;
  return Math.round((props.setsComplete / props.totalSets) * 100);
});

const trackersPercentage = computed(() => {
  if (props.totalTrackers === 0) return 0;
  return Math.round((props.trackersComplete / props.totalTrackers) * 100);
});
</script>

<style scoped>
.stat-card {
  background: var(--tile-bg);
  border-radius: var(--radius);
  padding: 24px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  background: var(--tile-hover);
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  background: rgba(155, 77, 202, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 20px;
  color: var(--accent);
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.completion-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.completion-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
}

.completion-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.completion-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  grid-column: 2;
  grid-row: 1;
}

.completion-bar {
  grid-column: 1 / -1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 4px;
}

.completion-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
  border-radius: 3px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
