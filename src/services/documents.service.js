import { externalFetch } from '../helpers/custom-fetch.js';

export default {
  uploadDocument(documentUploadUrl, file) {
    return externalFetch(documentUploadUrl, 'PUT', file, {
      'Content-Type': file.type,
    });
  },
};
