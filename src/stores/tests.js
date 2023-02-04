import { defineStore } from 'pinia';

import testsService from '../services/tests.service.js';

export const useTestsStore = defineStore('tests', {
  state: () => ({
    testList: [],
  }),
  actions: {
    async getTests() {
      this.testList = await testsService.getTests();
    },
    async deleteTest(testId) {
      await testsService.deleteTest(testId);
      this.testList = this.testList.filter((t) => t._id !== testId);
    },
  },
  getters: {
    tests(state) {
      return state.testList;
    },
  },
});
