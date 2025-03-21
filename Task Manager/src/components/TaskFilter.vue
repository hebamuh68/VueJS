  <!-- 
    In Vue, regular JavaScript variables (e.g., let newTask = '';) 
    are not reactive. If you change their value, Vue won’t detect the change, 
    and the DOM won’t update.
    ref makes the variable reactive, so Vue can track changes and update the UI accordingly.
  -->
  
<script setup>
  import { useTaskStore } from '../store/taskStore';
  const taskStore = useTaskStore();

  const updateFilter = (filter) => {
    taskStore.updateFilter(filter);
  }  
</script>

<template>
  <div class="mb-4">
    <button @click="updateFilter('all')" class="p-2 bg-blue-500 text-white rounded">
      All
    >
      All
    </button>
  </div>

  <div class="mb-4">
    <button @click="updateFilter('all')" class="p-2 bg-blue-500 text-white rounded">
      All
    </button>
  </div>

  <div class="mb-4">
    <button @click="updateFilter('completed')" class="p-2 bg-blue-500 text-white rounded">
      Completed
    </button>
  </div>

  <div class="mb-4">
    <button @click="updateFilter('incomplete')" class="p-2 bg-blue-500 text-white rounded">
      Incomplete
    </button>
  </div>
</template>