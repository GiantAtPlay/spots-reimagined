<template>
  <font-awesome-icon 
    :icon="icon" 
    :class="iconClasses"
    :style="iconStyle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2x' | '3x';

interface Props {
  icon: string;
  size?: IconSize;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const iconClasses = computed(() => {
  const classes = ['icon'];
  if (props.size && props.size !== 'md') {
    classes.push(`icon-${props.size}`);
  }
  return classes.join(' ');
});

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

.icon-xs { font-size: 0.75em; }
.icon-sm { font-size: 0.875em; }
.icon-md { font-size: 1em; }
.icon-lg { font-size: 1.25em; }
.icon-xl { font-size: 1.5em; }
.icon-2x { font-size: 2em; }
.icon-3x { font-size: 3em; }
</style>
