import { CreateEditArticleForm } from '@/features/article';
import { ModalLayout } from '@/shared/ui';
import { FC } from 'react';
import { useMatch } from 'react-router';

export const NewEditArticlePage: FC = () => {
  const match = useMatch(`/articles/:slug/edit`);

  return (
    <ModalLayout width={938} mt={34}>
      <CreateEditArticleForm
        title={match ? 'Edit article' : 'Create new article'}
      />
    </ModalLayout>
  );
};
