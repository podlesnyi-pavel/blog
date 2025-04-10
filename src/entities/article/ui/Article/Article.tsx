import { FC } from 'react';
import styles from './Article.module.scss';
import stylesVar from '@/app/styles/variables.module.scss';
import { AppButton, AppIcon } from '@/shared/ui';
import { UserPreview } from '@/entities/user/@x/article';
import { Tag } from 'antd';
import { IArticleTagListObject } from '@/shared/api';
import Markdown from 'react-markdown';
import { AppLink } from '@/shared/ui';

interface ArticleProps {
  article: IArticleTagListObject;
  showBody?: boolean;
  onLike: () => void;
}

export const Article: FC<ArticleProps> = ({
  article: {
    slug,
    title,
    author,
    description,
    tagList,
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
      {!!tagList.length && (
        <div className={styles.tags}>
          {tagList.map((tag) => {
            return <Tag key={tag.id}>{tag.value}</Tag>;
          })}
        </div>
      )}
      <div
        className={`${styles['description-container']} ${showBody ? styles['description-container--mt--16'] : ''}`}
      >
        <div className={styles.description}>{description}</div>

        {!!showBody && (
          <div className={styles['edit-buttons']}>
            <AppButton variant="outlined" color="red">
              Delete
            </AppButton>
            <AppLink
              to={`/articles/${slug}/edit`}
              type="button"
              color="green"
              variant="outlined"
              size="middle"
            >
              Edit
            </AppLink>
          </div>
        )}
      </div>

      {!!showBody && (
        <div className={styles.body}>
          <Markdown>{body}</Markdown>
        </div>
      )}
    </article>
  );
};
