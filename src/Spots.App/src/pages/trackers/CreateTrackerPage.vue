<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useScryfall, useScryfallSets, useScryfallSetCards, type ScryfallSet } from '../../composables/useScryfall';
import { mockTrackers, type Tracker, type TrackerCard, type FoilPreference } from '../../data/mockTrackers';
import type { Card } from '../../data/mockCards';
import SetSearchInput from '../../components/trackers/SetSearchInput.vue';
import CardTile from '../../components/collection/CardTile.vue';
import Pagination from '../../components/collection/Pagination.vue';
import Button from '../../components/Button.vue';
import Icon from '../../components/Icon.vue';
import SearchInput from '../../components/SearchInput.vue';

const router = useRouter();

// ─── Step management ──────────────────────────────────────────────────────────

type TrackerTypeChoice = 'set' | 'custom';
const step = ref<1 | 2>(1);
const trackerTypeChoice = ref<TrackerTypeChoice | null>(null);

const selectType = (type: TrackerTypeChoice) => {
  trackerTypeChoice.value = type;
  step.value = 2;
};

const goBack = () => {
  if (step.value === 2) {
    step.value = 1;
    trackerTypeChoice.value = null;
  } else {
    router.push({ name: 'Trackers' });
  }
};

// ─── Shared form state ────────────────────────────────────────────────────────

const trackerName = ref('');
const foilPreference = ref<FoilPreference>('non-foil');

// ─── Set tracker state ────────────────────────────────────────────────────────

const { sets, loading: setsLoading, error: setsError, fetchSets } = useScryfallSets();
const { cards: setCards, loading: setCardsLoading, error: setCardsError, searchCardsBySet } = useScryfallSetCards();
const selectedSet = ref<ScryfallSet | null>(null);

// Auto-fill tracker name when set is selected
watch(selectedSet, (s) => {
  if (s) trackerName.value = s.name;
});

// Fetch sets when step 2 (set) is shown
watch([step, trackerTypeChoice], ([s, t]) => {
  if (s === 2 && t === 'set') fetchSets();
});

const setTrackerReady = computed(() => !!selectedSet.value && !!trackerName.value.trim());

const createSetTracker = async () => {
  if (!selectedSet.value || !trackerName.value.trim()) return;
  await searchCardsBySet(selectedSet.value.code);

  const cards: TrackerCard[] = setCards.value.map((c) => ({
    scryfallId: c.id,
    name: c.name,
    setCode: c.setCode,
    setName: c.setName,
    collectorNumber: '',
    imageUrl: c.imageUrl,
    colour: c.colour,
    rarity: c.rarity,
    foilPreference: foilPreference.value,
    isTracked: true,
    isCollected: false,
  }));

  const newTracker: Tracker = {
    id: String(Date.now()),
    name: trackerName.value.trim(),
    type: 'set',
    foilPreference: foilPreference.value,
    setCode: selectedSet.value.code.toUpperCase(),
    setName: selectedSet.value.name,
    cards,
    createdAt: new Date().toISOString().substring(0, 10),
  };

  mockTrackers.push(newTracker);
  router.push({ name: 'TrackerDetail', params: { id: newTracker.id } });
};

// ─── Custom tracker state ─────────────────────────────────────────────────────

const { cards: searchResults, loading: searchLoading, error: searchError, searchCards } = useScryfall();
const searchInput = ref('');
const currentSearchPage = ref(1);
const hasSearched = ref(false);
const selectedCards = ref<Array<{ card: Card; foilPreference: FoilPreference }>>([]);

const SCRYFALL_PAGE_SIZE = 175;
const searchTotalPages = computed(() =>
  searchResults.value.length > 0 ? Math.ceil(searchResults.value.length / SCRYFALL_PAGE_SIZE) : 0
);

const customTrackerReady = computed(
  () => !!trackerName.value.trim() && selectedCards.value.length > 0
);

const handleSearch = async () => {
  if (!searchInput.value.trim()) return;
  currentSearchPage.value = 1;
  hasSearched.value = true;
  await searchCards(searchInput.value, 1);
};

watch(currentSearchPage, async (page) => {
  if (hasSearched.value && searchInput.value.trim()) {
    await searchCards(searchInput.value, page);
  }
});

const isCardSelected = (card: Card) =>
  selectedCards.value.some((s) => s.card.id === card.id);

const addCard = (card: Card) => {
  if (!isCardSelected(card)) {
    selectedCards.value.push({ card, foilPreference: foilPreference.value });
  }
};

const removeCard = (card: Card) => {
  selectedCards.value = selectedCards.value.filter((s) => s.card.id !== card.id);
};

const updateCardFoil = (card: Card, pref: FoilPreference) => {
  const entry = selectedCards.value.find((s) => s.card.id === card.id);
  if (entry) entry.foilPreference = pref;
};

const foilOptions: Array<{ value: FoilPreference; label: string }> = [
  { value: 'non-foil', label: 'Non-Foil' },
  { value: 'foil', label: 'Foil' },
  { value: 'any', label: 'Any' },
];

const createCustomTracker = () => {
  if (!trackerName.value.trim() || selectedCards.value.length === 0) return;

  const cards: TrackerCard[] = selectedCards.value.map((s) => ({
    scryfallId: s.card.id,
    name: s.card.name,
    setCode: s.card.setCode,
    setName: s.card.setName,
    collectorNumber: '',
    imageUrl: s.card.imageUrl,
    colour: s.card.colour,
    rarity: s.card.rarity,
    foilPreference: s.foilPreference,
    isTracked: true,
    isCollected: false,
  }));

  const newTracker: Tracker = {
    id: String(Date.now()),
    name: trackerName.value.trim(),
    type: 'custom',
    foilPreference: foilPreference.value,
    cards,
    createdAt: new Date().toISOString().substring(0, 10),
  };

  mockTrackers.push(newTracker);
  router.push({ name: 'TrackerDetail', params: { id: newTracker.id } });
};
</script>

<template>
  <div class="create-tracker-view">

    <!-- Back -->
    <div class="create-header">
      <button class="back-btn" type="button" @click="goBack">
        <Icon icon="arrow-left" />
        <span>{{ step === 1 ? 'Trackers' : 'Back' }}</span>
      </button>
    </div>

    <!-- Step indicator -->
    <div class="steps">
      <div class="step" :class="{ active: step >= 1, completed: step > 1 }">
        <div class="step-number">1</div>
        <span>Type</span>
      </div>
      <div class="step-line" :class="{ active: step > 1 }"></div>
      <div class="step" :class="{ active: step >= 2 }">
        <div class="step-number">2</div>
        <span>Configure</span>
      </div>
    </div>

    <h1 class="create-title">
      {{ step === 1 ? 'Create a Tracker' : trackerTypeChoice === 'set' ? 'Track a Set' : 'Custom List' }}
    </h1>
    <p class="create-subtitle">
      <template v-if="step === 1">Choose how you'd like to track your cards.</template>
      <template v-else-if="trackerTypeChoice === 'set'">Configure your set tracker.</template>
      <template v-else>Build your custom card list.</template>
    </p>

    <!-- ── Step 1: Choose type ── -->
    <div v-if="step === 1" class="type-grid">
      <button class="type-card" type="button" @click="selectType('set')">
        <div class="type-icon-wrap type-icon-wrap--set">
          <Icon icon="layer-group" class="type-icon" />
        </div>
        <h2 class="type-card-title">Track a Set</h2>
        <p class="type-card-body">Track your progress completing a full MTG set. Supports untracking individual cards.</p>
        <span class="type-card-cta">Get started <Icon icon="arrow-right" /></span>
      </button>

      <button class="type-card" type="button" @click="selectType('custom')">
        <div class="type-icon-wrap type-icon-wrap--custom">
          <Icon icon="list" class="type-icon" />
        </div>
        <h2 class="type-card-title">Custom List</h2>
        <p class="type-card-body">Curate your own list of specific cards to track — artworks, legendaries, or anything you like.</p>
        <span class="type-card-cta">Get started <Icon icon="arrow-right" /></span>
      </button>
    </div>

    <!-- ── Step 2a: Set tracker ── -->
    <div v-else-if="trackerTypeChoice === 'set'" class="form-step">
      <div class="form-group">
        <label class="form-label">Tracker Name</label>
        <input
          v-model="trackerName"
          type="text"
          class="form-input"
          placeholder="e.g. Innistrad: Midnight Hunt"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Set</label>
        <SetSearchInput
          v-model="selectedSet"
          :sets="sets"
          :loading="setsLoading"
        />
        <p v-if="setsError" class="form-error">{{ setsError }}</p>
      </div>

      <div class="form-group">
        <label class="form-label">Foil Preference</label>
        <div class="foil-group">
          <button
            v-for="opt in foilOptions"
            :key="opt.value"
            type="button"
            class="foil-btn"
            :class="{ active: foilPreference === opt.value }"
            @click="foilPreference = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
        <p class="form-hint">This will be applied to all cards in the set. You can adjust per-card preferences from the tracker detail page.</p>
      </div>

      <div class="form-actions">
        <Button
          :disabled="!setTrackerReady || setCardsLoading"
          icon="check"
          @click="createSetTracker"
        >
          <template v-if="setCardsLoading">
            <Icon icon="spinner" class="spin" /> Loading cards...
          </template>
          <template v-else>
            Create Tracker
          </template>
        </Button>
        <p v-if="setCardsError" class="form-error">{{ setCardsError }}</p>
      </div>
    </div>

    <!-- ── Step 2b: Custom tracker ── -->
    <div v-else-if="trackerTypeChoice === 'custom'" class="form-step">

      <div class="custom-top">
        <div class="form-group">
          <label class="form-label">Tracker Name</label>
          <input
            v-model="trackerName"
            type="text"
            class="form-input"
            placeholder="e.g. Seb McKinnon Artwork"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Default Foil Preference</label>
          <div class="foil-group">
            <button
              v-for="opt in foilOptions"
              :key="opt.value"
              type="button"
              class="foil-btn"
              :class="{ active: foilPreference === opt.value }"
              @click="foilPreference = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
          <p class="form-hint">Applied to each card you add, but you can override it per card.</p>
        </div>
      </div>

        <!-- Card search -->
        <div class="card-search-section">
          <label class="form-label">Search &amp; Add Cards</label>
          <div class="search-row">
            <SearchInput
              v-model="searchInput"
              placeholder="Search Scryfall..."
              class="search-input-wrap"
              @submit="handleSearch"
            />
            <Button size="small" variant="secondary" icon="search" @click="handleSearch">
              Search
            </Button>
          </div>

        <!-- Search states -->
        <div v-if="searchLoading" class="search-state">
          <Icon icon="spinner" class="state-icon state-icon--spin" />
          <p>Searching...</p>
        </div>
        <div v-else-if="searchError" class="search-state search-state--error">
          <Icon icon="circle-exclamation" class="state-icon state-icon--error" />
          <p>{{ searchError }}</p>
        </div>
        <div v-else-if="hasSearched && searchResults.length === 0" class="search-state">
          <Icon icon="magnifying-glass" class="state-icon state-icon--muted" />
          <p>No cards found for "{{ searchInput }}"</p>
        </div>
        <div v-else-if="!hasSearched" class="search-state">
          <Icon icon="wand-magic-sparkles" class="state-icon state-icon--muted" />
          <p class="search-hint">Search for cards to add to your tracker.</p>
        </div>

        <div v-if="searchResults.length > 0" class="search-results">
          <div class="results-grid">
            <div
              v-for="card in searchResults"
              :key="card.id"
              class="result-card-wrap"
              :class="{ 'result-card-wrap--selected': isCardSelected(card) }"
            >
              <CardTile :card="card" mode="search" />
              <div class="result-card-overlay">
                <Button
                  v-if="!isCardSelected(card)"
                  size="small"
                  icon="plus"
                  @click="addCard(card)"
                >
                  Add
                </Button>
                <Button
                  v-else
                  size="small"
                  variant="secondary"
                  icon="check"
                  @click="removeCard(card)"
                >
                  Added
                </Button>
              </div>
            </div>
          </div>
          <Pagination
            v-model:current-page="currentSearchPage"
            :total-pages="searchTotalPages"
            :total-items="searchResults.length"
          />
        </div>
      </div>

      <!-- Selected cards -->
      <div v-if="selectedCards.length > 0" class="selected-section">
        <h3 class="selected-title">
          Selected Cards
          <span class="selected-count">{{ selectedCards.length }}</span>
        </h3>
        <div class="selected-chips">
          <div
            v-for="entry in selectedCards"
            :key="entry.card.id"
            class="card-chip"
          >
            <span class="chip-name">{{ entry.card.name }}</span>
            <span class="chip-set">{{ entry.card.setCode }}</span>
            <!-- Per-card foil override -->
            <div class="chip-foil-group">
              <button
                v-for="opt in foilOptions"
                :key="opt.value"
                type="button"
                class="chip-foil-btn"
                :class="{ active: entry.foilPreference === opt.value }"
                :title="opt.label"
                @click="updateCardFoil(entry.card, opt.value)"
              >
                {{ opt.label.charAt(0) }}
              </button>
            </div>
            <button class="chip-remove" type="button" @click="removeCard(entry.card)">
              <Icon icon="times" />
            </button>
          </div>
        </div>
      </div>

      <!-- Create button -->
      <div class="form-actions">
        <Button
          :disabled="!customTrackerReady"
          icon="check"
          @click="createCustomTracker"
        >
          Create Tracker
        </Button>
        <p v-if="!customTrackerReady && trackerName.trim() === ''" class="form-hint">
          Enter a tracker name to continue.
        </p>
        <p v-else-if="!customTrackerReady && selectedCards.length === 0" class="form-hint">
          Add at least one card to continue.
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.create-tracker-view {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Header */
.create-header {
  display: flex;
  align-items: center;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  padding: 6px 0;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: var(--text-primary);
}

/* Step indicator */
.steps {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
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
  font-size: 12px;
  color: var(--text-secondary);
}

.step.active span {
  color: var(--accent);
}

.step-line {
  width: 48px;
  height: 2px;
  margin: 0 8px;
  margin-bottom: 20px;
  background: var(--border);
  transition: background 0.2s ease;
}

.step-line.active {
  background: var(--accent);
}

.create-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.create-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: -16px 0 0;
}

/* Step 1 — type cards */
.type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.type-card {
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 24px;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;
}

.type-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  background: rgba(155, 77, 202, 0.05);
}

.type-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-icon-wrap--set {
  background: rgba(155, 77, 202, 0.15);
}

.type-icon-wrap--custom {
  background: rgba(16, 185, 129, 0.15);
}

.type-icon {
  font-size: 22px;
  color: var(--accent);
}

.type-icon-wrap--custom .type-icon {
  color: var(--success);
}

.type-card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}

.type-card-body {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
}

.type-card-cta {
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Step 2 form */
.form-step {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.custom-top {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-input {
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  height: 44px;
  padding: 0 14px;
  font-size: 14px;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  border-color: var(--accent);
}

.form-input::placeholder {
  color: var(--text-secondary);
}

.form-hint {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.form-error {
  font-size: 12px;
  color: var(--danger);
}

/* Foil preference buttons */
.foil-group {
  display: flex;
  gap: 8px;
}

.foil-btn {
  flex: 1;
  height: 36px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.foil-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.foil-btn.active {
  border-color: var(--accent);
  background: rgba(155, 77, 202, 0.15);
  color: var(--accent);
}

/* Card search section */
.card-search-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  background: rgba(0, 0, 0, 0.1);
}

.search-row {
  display: flex;
  gap: 10px;
}

.search-input-wrap {
  flex: 1;
}

.search-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 0;
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
}

.state-icon {
  font-size: 24px;
}

.state-icon--spin {
  color: var(--accent);
  animation: spin 0.8s linear infinite;
}

.state-icon--error {
  color: var(--danger);
}

.state-icon--muted {
  color: var(--text-secondary);
}

.search-hint {
  color: var(--text-secondary);
  font-size: 13px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.result-card-wrap {
  position: relative;
}

.result-card-wrap--selected :deep(.card-tile) {
  border-color: var(--accent);
  opacity: 0.85;
}

.result-card-overlay {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}

.result-card-wrap:hover .result-card-overlay {
  opacity: 1;
}

/* Selected cards chips */
.selected-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.selected-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.selected-count {
  font-size: 12px;
  font-weight: 500;
  background: rgba(155, 77, 202, 0.15);
  color: var(--accent);
  border-radius: 12px;
  padding: 2px 8px;
}

.selected-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 5px 8px;
  font-size: 12px;
}

.chip-name {
  font-weight: 500;
  color: var(--text-primary);
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chip-set {
  font-size: 10px;
  color: var(--text-secondary);
  background: rgba(148, 163, 184, 0.12);
  border-radius: 3px;
  padding: 2px 5px;
  font-weight: 600;
}

.chip-foil-group {
  display: flex;
  gap: 2px;
}

.chip-foil-btn {
  width: 20px;
  height: 20px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 3px;
  font-size: 10px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chip-foil-btn.active {
  border-color: var(--accent);
  background: rgba(155, 77, 202, 0.15);
  color: var(--accent);
}

.chip-remove {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 11px;
  transition: color 0.15s ease;
  margin-left: 2px;
}

.chip-remove:hover {
  color: var(--danger);
}

/* Form actions */
.form-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 600px) {
  .type-grid {
    grid-template-columns: 1fr;
  }
}
</style>
