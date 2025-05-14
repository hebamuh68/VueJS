import authService from '@/services/auth'
import { defineStore } from 'pinia'
import type { LoginPayload, RegisterPayload } from '@/types/auth'
import type { User } from '@/types/user';


export const useAuthStore = defineStore('auth',{
  state:()=>({
    user: null as User | null,
    token: localStorage.getItem('token') || null,
  }),
  actions:{
    async login(payload: LoginPayload): Promise<any> {
      try{
        const response = await authService.loginApi(payload)
        if (response.data.access) {
          this.token = response.data.access;
          localStorage.setItem('token', response.data.access)
          await this.fetchUser()
          return {success:true}
        }
        return {success:false, error: 'No token received'}
      } catch(error: any){
        console.error('Login error:', error.response?.data)
        return {
          success:false, 
          error:error.response?.data?.detail || 'Login failed' 
        }
      }
    },
    async register(payload: RegisterPayload): Promise<any> {
      try{
        const response = await authService.registerApi(payload)
        if (response.data.access) {
          this.token = response.data.access
          localStorage.setItem('token', response.data.access)
          await this.fetchUser()
          return {success:true}
        }
        return {success:false, error: 'No token received'}
      } catch (error: any){
        console.error('Register error:', error.response?.data)
        return{
          success:false,
          error: error.response?.data?.detail || 'Registration failed' 
        }
      }
    },
    async fetchUser(){
      if (this.token){
        try{
          const response = await authService.currentUserApi()
          this.user = response.data
        } catch (error: any){
          console.error('Fetch user error:', error.response?.data)
          this.user = null
          // If token is invalid, clear it
          if (error.response?.status === 401) {
            this.token = null
            localStorage.removeItem('token')
          }
        }
      }
    },
    async logout(){
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

  },

})