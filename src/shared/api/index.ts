export {
  baseApi,
  useGetArticlesQuery,
  useGetArticleQuery,
  useGetCurrentUserQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useEditProfileMutation,
} from '@/shared/api/baseApi/baseApi';
export type {
  IAuthor,
  IArticle,
  IArticlesData,
} from '@/shared/api/baseApi/types/IArticlesData';
export type { IUser, IUserData } from '@/shared/api/baseApi/types/IUserData';
export type { IArticleData } from '@/shared/api/baseApi/types/IArticleData';
