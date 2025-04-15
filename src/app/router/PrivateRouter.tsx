import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

interface IPrivateRouterProps {
  isAllowed: boolean;
  redirectPath?: string;
}

const PrivateRouter: FC<IPrivateRouterProps> = ({
  isAllowed,
  redirectPath = '/',
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRouter;
