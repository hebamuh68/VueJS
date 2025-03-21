import { defineStore } from "pinia";

export const useTaskStore = defineStore('task', {
    state: () => ({
      tasks: [],
      filter: 'all', // 'all', 'completed', 'incomplete'
    }),
    actions:{
        addTask(text) {
            if (!text) return;
            this.tasks.push({
              id: Math.floor(Math.random() * 1000000),
              text,
              isCompleted: false,
            });
        },
        toggleTask(id){
            const task = this.tasks.find((task) => task.id === id);
            if (task) task.isCompleted = !task.isCompleted;
        },
        deleteTask(id){
            this.tasks = this.tasks.filter((task) => task.id !== id);
        },
        updateFilter(newFilter){
            this.filter = newFilter;
        },
    },
    getters:{
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