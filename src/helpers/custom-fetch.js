import { useUserStore } from '../stores/user.js';

const baseUrl = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};
const defaultOptions = {
  credentials: 'include',
};

async function customFetch(path, method = 'GET', body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: defaultHeaders,
    ...defaultOptions,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Error interceptor
  if (!response.ok) {
    // 401 interceptor
    if (response.status === 401) {
      const userStore = useUserStore();
      userStore.logout();
    }
    // TODO Show error notification
    return Promise.reject(response);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (_) {
    return text;
  }
}

export { customFetch };
