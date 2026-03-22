<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { mockTrackers, getTrackerStats, type Tracker } from '../data/mockTrackers';
import TrackerCard from '../components/trackers/TrackerCard.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import Button from '../components/Button.vue';
import Icon from '../components/Icon.vue';
import SearchInput from '../components/SearchInput.vue';

const router = useRouter();

// ─── State ────────────────────────────────────────────────────────────────────

const trackers = ref<Tracker[]>([...mockTrackers]);
const searchQuery = ref('');
const openSetGroups = ref<Set<string>>(new Set());
const trackerToDelete = ref<Tracker | null>(null);

// ─── Computed ─────────────────────────────────────────────────────────────────

const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return trackers.value;
  return trackers.value.filter((t) =>
    t.name.toLowerCase().includes(q) ||
    t.setName?.toLowerCase().includes(q) ||
    t.setCode?.toLowerCase().includes(q)
  );
});

interface TrackerGroup {
  setCode: string;
  setName: string;
  trackers: Tracker[];
}

const grouped = computed((): { ungrouped: Tracker[]; groups: TrackerGroup[] } => {
  const ungrouped: Tracker[] = [];
  const bySet = new Map<string, TrackerGroup>();

  for (const t of filtered.value) {
    if (!t.setCode) {
      ungrouped.push(t);
      continue;
    }
    const key = t.setCode;
    if (!bySet.has(key)) {
      bySet.set(key, { setCode: key, setName: t.setName ?? key, trackers: [] });
    }
    bySet.get(key)!.trackers.push(t);
  }

  // Sort groups: multi-tracker sets first, then by setName
  const groups = [...bySet.values()].sort((a, b) => {
    if (b.trackers.length !== a.trackers.length) return b.trackers.length - a.trackers.length;
    return a.setName.localeCompare(b.setName);
  });

  return { ungrouped, groups };
});

const totalTrackers = computed(() => trackers.value.length);
const completeCount = computed(() => trackers.value.filter((t) => getTrackerStats(t).isComplete).length);

const isGroupOpen = (setCode: string) => openSetGroups.value.has(setCode);

const toggleGroup = (setCode: string) => {
  if (openSetGroups.value.has(setCode)) {
    openSetGroups.value.delete(setCode);
  } else {
    openSetGroups.value.add(setCode);
  }
};

// Initialise all groups as open
const initGroups = () => {
  for (const t of trackers.value) {
    if (t.setCode) openSetGroups.value.add(t.setCode);
  }
};
initGroups();

// ─── Actions ──────────────────────────────────────────────────────────────────

const navigateToTracker = (tracker: Tracker) => {
  router.push({ name: 'TrackerDetail', params: { id: tracker.id } });
};

const requestDelete = (tracker: Tracker) => {
  trackerToDelete.value = tracker;
};

const confirmDelete = () => {
  if (!trackerToDelete.value) return;
  trackers.value = trackers.value.filter((t) => t.id !== trackerToDelete.value!.id);
  trackerToDelete.value = null;
};

const cancelDelete = () => {
  trackerToDelete.value = null;
};
</script>

<template>
  <div class="trackers-view">

    <!-- Header row -->
    <div class="trackers-header">
      <div class="trackers-header-left">
        <div v-if="totalTrackers > 0" class="trackers-summary">
          <span class="summary-stat">{{ totalTrackers }} tracker{{ totalTrackers !== 1 ? 's' : '' }}</span>
          <span class="summary-divider">·</span>
          <span class="summary-stat">{{ completeCount }} complete</span>
        </div>
      </div>
      <Button icon="plus" size="small" variant="secondary" @click="router.push({ name: 'CreateTracker' })">
        New Tracker
      </Button>
    </div>

    <!-- Search bar -->
    <SearchInput
      v-model="searchQuery"
      placeholder="Search trackers by name or set..."
    />

    <!-- Empty state — no trackers at all -->
    <div v-if="trackers.length === 0" class="empty-state">
      <div class="empty-icon-wrap">
        <Icon icon="chart-line" class="empty-icon" />
      </div>
      <h3 class="empty-title">No trackers yet</h3>
      <p class="empty-body">Create your first tracker to start monitoring your collection progress.</p>
      <Button icon="plus" @click="router.push({ name: 'CreateTracker' })">
        Create Tracker
      </Button>
    </div>

    <!-- Empty search state -->
    <div v-else-if="filtered.length === 0" class="empty-state empty-state--search">
      <Icon icon="magnifying-glass" class="empty-icon empty-icon--muted" />
      <p class="empty-body">No trackers match "{{ searchQuery }}"</p>
      <Button variant="secondary" size="small" @click="searchQuery = ''">Clear Search</Button>
    </div>

    <!-- Tracker list -->
    <div v-else class="trackers-content">

      <!-- CTA card — always first -->
      <div class="create-cta" @click="router.push({ name: 'CreateTracker' })">
        <div class="cta-inner">
          <span class="cta-icon-wrap">
            <Icon icon="plus" class="cta-icon" />
          </span>
          <span class="cta-text">Create a new tracker</span>
        </div>
      </div>

      <!-- Ungrouped (custom trackers with no setCode) -->
      <template v-if="grouped.ungrouped.length > 0">
        <div class="tracker-section">
          <div class="tracker-grid">
            <TrackerCard
              v-for="tracker in grouped.ungrouped"
              :key="tracker.id"
              :tracker="tracker"
              @click="navigateToTracker(tracker)"
              @delete="requestDelete"
            />
          </div>
        </div>
      </template>

      <!-- Set groups -->
      <div
        v-for="group in grouped.groups"
        :key="group.setCode"
        class="tracker-section"
      >
        <button class="group-header" type="button" @click="toggleGroup(group.setCode)">
          <Icon
            icon="chevron-right"
            class="group-chevron"
            :class="{ 'group-chevron--open': isGroupOpen(group.setCode) }"
          />
          <span class="group-name">{{ group.setName }}</span>
          <span class="group-count">{{ group.trackers.length }}</span>
        </button>

        <Transition name="group-collapse">
          <div v-if="isGroupOpen(group.setCode)" class="tracker-grid">
            <TrackerCard
              v-for="tracker in group.trackers"
              :key="tracker.id"
              :tracker="tracker"
              @click="navigateToTracker(tracker)"
              @delete="requestDelete"
            />
          </div>
        </Transition>
      </div>

    </div>

    <!-- Delete confirmation -->
    <ConfirmDialog
      :visible="!!trackerToDelete"
      message="Delete this tracker?"
      :detail="`'${trackerToDelete?.name}' and all its progress will be permanently removed.`"
      confirm-label="Delete"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

  </div>
</template>

<style scoped>
.trackers-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Header */
.trackers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.trackers-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.trackers-summary {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

.summary-stat {
  color: var(--text-primary);
  font-weight: 500;
}

.summary-divider {
  color: var(--text-secondary);
}

/* Empty states */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  padding: 64px 24px;
}

.empty-state--search {
  padding: 40px 24px;
}

.empty-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(155, 77, 202, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  font-size: 28px;
  color: var(--accent);
}

.empty-icon--muted {
  font-size: 28px;
  color: var(--text-secondary);
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.empty-body {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 340px;
  line-height: 1.6;
}

/* Content layout */
.trackers-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* CTA card */
.create-cta {
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-cta:hover {
  border-color: var(--accent);
  background: rgba(155, 77, 202, 0.05);
}

.cta-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.create-cta:hover .cta-inner {
  color: var(--accent);
}

.cta-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px dashed currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.cta-text {
  font-size: 14px;
  font-weight: 500;
}

/* Tracker section + group header */
.tracker-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
}

.group-header:hover {
  border-color: var(--accent);
  background: rgba(155, 77, 202, 0.05);
}

.group-chevron {
  font-size: 12px;
  color: var(--text-secondary);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.group-chevron--open {
  transform: rotate(90deg);
}

.group-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
}

.group-count {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2px 8px;
}

/* Tracker grid */
.tracker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

/* Group collapse animation */
.group-collapse-enter-active,
.group-collapse-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}

.group-collapse-enter-from,
.group-collapse-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-8px);
}

@media (max-width: 768px) {
  .tracker-grid {
    grid-template-columns: 1fr;
  }
}
</style>
