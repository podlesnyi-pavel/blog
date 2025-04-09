export interface IArticlesData {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticle {
  body: string;
  slug: string;
  tagList: string[] | undefined;
  title: string;
  author: IAuthor;
  createdAt: string;
  favorited: boolean;
  updatedAt: string;
  description: string;
  favoritesCount: number;
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
