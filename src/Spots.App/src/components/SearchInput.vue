<script setup lang="ts">
import Icon from './Icon.vue';

withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    /** 'inline' = icon floats over padded input (toolbar style)
     *  'wrap'   = flex container with icon beside input (standalone style) */
    variant?: 'inline' | 'wrap';
  }>(),
  {
    placeholder: 'Search...',
    variant: 'wrap',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit'): void;
  (e: 'clear'): void;
}>();
</script>

<template>
  <!-- Wrap variant: border on outer container, icon + input side-by-side -->
  <div v-if="variant === 'wrap'" class="search-wrap" :class="{ 'has-value': modelValue }">
    <Icon icon="search" class="search-icon" />
    <input
      :value="modelValue"
      type="text"
      class="search-field"
      :placeholder="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keydown.enter="emit('submit')"
    />
    <button
      v-if="modelValue"
      type="button"
      class="search-clear"
      @click="emit('update:modelValue', ''); emit('clear')"
    >
      <Icon icon="times" />
    </button>
  </div>

  <!-- Inline variant: icon absolutely positioned inside padded input -->
  <div v-else class="search-inline">
    <Icon icon="search" class="search-icon-abs" />
    <input
      :value="modelValue"
      type="text"
      class="search-field-inline"
      :placeholder="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keydown.enter="emit('submit')"
    />
  </div>
</template>

<style scoped>
/* ── Wrap variant ──────────────────────────────────────────── */
.search-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 12px;
  height: 40px;
  transition: border-color 0.2s ease;
}

.search-wrap:focus-within {
  border-color: var(--accent);
}

.search-icon {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.search-icon :deep(svg) {
  width: 13px;
  height: 13px;
}

.search-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 14px;
  min-width: 0;
}

.search-field::placeholder {
  color: var(--text-secondary);
}

.search-clear {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.search-clear :deep(svg) {
  width: 12px;
  height: 12px;
}

.search-clear:hover {
  color: var(--text-primary);
}

/* ── Inline variant ────────────────────────────────────────── */
.search-inline {
  position: relative;
  width: 100%;
}

.search-icon-abs {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
}

.search-icon-abs :deep(svg) {
  width: 14px;
  height: 14px;
}

.search-field-inline {
  width: 100%;
  padding: 10px 16px 10px 40px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-field-inline:focus {
  border-color: var(--accent);
}

.search-field-inline::placeholder {
  color: var(--text-secondary);
}
</style>
