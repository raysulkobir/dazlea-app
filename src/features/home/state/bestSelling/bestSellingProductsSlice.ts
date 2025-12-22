// src/store/categories/categorySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchBestSellingProducts } from './fetchBestSellingProductsThunks';

interface BestSellingState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BestSellingState = {
  data: [],
  loading: false,
  error: null,
};

const bestSellingProductsSlice = createSlice({
  name: 'productsBestSelling',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSellingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBestSellingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bestSellingProductsSlice.reducer;
