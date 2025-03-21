<!-- 
What is v-model?
v-model is a directive in Vue.js that provides two-way data binding between 
a form input element (like <input>, <textarea>, or <select>) 
and a piece of state in your component. It’s essentially a shorthand for:
Binding the value of the input to a variable.
Listening for input events to update the variable when the user types.
-->


<script setup>  
  import { ref } from 'vue';
  import { useTaskStore } from '../store/taskStore';

  const newTask = ref('');
  const taskStore = useTaskStore();

  const addTask = () => {
    taskStore.addTask(newTask.value);
    newTask.value = '';
  }
</script>

<template>
  <div class="mb-4">
    <input
      v-model="newTask"
      placeholder="Add a new task"
      class="p-2 border rounded"
    />
    <button @click="addTask" class="ml-2 p-2 bg-blue-500 text-white rounded">
      Add
    </button>
  </div>
</template>
