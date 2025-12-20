// src/store/categories/categoryThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, withRetry } from '@/services/https';
import type { SliderBanner } from '@/features/home/types/slider.types'

export const fetchSliders = createAsyncThunk<SliderBanner[], void, { rejectValue: string }>(
  'sliders/fetch',
  async (_, { signal, rejectWithValue }) => {
    try {
      return await withRetry(() =>
        get('/sliders', undefined, signal)
      );
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Request failed');
    }
  }
);
