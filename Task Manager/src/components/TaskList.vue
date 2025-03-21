<script setup>
import { useTaskStore } from '../store/taskStore';

const taskStore = useTaskStore();

const toggleTask = (id) => {
  taskStore.toggleTask(id);
};

const deleteTask = (id) => {
  taskStore.deleteTask(id);
};
</script>

<template>
  <ul>
    <li
      v-for="task in taskStore.filteredTasks"
      :key="task.id"
      class="flex justify-between items-center p-2 border-b"
    >
      <span :class="{ 'line-through': task.isCompleted }">{{ task.text }}</span>
      <div>
        <button
          @click="toggleTask(task.id)"
          class="p-1 mr-2 bg-yellow-500 text-white rounded"
        >
          Toggle
        </button>
        <button
          @click="deleteTask(task.id)"
          class="p-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </li>
  </ul>
</template>

