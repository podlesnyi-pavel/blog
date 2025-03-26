export interface ArticlesData {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticle {
  body: string;
  slug: string;
  tags: string[] | undefined;
  title: string;
  author: Author;
  createdAt: string;
  favorited: boolean;
  updatedAt: string;
  description: string;
  favoritesCount: number;
}

export interface Author {
  bio: string;
  image: string;
  username: string;
  following: boolean;
}
