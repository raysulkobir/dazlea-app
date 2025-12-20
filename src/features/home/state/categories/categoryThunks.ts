// src/store/categories/categoryThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, withRetry } from '../../../../services/https';

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async (_, { signal, rejectWithValue }) => {
    try {
      return await withRetry(() =>
        get('/categories/top', undefined, signal)
      );
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Request failed');
    }
  }
);
