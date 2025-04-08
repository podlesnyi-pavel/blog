import { SignUpForm } from '@/features/user';
import { AccountLayout } from '@/shared/ui';
import { FC } from 'react';

export const SignUpPage: FC = () => {
  return (
    <AccountLayout>
      <SignUpForm />
    </AccountLayout>
  );
};

export default SignUpPage;
