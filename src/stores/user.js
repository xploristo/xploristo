import { defineStore } from 'pinia';

import authService from '../services/auth.service.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
  actions: {
    async login(email, password) {
      // TODO What if wrong password
      this.user = await authService.login(email, password);
      this.isLoggedIn = true;
    },
    increment() {
      this.counter++;
    },
  },
});
