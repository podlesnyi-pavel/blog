import { FC } from 'react';
import { AppButton, AppInput } from '@/shared/ui';

export const EditProfileForm: FC = () => {
  return (
    <form>
      <h1 className="title">Edit Profile</h1>
      <AppInput label="Username" placeholder="Username" />

      <AppInput
        label="Email address"
        placeholder="Email address"
        type="email"
      />

      <AppInput
        label="New password"
        placeholder="New password"
        type="password"
      />

      <AppInput label="Avatar image (url)" placeholder="Avatar image" />

      <AppButton type="primary" size="large">
        Save
      </AppButton>
    </form>
  );
};
