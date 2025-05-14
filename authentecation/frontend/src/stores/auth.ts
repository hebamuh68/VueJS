import { defineStore } from 'pinia';
import authService from '@/services/authService';
import type { User } from '@/types/user'; // Create this type if needed

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await authService.login(credentials);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        await this.fetchUser();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Login failed' };
      }
    },

    async register(userData: { username: string; email: string; password: string }) {
      try {
        const response = await authService.register(userData);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        await this.fetchUser();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Registration failed' };
      }
    },

    async fetchUser() {
      if (this.token) {
        const response = await authService.getCurrentUser();
        this.user = response.data.user;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      authService.logout();
    },
  },
  
});