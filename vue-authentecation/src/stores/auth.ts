//used to define and create a store, which is like a container for 
// state, getters, and actions in your app.
import { defineStore } from "pinia";

//The first argument 'auth' is a unique ID for the store. 
// It helps Pinia identify this store internally.
export const useAuthStore = defineStore("auth", {

    //This is the reactive state defined as a function returning an object
    state: () => ({
        name: 'Heba'
    }),

    //computed properties return derived data based on the state.
    getters: {
        upperName(state){
            return state.name.toUpperCase();
        }
    },

    //functions that modify the state, can also contain async/await logic (e.g. API calls).
    actions: {
        updateName(newName: string){
            this.name = newName;
        }
    }
});