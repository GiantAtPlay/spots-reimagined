<template>
  <label class="option-chip" :class="{ active: modelValue }">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<style scoped>
.option-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  font-size: 13px;
  color: var(--text-primary);
  background: var(--tile-bg);
  cursor: pointer;
}

.option-chip input {
  margin: 0;
}

.option-chip.active {
  border-color: var(--accent);
  background: rgba(155, 77, 202, 0.12);
}
</style>
