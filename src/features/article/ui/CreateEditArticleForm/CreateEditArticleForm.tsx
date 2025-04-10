import { FC, useEffect, useState } from 'react';
import styles from './createEditArticleForm.module.scss';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AppButton, AppInput, RHFWrapperAppInput } from '@/shared/ui';
import {
  IArticleTags,
  useCreateArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from '@/shared/api';
import { useMatch } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';

interface CreateEditArticleFormProps {
  title: 'Create new article' | 'Edit article';
}

interface FormValues {
  title: string;
  description: string;
  body: string;
}

export const CreateEditArticleForm: FC<CreateEditArticleFormProps> = ({
  title,
}) => {
  const match = useMatch(`/articles/:slug/edit`);
  const isEditPage = !!match;
  const { data: articleData } = useGetArticleQuery(
    match?.params.slug ?? skipToken,
  );

  // console.log('articleData', articleData);
  // console.log('match', match);

  const methods = useForm<FormValues>({
    values: {
      title: articleData?.title ?? '',
      description: articleData?.description ?? '',
      body: articleData?.body ?? '',
    },
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const [createArticle, { isLoading: isLoadingCreateArticle }] =
    useCreateArticleMutation();
  const [updateArticle, { isLoading: isLoadingUpdateArticle }] =
    useUpdateArticleMutation();

  const [tags, setTags] = useState<IArticleTags[]>([]);

  useEffect(() => {
    setTags((tags) => (articleData ? [...articleData.tagList] : tags));
  }, [articleData]);

  const onAddTag = () => {
    setTags((tags) => [
      ...tags,
      { id: tags.length ? tags[tags.length - 1].id + 1 : 1, value: '' },
    ]);
  };

  const onDeleteTag = (id: number) => {
    const index = tags.findIndex((tag) => tag.id === id);
    if (index !== -1) {
      setTags((tags) => tags.toSpliced(index, 1));
    }
  };

  const onChangeTag = (id: number, value: string) => {
    const index = tags.findIndex((tag) => tag.id === id);
    if (index !== -1) {
      setTags((tags) => tags.toSpliced(index, 1, { id, value }));
    }
  };

  const createNewArticle: SubmitHandler<FormValues> = (data, e) => {
    e?.preventDefault();
    void createArticle({ ...data, tagList: tags.map((tag) => tag.value) });
  };

  const editArticle: SubmitHandler<FormValues> = (data, e) => {
    e?.preventDefault();
    void updateArticle({
      ...data,
      tagList: tags.map((tag) => tag.value),
      slug: articleData?.slug ?? '',
    });
  };

  const onSubmit = () => {
    return isEditPage ? editArticle : createNewArticle;
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={(e) => void methods.handleSubmit(onSubmit())(e)}
      >
        <h1 className={styles.title}>{title}</h1>
        <RHFWrapperAppInput
          label="Title"
          placeholder="Title"
          name="title"
          required
        />
        <RHFWrapperAppInput
          label="Short description"
          placeholder="Title"
          name="description"
          required
        />

        <label className={styles['label-textarea']} htmlFor="text">
          Text
          <textarea
            className={styles.textarea}
            id="text"
            placeholder="Text"
            aria-invalid={errors.body ? true : false}
            {...register('body', {
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
          />
          {errors.body && (
            <p className={styles['error-message']} role="alert">
              {typeof errors.body.message === 'string' && errors.body.message}
            </p>
          )}
        </label>

        <label className={styles.tags}>
          Tags
          {!tags.length && (
            <AppButton
              color="blue"
              variant="outlined"
              size="large"
              width={136}
              onClick={onAddTag}
            >
              Add tag
            </AppButton>
          )}
          {/* TODO try useFieldArray */}
          {tags.map((tag, index) => (
            <div key={tag.id} className={styles['tags-item']}>
              <AppInput
                name="tag"
                placeholder="Tag"
                value={tag.value}
                minWidth={300}
                onChange={(event) => {
                  onChangeTag(tag.id, event.target.value);
                }}
              />

              <AppButton
                color="red"
                size="large"
                variant="outlined"
                minWidth={120}
                onClick={() => {
                  onDeleteTag(tag.id);
                }}
              >
                Delete
              </AppButton>

              {index === tags.length - 1 && (
                <AppButton
                  color="blue"
                  variant="outlined"
                  size="large"
                  minWidth={136}
                  onClick={onAddTag}
                >
                  Add tag
                </AppButton>
              )}
            </div>
          ))}
        </label>

        <AppButton
          color="blue"
          type="primary"
          htmlType="submit"
          size="large"
          minWidth={319}
          alignSelf={'flex-start'}
          disabled={isLoadingUpdateArticle || isLoadingCreateArticle}
        >
          Send
        </AppButton>
      </form>
    </FormProvider>
  );
};
