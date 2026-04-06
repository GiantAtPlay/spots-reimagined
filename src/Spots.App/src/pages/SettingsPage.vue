<script setup lang="ts">
import { ref } from 'vue';
import { defaultSettings, type UserSettings } from '../data/mockSettings';
import Button from '../components/Button.vue';
import ButtonGroup from '../components/ButtonGroup.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';

const settings = ref<UserSettings>({ ...defaultSettings });

// Sync theme with document on mount
const applyTheme = (theme: UserSettings['theme']) => {
  document.documentElement.setAttribute('data-theme', theme);
};
applyTheme(settings.value.theme);

const setTheme = (theme: UserSettings['theme']) => {
  settings.value.theme = theme;
  applyTheme(theme);
};

const setViewMode = (mode: UserSettings['defaultViewMode']) => {
  settings.value.defaultViewMode = mode;
};

const setDateFormat = (fmt: UserSettings['dateFormat']) => {
  settings.value.dateFormat = fmt;
};

const setCurrency = (e: Event) => {
  settings.value.currency = (e.target as HTMLSelectElement).value as UserSettings['currency'];
};

const setCardsPerPage = (n: UserSettings['cardsPerPage']) => {
  settings.value.cardsPerPage = n;
};

// Export
const exportConfirmed = ref(false);
let exportTimer: ReturnType<typeof setTimeout> | null = null;

const handleExport = () => {
  exportConfirmed.value = true;
  if (exportTimer) clearTimeout(exportTimer);
  exportTimer = setTimeout(() => {
    exportConfirmed.value = false;
  }, 2500);
};

// Reset collection
const showResetConfirm = ref(false);

const confirmReset = () => {
  showResetConfirm.value = false;
  // In a real app this would clear the collection store — no-op for now
};

const cancelReset = () => {
  showResetConfirm.value = false;
};
</script>

<template>
  <div class="settings-view">

    <!-- Appearance -->
    <section class="settings-card">
      <h3 class="settings-card-title">Appearance</h3>

      <div class="settings-row">
        <div class="settings-row-label">
          <span class="form-label">Theme</span>
        </div>
        <ButtonGroup>
          <Button
            :variant="settings.theme === 'dark' ? 'primary' : 'secondary'"
            size="small"
            :bounce="false"
            @click="setTheme('dark')"
          >Dark</Button>
          <Button
            :variant="settings.theme === 'light' ? 'primary' : 'secondary'"
            size="small"
            :bounce="false"
            @click="setTheme('light')"
          >Light</Button>
        </ButtonGroup>
      </div>

      <div class="settings-row">
        <div class="settings-row-label">
          <span class="form-label">Default view mode</span>
        </div>
        <ButtonGroup>
          <Button
            :variant="settings.defaultViewMode === 'grid' ? 'primary' : 'secondary'"
            size="small"
            icon="th-large"
            icon-only
            :bounce="false"
            sr-text="Grid view"
            @click="setViewMode('grid')"
          />
          <Button
            :variant="settings.defaultViewMode === 'list' ? 'primary' : 'secondary'"
            size="small"
            icon="list"
            icon-only
            :bounce="false"
            sr-text="List view"
            @click="setViewMode('list')"
          />
        </ButtonGroup>
      </div>

      <div class="settings-row">
        <div class="settings-row-label">
          <span class="form-label">Date format</span>
        </div>
        <ButtonGroup>
          <Button
            :variant="settings.dateFormat === 'DD/MM/YYYY' ? 'primary' : 'secondary'"
            size="small"
            :bounce="false"
            @click="setDateFormat('DD/MM/YYYY')"
          >DD/MM/YYYY</Button>
          <Button
            :variant="settings.dateFormat === 'MM/DD/YYYY' ? 'primary' : 'secondary'"
            size="small"
            :bounce="false"
            @click="setDateFormat('MM/DD/YYYY')"
          >MM/DD/YYYY</Button>
        </ButtonGroup>
      </div>
    </section>

    <!-- Collection -->
    <section class="settings-card">
      <h3 class="settings-card-title">Collection</h3>

      <div class="settings-row">
        <div class="settings-row-label">
          <span class="form-label">Currency</span>
        </div>
        <select
          class="form-select settings-select"
          :value="settings.currency"
          @change="setCurrency"
        >
          <option value="USD">USD — US Dollar</option>
          <option value="GBP">GBP — British Pound</option>
          <option value="EUR">EUR — Euro</option>
          <option value="CAD">CAD — Canadian Dollar</option>
          <option value="AUD">AUD — Australian Dollar</option>
        </select>
      </div>

      <div class="settings-row settings-row--stack">
        <div class="settings-row-label">
          <span class="form-label">Near completion threshold</span>
          <span class="settings-hint">Show a "nearly complete" badge when a tracker reaches this percentage</span>
        </div>
        <div class="threshold-control">
          <input
            type="range"
            min="50"
            max="99"
            v-model.number="settings.nearCompletionThreshold"
            class="threshold-slider"
          />
          <span class="threshold-value">{{ settings.nearCompletionThreshold }}%</span>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row-label">
          <span class="form-label">Cards per page</span>
        </div>
        <ButtonGroup>
          <Button
            :variant="settings.cardsPerPage === 25 ? 'primary' : 'secondary'"
            size="small"
            :bounce="false"
            @click="setCardsPerPage(25)"
          >25</Button>
          <Button
            :variant="settings.cardsPerPage === 50 ? 'primary' : 'secondary'"
            size="small"
            :bounce="false"
            @click="setCardsPerPage(50)"
          >50</Button>
          <Button
            :variant="settings.cardsPerPage === 100 ? 'primary' : 'secondary'"
            size="small"
            :bounce="false"
            @click="setCardsPerPage(100)"
          >100</Button>
        </ButtonGroup>
      </div>

      <div class="settings-row">
        <div class="settings-row-label">
          <span class="form-label">Show card prices</span>
          <span class="settings-hint">Display price data on card tiles and list rows</span>
        </div>
        <button
          class="pill-toggle"
          :class="{ 'pill-toggle--on': settings.showCardPrices }"
          role="switch"
          :aria-checked="settings.showCardPrices"
          @click="settings.showCardPrices = !settings.showCardPrices"
        >
          <span class="pill-toggle-thumb" />
          <span class="sr-only">{{ settings.showCardPrices ? 'On' : 'Off' }}</span>
        </button>
      </div>
    </section>

    <!-- Data -->
    <section class="settings-card">
      <h3 class="settings-card-title">Data</h3>

      <div class="settings-row">
        <div class="settings-row-label">
          <span class="form-label">Export collection</span>
          <span class="settings-hint">Download your full card collection as a CSV file</span>
        </div>
        <div class="export-action">
          <Button
            variant="secondary"
            size="small"
            icon="cloud-download"
            :bounce="false"
            @click="handleExport"
          >Export</Button>
          <Transition name="confirm-inline">
            <span v-if="exportConfirmed" class="export-confirm">Exported!</span>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Danger Zone -->
    <section class="settings-card settings-card--danger">
      <h3 class="settings-card-title settings-card-title--danger">Danger Zone</h3>

      <div class="settings-row">
        <div class="settings-row-label">
          <span class="form-label">Reset collection</span>
          <span class="settings-hint">Permanently delete all cards from your collection. This cannot be undone.</span>
        </div>
        <Button
          variant="danger"
          size="small"
          icon="trash"
          @click="showResetConfirm = true"
        >Reset</Button>
      </div>
    </section>

    <ConfirmDialog
      :visible="showResetConfirm"
      message="Reset your collection?"
      detail="All cards will be permanently deleted. This action cannot be undone."
      confirm-label="Reset"
      @confirm="confirmReset"
      @cancel="cancelReset"
    />

  </div>
</template>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 680px;
}

/* Section cards */
.settings-card {
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-card--danger {
  border-color: rgba(239, 68, 68, 0.3);
}

.settings-card-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
  margin: 0;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--border);
}

.settings-card-title--danger {
  color: var(--danger);
  border-bottom-color: rgba(239, 68, 68, 0.2);
}

/* Rows */
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 36px;
}

.settings-row--stack {
  flex-direction: column;
  align-items: flex-start;
}

.settings-row-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.settings-row-label .form-label {
  margin-bottom: 0;
}

.settings-hint {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Currency select — constrained width */
.settings-select {
  width: auto;
  min-width: 200px;
}

/* Near-completion threshold slider */
.threshold-control {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 4px;
}

.threshold-slider {
  flex: 1;
  accent-color: var(--accent);
}

.threshold-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  width: 36px;
  text-align: right;
}

/* Pill toggle */
.pill-toggle {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  background: var(--border);
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
  padding: 0;
}

.pill-toggle--on {
  background: var(--accent);
}

.pill-toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s ease;
  display: block;
}

.pill-toggle--on .pill-toggle-thumb {
  transform: translateX(20px);
}

.pill-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Export action */
.export-action {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.export-confirm {
  font-size: 13px;
  font-weight: 500;
  color: var(--success);
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Inline confirmation transition */
.confirm-inline-enter-active,
.confirm-inline-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.confirm-inline-enter-from,
.confirm-inline-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
</style>
