import { defineStore } from 'pinia';

import authService from '../services/auth.service.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isLoggedIn: false,
    },
  }),
  actions: {
    async login(email, password) {
      // TODO What if wrong password
      this.user = await authService.login(email, password);
      this.user.isLoggedIn = true;
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.user.isLoggedIn;
    },
  },
});
