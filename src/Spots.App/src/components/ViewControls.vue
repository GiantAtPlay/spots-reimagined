<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';
import ButtonGroup from './ButtonGroup.vue';
import Icon from './Icon.vue';

const props = defineProps<{
  viewMode: 'grid' | 'list';
  gridSize: number;
}>();

const emit = defineEmits<{
  (e: 'update:viewMode', value: 'grid' | 'list'): void;
  (e: 'update:gridSize', value: number): void;
}>();

const gridSizeLabel = computed(() => {
  const labels: Record<number, string> = {
    3: 'Small',
    4: 'Medium',
    5: 'Large',
    6: 'XL',
    7: 'XXL',
    8: 'Max'
  };
  return labels[props.gridSize] || 'Medium';
});
</script>

<template>
  <div class="view-controls">
    <div v-if="viewMode === 'grid'" class="size-slider">
      <Icon icon="th" class="size-icon" />
      <input
        type="range"
        min="3"
        max="8"
        :value="gridSize"
        @input="emit('update:gridSize', parseInt(($event.target as HTMLInputElement).value))"
      />
      <span class="size-label">{{ gridSizeLabel }}</span>
    </div>

    <div class="view-toggle">
      <ButtonGroup>
        <Button
          :variant="viewMode === 'grid' ? 'primary' : 'secondary'"
          size="default"
          icon="th-large"
          icon-only
          :bounce="false"
          sr-text="Grid view"
          @click="emit('update:viewMode', 'grid')"
        />
        <Button
          :variant="viewMode === 'list' ? 'primary' : 'secondary'"
          size="default"
          icon="list"
          icon-only
          :bounce="false"
          sr-text="List view"
          @click="emit('update:viewMode', 'list')"
        />
      </ButtonGroup>
    </div>
  </div>
</template>

<style scoped>
.view-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.size-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.size-icon {
  color: var(--text-secondary);
}

.size-icon :deep(svg) {
  width: 14px;
  height: 14px;
}

.size-slider input[type="range"] {
  width: 80px;
  accent-color: var(--accent);
}

.size-label {
  font-size: 13px;
  color: var(--text-primary);
  width: 45px;
  text-align: center;
}
</style>
