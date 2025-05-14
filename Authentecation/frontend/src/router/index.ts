import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/', 
      name:"home", 
      component: Home,
      meta:{requiresAuth: true}
    },
    {
      path:'/login', 
      name:"login", 
      component: Login
    },
    {
      path:'/register', 
      name:"register", 
      component:Register
    },
  ],
})

router.beforeEach(async(to) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  
  if (token && !authStore.user) {
    await authStore.fetchUser();
  }

  const isAuthenticated = !!authStore.user;

  // If route requires auth and user is not authenticated, redirect to login
  if(to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }
  
  // If user is authenticated and trying to access login/register, redirect to home
  if(isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    return { name: 'home' }
  }
  
  // Otherwise, allow the navigation
  return true
});

export default router
