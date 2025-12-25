import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, withRetry } from '@/services/https';
import type { Products } from '@/features/home/types/products.types'


export const fetchFlashDeals = createAsyncThunk<Products[], void, { rejectValue: string }>(
  'flashDeals/fetch',
  async (_, { signal, rejectWithValue }) => {
    try {
      return await withRetry(() =>
        get('/flash-deals', undefined, signal)
      );
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Request failed');
    }
  }
);
