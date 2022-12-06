import { defineStore } from 'pinia';

import router from '../router/index.js';
import authService from '../services/auth.service.js';
import usersService from '../services/users.service.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      userId: null,
      role: null,
      email: null,
      firstName: null,
      lastName: null,
      permissions: {},
      isLoggedIn: false,
    },
  }),
  actions: {
    async login(email, password) {
      // TODO What if wrong password
      const result = await authService.login(email, password);
      if (!result.mustResetPassword) {
        localStorage.setItem('isLoggedIn', 'true');
      }
      await this.setUserProfile({ isLoggedIn: !result.mustResetPassword });
      return result;
    },
    async setPassword(oldPassword, password, confirmPassword) {
      // TODO What if wrong password
      await authService.setPassword(oldPassword, password, confirmPassword);
      localStorage.setItem('isLoggedIn', 'true');
    },
    async logout() {
      await authService.logout();
      this.user = {
        isLoggedIn: false,
      };
      localStorage.removeItem('isLoggedIn');
      router.push('/login');
    },
    async refreshSession() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        await this.setUserProfile();

        return true;
      }
    },
    async setUserProfile(data) {
      const userProfile = await usersService.getUserProfile();
      this.user = {
        ...this.user,
        ...userProfile,
        isLoggedIn: true,
        ...data,
      };
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.user.isLoggedIn;
    },
    permissions(state) {
      return state.user.permissions;
    },
    fullName(state) {
      return state.user.firstName + ' ' + state.user.lastName;
    },
    email(state) {
      return state.user.email;
    },
    role(state) {
      return state.user.role;
    },
  },
});
