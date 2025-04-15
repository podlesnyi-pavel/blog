import { FC } from 'react';
import { AppButton, RHFWrapperAppInput } from '@/shared/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { useEditProfileMutation, useGetCurrentUserQuery } from '@/shared/api';
import { isErrorsOnFetch, isMessageInErrorsOnFetch } from '@/shared/lib';
import { emailPattern } from '@/shared/lib';
import { urlPattern } from '@/shared/lib';

const editProfileFormFields = {
  username: '',
  email: '',
  password: '',
  image: '',
};

type TEditProfileFormFields = typeof editProfileFormFields;

export const EditProfileForm: FC = () => {
  const { data: userData } = useGetCurrentUserQuery();

  const methods = useForm<TEditProfileFormFields>({
    mode: 'onChange',
    values: {
      username: userData?.username ?? editProfileFormFields.username,
      email: userData?.email ?? editProfileFormFields.email,
      password: editProfileFormFields.password,
      image: userData?.image ?? editProfileFormFields.image,
    },
  });

  const { handleSubmit, setError } = methods;

  const [editProfile] = useEditProfileMutation();

  async function onSave(data: TEditProfileFormFields) {
    if (Object.values(data).some((value) => value)) {
      try {
        await editProfile(data).unwrap();
      } catch (error) {
        if (isMessageInErrorsOnFetch(error)) {
          const message = error.data.errors.message;
          const keys = Object.keys(
            editProfileFormFields,
          ) as (keyof TEditProfileFormFields)[];
          keys.forEach((key) => {
            if (message.includes(key)) {
              setError(key, {
                type: 'server',
                message,
              });
            }
          });
        } else if (isErrorsOnFetch(error)) {
          Object.entries(error.data.errors).forEach(([key, value]) => {
            setError(key as keyof TEditProfileFormFields, {
              type: 'server',
              message: typeof value === 'string' ? key + ' ' + value : '',
            });
          });
        }
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => void handleSubmit(onSave)(e)}>
        <h1 className="title">Edit Profile</h1>
        <RHFWrapperAppInput
          label="Username"
          placeholder="Username"
          name="username"
        />

        <RHFWrapperAppInput
          label="Email address"
          placeholder="Email address"
          type="email"
          name="email"
          pattern={{
            value: emailPattern,
            message: 'Email is invalid',
          }}
        />

        <RHFWrapperAppInput
          label="New password"
          placeholder="New password"
          type="password"
          name="password"
          minLength={{
            value: 6,
            message: 'Your password needs to be at least 6 characters',
          }}
          maxLength={{
            value: 40,
            message: 'Password must not exceed 40 characters',
          }}
        />

        <RHFWrapperAppInput
          label="Avatar image (url)"
          placeholder="Avatar image"
          name="image"
          pattern={{
            value: urlPattern,
            message: 'Image url is invalid',
          }}
        />

        <AppButton type="primary" size="large" htmlType="submit">
          Save
        </AppButton>
      </form>
    </FormProvider>
  );
};
