// src/services/http/client.ts
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Platform } from 'react-native';

// ---- Configuration ---------------------------------------------------------

// Change this to your API root, or set API_URL in env (react-native-config or Expo extra)
const BASE_URL = "https://dazlea.com/api/v2";

const TIMEOUT_MS = 15000;

// Optional: central place to get an auth token without coupling to storage.
// Provide this from your auth layer: setTokenProvider(() => AsyncStorage.getItem(...))
type TokenProvider = () => Promise<string | null> | string | null;
let tokenProvider: TokenProvider | null = null;

export function setTokenProvider(fn: TokenProvider) {
  tokenProvider = fn;
}

// Optional: hook to handle 401s (e.g., navigate to login, try refresh, etc.)
type UnauthorizedHandler = (error: AxiosError) => void | Promise<void>;
let onUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(fn: UnauthorizedHandler) {
  onUnauthorized = fn;
}

// ---- Axios instance --------------------------------------------------------

export const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  // Important in RN; browsers set it automatically
  headers: {
    'Content-Type': 'application/json',
    'X-Client': `rn-${Platform.OS}`,
  },
});

// ---- Interceptors ----------------------------------------------------------

// Attach Authorization header if a token is available
http.interceptors.request.use(async (config) => {
  try {
    const token = tokenProvider ? await tokenProvider() : null;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // silently ignore token errors
  }
  return config;
});

// Normalize errors & handle 401
http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    // Forward 401 to a handler (logout/refresh/etc.)
    if (error.response?.status === 401 && onUnauthorized) {
      try {
        await onUnauthorized(error);
      } catch {
        // ignore handler errors
      }
    }
    // Throw a normalized error for callers
    throw toApiError(error);
  }
);

// ---- Error normalization ---------------------------------------------------

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
  requestId?: string;

  constructor(message: string, opts?: { status?: number; code?: string; details?: unknown; requestId?: string }) {
    super(message);
    this.name = 'ApiError';
    this.status = opts?.status;
    this.code = opts?.code;
    this.details = opts?.details;
    this.requestId = opts?.requestId;
  }
}

export function toApiError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data: any = err.response?.data;
    const message =
      data?.message ||
      err.message ||
      (status ? `HTTP ${status}` : 'Network error');

    return new ApiError(message, {
      status,
      code: data?.code || err.code,
      details: data?.errors ?? data,
      requestId: err.response?.headers?.['x-request-id'] as string | undefined,
    });
  }
  // Non-Axios errors
  return new ApiError((err as Error)?.message ?? 'Unknown error');
}

// ---- Convenience checks ----------------------------------------------------

export function isNetworkError(err: unknown): boolean {
  if (!axios.isAxiosError(err)) return false;
  // Axios sets code 'ERR_NETWORK' in many RN network failures
  return err.code === 'ERR_NETWORK' && !err.response;
}

export default http;
