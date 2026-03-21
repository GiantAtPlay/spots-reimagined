<script setup lang="ts">
import { useRoute } from 'vue-router';
import Icon from './Icon.vue';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

defineProps<{
  sections: NavSection[];
}>();

const emit = defineEmits<{
  (e: 'navigate', route: string): void;
}>();

const route = useRoute();

const isActive = (itemRoute?: string): boolean => {
  if (!itemRoute) return false;

  const [targetPath, queryString] = itemRoute.split('?');
  if (route.path !== targetPath) return false;
  if (!queryString) return true;

  const params = new URLSearchParams(queryString);
  return Array.from(params.entries()).every(([key, value]) => route.query[key] === value);
};

const handleNavigate = (item: NavItem) => {
  if (item.route) {
    emit('navigate', item.route);
  }
};
</script>

<template>
  <nav class="nav-panel">
    <div class="nav-logo">
      <div class="logo-icon">
        <Icon icon="cube" />
      </div>
      <span class="logo-text">Spots</span>
    </div>

    <div
      v-for="(section, index) in sections"
      :key="index"
      class="nav-section"
    >
      <div
        v-if="section.title"
        class="nav-section-title"
      >
        {{ section.title }}
      </div>

      <a
        v-for="item in section.items"
        :key="item.route || item.label"
        class="nav-item"
        :class="{ active: isActive(item.route) }"
        @click="handleNavigate(item)"
      >
        <Icon :icon="item.icon" />
        <span>{{ item.label }}</span>
      </a>
    </div>

    <div class="nav-footer">
      <a
        class="nav-item"
        @click="handleNavigate({ route: '/logged-out', label: 'Logout', icon: 'sign-out-alt' })"
      >
        <Icon icon="sign-out-alt" />
        <span>Logout</span>
      </a>
    </div>
  </nav>
</template>
