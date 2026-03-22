<script setup lang="ts">
import { computed } from 'vue';
import Badge from '../Badge.vue';
import Button from '../Button.vue';
import Icon from '../Icon.vue';
import ProgressBar from '../dashboard/ProgressBar.vue';
import type { Tracker } from '../../data/mockTrackers';
import { getTrackerStats } from '../../data/mockTrackers';

const props = defineProps<{
  tracker: Tracker;
}>();

const emit = defineEmits<{
  (e: 'delete', tracker: Tracker): void;
}>();

const stats = computed(() => getTrackerStats(props.tracker));

const foilLabel: Record<string, string> = {
  'non-foil': 'Non-Foil',
  foil: 'Foil',
  any: 'Any',
};

const foilIcon: Record<string, string> = {
  'non-foil': 'box',
  foil: 'gem',
  any: 'layer-group',
};

const progressColour = computed(() => {
  const p = stats.value.percentComplete;
  if (p === 100) return 'var(--success)';
  if (p >= 75) return 'var(--accent)';
  return 'var(--accent)';
});

const handleDelete = (e: MouseEvent) => {
  e.stopPropagation();
  emit('delete', props.tracker);
};
</script>

<template>
  <div class="tracker-card">
    <div class="tracker-card-header">
      <div class="tracker-card-title-row">
        <h3 class="tracker-card-name">{{ tracker.name }}</h3>
        <Button
          variant="secondary"
          size="tiny"
          icon="trash"
          icon-only
          sr-text="Delete tracker"
          class="delete-btn"
          @click="handleDelete"
        />
      </div>
      <div class="tracker-card-badges">
        <Badge variant="secondary" :icon="tracker.type === 'set' ? 'layer-group' : 'list'">
          {{ tracker.type === 'set' ? 'Set' : 'Custom' }}
        </Badge>
        <Badge variant="secondary" :icon="foilIcon[tracker.foilPreference]">
          {{ foilLabel[tracker.foilPreference] }}
        </Badge>
        <Badge v-if="stats.isComplete" variant="success" icon="check-circle">
          Complete
        </Badge>
      </div>
    </div>

    <div class="tracker-card-progress">
      <ProgressBar
        :value="stats.collectedCards"
        :max="stats.totalCards"
        :percent="stats.percentComplete"
        :color="progressColour"
        :show-value="false"
      />
    </div>

    <div class="tracker-card-footer">
      <span class="tracker-stat">
        <Icon icon="check" class="stat-icon stat-icon--collected" />
        {{ stats.collectedCards }} / {{ stats.totalCards }} cards
      </span>
      <span class="tracker-percent" :class="{ 'tracker-percent--complete': stats.isComplete }">
        {{ stats.percentComplete }}%
      </span>
    </div>
  </div>
</template>

<style scoped>
.tracker-card {
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tracker-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.tracker-card:hover .delete-btn {
  opacity: 1;
}

.tracker-card-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tracker-card-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.tracker-card-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.tracker-card-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tracker-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tracker-stat {
  font-size: 12px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 5px;
}

.stat-icon {
  font-size: 10px;
}

.stat-icon--collected {
  color: var(--success);
}

.tracker-percent {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}

.tracker-percent--complete {
  color: var(--success);
}
</style>
