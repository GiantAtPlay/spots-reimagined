<script setup lang="ts">
// ButtonGroup wrapper component
// Removes internal borders and gaps between buttons
// Used for segmented controls like view switchers
</script>

<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  overflow: hidden;
}

.button-group :deep(.btn) {
  border-radius: 0;
  border: none;
  border-right: 1px solid var(--border);
}

.button-group :deep(.btn:last-child) {
  border-right: none;
}

.button-group :deep(.btn:focus-visible) {
  z-index: 1;
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}
</style>
