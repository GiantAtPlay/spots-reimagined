<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';
import type { User } from '../../data/mockUsers';

const props = defineProps<{
  user?: User;
  mode?: 'edit' | 'create';
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', data: any): void;
}>();

const form = ref({
  username: props.user?.username || '',
  email: props.user?.email || '',
  role: props.user?.role || 'user',
});

const isSaving = ref(false);

const handleSubmit = () => {
  isSaving.value = true;
  setTimeout(() => {
    isSaving.value = false;
    emit('save', form.value);
    emit('close');
  }, 500);
};
</script>

<template>
  <div class="flyout-form" @submit.prevent="handleSubmit">
    <div class="form-scroll-content">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label for="role" class="form-label">Role</label>
        <select id="role" v-model="form.role" class="form-select">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>

    <div class="form-actions">
      <Button
        variant="secondary"
        @click="$emit('close')"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Saving...' : 'Save Changes' }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.flyout-form {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form-scroll-content {
  flex: 1;
  overflow-y: auto;
}

.form-actions .btn {
  flex: 1;
}
</style>
