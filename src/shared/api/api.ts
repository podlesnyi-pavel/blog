import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticlesData, IArticle } from '@/shared/types/IArticlesData';
import { IArticleData } from '@/shared/types/IArticleData';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesData, string>({
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
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery } = api;
