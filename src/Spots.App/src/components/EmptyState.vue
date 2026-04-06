<script setup lang="ts">
import Icon from './Icon.vue';

withDefaults(
  defineProps<{
    icon?: string;
    title?: string;
    message?: string;
    /** 'default' = large centred layout with icon circle (page-level)
     *  'compact' = smaller padding without icon wrap (card/widget-level) */
    variant?: 'default' | 'compact';
  }>(),
  {
    icon: 'inbox',
    variant: 'default',
  }
);
</script>

<template>
  <div class="empty-state" :class="`empty-state--${variant}`">
    <div v-if="variant === 'default'" class="empty-icon-wrap">
      <Icon :icon="icon!" class="empty-icon" />
    </div>
    <Icon v-else :icon="icon!" class="empty-icon empty-icon--compact" />

    <template v-if="title || $slots.title">
      <h3 class="empty-title">
        <slot name="title">{{ title }}</slot>
      </h3>
    </template>

    <p v-if="message || $slots.default" class="empty-message">
      <slot>{{ message }}</slot>
    </p>

    <div v-if="$slots.action" class="empty-action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

/* ── Default (page-level) ──────────────────────────────────── */
.empty-state--default {
  padding: 64px 24px;
  justify-content: center;
  gap: 16px;
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
  color: var(--accent);
}

.empty-icon :deep(svg) {
  width: 28px;
  height: 28px;
}

/* ── Compact (card/widget-level) ───────────────────────────── */
.empty-state--compact {
  padding: 24px 0;
}

.empty-icon--compact {
  color: var(--text-secondary);
}

.empty-icon--compact :deep(svg) {
  width: 24px;
  height: 24px;
}

/* ── Text ──────────────────────────────────────────────────── */
.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.empty-message {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 340px;
  line-height: 1.6;
  margin: 0;
}

.empty-state--compact .empty-message {
  font-size: 13px;
  max-width: none;
}

.empty-action {
  margin-top: 4px;
}
</style>
