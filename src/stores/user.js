import { defineStore } from 'pinia';

import authService from '../services/auth.service.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async login(email, password) {
      // TODO What if wrong password
      this.user = await authService.login(email, password);
    },
    increment() {
      this.counter++;
    },
  },
});
