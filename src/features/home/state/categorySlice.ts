// src/redux/features/category/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchTopCategories } from './categoryThunk';

const initialState = {
  topCategories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.topCategories = action.payload?.data || [];
      })
      .addCase(fetchTopCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default categorySlice.reducer;
