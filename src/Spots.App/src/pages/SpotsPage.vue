<script setup lang="ts">
import { ref, computed } from 'vue';
import { mockSpots, type Spot } from '../data/mockSpots';
import { useFlyoutStore } from '../stores/flyout';
import SpotRow from '../components/spots/SpotRow.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import Button from '../components/Button.vue';
import Icon from '../components/Icon.vue';
import SearchInput from '../components/SearchInput.vue';
import EmptyState from '../components/EmptyState.vue';

const flyoutStore = useFlyoutStore();

const spots = ref<Spot[]>([...mockSpots]);
const searchQuery = ref('');
const expandedIds = ref<Set<string>>(new Set());
const spotToDelete = ref<Spot | null>(null);

const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return spots.value;
  
  const matchingSpots = spots.value.filter((s) =>
    s.name.toLowerCase().includes(q) ||
    s.description?.toLowerCase().includes(q)
  );
  
  const matchingIds = new Set(matchingSpots.map(s => s.id));
  
  const allDescendantIds = new Set<string>();
  const findDescendants = (parentId: string) => {
    for (const s of spots.value) {
      if (s.parentId === parentId && !matchingIds.has(s.id)) {
        allDescendantIds.add(s.id);
        findDescendants(s.id);
      }
    }
  };
  for (const s of matchingSpots) {
    if (s.parentId && !matchingIds.has(s.parentId)) {
      let current = spots.value.find(x => x.id === s.parentId);
      while (current) {
        if (matchingIds.has(current.id)) break;
        allDescendantIds.add(current.id);
        current = current.parentId ? spots.value.find(x => x.id === current!.parentId) : undefined;
      }
    }
    findDescendants(s.id);
  }
  
  return spots.value.filter(s => matchingIds.has(s.id) || allDescendantIds.has(s.id));
});

interface SpotWithChildren extends Spot {
  children: SpotWithChildren[];
}

const buildTree = (spotsList: Spot[], parentId: string | undefined = undefined): SpotWithChildren[] => {
  return spotsList
    .filter(s => s.parentId === parentId)
    .map(s => ({
      ...s,
      children: buildTree(spotsList, s.id)
    }));
};

const spotTree = computed(() => buildTree(filtered.value));

const getChildrenCount = (spotId: string) => {
  return spots.value.filter(s => s.parentId === spotId).length;
};

const isExpanded = (spotId: string) => expandedIds.value.has(spotId);

const toggleExpand = (spot: Spot) => {
  if (expandedIds.value.has(spot.id)) {
    expandedIds.value.delete(spot.id);
  } else {
    expandedIds.value.add(spot.id);
  }
};

const initExpanded = () => {
  for (const s of spots.value) {
    if (getChildrenCount(s.id) > 0) {
      expandedIds.value.add(s.id);
    }
  }
};
initExpanded();

const openCreateSpot = (parentId?: string) => {
  flyoutStore.open({
    title: 'Create Spot',
    component: 'SpotEditForm',
    props: {
      mode: 'create',
      parentId: parentId || undefined
    },
    onClose: () => {}
  });
};

const openEditSpot = (spot: Spot) => {
  flyoutStore.open({
    title: 'Edit Spot',
    component: 'SpotEditForm',
    props: {
      mode: 'edit',
      spot: { ...spot }
    },
    onClose: () => {}
  });
};

const requestDelete = (spot: Spot) => {
  spotToDelete.value = spot;
};

const confirmDelete = () => {
  if (!spotToDelete.value) return;
  const deleteId = spotToDelete.value.id;
  const childIds = spots.value.filter(s => s.parentId === deleteId).map(s => s.id);
  spots.value = spots.value.filter(s => s.id !== deleteId && !childIds.includes(s.id));
  spotToDelete.value = null;
};

const cancelDelete = () => {
  spotToDelete.value = null;
};

const totalSpots = computed(() => spots.value.length);
const rootSpotsCount = computed(() => spots.value.filter(s => !s.parentId).length);

const handleAddChild = (spot: Spot) => {
  openCreateSpot(spot.id);
};

const handleEdit = (spot: Spot) => {
  openEditSpot(spot);
};
</script>

<template>
  <div class="spots-view">

    <div class="spots-header">
      <div class="spots-header-left">
        <div v-if="totalSpots > 0" class="spots-summary">
          <span class="summary-stat">{{ totalSpots }} spot{{ totalSpots !== 1 ? 's' : '' }}</span>
          <span class="summary-divider">·</span>
          <span class="summary-stat">{{ rootSpotsCount }} root</span>
        </div>
      </div>
    </div>

    <SearchInput
      v-model="searchQuery"
      placeholder="Search spots by name or description..."
    />

    <EmptyState
      v-if="spots.length === 0"
      icon="map-marker"
      title="No spots yet"
      message="Create your first spot to start organizing your collection."
    >
      <template #action>
        <Button icon="plus" @click="openCreateSpot()">
          Create Spot
        </Button>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="filtered.length === 0"
      variant="compact"
      icon="magnifying-glass"
      :message="`No spots match &quot;${searchQuery}&quot;`"
    >
      <template #action>
        <Button variant="secondary" size="small" @click="searchQuery = ''">Clear Search</Button>
      </template>
    </EmptyState>

    <div v-else class="spots-content">
      <div class="create-cta" @click="openCreateSpot()">
        <div class="cta-inner">
          <span class="cta-icon-wrap">
            <Icon icon="plus" class="cta-icon" />
          </span>
          <span class="cta-text">Create a new spot</span>
        </div>
      </div>

      <div class="spots-tree">
        <template v-for="spot in spotTree" :key="spot.id">
          <SpotRow
            :spot="spot"
            :depth="0"
            :has-children="spot.children.length > 0"
            :is-expanded="isExpanded(spot.id)"
            @toggle="toggleExpand"
            @add-child="handleAddChild"
            @edit="handleEdit"
            @delete="requestDelete"
          />
          <template v-if="spot.children.length > 0 && isExpanded(spot.id)">
            <template v-for="child in spot.children" :key="child.id">
              <SpotRow
                :spot="child"
                :depth="1"
                :has-children="child.children.length > 0"
                :is-expanded="isExpanded(child.id)"
                @toggle="toggleExpand"
                @add-child="handleAddChild"
                @edit="handleEdit"
                @delete="requestDelete"
              />
              <template v-if="child.children.length > 0 && isExpanded(child.id)">
                <template v-for="grandchild in child.children" :key="grandchild.id">
                  <SpotRow
                    :spot="grandchild"
                    :depth="2"
                    :has-children="grandchild.children.length > 0"
                    :is-expanded="isExpanded(grandchild.id)"
                    @toggle="toggleExpand"
                    @add-child="handleAddChild"
                    @edit="handleEdit"
                    @delete="requestDelete"
                  />
                  <template v-if="grandchild.children.length > 0 && isExpanded(grandchild.id)">
                    <template v-for="great in grandchild.children" :key="great.id">
                      <SpotRow
                        :spot="great"
                        :depth="3"
                        :has-children="great.children.length > 0"
                        :is-expanded="isExpanded(great.id)"
                        @toggle="toggleExpand"
                        @add-child="handleAddChild"
                        @edit="handleEdit"
                        @delete="requestDelete"
                      />
                    </template>
                  </template>
                </template>
              </template>
            </template>
          </template>
        </template>
      </div>
    </div>

    <ConfirmDialog
      :visible="!!spotToDelete"
      message="Delete this spot?"
      :detail="`&quot;${spotToDelete?.name}&quot; and all its children will be permanently removed.`"
      confirm-label="Delete"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

  </div>
</template>

<style scoped>
.spots-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.spots-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.spots-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.spots-summary {
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

.spots-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

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

.spots-tree {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
