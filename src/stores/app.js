import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    app: {
      previousRoute: {
        path: '/',
      },
    },
  }),
  actions: {
    setPreviousRoute(route) {
      this.app.previousRoute = route;
    },
  },
  getters: {
    previousRoute(state) {
      return state.app.previousRoute;
    },
  },
});
