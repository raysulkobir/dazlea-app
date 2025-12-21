import { createAsyncThunk } from '@reduxjs/toolkit';
// src/store/categories/categoryThunks.ts
import { get, withRetry } from '@/services/https';
import type { HomeBanner } from '@/features/home/types/banner.types'

export const fetchBanners = createAsyncThunk<HomeBanner[], void, { rejectValue: string }>(
  'banners/fetch',
  async (_, { signal, rejectWithValue }) => {
    try {
      return await withRetry(() =>
        get('/banners', undefined, signal)
      );
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Request failed');
    }
  }
);
