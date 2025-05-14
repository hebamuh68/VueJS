<script setup lang="ts">
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const rules = {
  username: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: { 
    sameAs: (value: string) => value === registerForm.password,
    required
  }
};

const v$ = useVuelidate(rules, registerForm);
const loading = ref(false);
const error = ref('');

const handleRegister = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;
  
  loading.value = true;
  error.value = '';

  try {
    const { success, error: registerError } = await authStore.register(registerForm);
    
    if (success) {
      router.push({ name: 'home' });
    } else {
      error.value = registerError || 'Registration failed';
    }
  } catch (err) {
    error.value = 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="register-container">
    <div class="form-wrapper">
      <h2 class="form-title">Register</h2>
      <form @submit.prevent="handleRegister" class="form">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model="registerForm.username"
            type="username"
            class="form-input"
            placeholder="Enter your username"
            required
          />
          <span v-if="v$.username.$error">user with this email already exists.</span>
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="registerForm.email"
            @blur="v$.email.$touch()"
            type="email"
            class="form-input"
            placeholder="Enter your email"
            :class="{ 'input-error': v$.email.$error }"
          >
          <span v-if="v$.email.$error" class="error-message">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            class="form-input"
            placeholder="Enter your password"
            required
          />
        </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Password</label>
            <input
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              type="password"
              class="form-input"
              placeholder="Renter your password"
              required
            />
            <span v-if="v$.confirmPassword.$error">Passwords must match</span>
          </div>
          <button 
            type="submit" 
            class="form-button" 
            :disabled="loading || v$.$invalid"
          >
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        <p v-if="error" class="form-error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
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