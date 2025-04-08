import { FC } from 'react';
import styles from './Article.module.scss';
import stylesVar from '@/app/styles/variables.module.scss';
import { AppIcon } from '@/shared/ui';
import { UserPreview } from '@/entities/user/@x/article';
import { Tag } from 'antd';
import { IArticle } from '@/shared/api';
import Markdown from 'react-markdown';
import { AppLink } from '@/shared/ui';

interface ArticleProps {
  article: IArticle;
  showBody?: boolean;
  onLike: () => void;
}

export const Article: FC<ArticleProps> = ({
  article: {
    slug,
    title,
    author,
    description,
    tags,
    favoritesCount,
    createdAt,
    body,
  },
  showBody = false,
  onLike,
}) => {
  return (
    <article
      className={`${styles.article} ${!body ? styles['article--with-fix-height'] : ''}`}
    >
      <h2 className={styles.title}>
        <AppLink to={`/articles/${slug}`}>{title}</AppLink>
      </h2>
      <div className={styles.likes}>
        <AppIcon
          type="HeartOutline"
          color={stylesVar.black}
          cursor="pointer"
          onClick={onLike}
        />

        <span>{favoritesCount}</span>
      </div>
      <UserPreview
        className={styles.article__user}
        author={author}
        createdAt={createdAt}
      />
      {tags && (
        <div className={styles.tags}>
          {tags.map((tag) => {
            return <Tag key={tag}>{tag}</Tag>;
          })}
        </div>
      )}
      <div className={styles.description}>{description}</div>

      {!!showBody && (
        <div className={styles.body}>
          <Markdown>{body}</Markdown>
        </div>
      )}
    </article>
  );
};
