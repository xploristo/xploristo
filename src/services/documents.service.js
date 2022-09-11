const baseUrl = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export default {
  getDocumentUrl(documentId) {
    return fetch(`${baseUrl}/documents/${documentId}/download`, {
      method: 'GET',
      headers: defaultHeaders,
    }).then((response) => response.json());
  },
};
