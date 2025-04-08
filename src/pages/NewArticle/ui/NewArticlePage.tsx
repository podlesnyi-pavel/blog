import { CreateEditArticleForm } from '@/features/article';
import { ModalLayout } from '@/shared/ui';
import { FC } from 'react';

export const NewArticlePage: FC = () => {
  return (
    <ModalLayout width={938}>
      <CreateEditArticleForm />
    </ModalLayout>
  );
};
