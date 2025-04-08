import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IArticlesData, IArticle } from './types/IArticlesData';
import { IArticleData } from './types/IArticleData';
import {
  IUser,
  IUserData,
  IUserDataWithPassword,
  RequestUpdateCurrentUser,
} from './types/IUserData';
import { getItem } from '@/shared/lib';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: getItem('auth_token')
    ? `Token ${String(getItem('auth_token'))}`
    : '',
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesData, string>({
      query: (page) => ({
        url: 'articles',
        params: {
          limit: 5,
          offset: page,
        },
      }),
    }),
    getArticle: builder.query<IArticle, string>({
      query: (slug) => `articles/${slug}`,
      transformResponse(baseQueryReturnValue: IArticleData) {
        return baseQueryReturnValue.article;
      },
    }),
    getCurrentUser: builder.query<IUser, void>({
      query: () => ({
        url: 'user',
        headers: getAuthHeaders(),
      }),
      transformResponse(baseQueryReturnValue: IUserData) {
        return baseQueryReturnValue.user;
      },
      providesTags: ['user'],
    }),
    registerUser: builder.mutation<
      IUserData,
      { username: string; email: string; password: string }
    >({
      query: ({ username, email, password }) => ({
        method: 'POST',
        url: 'users',
        body: {
          user: {
            username,
            email,
            password,
          },
        },
      }),
    }),
    login: builder.mutation<IUserData, { email: string; password: string }>({
      query: ({ email, password }) => ({
        method: 'POST',
        url: 'users/login',
        body: {
          user: {
            email,
            password,
          },
        },
      }),
      invalidatesTags: ['user'],
    }),
    editProfile: builder.mutation<
      IUserDataWithPassword,
      RequestUpdateCurrentUser
    >({
      query: (args) => ({
        method: 'PUT',
        url: 'user',
        headers: getAuthHeaders(),
        body: { user: { ...args } },
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useGetCurrentUserQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useEditProfileMutation,
} = baseApi;
