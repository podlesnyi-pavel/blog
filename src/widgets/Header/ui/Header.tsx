import { FC } from 'react';
import styles from './Header.module.scss';
import { AppButton, AppLink } from '@/shared/ui';
import { UserPreview } from '@/entities/user';
import { useGetCurrentUserQuery } from '@/shared/api';
import { getItem, removeItem } from '@/shared/lib';

const Header: FC = () => {
  const token = getItem('auth_token');

  const { data: userData, isSuccess } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });
  // try useSelector
  console.log('userData', userData);
  console.log('token', token);

  function onLogOut() {
    console.log('logout');
    removeItem('auth_token');
    console.log('userData after', userData);
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>
        <AppLink to="/">Realworld Blog</AppLink>

        {userData ? (
          <div className={styles.actions}>
            <AppButton variant="outlined" color="green">
              Create article
            </AppButton>

            <UserPreview
              author={{
                // bio: 'string',
                image: userData.image,
                username: userData?.username,
                // following: true,
              }}
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
