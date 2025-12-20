// src/features/auth/authApi.ts
// import { API_BASE_URL } from '@env';
const API_BASE_URL = ''
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
  user_name: string;
  password: string;
}

interface User {
  id: number;
  user_name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/patient-login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
