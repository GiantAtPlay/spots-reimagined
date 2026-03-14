<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'tiny' | 'small' | 'default' | 'large';
  disabled?: boolean;
  icon?: string;
  iconOnly?: boolean;
  srText?: string;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'default',
  disabled: false,
  iconOnly: false,
  type: 'button'
});

const buttonClasses = computed(() => {
  const classes = ['btn', `btn-${props.variant}`, `btn-${props.size}`];
  
  if (props.iconOnly) {
    classes.push('btn-icon-only');
  }
  
  return classes.join(' ');
});

const showSrText = computed(() => props.iconOnly && props.srText);
</script>

<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled" 
    :type="type"
  >
    <font-awesome-icon v-if="icon" :icon="icon" />
    <span v-if="showSrText" class="sr-only">{{ srText }}</span>
    <slot v-if="!iconOnly"></slot>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;
}

.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Size variants - Fixed heights for consistency */
.btn-tiny {
  height: 24px;
  padding: 0 8px;
  font-size: 11px;
  gap: 4px;
}

.btn-tiny.btn-icon-only {
  width: 24px;
  padding: 0;
}

.btn-small {
  height: 30px;
  padding: 0 12px;
  font-size: 12px;
  gap: 6px;
}

.btn-small.btn-icon-only {
  width: 30px;
  padding: 0;
}

.btn-default {
  height: 45px;
  padding: 0 16px;
  font-size: 14px;
  gap: 8px;
}

.btn-default.btn-icon-only {
  width: 45px;
  padding: 0;
}

.btn-large {
  height: 60px;
  padding: 0 24px;
  font-size: 16px;
  gap: 10px;
}

.btn-large.btn-icon-only {
  width: 60px;
  padding: 0;
}

/* Primary variant */
.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--accent-secondary);
  border-color: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(155, 77, 202, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Secondary variant */
.btn-secondary {
  background: var(--tile-bg);
  border-color: var(--border);
  color: var(--text-primary);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Danger variant */
.btn-danger {
  background: var(--danger);
  border-color: var(--danger);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
  border-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-danger:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Icon-only variant removes text slot */
.btn-icon-only {
  font-size: 12px;
}

.btn-tiny.btn-icon-only {
  font-size: 10px;
}

.btn-large.btn-icon-only {
  font-size: 14px;
}

/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
