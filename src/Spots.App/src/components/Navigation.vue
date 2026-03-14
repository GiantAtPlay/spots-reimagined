<script setup lang="ts">
import { useRoute } from 'vue-router';

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
  return route.path === itemRoute;
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
        <font-awesome-icon icon="cube" />
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
        <font-awesome-icon :icon="item.icon" />
        <span>{{ item.label }}</span>
      </a>
    </div>

    <div class="nav-footer">
      <a
        class="nav-item"
        @click="handleNavigate({ route: '/logged-out', label: 'Logout', icon: 'sign-out-alt' })"
      >
        <font-awesome-icon icon="sign-out-alt" />
        <span>Logout</span>
      </a>
    </div>
  </nav>
</template>
