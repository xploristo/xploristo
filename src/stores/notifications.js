import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: {
      errors: [],
    },
  }),
  actions: {
    addError(error) {
      this.notifications.errors.push(error);
    },
    popError() {
      this.notifications.errors.pop();
    },
  },
  getters: {
    lastError(state) {
      const errors = state.notifications.errors;
      return errors.length && errors[errors.length - 1];
    },
  },
});
