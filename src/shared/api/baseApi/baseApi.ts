import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IArticlesData,
  IArticle,
  IArticlePOSTRequest,
  IArticleTagListObject,
  IArticlesDataMapped,
  IArticleUpdateRequest,
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

const mapArticle = (article: IArticle): IArticleTagListObject => {
  return {
    ...article,
    tagList: article.tagList.map((tag, index) => ({
      id: index,
      value: tag,
    })),
  };
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  tagTypes: ['user', 'articles', 'article'],
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesDataMapped, string>({
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
      transformResponse(
        baseQueryReturnValue: IArticlesData,
      ): IArticlesDataMapped {
        const articles = baseQueryReturnValue.articles;
        return {
          ...baseQueryReturnValue,
          articles: articles.map((article) => mapArticle(article)),
        };
      },
      providesTags: ['articles'],
    }),
    getArticle: builder.query<IArticleTagListObject, string>({
      query: (slug) => `articles/${slug}`,
      transformResponse(baseQueryReturnValue: IArticleData) {
        const article = baseQueryReturnValue.article;
        return mapArticle(article);
      },
      providesTags: ['article'],
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
    updateArticle: builder.mutation<IArticle, IArticleUpdateRequest>({
      query: ({ body, slug, title, description, tagList }) => {
        return {
          url: `/articles/${slug}`,
          headers: getAuthHeaders(),
          method: 'PUT',
          body: {
            article: {
              title,
              description,
              body,
              tagList,
            },
          },
        };
      },
      invalidatesTags: ['articles', 'article'],
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
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useGetCurrentUserQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useEditProfileMutation,
} = baseApi;
