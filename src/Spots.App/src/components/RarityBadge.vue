<script setup lang="ts">
interface Props {
  rarity: 'common' | 'uncommon' | 'rare' | 'mythic';
}

defineProps<Props>();
</script>

<template>
  <span class="rarity-badge" :class="`rarity-${rarity}`">
    {{ rarity }}
  </span>
</template>

<style scoped>
.rarity-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 600;
  display: inline-block;
}

.rarity-common {
  background: rgba(148, 163, 184, 0.15);
  color: var(--text-secondary);
}

.rarity-uncommon {
  background: rgba(16, 185, 129, 0.15);
  color: var(--success);
}

.rarity-rare {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.rarity-mythic {
  background: rgba(155, 77, 202, 0.15);
  color: var(--accent);
}
</style>
