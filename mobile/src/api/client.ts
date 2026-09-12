
/**
 * Intelligent API Base URL Resolver for Android & Web
 *
 * - Android Emulator: 10.0.2.2 is the special alias for the host machine's 127.0.0.1
 * - Physical Android phone with Expo Go: set your computer's local Wi-Fi IP
 * - Default / Web / iOS simulator: localhost:3001
 */
/**
 * API Base URL
 *
 * Physical Android phone with Expo Go:
 * use the computer's local Wi-Fi IP.
 */
import { Platform } from 'react-native';
const DEFAULT_HOST = '192.168.29.63';

export let API_BASE_URL = `http://${DEFAULT_HOST}:3001`;

export function setApiBaseUrl(url: string) {
  API_BASE_URL = url.replace(/\/$/, '');
  console.log('[API Client] Base URL updated to:', API_BASE_URL);
}

export interface ApiResponseError extends Error {
  status?: number;
  reasonCode?: string;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  let res: Response;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timeoutId);
  } catch (networkError: any) {
    const err: ApiResponseError = new Error(
      `Could not connect to Foodie backend at ${API_BASE_URL}. Ensure the backend is running.`
    );
    err.status = 0;
    err.reasonCode = 'NETWORK_ERROR';
    throw err;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err: ApiResponseError = new Error(data.error || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.reasonCode = data.reasonCode;
    throw err;
  }

  return data as T;
}
