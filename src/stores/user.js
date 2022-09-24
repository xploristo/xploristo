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
      await authService.login(email, password);
      this.user.isLoggedIn = true;

      // TODO What if wrong password
    },
    logout() {
      this.user = {
        isLoggedIn: false,
      };
      cookiesService.expireSessionCookie();
      router.push('/login');
    },
    async setUserProfile() {
      const userProfile = await usersService.getUserProfile();
      this.user = {
        ...this.user,
        ...userProfile,
      };
    },
    checkSessionCookie() {
      const sessionCookie = cookiesService.getSessionCookie();
      if (sessionCookie) {
        this.user.isLoggedIn = true;
        return true;
      }
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.user.isLoggedIn;
    },
  },
});
