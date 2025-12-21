// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/api/authApi';
import authReducer from '../features/auth/state/authSlice';
import categoryReducer  from '@/features/home/state/categories/categorySlice'
import sliderReducer from '@/features/home/state/sliders/sliderSlice'
import bannerReducer from '@/features/home/state/banners/bannerSlice'
// ✅ fixed import

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    categories: categoryReducer,
    sliders: sliderReducer,
    banners: bannerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
