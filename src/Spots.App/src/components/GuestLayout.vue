<script setup lang="ts">
import { computed } from 'vue';
import Icon from './Icon.vue';
import { useSettingsStore } from '../stores/settings';

defineProps<{
  pageTitle: string;
}>();

const settingsStore = useSettingsStore();

const isDarkTheme = computed(() => settingsStore.theme === 'dark');
</script>

<template>
  <div class="guest-container">
    <header class="guest-header">
      <div class="guest-logo">
        <div class="logo-icon">
          <Icon icon="cube" />
        </div>
        <span class="logo-text">Spots</span>
      </div>
      <button
        class="icon-btn"
        title="Toggle Theme"
        aria-label="Toggle Theme"
        @click="settingsStore.toggleTheme"
      >
        <Icon :icon="isDarkTheme ? 'moon' : 'sun'" />
      </button>
    </header>

    <main class="guest-main">
      <div class="guest-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.guest-container {
  @apply min-h-screen flex flex-col;
  background: var(--bg-gradient);
}

.guest-header {
  @apply flex justify-between items-center p-6;
}

.guest-logo {
  @apply flex items-center gap-3;
}

.logo-icon {
  @apply w-10 h-10 rounded-sm flex items-center justify-center;
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
}

.logo-text {
  @apply text-2xl font-bold;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.guest-main {
  @apply flex-1 flex items-center justify-center p-6;
}

.guest-content {
  @apply w-full max-w-md;
}

.icon-btn {
  @apply w-10 h-10 rounded-sm bg-tile-bg border border-border text-text-secondary flex items-center justify-center transition-all duration-200;
}

.icon-btn:hover {
  @apply bg-tile-hover text-accent border-accent;
}
</style>
