// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/api/authApi';
import authReducer from '../features/auth/state/authSlice';
import counterReducer from '../features/home/state/counterSlice';
import categoryReducer  from '../features/home/state/categories/categorySlice'
// ✅ fixed import

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    counter: counterReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
