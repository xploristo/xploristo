import { customFetch } from '../helpers/custom-fetch.js';

export default {
  getResult(resultId) {
    return customFetch(`/results/${resultId}`);
  },
  createResult(resultData) {
    return customFetch('/results', 'POST', resultData);
  },
};
