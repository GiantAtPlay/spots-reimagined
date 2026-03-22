<template>
  <div class="table-card-info">
    <CardImage
      :image-url="imageUrl"
      :card-name="name"
      :colour="colour"
      size="small"
    />
    <div class="table-card-details">
      <span class="table-card-name">{{ name }}</span>
      <span class="table-card-subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardImage from './CardImage.vue';

defineProps<{
  imageUrl: string;
  name: string;
  colour: string;
  subtitle: string;
}>();
</script>

<style scoped>
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

.table-card-subtitle {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
