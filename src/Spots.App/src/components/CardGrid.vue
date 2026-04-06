<template>
  <div class="card-grid" :style="{ '--card-grid-cols': cols }">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  cols?: number;
}>(), {
  cols: 5,
});
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--card-grid-cols, 5), 1fr);
  gap: 16px;
}

.card-grid > :deep(*) {
  min-width: 0;
}
</style>
