import {create} from 'zustand';
import axios from 'axios';

const API_URL=import.meta.env.AUTH_API_URL || 'http://localhost:5000/api/auth';

axios.defaults.withCredentials=true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async(email,password,name)=>{
        set({ isLoading: true, error: null });
        try {
            const response=await axios.post(`${API_URL}/signup`,{email,password,name});
            set({
                user:response.data.user,
                isAuthenticated:true,
                isLoading:false
            })
        
            
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },

    verifyEmail: async(code)=>{
        set({isLoading:true,error:null});
        try {
            const response=await axios.post(`${API_URL}/verifyEmail`,{code});
            set({
                user:response.data.user,
                isAuthenticated:true,
                isLoading:false
            })
            return response.data
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;    
        }
    },

    checkAuth: async()=>{
        set({ isCheckingAuth: true });
        try {
            const response=await axios.post(`${API_URL}/check-auth`);
            set({
                user:response.data.user,
                isAuthenticated:true,
                isCheckingAuth:false
            })
        } catch (error) {
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },

    login: async(email,password)=>{
        set({ isLoading: true, error: null });
        try {
            const response=await axios.post(`${API_URL}/login`,{email,password});
            set({
                user:response.data.user,
                isAuthenticated:true,
                isLoading:false
            })
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },

    logout: async()=>{
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({
                user:null,
                isAuthenticated:false,
                isLoading:false
            })
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },

    forgotPassword: async(email)=>{
        set({ isLoading: true, error: null });
        try {
            const response=await axios.post(`${API_URL}/forgot-password`,{email});
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }   
    },
}));