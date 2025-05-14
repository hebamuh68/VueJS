import type { LoginPayload, RegisterPayload } from "@/types/auth";
import apiClient from "./apiClient";


const authService ={
    async loginApi(payload:LoginPayload){
        return await apiClient.post('/login/',payload)
    },
    async registerApi(payload:RegisterPayload){
        return await apiClient.post('/register/',payload)
    }, 
    async currentUserApi(){
        return await apiClient.get('/me/')
    }, 
}

export default authService