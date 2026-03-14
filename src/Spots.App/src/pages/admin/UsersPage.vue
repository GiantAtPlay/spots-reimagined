<template>
  <div>
    <div class="page-header">
      <div class="header-actions">
        <Button variant="primary" icon="plus" @click="openAddFlyout">
          Add User
        </Button>
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
                <Button variant="icon" icon="edit" :sr-text="`Edit ${user.username}`" icon-only @click="openEditFlyout(user)" />
                <Button 
                  variant="icon" 
                  icon="trash"
                  :sr-text="`Delete ${user.username}`"
                  icon-only
                  :disabled="user.role === 'admin'"
                />
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
import Button from '../../components/Button.vue';
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

.dev-nav {
  @apply mt-8 pt-4 border-t border-border text-center text-xs text-text-secondary;
}

.dev-nav a {
  @apply text-accent hover:underline;
}
</style>
