import { defineStore } from 'pinia'
import { AuthService } from '../services'
import Cookies from 'js-cookie';
const authService = new AuthService();

export const useAuthStore = defineStore('authStore', {

    state: () => {
        return {
            currentUser: null,
            token: null,
           
        }
    },

    actions: {
        async setCurretUser() {
            await authService.getCurrentUser();
            this.token = Cookies.get('token');
        },

        logout() {
            this.currentUser = null;
            this.token = null;
            authService.logout();
        }
    }
})
