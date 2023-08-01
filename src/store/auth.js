import { defineStore } from "pinia";
import { AuthService } from "../services";
const authService = new AuthService();

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      currentUser: null,
      token: null,
    };
  },
  actions: {
    async setCurrentUser() {
      this.currentUser = await authService.getCurrentUser();
    },

    logout() {
      authService.logout();
      this.token = null;
      this.currentUser = null;
    },
  },
});
