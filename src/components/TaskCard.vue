<template>
  <div>
    <div class="tab-row">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-btn', { active: currentTab === tab.key }]"
        @click="currentTab = tab.key"
      >
        {{ tab.label }}
        <span class="tab-count">{{ tabCount(tab.key) }}</span>
      </button>
    </div>

    <q-list class="task-list">
      <transition-group name="task">
        <q-item
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-item"
          :class="{ 'task-done': task.done }"
        >
          <q-item-section>
            <q-item-label class="task-title">{{ task.title }}</q-item-label>
            <q-item-label caption class="text-grey-7">{{ task.description }}</q-item-label>
            <div class="badge-row q-mt-sm">
              <q-badge class="badge badge-date" outline>{{ task.dueDate }}</q-badge>
              <q-badge class="badge badge-time" outline color="orange">{{ task.dueTime }}</q-badge>
              <q-badge :color="priorityColor(task.priority)" class="badge">{{ task.priority }}</q-badge>
            </div>
          </q-item-section>

          <q-item-section side top class="action-col">
            <template v-if="currentTab === 'deleted'">
              <q-btn flat dense round icon="restore" color="green" title="Restore" @click="RESTORE_TASK(task.id)" />
            </template>
            <template v-else>
              <q-btn flat dense round :icon="task.done ? 'replay' : 'check'" :color="task.done ? 'grey' : 'green'" @click="TOGGLE_TASK(task.id)" />
              <q-btn v-if="!task.done" flat dense round icon="edit" color="blue" @click="$emit('edit-task', task)" />
              <q-btn flat dense round icon="delete" color="red" @click="SOFT_DELETE(task.id)" />
            </template>
          </q-item-section>
        </q-item>
      </transition-group>

      <div v-if="filteredTasks.length === 0" class="empty-state">
        <q-icon :name="emptyIcon" size="2.5rem" color="grey-4" />
        <p>{{ emptyText }}</p>
      </div>
    </q-list>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['tasks'],

  emits: ['edit-task'],

  data() {
    return {
      currentTab: 'active',
      tabs: [
        { key: 'active', label: 'Active' },
        { key: 'done', label: 'Completed' },
        { key: 'deleted', label: 'Deleted' }
      ]
    }
  },

  computed: {
    filteredTasks() {
      if (this.currentTab === 'active') return this.tasks.filter(t => !t.done && !t.deleted)
      if (this.currentTab === 'done') return this.tasks.filter(t => t.done && !t.deleted)
      return this.tasks.filter(t => t.deleted)
    },
    emptyText() {
      return { active: 'No active tasks', done: 'No completed tasks yet', deleted: 'Trash is empty' }[this.currentTab]
    },
    emptyIcon() {
      return { active: 'checklist', done: 'task_alt', deleted: 'delete_outline' }[this.currentTab]
    }
  },

  methods: {
    ...mapMutations('tasks', ['TOGGLE_TASK', 'SOFT_DELETE', 'RESTORE_TASK']),

    priorityColor(p) {
      return { High: 'negative', Medium: 'warning', Low: 'positive' }[p] || 'grey'
    },
    tabCount(key) {
      if (key === 'active') return this.tasks.filter(t => !t.done && !t.deleted).length
      if (key === 'done') return this.tasks.filter(t => t.done && !t.deleted).length
      return this.tasks.filter(t => t.deleted).length
    }
  }
}
</script>

<style scoped>
.tab-row {
  display: flex;
  gap: 4px;
  background: #f0ede6;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 16px;
}
.tab-btn {
  flex: 1;
  padding: 7px 12px;
  border: none;
  border-radius: 7px;
  font-size: 13px;
  cursor: pointer;
  background: transparent;
  color: #888;
  font-weight: 400;
  transition: all 0.15s;
}
.tab-btn.active {
  background: #fff;
  color: #1a1a1a;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.tab-count {
  margin-left: 5px;
  opacity: 0.5;
  font-size: 11px;
}
.task-list {
  background: transparent;
  padding: 0;
}
.task-item {
  background: #fff;
  border-radius: 12px;
  border: 0.5px solid rgba(0,0,0,0.1);
  margin-bottom: 10px;
  padding: 12px 14px;
  transition: transform 0.15s;
}
.task-item:hover { transform: translateY(-1px); }
.task-done { opacity: 0.6; }
.task-done .task-title { text-decoration: line-through; }
.task-title { font-size: 15px; font-weight: 500; }
.badge-row { display: flex; flex-wrap: wrap; gap: 6px; }
.badge { font-size: 11px; }
.action-col { gap: 4px; }
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #bbb;
}
.empty-state p { margin-top: 8px; font-size: 14px; }
.task-enter-active, .task-leave-active { transition: all 0.25s; }
.task-enter-from, .task-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
