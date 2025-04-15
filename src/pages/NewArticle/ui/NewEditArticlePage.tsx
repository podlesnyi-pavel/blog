import { CreateEditArticleForm } from '@/features/article';
import { useGetArticleQuery, useGetCurrentUserQuery } from '@/shared/api';
import { ModalLayout } from '@/shared/ui';
import { skipToken } from '@reduxjs/toolkit/query';
import { FC, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router';

export const NewEditArticlePage: FC = () => {
  const match = useMatch(`/articles/:slug/edit`);
  const navigate = useNavigate();
  const isEditPage = match?.params.slug;

  const { data: articleData, isLoading: isLoadingArticle } = useGetArticleQuery(
    isEditPage ?? skipToken,
  );
  const { data: userData } = useGetCurrentUserQuery();

  const isNotOwnerOfArticle =
    articleData?.author.username !== userData?.username;
  const isNotOwnerEdit = isEditPage && isNotOwnerOfArticle;

  useEffect(() => {
    if (isNotOwnerEdit) {
      void navigate('/');
    }
  });

  if (isLoadingArticle || isNotOwnerEdit) {
    return;
  }

  return (
    <ModalLayout width={938} mt={34}>
      <CreateEditArticleForm
        title={match ? 'Edit article' : 'Create new article'}
      />
    </ModalLayout>
  );
};
