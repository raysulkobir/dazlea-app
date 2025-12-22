import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, withRetry } from '@/services/https';
import type { Products } from '@/features/home/types/products.types'


export const fetchFeaturedProducts = createAsyncThunk<Products[], void, { rejectValue: string }>(
  'featuredProducts/fetch',
  async (_, { signal, rejectWithValue }) => {
    try {
      return await withRetry(() =>
        get('/products/featured', undefined, signal)
      );
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Request failed');
    }
  }
);
