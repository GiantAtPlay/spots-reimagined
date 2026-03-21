<script setup lang="ts">
import Badge from './Badge.vue';
import Icon from './Icon.vue';

defineProps<{
  title: string;
  isDarkTheme: boolean;
  badge?: string;
  badgeIcon?: string;
}>();

defineEmits<{
  (e: 'add'): void;
  (e: 'toggle-theme'): void;
}>();
</script>

<template>
  <header class="top-bar">
    <h1 class="page-title">
      {{ title }}
      <Badge v-if="badge" variant="primary" :icon="badgeIcon">
        {{ badge }}
      </Badge>
    </h1>
    <div class="top-bar-actions">
      <button
        class="icon-btn"
        title="Add"
        @click="$emit('add')"
      >
        <Icon icon="plus" />
      </button>
      <button
        class="icon-btn"
        title="Toggle Theme"
        @click="$emit('toggle-theme')"
      >
        <Icon :icon="isDarkTheme ? 'moon' : 'sun'" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.page-title {
  @apply text-[28px] font-semibold flex items-center gap-3;
}
</style>
