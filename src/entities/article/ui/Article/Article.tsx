import { FC } from 'react';
import styles from './Article.module.scss';
import stylesVar from '@/app/styles/variables.module.scss';
import { AppIcon } from '@/shared/ui';
import { UserPreview } from '@/entities/user/@x/article';
import { Button, Tag } from 'antd';
import { IArticleTagListObject, useDeleteArticleMutation } from '@/shared/api';
import Markdown from 'react-markdown';
import { AppLink } from '@/shared/ui';
import { useNavigate } from 'react-router';
import { Popconfirm } from 'antd';

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
  const [deleteArticle] = useDeleteArticleMutation();
  const navigate = useNavigate();

  const onDeleteArticle = async () => {
    await deleteArticle(slug);
    // TODO use current page pagination
    void navigate('/');
  };

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
            <Popconfirm
              title="Delete the article"
              description="Are you sure to delete this article?"
              onConfirm={() => void onDeleteArticle()}
              okText="Yes"
              cancelText="No"
              placement="rightBottom"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
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
