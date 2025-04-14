import { FC } from 'react';
import styles from './ArticlePage.module.scss';
import { useGetArticleQuery } from '@/shared/api';
import { useParams } from 'react-router';
import { Article } from '@/entities/article';
import { skipToken } from '@reduxjs/toolkit/query';

export const ArticlePage: FC = () => {
  const { slug } = useParams();
  const { data: article } = useGetArticleQuery(slug ?? skipToken);

  return (
    <div className={styles['article-page']}>
      {!!article && <Article article={article} showBody />}
    </div>
  );
};
