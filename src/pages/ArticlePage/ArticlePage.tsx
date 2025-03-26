import { FC } from 'react';
import styles from './ArticlePage.module.scss';
import { useGetArticleQuery } from '@/shared/api/api';
import { useParams } from 'react-router';
import Article from '@/widgets/Article';
import { skipToken } from '@reduxjs/toolkit/query';

const ArticlePage: FC = () => {
  const { slug } = useParams();
  const { data: article } = useGetArticleQuery(slug ?? skipToken);

  return (
    <div className={styles['articles-page']}>
      {!!article && <Article article={article} showBody />}
    </div>
  );
};

export default ArticlePage;
