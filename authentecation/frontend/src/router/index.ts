import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    }
  ],
})

router.beforeEach(async(to) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;
  if(to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  if(to.meta.guestOnly && isAuthenticated) {
    return { name: 'home' }
  }
});

export default router
