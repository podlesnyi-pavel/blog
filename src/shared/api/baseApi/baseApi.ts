import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IArticlesData,
  IArticle,
  IArticlePOSTRequest,
} from './types/IArticlesData';
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
  tagTypes: ['user', 'articles'],
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesData, string>({
      query: (page) => {
        const articlesByPage = 5;

        return {
          url: 'articles',
          params: {
            limit: articlesByPage,
            offset: Number(page) * articlesByPage,
          },
        };
      },
      providesTags: ['articles'],
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
    createArticle: builder.mutation<IArticle, IArticlePOSTRequest>({
      query: (args) => ({
        method: 'POST',
        url: 'articles',
        headers: getAuthHeaders(),
        body: { article: { ...args } },
      }),
      invalidatesTags: ['articles'],
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
  useCreateArticleMutation,
  useGetCurrentUserQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useEditProfileMutation,
} = baseApi;
