const STORAGE_KEY = 'tasks'

function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    return e
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export default {
  namespaced: true,

  state: () => ({
    tasks: loadTasks(),
  }),

  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task)
      saveTasks(state.tasks)
    },

    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter((t) => t.id !== id)
      saveTasks(state.tasks)
    },

    TOGGLE_TASK(state, id) {
      const task = state.tasks.find((t) => t.id === id)
      if (task) task.done = !task.done
      saveTasks(state.tasks)
    },

    EDIT_TASK(state, updatedTask) {
      const index = state.tasks.findIndex((t) => t.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
        saveTasks(state.tasks)
      }
    },
    SOFT_DELETE(state, id) {
      const task = state.tasks.find((t) => t.id === id)
      if (task) task.deleted = true
      saveTasks(state.tasks)
    },

    RESTORE_TASK(state, id) {
      const task = state.tasks.find((t) => t.id === id)
      if (task) {
        task.deleted = false
        task.done = false
      }
      saveTasks(state.tasks)
    },
  },

  getters: {
    tasks: (state) => state.tasks,
  },
}
