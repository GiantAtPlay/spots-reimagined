<script setup lang="ts">
import Icon from './Icon.vue';

defineProps<{
  title: string;
  icon: string;
}>();
</script>

<template>
  <div class="chart-card">
    <div class="chart-title">
      <Icon :icon="icon" />
      {{ title }}
    </div>
    <slot />
  </div>
</template>

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
</style>
