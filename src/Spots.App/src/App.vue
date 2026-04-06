<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from './components/AppLayout.vue';

const navSections = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', icon: 'th-large', route: '/' },
    ],
  },
  {
    title: 'Collection',
    items: [
      { label: 'View', icon: 'layer-group', route: '/collection' },
      { label: 'Add Cards', icon: 'plus-circle', route: '/collection/add' },
      { label: 'For Trade', icon: 'exchange-alt', route: '/collection?forTrade=true' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'Trackers', icon: 'tasks', route: '/trackers' },
      { label: 'Spots', icon: 'map-marker-alt', route: '/spots' },
      { label: 'Settings', icon: 'cog', route: '/settings' },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Users', icon: 'users', route: '/admin/users' },
      { label: 'System', icon: 'server', route: '/admin/system' },
    ],
  },
];

const guestRoutes = ['Login', 'LoggedOut', 'Setup'];

const route = useRoute();

const isGuestRoute = computed(() => {
  return guestRoutes.includes(route.name as string);
});

const pageTitle = computed(() => {
  const routeName = route.name as string;
  
  const titleMap: Record<string, string> = {
    'Dashboard': 'Dashboard',
    'Collection': 'Collection',
    'AddCards': 'Add Cards',
    'Trackers': 'Trackers',
    'Spots': 'Spots',
    'Settings': 'Settings',
    'Users': 'User Management',
    'System': 'System',
    'Login': 'Login',
    'LoggedOut': 'Logged Out',
    'Setup': 'Setup',
  };
  return titleMap[routeName] || 'Spots';
});

const handleAdd = () => {
  // TODO: open add-card flyout
};
</script>

<template>
  <AppLayout
    v-if="!isGuestRoute"
    :nav-sections="navSections"
    :page-title="pageTitle"
    @add="handleAdd"
  >
    <router-view />
  </AppLayout>
  <router-view v-else />
</template>
