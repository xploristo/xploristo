import { useUserStore } from '../stores/user.js';

const baseUrl = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};
const defaultOptions = {
  credentials: 'include',
};

async function customFetch(path, method = 'GET', body, headers = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...defaultOptions,
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse(response);
}

async function externalFetch(url, method = 'GET', body, headers = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body,
  });

  return handleResponse(response);
}

async function handleResponse(response) {
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

export { customFetch, externalFetch };
