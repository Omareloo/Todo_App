<template>
  <q-page padding>

<div class="row q-mb-md full-width">
  <q-space />
  <q-btn color="primary" icon="add" label="Add Task" @click="openAdd" />
</div>
    <TaskModal
      :show="showDialog"
      :task="selectedTask"
      :mode="mode"
      @close="closeModal"
    />

    <TaskCard :tasks="tasks" @edit-task="openEdit" />

  </q-page>
</template>

<script>
import TaskCard from 'src/components/TaskCard.vue'
import TaskModal from 'src/components/TaskModal.vue'
import { mapState } from 'vuex'

export default {
  components: { TaskCard, TaskModal },

  data() {
    return {
      showDialog: false,
      selectedTask: null,
      mode: 'create'
    }
  },

  computed: {
    ...mapState('tasks', ['tasks'])
  },

  methods: {
    openAdd() {
      this.mode = 'create'
      this.selectedTask = null
      this.showDialog = true
    },

    openEdit(task) {
      this.mode = 'edit'
      this.selectedTask = { ...task }
      this.showDialog = true
    },

    closeModal() {
      this.showDialog = false
      this.selectedTask = null
    }
  }
}
</script>
