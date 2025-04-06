import { FC } from 'react';
import './AccountLayout.scss';
import { ModalLayout } from '@/shared/ui';

interface AccountLayoutProps {
  children: React.ReactNode;
}

export const AccountLayout: FC<AccountLayoutProps> = ({ children }) => {
  return (
    <div className="account-layout">
      <ModalLayout>{children}</ModalLayout>
    </div>
  );
};

export default AccountLayout;
