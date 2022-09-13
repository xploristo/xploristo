import { defineStore } from 'pinia';

import authService from '../services/auth.service.js';
import cookiesService from '../services/cookies.service.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isLoggedIn: false,
    },
  }),
  actions: {
    async login(email, password) {
      try {
        const { sessionToken } = await authService.login(email, password);
        cookiesService.setSessionCookie(sessionToken);
        this.user.isLoggedIn = true;
      } catch (error) {
        // TODO What if wrong password
        console.error('Login error', error);
      }
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.user.isLoggedIn;
    },
  },
});
