<template>
  <div>
    <div class="page-header">
      <div class="header-actions">
        <button class="btn btn-primary" @click="openAddFlyout">
          <font-awesome-icon icon="plus" />
          Add User
        </button>
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Last Login</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <Badge 
                :variant="user.role === 'admin' ? 'primary' : 'secondary'" 
                :icon="user.role === 'admin' ? 'user-shield' : 'user'"
              >
                {{ user.role === 'admin' ? 'Admin' : 'User' }}
              </Badge>
            </td>
            <td>{{ user.createdAt }}</td>
            <td>{{ user.lastLogin }}</td>
            <td class="actions-col">
              <div class="action-buttons">
                <button class="action-btn" title="Edit" @click="openEditFlyout(user)">
                  <font-awesome-icon icon="edit" />
                </button>
                <button 
                  class="action-btn danger" 
                  title="Delete"
                  :disabled="user.role === 'admin'"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="dev-nav">
      <span>Dev: </span>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/admin/users">Users</router-link> |
      <router-link to="/admin/system">System</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFlyoutStore } from '../../stores/flyout';
import Badge from '../../components/Badge.vue';
import { mockUsers, type User } from '../../data/mockUsers';

const flyoutStore = useFlyoutStore();
const users = ref<User[]>(mockUsers);

const openAddFlyout = () => {
  flyoutStore.open({
    title: 'Add User',
    component: 'UserEditForm',
    props: {
      mode: 'create'
    }
  });
};

const openEditFlyout = (user: User) => {
  flyoutStore.open({
    title: 'Edit User',
    component: 'UserEditForm',
    props: {
      user: user,
      mode: 'edit'
    }
  });
};
</script>

<style scoped>
.page-header {
  @apply flex justify-between items-center mb-6;
}

.header-actions {
  @apply flex gap-3;
}

.btn {
  @apply flex items-center gap-2 px-4 py-2 rounded-sm font-medium transition-all duration-200;
}

.btn-primary {
  @apply text-white;
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
}

.btn-primary:hover {
  transform: translateY(-2px);
}

.table-container {
  @apply overflow-x-auto;
}

.data-table {
  @apply w-full;
}

.data-table th,
.data-table td {
  @apply px-4 py-3 text-left;
}

.data-table th {
  @apply text-xs uppercase tracking-wider text-text-secondary font-medium;
  border-bottom: 1px solid var(--border);
}

.data-table td {
  @apply border-b border-border;
}

.data-table th.actions-col,
.data-table td.actions-col {
  @apply text-right w-24;
}

.data-table tr:hover td {
  background: var(--tile-bg);
}

.action-buttons {
  @apply flex gap-2 justify-end;
}

.action-btn {
  @apply w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-200;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
}

.action-btn:hover:not(:disabled) {
  @apply border-accent text-accent;
}

.action-btn.danger:hover:not(:disabled) {
  @apply border-danger text-danger;
}

.action-btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.dev-nav {
  @apply mt-8 pt-4 border-t border-border text-center text-xs text-text-secondary;
}

.dev-nav a {
  @apply text-accent hover:underline;
}
</style>
