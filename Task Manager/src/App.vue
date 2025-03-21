<script setup>
import TaskInput from './components/TaskInput.vue';
import TaskFilter from './components/TaskFilter.vue';
import TaskList from './components/TaskList.vue';
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Task Manager</h1>
    <TaskInput />
    <TaskFilter />
    <TaskList />
  </div>
</template>