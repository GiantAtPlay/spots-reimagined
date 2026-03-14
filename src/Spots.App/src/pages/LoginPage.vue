<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GuestLayout from '../components/GuestLayout.vue';
import Button from '../components/Button.vue';

const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleLogin = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    router.push('/');
  }, 1000);
};
</script>

<template>
  <GuestLayout page-title="Login">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-subtitle">Sign in to continue to your collection</p>
      </div>

      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </Button>
      </form>

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
  @apply bg-content-bg backdrop-blur-sm rounded-lg border border-border p-8;
}

.auth-header {
  @apply text-center mb-8;
}

.auth-title {
  @apply text-2xl font-semibold mb-2;
}

.auth-subtitle {
  @apply text-text-secondary;
}

.auth-form {
  @apply space-y-4;
}

.form-group {
  @apply space-y-2;
}

.form-group label {
  @apply block text-sm font-medium;
}

.form-group input {
  @apply w-full px-4 py-3 rounded-sm bg-tile-bg border border-border text-text-primary placeholder-text-secondary transition-all duration-200;
}

.form-group input:focus {
  @apply outline-none border-accent;
}

.auth-form .btn {
  @apply w-full;
}

.auth-footer {
  @apply mt-6 text-center text-text-secondary text-sm;
}

.auth-footer a {
  @apply text-accent hover:underline;
}

.dev-nav {
  @apply mt-8 pt-4 border-t border-border text-center text-xs text-text-secondary;
}

.dev-nav a {
  @apply text-accent hover:underline;
}
</style>
