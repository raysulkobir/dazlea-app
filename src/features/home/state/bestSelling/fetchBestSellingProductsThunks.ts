import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, withRetry } from '@/services/https';
import type { Products } from '@/features/home/types/products.types'


export const fetchBestSellingProducts = createAsyncThunk<Products[], void, { rejectValue: string }>(
  'bestsellerProducts/fetch',
  async (_, { signal, rejectWithValue }) => {
    try {
      return await withRetry(() =>
        get('/products/best-seller', undefined, signal)
      );
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Request failed');
    }
  }
);
