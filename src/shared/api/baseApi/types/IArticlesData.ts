export interface IArticlesData {
  articles: IArticle[];
  articlesCount: number;
}
export interface IArticlesDataMapped {
  articles: IArticleTagListObject[];
  articlesCount: number;
}

export interface IArticle {
  body: string;
  slug: string;
  tagList: string[];
  title: string;
  author: IAuthor;
  createdAt: string;
  favorited: boolean;
  updatedAt: string;
  description: string;
  favoritesCount: number;
}

export interface IArticleTagListObject extends Omit<IArticle, 'tagList'> {
  tagList: IArticleTags[];
}

export interface IArticleTags {
  id: number;
  value: string;
}

export interface IAuthor {
  bio?: string;
  image: string | undefined;
  username: string;
  following?: boolean;
}

export interface IArticlePOSTRequest {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface IArticleUpdateRequest extends IArticlePOSTRequest {
  slug: string;
}
