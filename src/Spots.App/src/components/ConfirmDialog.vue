<script setup lang="ts">
import Icon from './Icon.vue';
import Button from './Button.vue';

defineProps<{
  visible: boolean;
  message: string;
  detail?: string;
  confirmLabel?: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm-fade">
      <div v-if="visible" class="confirm-overlay" @click.self="emit('cancel')">
        <div class="confirm-dialog" role="alertdialog" aria-modal="true">
          <div class="confirm-icon-wrap">
            <Icon icon="triangle-exclamation" class="confirm-icon" />
          </div>
          <div class="confirm-body">
            <p class="confirm-message">{{ message }}</p>
            <p v-if="detail" class="confirm-detail">{{ detail }}</p>
          </div>
          <div class="confirm-actions">
            <Button variant="secondary" size="small" @click="emit('cancel')">
              Cancel
            </Button>
            <Button variant="danger" size="small" @click="emit('confirm')">
              {{ confirmLabel ?? 'Delete' }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.confirm-dialog {
  background: var(--flyout-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px 20px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.confirm-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-icon {
  font-size: 22px;
  color: var(--danger);
}

.confirm-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.confirm-message {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.confirm-detail {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.confirm-actions {
  display: flex;
  gap: 10px;
  width: 100%;
}

.confirm-actions :deep(.btn) {
  flex: 1;
}

/* Transitions */
.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity 0.2s ease;
}

.confirm-fade-enter-active .confirm-dialog,
.confirm-fade-leave-active .confirm-dialog {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}

.confirm-fade-enter-from .confirm-dialog,
.confirm-fade-leave-to .confirm-dialog {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}
</style>
