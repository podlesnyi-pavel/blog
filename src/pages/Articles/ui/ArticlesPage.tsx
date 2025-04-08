import { Article } from '@/entities/article';
import { FC, useEffect } from 'react';
import styles from './ArticlesPage.module.scss';
import { AppPagination } from '@/shared/ui';
import { useGetArticlesQuery } from '@/shared/api';
import { useSearchParams } from 'react-router';
import { like } from '@/features/article';

export const ArticlesPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (!currentPage) {
      setSearchParams({ page: '1' });
    }
  }, [currentPage, setSearchParams]);

  const {
    data: articlesData,
    isLoading,
    isSuccess,
    error,
  } = useGetArticlesQuery(String(currentPage - 1));

  function setParamsByPaginationPage(page: number) {
    setSearchParams({ page: String(page) });
  }

  let render;

  if (error) {
    render = 'Error...';
  }

  if (isLoading) {
    render = 'Loading...';
  }

  if (isSuccess) {
    render = (
      <>
        <ul className={styles.articles}>
          {articlesData.articles.map((article) => {
            return (
              <li className={styles.article} key={article.slug}>
                <Article article={article} onLike={like} />
              </li>
            );
          })}
        </ul>
        <AppPagination
          current={currentPage}
          defaultPageSize={5}
          total={articlesData.articlesCount}
          onChange={setParamsByPaginationPage}
          align="center"
          showSizeChanger={false}
        />{' '}
      </>
    );
  }

  return <div className={styles['articles-page']}>{render}</div>;
};
