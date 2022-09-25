import { customFetch } from '../helpers/custom-fetch.js';

export default {
  createTest(testData) {
    return customFetch('/tests', 'POST', testData);
  },
  getTest(testId) {
    return customFetch('/tests/' + testId);
  },
};
