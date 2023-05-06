import { customFetch } from '../helpers/custom-fetch.js';

export default {
  createTest(testData) {
    return customFetch('/tests', 'POST', testData);
  },
  getTests() {
    // TODO Paginate
    return customFetch('/tests');
  },
  getTest(testId) {
    return customFetch(`/tests/${testId}`);
  },
  getTestDocumentDownloadUrl(testId) {
    return customFetch(`/tests/${testId}/document-download-url`);
  },
  updateTest(testId, testData) {
    return customFetch(`/tests/${testId}`, 'PUT', testData);
  },
  updateTestDocument(testId, document) {
    return customFetch(`/tests/${testId}/document`, 'PUT', document);
  },
  deleteTest(testId) {
    return customFetch(`/tests/${testId}`, 'DELETE');
  },
};
