<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const form = ref({
  email: '',
  password: '',
});
const error = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = '';
  
  const { success, error: authError } = await authStore.login(form.value);
  
  isLoading.value = false;
  
  if (success) {
    router.push('/');
  } else {
    error.value = authError;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h2 class="form-title">Login</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-input"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="form-button" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="error" class="form-error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.form-wrapper {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

.form-button {
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-button:disabled {
  background-color: #a0c4ff;
  cursor: not-allowed;
}

.form-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.form-error {
  margin-top: 10px;
  font-size: 14px;
  color: #d9534f;
  text-align: center;
}
</style>