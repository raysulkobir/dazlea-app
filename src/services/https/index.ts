// src/services/http/index.ts (enhanced)
import { http } from './client.ts';
import axios from 'axios';

export async function get<T>(url: string, params?: object, signal?: AbortSignal) {
  const res = await http.get<T>(url, { params, signal });
  return res.data;
}

export async function post<T>(url: string, data?: unknown, signal?: AbortSignal) {
  const res = await http.post<T>(url, data, { signal });
  return res.data;
}

export async function del<T>(url: string, signal?: AbortSignal) {
  const res = await http.delete<T>(url, { signal });
  return res.data;
}

// simple retry wrapper
export async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); } catch (e) { lastErr = e; }
  }
  throw lastErr;
}
