import { defineStore } from 'pinia';

import router from '../router/index.js';
import authService from '../services/auth.service.js';
import cookiesService from '../services/cookies.service.js';
import usersService from '../services/users.service.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isLoggedIn: false,
    },
  }),
  actions: {
    async login(email, password) {
      // TODO What if wrong password
      await authService.login(email, password);
      await this.setUserProfile();
    },
    logout() {
      this.user = {
        isLoggedIn: false,
      };
      cookiesService.expireSessionCookie();
      router.push('/login');
    },
    async refreshSession() {
      const sessionCookie = cookiesService.getSessionCookie();
      if (sessionCookie) {
        await this.setUserProfile();

        return true;
      }
    },
    async setUserProfile() {
      const userProfile = await usersService.getUserProfile();
      this.user = {
        ...this.user,
        ...userProfile,
        isLoggedIn: true,
      };
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.user.isLoggedIn;
    },
  },
});
