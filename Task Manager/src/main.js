import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Create a Vue application instance using the root component (App)
const app = createApp(App);

// Pinia is registered as a plugin to manage global state
// The application is mounted to the DOM, rendering the App component inside the element with the ID 'app'
app.use(createPinia());
app.mount('#app');