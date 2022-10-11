import { customFetch } from '../helpers/custom-fetch.js';

export default {
  getResults() {
    // TODO Paginate
    return customFetch('/results');
  },
  getResult(resultId) {
    return customFetch(`/results/${resultId}`);
  },
  createResult(resultData) {
    return customFetch('/results', 'POST', resultData);
  },
};
