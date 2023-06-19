import { defineStore } from 'pinia'
import { AuthService } from '../services'
import Cookies from 'js-cookie';

const authService = new AuthService();

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            currentUser: null,
            jwtUser: null,

            account: null,
            key: null,
            module: null,
            role: null,
        }
    },
    actions: {
        async setCurretUser(route) {
            await authService.getCurrentUser(route);
            this.key = Cookies.get('key');
            this.account = Cookies.get('account');
            this.module = Cookies.get('module');
            this.role = Cookies.get('role');
        },

        removeCurretUser() {
            this.currentUser = null;
            this.jwtUser = null;
            authService.deleteTokenAccess();
        },
        logout() {
            this.currentUser = null;
            this.jwtUser = null;
            this.account = null;
            this.key = null;
            this.module = null;
            this.role = null;
            authService.logout();
        }
    }
})
