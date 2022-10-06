import { externalFetch } from '../helpers/custom-fetch.js';

export default {
  uploadDocument(documentUploadUrl, file) {
    // TODO Do something if this request fails
    return externalFetch(documentUploadUrl, 'PUT', file, {
      'Content-Type': file.type,
    });
  },
};
