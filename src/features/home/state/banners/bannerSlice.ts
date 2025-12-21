// src/store/categories/categorySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchBanners } from './bannerThunks';
import type { HomeBanner } from '@/features/home/types/banner.types'

interface CategoryState {
  data: HomeBanner[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
