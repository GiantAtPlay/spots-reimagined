<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  icon?: string;
}>();
</script>

<template>
  <span class="badge" :class="[`badge-${variant || 'primary'}`]">
    <font-awesome-icon v-if="icon" :icon="icon" class="badge-icon" />
    <slot />
  </span>
</template>

<style scoped>
.badge {
  @apply inline-flex items-center gap-1.5 text-xs px-2 py-1 font-medium rounded-sm;
}

.badge-icon {
  @apply text-[10px];
}

.badge-primary {
  background: rgba(155, 77, 202, 0.15);
  color: var(--accent);
}

.badge-secondary {
  background: rgba(148, 163, 184, 0.15);
  color: var(--text-secondary);
}

.badge-success {
  background: rgba(16, 185, 129, 0.15);
  color: var(--success);
}

.badge-warning {
  background: rgba(245, 158, 11, 0.15);
  color: var(--warning);
}

.badge-danger {
  background: rgba(239, 68, 68, 0.15);
  color: var(--danger);
}
</style>
