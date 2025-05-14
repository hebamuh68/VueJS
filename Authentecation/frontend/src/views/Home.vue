<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1 class="welcome-title">Welcome{{ authStore.user ? `, ${authStore.user.username}` : '' }}!</h1>
      <p class="welcome-subtitle">You are now logged in to your account.</p>
    </div>

    <div class="dashboard-section">
      <div class="dashboard-card">
        <h2 class="card-title">Account Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Username:</span>
            <span class="info-value">{{ authStore.user?.username }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Email:</span>
            <span class="info-value">{{ authStore.user?.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Member Since:</span>
            <span class="info-value">{{ new Date(authStore.user?.date_joined || '').toLocaleDateString() }}</span>
          </div>
        </div>
      </div>

      <div class="dashboard-card">
        <h2 class="card-title">Quick Actions</h2>
        <div class="actions-grid">
          <button class="action-button">Update Profile</button>
          <button class="action-button">Change Password</button>
          <button class="action-button">View Activity</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser();
  }
});
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border-radius: 1rem;
  color: white;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.dashboard-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.dashboard-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.info-label {
  font-weight: 600;
  color: #4b5563;
}

.info-value {
  color: #1f2937;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.action-button {
  padding: 0.75rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #4338ca;
}

@media (max-width: 640px) {
  .home-container {
    padding: 1rem;
  }

  .welcome-title {
    font-size: 2rem;
  }

  .dashboard-section {
    grid-template-columns: 1fr;
  }
}
</style>
