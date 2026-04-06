<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSettingsStore } from '../stores/settings';
import Navigation from './Navigation.vue';
import TopBar from './TopBar.vue';
import Flyout from './Flyout.vue';

interface NavSection {
  title?: string;
  items: {
    label: string;
    icon: string;
    route?: string;
  }[];
}

defineProps<{
  navSections: NavSection[];
  pageTitle: string;
}>();

const router = useRouter();
const route = useRoute();
const settingsStore = useSettingsStore();

const isDarkTheme = computed(() => settingsStore.theme === 'dark');

const adminBadge = computed(() => {
  const path = route.path;
  if (path.startsWith('/admin')) {
    return 'Admin';
  }
  return undefined;
});

const adminBadgeIcon = computed(() => {
  const path = route.path;
  if (path.startsWith('/admin')) {
    return 'user-shield';
  }
  return undefined;
});

const handleNavigate = (routePath: string) => {
  router.push(routePath);
};

defineEmits<{
  (e: 'add'): void;
}>();
</script>

<template>
  <div class="app-container">
    <Navigation
      :sections="navSections"
      @navigate="handleNavigate"
    />

    <main class="main-content">
      <TopBar
        :title="pageTitle"
        :is-dark-theme="isDarkTheme"
        :badge="adminBadge"
        :badge-icon="adminBadgeIcon"
        @add="$emit('add')"
        @toggle-theme="settingsStore.toggleTheme"
      />

      <div class="content-area">
        <slot />
      </div>
    </main>

    <Flyout />
  </div>
</template>
