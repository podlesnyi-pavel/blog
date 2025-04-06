import { EditProfileForm } from '@/features/user';
import { AccountLayout } from '@/shared/ui';
import { FC } from 'react';

export const ProfilePage: FC = () => {
  return (
    <AccountLayout>
      <EditProfileForm />
    </AccountLayout>
  );
};
