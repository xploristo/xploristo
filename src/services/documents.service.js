import { customFetch } from '../helpers/custom-fetch.js';

export default {
  getDocumentUrl(documentId) {
    return customFetch(`/documents/${documentId}/download`, 'GET');
  },
};
