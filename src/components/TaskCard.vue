<template>
  <div>

    <q-list bordered class="rounded-borders bg-white shadow-2 q-pa-sm">

      <q-item
        v-for="task in tasks"
        :key="task.id"
        v-ripple
        class="q-mb-sm task-item"
        :class="{ 'task-done': task.done }"
      >

        <q-item-section>

          <q-item-label class="text-weight-medium text-h6">
            {{ task.title }}
          </q-item-label>

          <q-item-label caption class="text-grey-7">
            {{ task.description }}
          </q-item-label>

          <div class="row q-gutter-sm q-mt-sm">

            <q-badge color="blue" outline>
              {{ task.dueDate }}
            </q-badge>

            <q-badge color="orange" outline>
              {{ task.dueTime }}
            </q-badge>

            <q-badge color="purple" outline>
              {{ task.priority }}
            </q-badge>

          </div>

        </q-item-section>

        <q-item-section side top class="q-gutter-sm">

          <q-btn flat dense round color="green" icon="done" @click="TOGGLE_TASK(task.id)" />
          <q-btn flat dense round color="blue" icon="edit" @click="$emit('edit-task', task)" />
          <q-btn flat dense round color="red" icon="delete" @click="DELETE_TASK(task.id)" />

        </q-item-section>

      </q-item>

    </q-list>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['tasks', 'id'],
  methods: {
    ...mapMutations('tasks', ['DELETE_TASK', 'TOGGLE_TASK'])
  }
}

</script>

<style>
.task-done {
  opacity: 0.6;
  background-color: coral;
}

.task-done .q-item__label {
  text-decoration: line-through;
}

.priority {
  font-weight: bold;
  color: var(--q-color-primary);
}

.task-item {
  border-radius: 12px;
  padding: 10px;
  background: #fff;
  transition: 0.2s;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.task-done {
  opacity: 0.6;
  background-color: #fff3f3;
}

.task-done .q-item__label {
  text-decoration: line-through;
}
</style>
