// src/store/categories/categorySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchFlashDeals } from './flashDealsThunks';

interface FeaturedProductsState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FeaturedProductsState = {
  data: [],
  loading: false,
  error: null,
};

const flashDealsSlice = createSlice({
  name: 'flashDeals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlashDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFlashDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default flashDealsSlice.reducer;
