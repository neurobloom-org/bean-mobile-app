// Central HTTP client. Automatically attaches the auth token to every request.
// TODO: update BASE_URL to your actual Flask server IP before testing.

import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.100:5000';
const AUTH_TOKEN_KEY = 'bean_auth_token';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  skipAuth?: boolean;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, skipAuth = false } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (!skipAuth) {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const status = response.status;
    let data: T | null = null;
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) data = await response.json();
    if (!response.ok) {
      return {
        data: null,
        error: (data as any)?.message ?? `Request failed with status ${status}`,
        status,
      };
    }
    return { data, error: null, status };
  } catch (err: any) {
    return { data: null, error: err.message ?? 'Network error', status: 0 };
  }
}

export const api = {
  get: <T>(endpoint: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(endpoint, { ...opts, method: 'GET' }),
  post: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    opts?: Omit<RequestOptions, 'method'>,
  ) => request<T>(endpoint, { ...opts, method: 'POST', body }),
  put: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    opts?: Omit<RequestOptions, 'method'>,
  ) => request<T>(endpoint, { ...opts, method: 'PUT', body }),
  patch: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    opts?: Omit<RequestOptions, 'method'>,
  ) => request<T>(endpoint, { ...opts, method: 'PATCH', body }),
  delete: <T>(
    endpoint: string,
    opts?: Omit<RequestOptions, 'method' | 'body'>,
  ) => request<T>(endpoint, { ...opts, method: 'DELETE' }),
};

export default api;
