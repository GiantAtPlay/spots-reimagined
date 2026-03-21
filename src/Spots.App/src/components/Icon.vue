<template>
  <font-awesome-icon 
    :icon="icon" 
    :class="iconClasses"
    :style="iconStyle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * Icon size variants
 * - xs: Extra small (0.75em / ~12px)
 * - sm: Small (0.875em / ~14px)
 * - md: Medium (1em / ~16px) - default
 * - lg: Large (1.25em / ~20px)
 * - xl: Extra large (1.5em / ~24px)
 * - 2x: 2x size (2em / ~32px)
 * - 3x: 3x size (3em / ~48px)
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2x' | '3x';

interface Props {
  /** 
   * FontAwesome icon name (e.g., "clone", "dollar-sign", "star")
   * Must be registered in main.ts library.add()
   */
  icon: string;
  
  /** 
   * Size variant for the icon
   * Uses em units for relative sizing (scales with parent font-size)
   * @default 'md'
   */
  size?: IconSize;
  
  /** 
   * Custom color for the icon
   * Accepts any valid CSS color value (hex, rgb, var(), etc.)
   * When undefined, inherits color from parent element
   * @example '#ff416c'
   * @example 'var(--accent)'
   * @example 'rgb(255, 65, 108)'
   */
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

/**
 * Computed classes for the icon based on size prop
 */
const iconClasses = computed(() => {
  const classes = ['icon'];
  if (props.size && props.size !== 'md') {
    classes.push(`icon-${props.size}`);
  }
  return classes.join(' ');
});

/**
 * Computed inline styles for the icon
 * Only includes color if explicitly provided
 */
const iconStyle = computed(() => {
  if (props.color) {
    return { color: props.color };
  }
  return undefined;
});
</script>

<style scoped>
.icon {
  display: inline-block;
}

/* Size variants using em units for relative scaling */
.icon-xs { font-size: 0.75em; }   /* ~12px at base 16px */
.icon-sm { font-size: 0.875em; }  /* ~14px */
.icon-md { font-size: 1em; }      /* ~16px (default) */
.icon-lg { font-size: 1.25em; }   /* ~20px */
.icon-xl { font-size: 1.5em; }    /* ~24px */
.icon-2x { font-size: 2em; }      /* ~32px */
.icon-3x { font-size: 3em; }      /* ~48px */
</style>
