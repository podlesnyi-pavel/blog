import { FC } from 'react';
import styles from './Header.module.scss';
import { AppButton, AppLink } from '@/shared/ui';
import { UserPreview } from '@/entities/user';
import { baseApi, useGetCurrentUserQuery } from '@/shared/api';
import { logout } from '@/features/user';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { removeItem } from '@/shared/lib';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const location = useLocation();
  const navigator = useNavigate();

  const { data: userData } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  function onLogOut() {
    dispatch(logout());
    removeItem('auth_token');
    dispatch(baseApi.util.resetApiState());
    void navigator(location.pathname);
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>
        <AppLink to="/">Realworld Blog</AppLink>

        {token && userData ? (
          <div className={styles.actions}>
            <AppLink
              to="/new-article"
              type="button"
              variant="outlined"
              color="green"
              size="middle"
              padding="sm"
            >
              Create article
            </AppLink>

            <UserPreview
              author={{
                image: userData.image,
                username: userData.username,
              }}
              className="pointer-name-avatar"
              actionLink={true}
            />

            <AppButton className="large-plus" onClick={onLogOut}>
              Log Out
            </AppButton>
          </div>
        ) : (
          <div className={styles.actions}>
            <AppLink to="/sign-in" type="button" size="large-plus">
              Sign In
            </AppLink>

            <AppLink
              to="/sign-up"
              type="button"
              size="large-plus"
              variant="outlined"
              color="green"
            >
              Sign Up
            </AppLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
