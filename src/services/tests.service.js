const baseUrl = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export default {
  createTest(testData) {
    return fetch(`${baseUrl}/tests`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(testData),
    }).then((response) => response.json());
  },
};
