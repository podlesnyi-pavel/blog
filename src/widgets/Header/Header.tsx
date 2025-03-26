import { FC } from 'react';
import styles from './Header.module.scss';
import AppButton from '@/shared/ui/AppButton';
import AppLink from '@/shared/ui/AppLink';

const Header: FC = () => {
  function singIn() {
    console.log('singIn');
  }

  function singUp() {
    console.log('singUp');
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>
        <AppLink className={styles.link} to="/">
          Realworld Blog
        </AppLink>
        <div className={styles.buttons}>
          <AppButton
            className="large-plus"
            size="large"
            type="text"
            onClick={singIn}
          >
            Sign In
          </AppButton>

          <AppButton
            className="large-plus"
            size="large"
            color="green"
            variant="outlined"
            onClick={singUp}
          >
            Sign Up
          </AppButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
