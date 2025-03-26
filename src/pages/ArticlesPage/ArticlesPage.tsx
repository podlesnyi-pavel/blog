import Article from '@/widgets/Article';
import { FC, useEffect } from 'react';
import styles from './ArticlesPage.module.scss';
import AppPagination from '@/shared/ui/AppPagination';
import { useGetArticlesQuery } from '@/shared/api/api';
import { useSearchParams } from 'react-router';

const Articles: FC = () => {
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
                <Article article={article} />
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

export default Articles;
