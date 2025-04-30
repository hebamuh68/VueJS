<template>

  <h2 class=" text-3xl font-bold text-center m-12">Login {{ auth.name }}</h2>
     
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <div class="form-group mb-4">
      <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
      <input 
        type="text" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        id="email" 
        placeholder="Enter email">
    </div>
    <div class="form-group mb-4">
      <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
      <input 
        type="password" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        id="password" 
        placeholder="Enter password">
    </div>
    <div>
      <button 
        type="submit" 
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
        Login
      </button>
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '@/stores/auth';
  const auth = useAuthStore();
</script>