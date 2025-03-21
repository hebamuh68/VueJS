Here’s a simple **Vue.js + Pinia project idea** based on the concepts explained in the video. This project will help you practice using Pinia for state management while building a functional application.

---

### **Project: Task Manager App**
Build a **Task Manager** application where users can:
1. Add new tasks.
2. Mark tasks as completed.
3. Filter tasks (all, completed, or incomplete).
4. Delete tasks.

---

### **Features**
1. **Add a Task**:
   - Users can input a task name and add it to the list.
   - Each task has an `id`, `text`, and `isCompleted` status.

2. **Mark Tasks as Completed**:
   - Users can toggle a task's completion status.
   - Completed tasks are visually distinguished (e.g., with a strikethrough).

3. **Filter Tasks**:
   - Buttons to filter tasks:
     - **All**: Show all tasks.
     - **Completed**: Show only completed tasks.
     - **Incomplete**: Show only incomplete tasks.

4. **Delete Tasks**:
   - Users can delete a task from the list.

---

### **Tech Stack**
- **Frontend**: Vue.js
- **State Management**: Pinia
- **Styling**: Tailwind CSS (optional, for quick styling)

---

### **Steps to Build the Project**

#### 1. **Set Up the Project**
   - Create a new Vue.js project:
     ```bash
     npm init vue@latest
     ```
   - Install Pinia:
     ```bash
     npm install pinia
     ```
   - Configure Pinia in `main.js`:
     ```javascript
     import { createApp } from 'vue';
     import { createPinia } from 'pinia';
     import App from './App.vue';

     const app = createApp(App);
     app.use(createPinia());
     app.mount('#app');
     ```

---

#### 2. **Create the Pinia Store**
   - Create a `store/taskStore.js` file:
     ```javascript
     import { defineStore } from 'pinia';

     export const useTaskStore = defineStore('task', {
       state: () => ({
         tasks: [],
         filter: 'all', // 'all', 'completed', 'incomplete'
       }),
       actions: {
         addTask(text) {
           if (!text) return;
           this.tasks.push({
             id: Math.floor(Math.random() * 1000000),
             text,
             isCompleted: false,
           });
         },
         toggleTask(id) {
           const task = this.tasks.find((task) => task.id === id);
           if (task) task.isCompleted = !task.isCompleted;
         },
         deleteTask(id) {
           this.tasks = this.tasks.filter((task) => task.id !== id);
         },
         updateFilter(newFilter) {
           this.filter = newFilter;
         },
       },
       getters: {
         filteredTasks() {
           if (this.filter === 'completed') {
             return this.tasks.filter((task) => task.isCompleted);
           } else if (this.filter === 'incomplete') {
             return this.tasks.filter((task) => !task.isCompleted);
           } else {
             return this.tasks;
           }
         },
       },
     });
     ```

---

#### 3. **Build the Components**
   - **App.vue**:
     ```vue
     <template>
       <div class="container mx-auto p-4">
         <h1 class="text-2xl font-bold mb-4">Task Manager</h1>
         <TaskInput />
         <TaskFilter />
         <TaskList />
       </div>
     </template>

     <script setup>
     import TaskInput from './components/TaskInput.vue';
     import TaskFilter from './components/TaskFilter.vue';
     import TaskList from './components/TaskList.vue';
     </script>
     ```

   - **TaskInput.vue**:
     ```vue
     <template>
       <div class="mb-4">
         <input
           v-model="newTask"
           placeholder="Add a new task"
           class="p-2 border rounded"
         />
         <button @click="addTask" class="ml-2 p-2 bg-blue-500 text-white rounded">
           Add
         </button>
       </div>
     </template>

     <script setup>
     import { ref } from 'vue';
     import { useTaskStore } from '../store/taskStore';

     const newTask = ref('');
     const taskStore = useTaskStore();

     const addTask = () => {
       taskStore.addTask(newTask.value);
       newTask.value = '';
     };
     </script>
     ```

   - **TaskFilter.vue**:
     ```vue
     <template>
       <div class="mb-4">
         <button
           @click="updateFilter('all')"
           class="p-2 mr-2 bg-gray-500 text-white rounded"
         >
           All
         </button>
         <button
           @click="updateFilter('completed')"
           class="p-2 mr-2 bg-green-500 text-white rounded"
         >
           Completed
         </button>
         <button
           @click="updateFilter('incomplete')"
           class="p-2 bg-red-500 text-white rounded"
         >
           Incomplete
         </button>
       </div>
     </template>

     <script setup>
     import { useTaskStore } from '../store/taskStore';

     const taskStore = useTaskStore();

     const updateFilter = (filter) => {
       taskStore.updateFilter(filter);
     };
     </script>
     ```

   - **TaskList.vue**:
     ```vue
     <template>
       <ul>
         <li
           v-for="task in taskStore.filteredTasks"
           :key="task.id"
           class="flex justify-between items-center p-2 border-b"
         >
           <span :class="{ 'line-through': task.isCompleted }">{{ task.text }}</span>
           <div>
             <button
               @click="toggleTask(task.id)"
               class="p-1 mr-2 bg-yellow-500 text-white rounded"
             >
               Toggle
             </button>
             <button
               @click="deleteTask(task.id)"
               class="p-1 bg-red-500 text-white rounded"
             >
               Delete
             </button>
           </div>
         </li>
       </ul>
     </template>

     <script setup>
     import { useTaskStore } from '../store/taskStore';

     const taskStore = useTaskStore();

     const toggleTask = (id) => {
       taskStore.toggleTask(id);
     };

     const deleteTask = (id) => {
       taskStore.deleteTask(id);
     };
     </script>
     ```

---

#### 4. **Run the Project**
   - Start the development server:
     ```bash
     npm run dev
     ```
   - Open the app in your browser and test the functionality.

---

### **Optional Enhancements**
1. **Persist State**: Use `localStorage` to save tasks so they persist after page refresh.
2. **Edit Tasks**: Add functionality to edit task text.
3. **Drag and Drop**: Allow users to reorder tasks by dragging and dropping.
4. **Categories/Tags**: Add categories or tags to tasks for better organization.

---

This project will give you hands-on experience with Pinia and Vue.js while building a practical application. Let me know if you need further assistance! 🚀
