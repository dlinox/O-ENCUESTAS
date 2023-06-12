import { defineStore } from 'pinia'
export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            currentUser: null,
            jwtUser: null,
        }
    },
})
