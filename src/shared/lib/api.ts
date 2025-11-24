export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://mock.api.local";

const buildUrl = (path: string, params?: RequestOptions["params"]): string => {
  if (!params) return `${API_BASE_URL}${path}`;
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    usp.append(key, String(value));
  });
  return `${API_BASE_URL}${path}?${usp.toString()}`;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }
  return (await response.json()) as T;
};

export const apiClient = {
  get: async <T>(path: string, options?: RequestOptions) => {
    const url = buildUrl(path, options?.params);
    const response = await fetch(url, { ...options, method: "GET" });
    return handleResponse<T>(response);
  },
  post: async <T>(path: string, body?: unknown, options?: RequestOptions) => {
    const url = buildUrl(path, options?.params);
    const response = await fetch(url, {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },
};
