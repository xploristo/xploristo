const baseUrl = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export default {
  login(email, password) {
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: defaultHeaders,
    }).then((res) => res.json());
  },
};
