import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_VERSION, resolveImageURL } from '../../config/api';
import { APIResponse } from '../../types';
import { friendlyError } from '../../utils/friendlyError';

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

/** Returns true for errors that are worth retrying (network failures, 5xx). */
function isRetryable(error: AxiosError): boolean {
  // No response at all means a network / timeout error
  if (!error.response) return true;
  // Retry on server errors (500+), but not on 4xx client errors
  return error.response.status >= 500;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}${API_VERSION}`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach auth token
apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  // In production, this attaches the Firebase ID token from the current user
  // Omitted for interview context
  return config;
});

// Response interceptor: resolve image URLs, retry with exponential backoff, surface friendly errors
const IMAGE_URL_KEYS = ['image_url', 'result_image_url', 'outfit_image_url', 'user_photo_url'];

function resolveImageURLs(data: unknown): unknown {
  if (Array.isArray(data)) return data.map(resolveImageURLs);
  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (IMAGE_URL_KEYS.includes(key) && typeof value === 'string') {
        result[key] = resolveImageURL(value);
      } else {
        result[key] = resolveImageURLs(value);
      }
    }
    return result;
  }
  return data;
}

apiClient.interceptors.response.use(
  (response) => {
    response.data = resolveImageURLs(response.data);
    return response;
  },
  async (error: AxiosError<APIResponse>) => {
    const config = error.config;

    // Track retry count on the config object
    const retryCount = ((config as unknown as Record<string, unknown>)?.__retryCount as number) ?? 0;

    if (config && isRetryable(error) && retryCount < MAX_RETRIES) {
      (config as unknown as Record<string, unknown>).__retryCount = retryCount + 1;
      const waitMs = BASE_DELAY_MS * Math.pow(2, retryCount); // 1s, 2s, 4s
      await delay(waitMs);
      return apiClient.request(config);
    }

    const raw = error.response?.data?.error || error.message || 'Network error';
    const message = friendlyError(raw);
    return Promise.reject(new Error(message));
  },
);
