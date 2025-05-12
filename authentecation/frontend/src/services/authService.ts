import apiClient from './apiClient';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

const authService = {
  async register(data: RegisterData) {
    return await apiClient.post('/auth/register/', data);
  },
  async login(data: LoginData) {
    return await apiClient.post('/auth/login/', data);
  },
  async getCurrentUser() {
    return await apiClient.get('/auth/user/');
  }
};

export default authService;