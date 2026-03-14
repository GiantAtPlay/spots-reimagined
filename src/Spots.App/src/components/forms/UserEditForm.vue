<script setup lang="ts">
import { ref } from 'vue';
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
        <label for="username">Username</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="form.role">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>

    <div class="form-actions">
      <button
        type="button"
        class="btn btn-secondary"
        @click="$emit('close')"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Saving...' : 'Save Changes' }}
      </button>
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

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent);
}

.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  background: var(--bg);
}

.btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.btn-secondary:hover {
  border-color: var(--accent);
}
</style>
