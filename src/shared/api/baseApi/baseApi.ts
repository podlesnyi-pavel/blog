import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IArticlesData, IArticle } from './types/IArticlesData';
import { IArticleData } from './types/IArticleData';
import { IUser, IUserData } from './types/IUserData';
import { getItem } from '@/shared/lib';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  tagTypes: ['User'],
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
        url: 'User',
        headers: {
          Authorization: `Token ${getItem('auth_token')}`,
        },
      }),
      transformResponse(baseQueryReturnValue: IUserData) {
        return baseQueryReturnValue.user;
      },
      providesTags: ['User'],
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
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useGetCurrentUserQuery,
  useRegisterUserMutation,
  useLoginMutation,
} = baseApi;
