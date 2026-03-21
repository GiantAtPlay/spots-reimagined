<template>
  <div class="stat-card">
    <div class="stat-icon" :class="`stat-icon-${variant}`">
      <Icon :icon="icon" />
    </div>
    <div class="stat-label">{{ label }}</div>
    <div class="stat-value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon.vue';

interface Props {
  icon: string;
  label: string;
  value: string | number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
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

.stat-icon-success {
  background: rgba(16, 185, 129, 0.15);
  color: var(--success);
}

.stat-icon-warning {
  background: rgba(245, 158, 11, 0.15);
  color: var(--warning);
}

.stat-icon-danger {
  background: rgba(239, 68, 68, 0.15);
  color: var(--danger);
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
}
</style>
