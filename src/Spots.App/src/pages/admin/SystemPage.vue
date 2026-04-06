<template>
  <div>
    <div class="system-grid">
      <div class="system-card">
        <div class="card-header">
          <div class="card-icon">
            <Icon icon="cloud-download" />
          </div>
          <div class="card-title">
            <h3>Scryfall Data</h3>
            <p>Card database from Scryfall</p>
          </div>
        </div>
        <div class="card-content">
          <div class="info-row">
            <span class="info-label">Last Synced</span>
            <span class="info-value">2024-01-20 14:32</span>
          </div>
          <div class="info-row">
            <span class="info-label">Cards in Database</span>
            <span class="info-value">64,234</span>
          </div>
          <div class="info-row">
            <span class="info-label">Status</span>
            <span class="info-value">
              <span class="status-indicator status-success"></span>
              Up to date
            </span>
          </div>
        </div>
        <div class="card-actions">
          <Button variant="secondary">Sync Now</Button>
        </div>
      </div>

      <div class="system-card">
        <div class="card-header">
          <div class="card-icon">
            <Icon icon="dollar-sign" />
          </div>
          <div class="card-title">
            <h3>Price Data</h3>
            <p>Card price information</p>
          </div>
        </div>
        <div class="card-content">
          <div class="info-row">
            <span class="info-label">Last Updated</span>
            <span class="info-value">2024-01-20 12:00</span>
          </div>
          <div class="info-row">
            <span class="info-label">Source</span>
            <span class="info-value">Scryfall</span>
          </div>
          <div class="info-row">
            <span class="info-label">Status</span>
            <span class="info-value">
              <span class="status-indicator status-warning"></span>
              Updates available
            </span>
          </div>
        </div>
        <div class="card-actions">
          <Button variant="secondary">Update Prices</Button>
        </div>
      </div>

      <div class="system-card">
        <div class="card-header">
          <div class="card-icon">
            <Icon icon="database" />
          </div>
          <div class="card-title">
            <h3>Database</h3>
            <p>Backup and restore</p>
          </div>
        </div>
        <div class="card-content">
          <div class="info-row">
            <span class="info-label">Size</span>
            <span class="info-value">24.5 MB</span>
          </div>
          <div class="info-row">
            <span class="info-label">Last Backup</span>
            <span class="info-value">2024-01-19 22:00</span>
          </div>
          <div class="info-row">
            <span class="info-label">Location</span>
            <span class="info-value">/app/data/spots.db</span>
          </div>
        </div>
        <div class="card-actions">
          <Button variant="secondary">Download Backup</Button>
          <Button variant="secondary">Restore</Button>
        </div>
      </div>

      <div class="system-card danger-zone">
        <div class="card-header">
          <div class="card-icon danger">
            <Icon icon="exclamation-triangle" />
          </div>
          <div class="card-title">
            <h3>Reset Application</h3>
            <p>Irreversible actions</p>
          </div>
        </div>
        <div class="card-content">
          <p class="warning-text">
            Resetting the application will delete all data and restore it to its initial state. This action cannot be undone.
          </p>
        </div>
        <div class="card-actions">
          <Button variant="danger">Reset App</Button>
        </div>
      </div>
    </div>

    <div v-if="isDev" class="dev-nav">
      <span>Dev: </span>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/admin/users">Users</router-link> |
      <router-link to="/admin/system">System</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../../components/Button.vue';
import Icon from '../../components/Icon.vue';

const isDev = import.meta.env.DEV;
</script>

<style scoped>
.system-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.system-card {
  @apply bg-tile-bg rounded-lg border border-border p-6;
}

.system-card.danger-zone {
  @apply border-danger;
}

.card-header {
  @apply flex items-start gap-4 mb-4;
}

.card-icon {
  @apply w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0;
  background: rgba(155, 77, 202, 0.15);
}

.card-icon :deep(svg) {
  @apply text-xl text-accent;
}

.card-icon.danger {
  background: rgba(239, 68, 68, 0.15);
}

.card-icon.danger :deep(svg) {
  @apply text-danger;
}

.card-title h3 {
  @apply text-lg font-semibold mb-1;
}

.card-title p {
  @apply text-sm text-text-secondary;
}

.card-content {
  @apply mb-4;
}

.info-row {
  @apply flex justify-between items-center py-2 border-b border-border;
}

.info-row:last-child {
  @apply border-b-0;
}

.info-label {
  @apply text-sm text-text-secondary;
}

.info-value {
  @apply text-sm font-medium flex items-center gap-2;
}

.status-indicator {
  @apply w-2 h-2 rounded-full;
}

.status-success {
  @apply bg-success;
}

.status-warning {
  @apply bg-warning;
}

.status-danger {
  @apply bg-danger;
}

.card-actions {
  @apply flex gap-3;
}

.card-actions .btn {
  @apply flex-1;
}

.warning-text {
  @apply text-sm text-text-secondary;
}

.dev-nav {
  @apply mt-8 pt-4 border-t border-border text-center text-xs text-text-secondary;
}

.dev-nav a {
  @apply text-accent hover:underline;
}
</style>
