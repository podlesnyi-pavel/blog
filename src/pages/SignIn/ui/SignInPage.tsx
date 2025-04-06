import { SignInForm } from '@/features/user';
import { AccountLayout } from '@/shared/ui';
import { FC } from 'react';

export const SignInPage: FC = () => {
  return (
    <AccountLayout>
      <SignInForm />
    </AccountLayout>
  );
};
