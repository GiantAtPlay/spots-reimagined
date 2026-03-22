<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFlyoutStore } from '../../stores/flyout';
import { mockTrackers, getTrackerStats, type Tracker, type TrackerCard } from '../../data/mockTrackers';
import type { Card } from '../../data/mockCards';
import CardTile from '../../components/collection/CardTile.vue';
import DataTable from '../../components/DataTable.vue';
import CardImage from '../../components/CardImage.vue';
import Pagination from '../../components/collection/Pagination.vue';
import ProgressBar from '../../components/dashboard/ProgressBar.vue';
import Badge from '../../components/Badge.vue';
import Button from '../../components/Button.vue';
import Icon from '../../components/Icon.vue';
import ConfirmDialog from '../../components/ConfirmDialog.vue';
import RarityBadge from '../../components/RarityBadge.vue';
import ViewControls from '../../components/ViewControls.vue';
import { type TrackerFilters, defaultTrackerFilters } from '../../types/trackerFilters';

const route = useRoute();
const router = useRouter();
const flyoutStore = useFlyoutStore();

// ─── Load tracker ─────────────────────────────────────────────────────────────

const tracker = ref<Tracker | null>(
  mockTrackers.find((t) => t.id === route.params.id) ?? null
);

// ─── State ────────────────────────────────────────────────────────────────────

const searchQuery = ref('');
const viewMode = ref<'grid' | 'list'>('grid');
const gridSize = ref(5);
const currentPage = ref(1);
const itemsPerPage = 20;
const showUntracked = ref(false);
const filters = ref<TrackerFilters>(defaultTrackerFilters());

const trackerToDelete = ref(false);
const cardToUntrack = ref<TrackerCard | null>(null);
const cardToRetrack = ref<TrackerCard | null>(null);

const stats = computed(() => tracker.value ? getTrackerStats(tracker.value) : null);

const progressColour = computed(() => {
  const p = stats.value?.percentComplete ?? 0;
  return p === 100 ? 'var(--success)' : 'var(--accent)';
});

const foilLabel: Record<string, string> = {
  'non-foil': 'Non-Foil',
  foil: 'Foil',
  any: 'Any',
};

// ─── Filtered cards ───────────────────────────────────────────────────────────

const trackedCards = computed(() => tracker.value?.cards.filter((c) => c.isTracked) ?? []);
const untrackedCards = computed(() => tracker.value?.cards.filter((c) => !c.isTracked) ?? []);

const filteredTracked = computed(() => {
  let cards = trackedCards.value;
  const q = searchQuery.value.trim().toLowerCase();
  if (q) cards = cards.filter((c) => c.name.toLowerCase().includes(q));
  if (filters.value.rarities.length > 0) {
    cards = cards.filter((c) => filters.value.rarities.includes(c.rarity));
  }
  if (filters.value.status !== 'all') {
    cards = cards.filter((c) =>
      filters.value.status === 'collected' ? c.isCollected : !c.isCollected
    );
  }
  if (filters.value.foilPreference !== 'all') {
    cards = cards.filter((c) => c.foilPreference === filters.value.foilPreference);
  }
  return cards;
});

const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTracked.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredTracked.value.length / itemsPerPage)
);

const hasActiveFilters = computed(() =>
  filters.value.rarities.length > 0 ||
  filters.value.status !== 'all' ||
  filters.value.foilPreference !== 'all'
);

// Reset page on filter / search change
watch([searchQuery, filters], () => { currentPage.value = 1; }, { deep: true });

// ─── Convert TrackerCard → Card for CardTile ──────────────────────────────────

const toCard = (tc: TrackerCard): Card => ({
  id: tc.scryfallId,
  name: tc.name,
  setCode: tc.setCode,
  setName: tc.setName,
  colour: tc.colour,
  rarity: tc.rarity,
  type: '',
  imageUrl: tc.imageUrl,
  nonFoilCount: 0,
  foilCount: 0,
});

// ─── Table columns ────────────────────────────────────────────────────────────

const columns = [
  { key: 'card', label: 'Card' },
  { key: 'rarity', label: 'Rarity' },
  { key: 'foilPreference', label: 'Foil' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '', align: 'right' as const },
];

// ─── Actions ──────────────────────────────────────────────────────────────────

const openFilters = () => {
  flyoutStore.open({
    title: 'Tracker Filters',
    component: 'TrackerFiltersForm',
    props: {
      initialFilters: filters.value,
      onApply: (f: TrackerFilters) => { filters.value = f; },
    },
  });
};

const requestUntrack = (tc: TrackerCard) => {
  cardToUntrack.value = tc;
};

const confirmUntrack = () => {
  if (!tracker.value || !cardToUntrack.value) return;
  const c = tracker.value.cards.find((c) => c.scryfallId === cardToUntrack.value!.scryfallId);
  if (c) c.isTracked = false;
  cardToUntrack.value = null;
};

const requestRetrack = (tc: TrackerCard) => {
  cardToRetrack.value = tc;
};

const confirmRetrack = () => {
  if (!tracker.value || !cardToRetrack.value) return;
  const c = tracker.value.cards.find((c) => c.scryfallId === cardToRetrack.value!.scryfallId);
  if (c) c.isTracked = true;
  cardToRetrack.value = null;
};

const confirmDeleteTracker = () => {
  if (!tracker.value) return;
  const idx = mockTrackers.findIndex((t) => t.id === tracker.value!.id);
  if (idx >= 0) mockTrackers.splice(idx, 1);
  router.push({ name: 'Trackers' });
};
</script>

<template>
  <div v-if="!tracker" class="not-found">
    <Icon icon="circle-exclamation" class="not-found-icon" />
    <p>Tracker not found.</p>
    <Button variant="secondary" @click="router.push({ name: 'Trackers' })">
      Back to Trackers
    </Button>
  </div>

  <div v-else class="tracker-detail-view">

    <!-- Back link -->
    <button class="back-btn" type="button" @click="router.push({ name: 'Trackers' })">
      <Icon icon="arrow-left" />
      <span>Trackers</span>
    </button>

    <!-- Header card -->
    <div class="detail-header">
      <div class="detail-header-main">
        <div class="detail-title-row">
          <h1 class="detail-title">{{ tracker.name }}</h1>
          <Button
            variant="danger"
            size="small"
            icon="trash"
            @click="trackerToDelete = true"
          >
            Delete
          </Button>
        </div>
        <div class="detail-meta">
          <Badge variant="secondary" :icon="tracker.type === 'set' ? 'layer-group' : 'list'">
            {{ tracker.type === 'set' ? 'Set' : 'Custom' }}
          </Badge>
          <Badge v-if="tracker.setCode" variant="secondary">
            {{ tracker.setCode }}
          </Badge>
          <Badge variant="secondary">
            {{ foilLabel[tracker.foilPreference] }}
          </Badge>
          <Badge v-if="stats?.isComplete" variant="success" icon="check-circle">
            Complete
          </Badge>
        </div>
      </div>

      <div class="detail-progress">
        <ProgressBar
          :percent="stats?.percentComplete ?? 0"
          :color="progressColour"
          :show-value="false"
        />
        <div class="progress-label-row">
          <span class="progress-label">
            {{ stats?.collectedCards }} / {{ stats?.totalCards }} cards collected
          </span>
          <span class="progress-percent" :class="{ 'progress-percent--complete': stats?.isComplete }">
            {{ stats?.percentComplete }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="search-wrap">
          <Icon icon="search" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search cards..."
          />
          <button v-if="searchQuery" class="search-clear" type="button" @click="searchQuery = ''">
            <Icon icon="times" />
          </button>
        </div>
      </div>

      <div class="toolbar-right">
        <Button
          variant="secondary"
          size="small"
          icon="filter"
          :class="{ 'filter-active': hasActiveFilters }"
          @click="openFilters"
        >
          Filters
        </Button>

        <ViewControls
          v-model:view-mode="viewMode"
          v-model:grid-size="gridSize"
        />
      </div>
    </div>

    <!-- Results info -->
    <div class="results-info">
      <span>Showing {{ paginatedCards.length }} of {{ filteredTracked.length }} tracked cards</span>
      <span v-if="untrackedCards.length > 0" class="untracked-info">
        · {{ untrackedCards.length }} untracked
      </span>
    </div>

    <!-- Empty filtered state -->
    <div v-if="filteredTracked.length === 0" class="empty-state">
      <Icon icon="magnifying-glass" class="empty-icon" />
      <p>No cards match your current filters.</p>
      <Button variant="secondary" size="small" @click="() => { searchQuery = ''; filters = defaultTrackerFilters(); }">
        Clear Filters
      </Button>
    </div>

    <!-- Grid view -->
    <div
      v-else-if="viewMode === 'grid'"
      class="card-grid"
      :style="{ '--card-grid-cols': gridSize }"
    >
      <CardTile
        v-for="tc in paginatedCards"
        :key="tc.scryfallId"
        :card="toCard(tc)"
        :tracker-card="tc"
        mode="tracker"
        @untrack="requestUntrack"
      />
    </div>

    <!-- List view -->
    <div v-else>
      <DataTable
        :data="paginatedCards"
        :columns="columns"
      >
        <template #cell(card)="{ row }">
          <div class="table-card-info">
            <CardImage
              :image-url="row.imageUrl"
              :card-name="row.name"
              :colour="row.colour"
              size="small"
            />
            <div class="table-card-details">
              <span class="table-card-name">{{ row.name }}</span>
              <span class="table-card-set">{{ row.setCode }} · #{{ row.collectorNumber }}</span>
            </div>
          </div>
        </template>

        <template #cell(rarity)="{ row }">
          <RarityBadge :rarity="row.rarity" />
        </template>

        <template #cell(foilPreference)="{ row }">
          <Badge variant="secondary">{{ foilLabel[row.foilPreference] }}</Badge>
        </template>

        <template #cell(status)="{ row }">
          <Badge :variant="row.isCollected ? 'success' : 'secondary'" :icon="row.isCollected ? 'check' : 'xmark'">
            {{ row.isCollected ? 'Collected' : 'Missing' }}
          </Badge>
        </template>

        <template #cell(actions)="{ row }">
          <div class="table-actions">
            <Button
              variant="secondary"
              size="small"
              icon="eye-slash"
              @click.stop="requestUntrack(row)"
            >
              Untrack
            </Button>
          </div>
        </template>
      </DataTable>
    </div>

    <Pagination
      v-model:current-page="currentPage"
      :total-pages="totalPages"
      :total-items="filteredTracked.length"
    />

    <!-- Untracked cards section -->
    <div v-if="untrackedCards.length > 0" class="untracked-section">
      <button
        class="untracked-toggle"
        type="button"
        @click="showUntracked = !showUntracked"
      >
        <Icon
          icon="chevron-right"
          class="section-chevron"
          :class="{ 'section-chevron--open': showUntracked }"
        />
        <span>Untracked ({{ untrackedCards.length }})</span>
      </button>

      <Transition name="section-collapse">
        <div v-if="showUntracked" class="untracked-grid" :style="{ '--card-grid-cols': gridSize }">
          <div
            v-for="tc in untrackedCards"
            :key="tc.scryfallId"
            class="untracked-card-wrap"
          >
            <CardTile :card="toCard(tc)" mode="tracker" :tracker-card="tc" />
            <button class="retrack-btn" type="button" @click="requestRetrack(tc)">
              <Icon icon="eye" /> Re-track
            </button>
          </div>
        </div>
      </Transition>
    </div>

  </div>

  <!-- Untrack confirmation -->
  <ConfirmDialog
    :visible="!!cardToUntrack"
    message="Untrack this card?"
    :detail="`'${cardToUntrack?.name}' will be moved to the Untracked section and excluded from your progress.`"
    confirm-label="Untrack"
    @confirm="confirmUntrack"
    @cancel="cardToUntrack = null"
  />

  <!-- Re-track confirmation -->
  <ConfirmDialog
    :visible="!!cardToRetrack"
    message="Re-track this card?"
    :detail="`'${cardToRetrack?.name}' will be added back to your tracked cards.`"
    confirm-label="Re-track"
    @confirm="confirmRetrack"
    @cancel="cardToRetrack = null"
  />

  <!-- Delete tracker confirmation -->
  <ConfirmDialog
    :visible="trackerToDelete"
    message="Delete this tracker?"
    :detail="`'${tracker?.name}' and all its progress will be permanently removed.`"
    confirm-label="Delete"
    @confirm="confirmDeleteTracker"
    @cancel="trackerToDelete = false"
  />
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 64px;
  color: var(--text-secondary);
}

.not-found-icon {
  font-size: 40px;
  color: var(--danger);
}

.tracker-detail-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Back button */
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
  width: fit-content;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: var(--text-primary);
}

/* Header card */
.detail-header {
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-header-main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-progress {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.progress-percent {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}

.progress-percent--complete {
  color: var(--success);
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.toolbar-left {
  flex: 1;
  min-width: 200px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 12px;
  height: 40px;
  transition: border-color 0.2s ease;
}

.search-wrap:focus-within {
  border-color: var(--accent);
}

.search-icon {
  color: var(--text-secondary);
  font-size: 13px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 14px;
  min-width: 0;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-clear {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.filter-active {
  border-color: var(--accent) !important;
  color: var(--accent) !important;
}

/* Results info */
.results-info {
  font-size: 13px;
  color: var(--text-secondary);
}

.untracked-info {
  color: var(--text-secondary);
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
}

.empty-icon {
  font-size: 28px;
}

/* Card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--card-grid-cols, 5), 1fr);
  gap: 16px;
}

.card-grid > :deep(*) {
  min-width: 0;
}

/* Table */
.table-card-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-card-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.table-card-name {
  font-weight: 500;
  font-size: 14px;
}

.table-card-set {
  font-size: 11px;
  color: var(--text-secondary);
}

.table-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* Untracked section */
.untracked-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}

.untracked-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.2s ease;
}

.untracked-toggle:hover {
  color: var(--text-primary);
}

.section-chevron {
  font-size: 11px;
  transition: transform 0.2s ease;
}

.section-chevron--open {
  transform: rotate(90deg);
}

.untracked-grid {
  display: grid;
  grid-template-columns: repeat(var(--card-grid-cols, 5), 1fr);
  gap: 16px;
}

.untracked-card-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.retrack-btn {
  width: 100%;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.2s ease;
}

.retrack-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Section collapse transition */
.section-collapse-enter-active,
.section-collapse-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.section-collapse-enter-from,
.section-collapse-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-right {
    flex-wrap: wrap;
  }
}
</style>
