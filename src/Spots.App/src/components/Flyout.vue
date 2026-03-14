<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useFlyoutStore } from '../stores/flyout';
import UserEditForm from './forms/UserEditForm.vue';
import CardDetail from './forms/CardDetail.vue';

const flyoutStore = useFlyoutStore();

const componentMap: Record<string, any> = {
  UserEditForm,
  CardDetail,
};

const flyoutComponent = computed(() => {
  if (!flyoutStore.config) return null;
  return componentMap[flyoutStore.config.component] || null;
});

const isVisible = ref(false);
const isClosing = ref(false);

watch(() => flyoutStore.isOpen, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    isVisible.value = true;
    isClosing.value = false;
  } else if (!newVal && oldVal) {
    isClosing.value = true;
    setTimeout(() => {
      isVisible.value = false;
      isClosing.value = false;
    }, 250);
  }
});

const close = () => {
  isClosing.value = true;
  setTimeout(() => {
    isVisible.value = false;
    isClosing.value = false;
    flyoutStore.close();
  }, 250);
};

const handleOverlayClick = () => {
  close();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && flyoutStore.isOpen) {
    close();
  }
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="flyout-overlay"
      :class="{ closing: isClosing }"
      @click="handleOverlayClick"
      @keydown="handleKeydown"
    >
      <div
        class="flyout-panel"
        :class="{ closing: isClosing }"
        @click.stop
      >
        <div class="flyout-header">
          <h2 class="flyout-title">{{ flyoutStore.config?.title }}</h2>
          <button
            class="flyout-close"
            @click="close"
          >
            <font-awesome-icon icon="times" />
          </button>
        </div>

        <div class="flyout-content">
          <component
            :is="flyoutComponent"
            v-if="flyoutComponent"
            v-bind="flyoutStore.config?.props || {}"
            @close="close"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.flyout-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  animation: fadeIn 0.25s ease forwards;
}

.flyout-overlay.closing {
  animation: fadeOut 0.25s ease forwards;
}

.flyout-panel {
  position: fixed;
  top: 16px;
  right: 16px;
  bottom: 16px;
  width: 420px;
  max-width: calc(100vw - 32px);
  background: var(--flyout-bg);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 101;
  animation: slideInRight 0.25s ease forwards;
}

.flyout-panel.closing {
  animation: slideOutRight 0.25s ease forwards;
}

.flyout-header {
  padding: 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flyout-title {
  font-size: 20px;
  font-weight: 600;
}

.flyout-close {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.flyout-close:hover {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
  border-color: var(--danger);
}

.flyout-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(30px);
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
