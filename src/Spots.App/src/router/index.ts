import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/DashboardPage.vue'),
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../pages/CollectionPage.vue'),
  },
  {
    path: '/collection/add',
    name: 'AddCards',
    component: () => import('../pages/AddCardsPage.vue'),
  },
  {
    path: '/collection/trade',
    name: 'ForTrade',
    redirect: {
      path: '/collection',
      query: {
        forTrade: 'true',
      },
    },
  },
  {
    path: '/trackers',
    name: 'Trackers',
    component: () => import('../pages/TrackersPage.vue'),
  },
  {
    path: '/trackers/create',
    name: 'CreateTracker',
    component: () => import('../pages/trackers/CreateTrackerPage.vue'),
  },
  {
    path: '/trackers/:id',
    name: 'TrackerDetail',
    component: () => import('../pages/trackers/TrackerDetailPage.vue'),
  },
  {
    path: '/spots',
    name: 'Spots',
    component: () => import('../pages/SpotsPage.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/SettingsPage.vue'),
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: () => import('../pages/admin/UsersPage.vue'),
  },
  {
    path: '/admin/system',
    name: 'System',
    component: () => import('../pages/admin/SystemPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginPage.vue'),
  },
  {
    path: '/logged-out',
    name: 'LoggedOut',
    component: () => import('../pages/LoggedOutPage.vue'),
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import('../pages/SetupPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
