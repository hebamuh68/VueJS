<template>
    <nav class="bg-gray-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold text-white">MyApp</a>
            <ul class="flex space-x-4">
                <li>
                    <RouterLink :to="{ name: 'home' }" class="hover:underline">Home</RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'login' }" class="hover:underline">Login</RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'signup' }" class="hover:underline">SignUp</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
};
</script>