<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Icon from '../Icon.vue';
import type { ScryfallSet } from '../../composables/useScryfall';

const props = defineProps<{
  modelValue: ScryfallSet | null;
  sets: ScryfallSet[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: ScryfallSet | null): void;
}>();

const query = ref(props.modelValue?.name ?? '');
const isOpen = ref(false);
const activeIndex = ref(-1);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLUListElement | null>(null);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return props.sets.slice(0, 50);
  return props.sets
    .filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
    .slice(0, 50);
});

const releaseYear = (s: ScryfallSet) => s.released_at?.substring(0, 4) ?? '';

const open = () => {
  isOpen.value = true;
  activeIndex.value = -1;
};

const close = () => {
  isOpen.value = false;
  activeIndex.value = -1;
};

const select = (s: ScryfallSet) => {
  emit('update:modelValue', s);
  query.value = s.name;
  close();
};

const clear = () => {
  query.value = '';
  emit('update:modelValue', null);
  isOpen.value = true;
  inputRef.value?.focus();
};

const onInput = () => {
  isOpen.value = true;
  activeIndex.value = -1;
  // If user is typing, clear current selection
  if (props.modelValue && query.value !== props.modelValue.name) {
    emit('update:modelValue', null);
  }
};

const onKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) {
    if (e.key === 'ArrowDown' || e.key === 'Enter') open();
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex.value = Math.min(activeIndex.value + 1, filtered.value.length - 1);
    scrollActiveIntoView();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex.value = Math.max(activeIndex.value - 1, 0);
    scrollActiveIntoView();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (activeIndex.value >= 0 && filtered.value[activeIndex.value]) {
      select(filtered.value[activeIndex.value]);
    }
  } else if (e.key === 'Escape') {
    close();
  }
};

const scrollActiveIntoView = () => {
  const list = listRef.value;
  if (!list) return;
  const item = list.children[activeIndex.value] as HTMLElement | undefined;
  item?.scrollIntoView({ block: 'nearest' });
};

// Close on outside click
const handleOutside = (e: MouseEvent) => {
  const el = inputRef.value?.closest('.set-search-wrap');
  if (el && !el.contains(e.target as Node)) {
    close();
  }
};

onMounted(() => document.addEventListener('mousedown', handleOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutside));
</script>

<template>
  <div class="set-search-wrap">
    <div class="set-search-input-wrap" :class="{ 'is-open': isOpen, 'has-value': !!modelValue }">
      <Icon icon="search" class="search-icon" />
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        class="set-search-input"
        placeholder="Search sets by name or code..."
        autocomplete="off"
        :disabled="loading"
        @focus="open"
        @input="onInput"
        @keydown="onKeydown"
      />
      <div v-if="loading" class="search-spinner">
        <Icon icon="spinner" class="spin" />
      </div>
      <button v-else-if="modelValue" class="clear-btn" type="button" @click="clear" aria-label="Clear selection">
        <Icon icon="times" />
      </button>
    </div>

    <Transition name="dropdown">
      <ul
        v-if="isOpen && !loading"
        ref="listRef"
        class="set-dropdown"
        role="listbox"
      >
        <li v-if="filtered.length === 0" class="set-dropdown-empty">
          <Icon icon="magnifying-glass" class="empty-icon" />
          No sets found for "{{ query }}"
        </li>
        <li
          v-for="(s, i) in filtered"
          :key="s.id"
          class="set-option"
          :class="{ active: i === activeIndex, selected: modelValue?.id === s.id }"
          role="option"
          :aria-selected="modelValue?.id === s.id"
          @mousedown.prevent="select(s)"
          @mouseover="activeIndex = i"
        >
          <img
            v-if="s.icon_svg_uri"
            :src="s.icon_svg_uri"
            class="set-icon"
            :alt="s.code"
          />
          <span v-else class="set-icon-placeholder">
            <Icon icon="layer-group" />
          </span>
          <span class="set-option-info">
            <span class="set-option-name">{{ s.name }}</span>
            <span class="set-option-meta">{{ s.code.toUpperCase() }} · {{ releaseYear(s) }} · {{ s.card_count }} cards</span>
          </span>
          <Icon v-if="modelValue?.id === s.id" icon="check" class="selected-icon" />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.set-search-wrap {
  position: relative;
  width: 100%;
}

.set-search-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 12px;
  height: 44px;
  transition: border-color 0.2s ease;
}

.set-search-input-wrap:focus-within,
.set-search-input-wrap.is-open {
  border-color: var(--accent);
}

.set-search-input-wrap.has-value {
  border-color: var(--accent);
  background: rgba(155, 77, 202, 0.06);
}

.search-icon {
  color: var(--text-secondary);
  font-size: 13px;
  flex-shrink: 0;
}

.set-search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 14px;
  min-width: 0;
}

.set-search-input::placeholder {
  color: var(--text-secondary);
}

.search-spinner,
.clear-btn {
  flex-shrink: 0;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.clear-btn:hover {
  color: var(--text-primary);
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.set-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--flyout-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  max-height: 280px;
  overflow-y: auto;
  z-index: 50;
  list-style: none;
  padding: 4px;
  margin: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.set-dropdown-empty {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  font-size: 13px;
  color: var(--text-secondary);
}

.set-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s ease;
}

.set-option.active,
.set-option:hover {
  background: rgba(155, 77, 202, 0.1);
}

.set-option.selected {
  background: rgba(155, 77, 202, 0.15);
}

.set-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  filter: invert(0.7);
  object-fit: contain;
}

.set-icon-placeholder {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 12px;
  flex-shrink: 0;
}

.set-option-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.set-option-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.set-option-meta {
  font-size: 11px;
  color: var(--text-secondary);
}

.selected-icon {
  color: var(--accent);
  font-size: 12px;
  flex-shrink: 0;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
