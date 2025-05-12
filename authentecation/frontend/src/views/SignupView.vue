<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Form data
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// Validation rules
const rules = {
  username: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: { 
    valid: (value: string) => value === form.value.password
  }
};

const v$ = useVuelidate(rules, form);
const isLoading = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  // Validate form
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { success, error } = await authStore.register({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    });

    if (success) {
      router.push('/'); // Redirect to home after successful registration
    } else {
      errorMessage.value = error || 'Registration failed';
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Create Account</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- username Field -->
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          :class="{ 'border-red-500': v$.username.$error }"
        >
        <p v-if="v$.username.$error" class="mt-1 text-sm text-red-600">
          {{ v$.username.$errors[0]?.$message || 'username is required' }}
        </p>
      </div>

      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          :class="{ 'border-red-500': v$.email.$error }"
        >
        <p v-if="v$.email.$error" class="mt-1 text-sm text-red-600">
          {{ v$.email.$errors[0]?.$message || 'Valid email is required' }}
        </p>
      </div>

      <!-- Password Field -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          :class="{ 'border-red-500': v$.password.$error }"
        >
        <p v-if="v$.password.$error" class="mt-1 text-sm text-red-600">
          {{ v$.password.$errors[0]?.$message || 'Password must be at least 6 characters' }}
        </p>
      </div>

      <!-- Confirm Password Field -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          :class="{ 'border-red-500': v$.confirmPassword.$error }"
        >
        <p v-if="v$.confirmPassword.$errors.length" class="mt-1 text-sm text-red-600">
          {{ v$.confirmPassword.$errors[0].$validator === 'valid' ? 'Passwords must match' : v$.confirmPassword.$errors[0].$message }}
        </p>
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isLoading">Creating account...</span>
        <span v-else>Sign Up</span>
      </button>

      <!-- Login Link -->
      <div class="text-center text-sm">
        <span class="text-gray-600">Already have an account?</span>
        <router-link 
          to="/login" 
          class="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </router-link>
      </div>
    </form>
  </div>
</template>