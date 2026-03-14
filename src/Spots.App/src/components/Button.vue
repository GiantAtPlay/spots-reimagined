<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  size?: 'default' | 'small';
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
  const classes = ['btn'];
  
  if (props.variant === 'icon') {
    classes.push('btn-icon');
  } else if (props.iconOnly) {
    classes.push('btn-icon-only');
  } else {
    classes.push(`btn-${props.variant}`);
  }
  
  if (props.size === 'small') {
    classes.push('btn-small');
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
  gap: 8px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Size variants */
.btn-small {
  padding: 6px 12px;
  font-size: 12px;
  gap: 4px;
}

.btn-small .btn-primary,
.btn-small .btn-secondary,
.btn-small .btn-danger {
  padding: 6px 12px;
}

/* Primary variant */
.btn-primary {
  padding: 12px 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(155, 77, 202, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Secondary variant */
.btn-secondary {
  padding: 12px 16px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
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
  padding: 12px 16px;
  background: var(--danger);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-danger:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Icon variant (small icon buttons for actions) */
.btn-icon {
  width: 32px;
  height: 32px;
  padding: 0;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 12px;
}

.btn-icon:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.btn-icon.btn-danger:hover:not(:disabled) {
  border-color: var(--danger);
  color: var(--danger);
  background: var(--tile-bg);
}

.btn-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Icon-only variant (for buttons with text but styled as icon buttons) */
.btn-icon-only {
  width: 32px;
  height: 32px;
  padding: 0;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 12px;
}

.btn-icon-only:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.btn-icon-only:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
