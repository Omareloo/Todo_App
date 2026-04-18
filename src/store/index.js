import { createStore } from 'vuex'
import tasks from './store-task'

const store = createStore({
  modules: {
    tasks,
  },
})

export default store
