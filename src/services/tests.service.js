import { customFetch } from '../helpers/custom-fetch.js';

export default {
  createTest(testData) {
    return customFetch('/tests', 'POST', testData);
  },
  getTest(testId) {
    return customFetch(`/tests/${testId}`);
  },
  updateTest(testId, testData) {
    return customFetch(`/tests/${testId}`, 'PUT', testData);
  },
  updateTestDocument(testId, document) {
    return customFetch(`/tests/${testId}/document`, 'PUT', document);
  },
};
