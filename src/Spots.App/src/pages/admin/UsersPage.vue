<template>
  <div>
    <div class="page-header">
      <div class="header-actions">
        <Button variant="primary" icon="plus" @click="openAddFlyout">
          Add User
        </Button>
      </div>
    </div>

    <DataTable :data="users" :columns="columns">
      <template #cell(role)="{ row }">
        <Badge 
          :variant="row.role === 'admin' ? 'primary' : 'secondary'" 
          :icon="row.role === 'admin' ? 'user-shield' : 'user'"
        >
          {{ row.role === 'admin' ? 'Admin' : 'User' }}
        </Badge>
      </template>
      
      <template #cell(actions)="{ row }">
        <div class="action-buttons">
          <Button variant="icon" icon="edit" :sr-text="`Edit ${row.username}`" icon-only @click="openEditFlyout(row)" />
          <Button 
            variant="icon" 
            icon="trash"
            :sr-text="`Delete ${row.username}`"
            icon-only
            :disabled="row.role === 'admin'"
          />
        </div>
      </template>
    </DataTable>

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
import DataTable from '../../components/DataTable.vue';
import { mockUsers, type User } from '../../data/mockUsers';

const flyoutStore = useFlyoutStore();
const users = ref<User[]>(mockUsers);

const columns = [
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'createdAt', label: 'Created' },
  { key: 'lastLogin', label: 'Last Login' },
  { key: 'actions', label: 'Actions', align: 'right' as const }
];

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
