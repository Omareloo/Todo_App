<template>
  <div>

    <q-dialog v-model="localShow">

      <q-card class="q-pa-md" style="min-width: 400px">

        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ isEdit ? 'Edit Task' : 'Add Task' }}
          </div>
        </q-card-section>

        <q-form ref="form" @submit.prevent="submitTask">
          <q-card-section class="column q-gutter-md">

            <q-input outlined v-model="title" label="Task Title" class="full-width"
              :rules="[val => !!val || 'Field is required', val => val.length >= 3 || 'Minimum length is 3']" />
            <q-input outlined v-model="description" label="Task Description" class="full-width"
              :rules="[val => !!val || 'Field is required']" />
            <div class="row q-col-gutter-md items-start q-mt-md">
              <div class="col-12 col-md-6">
                <q-input outlined v-model="date" label="Due Date" class="full-width"
                  :rules="[val => !!val || 'Field is required']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="date">
                          <div class="row justify-end">
                            <q-btn v-close-popup label="Close" flat color="primary" />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input outlined v-model="time" label="Due Time" class="full-width"
                  :rules="[val => !!val || 'Field is required']">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="time">
                          <div class="row justify-end">
                            <q-btn v-close-popup label="Close" flat color="primary" />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <q-select outlined v-model="priority" :options="['High', 'Medium', 'Low']" label="Priority (Required)"
              class="full-width" behavior="menu" options-cover :rules="[val => !!val || 'Field is required']" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn color="primary" :loading="loading" type="submit">
              Save
            </q-btn>
          </q-card-actions>
        </q-form>




      </q-card>

    </q-dialog>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['show', 'task', 'mode'],

  emits: ['close'],

  data() {
    return {
      localShow: false,
      title: '',
      description: '',
      date: '',
      time: '',
      priority: '',
      loading: false
    }
  },

  computed: {
    isEdit() {
      return this.mode === 'edit'
    }
  },

  watch: {
    show(val) {
      this.localShow = val

      if (val) {
        this.fillForm()
      }
    },

    localShow(val) {
      if (!val) this.$emit('close')
    },

    task: {
      immediate: true,
      handler() {
        if (this.show) {
          this.fillForm()
        }
      }
    }
  },

  methods: {
    ...mapMutations('tasks', ['ADD_TASK', 'EDIT_TASK']),

    fillForm() {
      if (this.task && this.isEdit) {
        this.title = this.task.title
        this.description = this.task.description
        this.date = this.task.dueDate
        this.time = this.task.dueTime
        this.priority = this.task.priority || ''
      } else {
        this.resetForm()
      }
    },

    resetForm() {
      this.title = ''
      this.description = ''
      this.date = ''
      this.time = ''
      this.priority = null
    },
    submitTask() {
      const isValid = this.$refs.form.validate()

      if (!isValid) return

      this.loading = true

      const task = {
        id: this.task?.id || Date.now(),
        title: this.title,
        description: this.description,
        dueDate: this.date,
        dueTime: this.time,
        priority: this.priority,
        done: this.task?.done || false
      }

      if (this.isEdit) {
        this.EDIT_TASK(task)
      } else {
        this.ADD_TASK(task)
      }

      setTimeout(() => {
        this.loading = false
        this.localShow = false
        this.resetForm()
      }, 300)
    }
  }
}
</script>
