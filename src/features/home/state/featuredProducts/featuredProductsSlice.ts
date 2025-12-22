// src/store/categories/categorySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchFeaturedProducts } from './featuredProductsThunks';

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

const featuredProductsSlice = createSlice({
  name: 'productsFeatured',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default featuredProductsSlice.reducer;
