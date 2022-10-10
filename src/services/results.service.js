import { customFetch } from '../helpers/custom-fetch.js';

export default {
  createResult(resultData) {
    return customFetch('/results', 'POST', resultData);
  },
};
