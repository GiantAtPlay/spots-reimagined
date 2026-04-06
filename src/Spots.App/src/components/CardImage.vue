<script setup lang="ts">
import { computed } from 'vue';
import Icon from './Icon.vue';

interface Props {
  imageUrl?: string | null;
  cardName: string;
  colour: string;
  size?: 'small' | 'medium' | 'large';
}

const COLOUR_ICON_MAP: Record<string, string> = {
  white: 'sun',
  blue: 'tint',
  black: 'skull',
  red: 'fire',
  green: 'leaf',
  colourless: 'gavel',
  gold: 'bolt',
  land: 'turn-down',
};

const props = withDefaults(defineProps<Props>(), {
  size: 'medium'
});

const colourIcon = computed(() => COLOUR_ICON_MAP[props.colour] ?? 'question');

const sizeClass = computed(() => `card-image-${props.size}`);
</script>

<template>
  <div :class="['card-image-container', sizeClass]">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="cardName"
      class="card-image"
    />
    <Icon v-else :icon="colourIcon" class="colour-icon" />
  </div>
</template>

<style scoped>
.card-image-container {
  background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.colour-icon {
  color: var(--accent);
  opacity: 0.7;
}

/* Small size - for table rows */
.card-image-small {
  width: 40px;
  height: 56px;
}

.card-image-small :deep(svg) {
  width: 16px;
  height: 16px;
}

/* Medium size - for card detail flyout */
.card-image-medium {
  width: 100px;
  height: 140px;
}

.card-image-medium :deep(svg) {
  width: 32px;
  height: 32px;
}

/* Large size - for card tiles in grid view */
.card-image-large {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 0;
}

.card-image-large :deep(svg) {
  width: 48px;
  height: 48px;
}
</style>
