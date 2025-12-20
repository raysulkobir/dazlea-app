// src/store/categories/categorySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchSliders } from './sliderThunks';
import type { SliderBanner } from '@/features/home/types/slider.types'

interface CategoryState {
  data: SliderBanner[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

const sliderSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sliderSlice.reducer;
