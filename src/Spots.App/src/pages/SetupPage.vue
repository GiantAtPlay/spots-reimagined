<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GuestLayout from '../components/GuestLayout.vue';

const router = useRouter();
const currentStep = ref(1);
const isLoading = ref(false);

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const handleSubmit = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    router.push('/');
  }, 1000);
};

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<template>
  <GuestLayout page-title="Initial Setup">
    <div class="auth-card">
      <div class="setup-header">
        <h1 class="auth-title">Let's get started</h1>
        <p class="auth-subtitle">Create your account to start tracking your collection</p>
      </div>

      <div class="steps">
        <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
          <div class="step-number">1</div>
          <span>Account</span>
        </div>
        <div class="step-line" :class="{ active: currentStep > 1 }"></div>
        <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
          <div class="step-number">2</div>
          <span>Preferences</span>
        </div>
        <div class="step-line" :class="{ active: currentStep > 2 }"></div>
        <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
          <div class="step-number">3</div>
          <span>Data</span>
        </div>
        <div class="step-line" :class="{ active: currentStep > 3 }"></div>
        <div class="step" :class="{ active: currentStep >= 4 }">
          <div class="step-number">4</div>
          <span>Done</span>
        </div>
      </div>

      <form class="auth-form" @submit.prevent="handleSubmit">
        <div v-if="currentStep === 1" class="step-content">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Choose a username"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <div v-else-if="currentStep === 2" class="step-content">
          <p class="step-description">Configure your default preferences</p>
          
          <div class="form-group">
            <label>Default View</label>
            <select class="form-select">
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </select>
          </div>

          <div class="form-group">
            <label>Currency</label>
            <select class="form-select">
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
            </select>
          </div>
        </div>

        <div v-else-if="currentStep === 3" class="step-content">
          <p class="step-description">Import your collection data</p>
          
          <div class="import-options">
            <div class="import-option">
              <div class="import-icon">
                <font-awesome-icon icon="file-import" />
              </div>
              <div class="import-info">
                <span class="import-title">Import from CSV</span>
                <span class="import-desc">Upload a CSV file with your collection</span>
              </div>
            </div>
            
            <div class="import-option">
              <div class="import-icon">
                <font-awesome-icon icon="database" />
              </div>
              <div class="import-info">
                <span class="import-title">Import from Deckbox</span>
                <span class="import-desc">Import your Deckbox export</span>
              </div>
            </div>
            
            <div class="import-option">
              <div class="import-icon">
                <font-awesome-icon icon="snowflake" />
              </div>
              <div class="import-info">
                <span class="import-title">Start Fresh</span>
                <span class="import-desc">Begin with an empty collection</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="currentStep === 4" class="step-content">
          <div class="success-icon">
            <font-awesome-icon icon="check" />
          </div>
          <p class="success-text">You're all set!</p>
          <p class="success-subtext">Click below to start using Spots</p>
        </div>

        <div class="form-actions">
          <button
            v-if="currentStep > 1"
            type="button"
            class="btn btn-secondary"
            @click="prevStep"
          >
            Back
          </button>
          <button
            v-if="currentStep < 4"
            type="button"
            class="btn btn-primary"
            @click="nextStep"
          >
            Continue
          </button>
          <button
            v-else
            type="submit"
            class="btn btn-primary"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Creating account...' : 'Get Started' }}
          </button>
        </div>
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

.setup-header {
  @apply text-center mb-6;
}

.auth-title {
  @apply text-2xl font-semibold mb-2;
}

.auth-subtitle {
  @apply text-text-secondary;
}

.steps {
  @apply flex items-center justify-center mb-8;
}

.step {
  @apply flex flex-col items-center gap-2;
}

.step-number {
  @apply w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
}

.step.active .step-number {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.step.completed .step-number {
  background: var(--success);
  border-color: var(--success);
  color: white;
}

.step span {
  @apply text-xs text-text-secondary;
}

.step.active span {
  @apply text-accent;
}

.step-line {
  @apply w-12 h-0.5 mx-2;
  background: var(--border);
}

.step-line.active {
  background: var(--accent);
}

.step-content {
  @apply space-y-4;
}

.step-description {
  @apply text-text-secondary text-sm mb-4;
}

.form-group {
  @apply space-y-2;
}

.form-group label {
  @apply block text-sm font-medium;
}

.form-group input,
.form-select {
  @apply w-full px-4 py-3 rounded-sm bg-tile-bg border border-border text-text-primary transition-all duration-200;
}

.form-group input:focus,
.form-select:focus {
  @apply outline-none border-accent;
}

.form-select {
  @apply cursor-pointer;
}

.form-actions {
  @apply flex gap-3 mt-6;
}

.form-actions .btn {
  @apply flex-1 py-3 rounded-sm font-medium transition-all duration-200;
}

.btn-primary {
  @apply text-white;
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-secondary {
  @apply bg-tile-bg border border-border text-text-primary;
}

.btn-secondary:hover {
  @apply border-accent;
}

.success-icon {
  @apply w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center;
  background: rgba(16, 185, 129, 0.15);
}

.success-icon :deep(svg) {
  @apply text-3xl text-success;
}

.success-text {
  @apply text-xl font-semibold text-center mb-2;
}

.success-subtext {
  @apply text-text-secondary text-center;
}

.import-options {
  @apply space-y-3;
}

.import-option {
  @apply flex items-center gap-4 p-4 rounded-sm bg-tile-bg border border-border cursor-pointer transition-all duration-200;
}

.import-option:hover {
  @apply border-accent bg-tile-hover;
}

.import-icon {
  @apply w-10 h-10 rounded-sm flex items-center justify-center;
  background: rgba(155, 77, 202, 0.15);
}

.import-icon :deep(svg) {
  @apply text-lg text-accent;
}

.import-info {
  @apply flex flex-col;
}

.import-title {
  @apply text-sm font-medium;
}

.import-desc {
  @apply text-xs text-text-secondary;
}

.dev-nav {
  @apply mt-8 pt-4 border-t border-border text-center text-xs text-text-secondary;
}

.dev-nav a {
  @apply text-accent hover:underline;
}
</style>
