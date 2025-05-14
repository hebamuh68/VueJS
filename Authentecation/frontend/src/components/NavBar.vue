<template>
    <nav class="bg-gray-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold text-white">MyApp</a>
            <ul class="flex space-x-4">
                <li>
                    <RouterLink :to="{ name: 'home' }" class="hover:underline">Home</RouterLink>
                </li>
                <template v-if="!isAuthenticated">
                    <li>
                        <RouterLink :to="{ name: 'login' }" class="hover:underline">Login</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'register' }" class="hover:underline">SignUp</RouterLink>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <button @click="handleLogout" class="hover:underline">Logout</button>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => !!authStore.token);

const handleLogout = async () => {
    await authStore.logout();
    router.push({ name: 'login' });
};
</script>