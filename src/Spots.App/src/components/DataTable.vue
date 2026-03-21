<script setup lang="ts" generic="T">
interface Column {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  class?: string;
}

interface Props {
  columns: Column[];
  data: T[];
  keyField?: string;
  hoverable?: boolean;
  rowClickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  keyField: 'id',
  hoverable: true,
  rowClickable: false
});

const emit = defineEmits<{
  rowClick: [row: T];
}>();

const getColumnClass = (column: Column) => {
  const classes = [];
  if (column.class) classes.push(column.class);
  if (column.align === 'right') classes.push('text-right');
  if (column.align === 'center') classes.push('text-center');
  return classes.join(' ');
};

const handleRowClick = (row: T) => {
  if (props.rowClickable) {
    emit('rowClick', row);
  }
};
</script>

<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="getColumnClass(column)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="(row as any)[keyField] || index"
          :class="{ 'row-hoverable': hoverable, 'row-clickable': rowClickable }"
          @click="handleRowClick(row)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="getColumnClass(column)"
          >
            <!-- 
              Slot for custom cell rendering
              Usage: #cell(columnKey)="{ row, value }"
            -->
            <slot
              :name="`cell(${column.key})`"
              :row="row"
              :value="(row as any)[column.key]"
            >
              <!-- Default: Display the value as-is -->
              {{ (row as any)[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 16px;
  text-align: left;
}

.data-table th {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
  font-weight: 600;
}

.data-table td {
  border-bottom: 1px solid var(--border);
}

.data-table tr.row-hoverable:hover td {
  background: var(--tile-bg);
}

.data-table tr.row-clickable {
  cursor: pointer;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}
</style>
