<template>
  <div class="progress-bar-container">
    <span v-if="label" class="progress-label">{{ label }}</span>
    <div class="progress-track">
      <div 
        class="progress-fill"
        :style="{ 
          width: `${percentage}%`,
          background: color || 'var(--accent)'
        }"
      />
    </div>
    <span v-if="showValue" class="progress-value">{{ displayValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber } from '@/utils/formatters';

interface Props {
  label?: string;
  value?: number;
  max?: number;
  percent?: number;
  color?: string;
  showValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showValue: true,
});

const percentage = computed(() => {
  if (props.percent !== undefined) {
    return Math.min(100, Math.max(0, props.percent));
  }
  if (props.max && props.value !== undefined) {
    return Math.min(100, Math.max(0, (props.value / props.max) * 100));
  }
  return 0;
});

const displayValue = computed(() => {
  if (props.percent !== undefined) {
    return `${Math.round(props.percent)}%`;
  }
  if (props.value !== undefined) {
    return formatNumber(props.value);
  }
  return '0';
});
</script>

<style scoped>
.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-label {
  font-size: 13px;
  color: var(--text-secondary);
  min-width: 80px;
  flex-shrink: 0;
}

.progress-track {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-value {
  font-size: 13px;
  color: var(--text-primary);
  min-width: 50px;
  text-align: right;
  flex-shrink: 0;
}
</style>
