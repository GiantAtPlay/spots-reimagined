<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
}>();

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void;
}>();

const visiblePages = computed(() => {
  const pages: (number | 'ellipsis')[] = [];
  const { currentPage, totalPages } = props;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    pages.push(totalPages);
  }

  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};
</script>

<template>
  <div class="pagination">
    <button
      class="page-btn"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <font-awesome-icon icon="chevron-left" />
    </button>

    <template v-for="(page, index) in visiblePages" :key="index">
      <span v-if="page === 'ellipsis'" class="ellipsis">...</span>
      <button
        v-else
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <font-awesome-icon icon="chevron-right" />
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled):not(.active) {
  border-color: var(--accent);
  color: var(--text-primary);
}

.page-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ellipsis {
  color: var(--text-secondary);
  padding: 0 4px;
}
</style>
