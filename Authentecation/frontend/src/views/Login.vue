<script setup lang="ts">
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const authStore = useAuthStore()

const loginForm = reactive({
  email:'',
  password:'',
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, loginForm)
const loading = ref(false)
const error = ref('')

const handleLogin = async()=>{
  v$.value.$touch()
  if (v$.value.$invalid || loading.value) return;
  loading.value = true
  error.value = ''

  try{
    const result = await authStore.login(loginForm)
    if (result.success){
      router.push({name: 'home'})
    } else {
      error.value = result.error || 'Login failed'
    }
  } catch (err: any){
    error.value = err.response?.data?.detail || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h2 class="form-title">Login</h2>
      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="loginForm.email"
            type="email"
            class="form-input"
            placeholder="Enter your email"
            required
          />
          <span v-if="v$.email.$error" class="error-text">Invalid email</span>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            class="form-input"
            placeholder="Enter your password"
            required
          />
          <span v-if="v$.password.$error" class="error-text">Min 6 characters</span>
        </div>
        <button type="submit" class="form-button" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
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
  padding: 10px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.error-text {
  color: #d9534f;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}
</style>