<script setup lang="ts">
import { useRouter } from 'vue-router';
import GuestLayout from '../components/GuestLayout.vue';
import Button from '../components/Button.vue';

const router = useRouter();

const handleLogin = () => {
  router.push('/login');
};
</script>

<template>
  <GuestLayout page-title="Logged Out">
    <div class="auth-card">
      <div class="auth-header">
        <div class="logout-icon">
          <font-awesome-icon icon="sign-out-alt" />
        </div>
        <h1 class="auth-title">You've been logged out</h1>
        <p class="auth-subtitle">Your session has ended. We hope to see you again soon!</p>
      </div>

      <Button
        variant="primary"
        @click="handleLogin"
      >
        Sign in again
      </Button>

      <div class="dev-nav">
        <span>Dev: </span>
        <router-link to="/login">Login</router-link> |
        <router-link to="/logged-out">Logged Out</router-link> |
        <router-link to="/setup">Setup</router-link> |
        <router-link to="/">App</router-link>
      </div>
    </div>
  </GuestLayout>
</template>

<style scoped>
.auth-card {
  @apply bg-content-bg backdrop-blur-sm rounded-lg border border-border p-8 text-center;
}

.auth-header {
  @apply mb-8;
}

.logout-icon {
  @apply w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center;
  background: rgba(155, 77, 202, 0.15);
}

.logout-icon :deep(svg) {
  @apply text-3xl text-accent;
}

.auth-title {
  @apply text-2xl font-semibold mb-2;
}

.auth-subtitle {
  @apply text-text-secondary;
}

.auth-card .btn {
  @apply w-full;
}

.dev-nav {
  @apply mt-8 pt-4 border-t border-border text-center text-xs text-text-secondary;
}

.dev-nav a {
  @apply text-accent hover:underline;
}
</style>
