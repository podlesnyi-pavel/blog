import { FC } from 'react';
import styles from './UserPreview.module.scss';

import avatar from './assets/avatar.png';
import { IArticle, IAuthor } from '@/shared/api';
import { MONTHS } from '../../model/constants/months';
import { AppLink } from '@/shared/ui';

interface UserPreviewProps {
  className?: keyof typeof styles | string;
  author: IAuthor;
  createdAt?: IArticle['createdAt'];
  actionLink?: boolean;
}

export const UserPreview: FC<UserPreviewProps> = ({
  className,
  author,
  createdAt,
  actionLink,
}) => {
  let date;
  let showDate;

  if (createdAt) {
    date = new Date(createdAt);
    showDate = `${MONTHS[date.getMonth()]} ${date.getDate().toString()}, ${date.getFullYear().toString()}`;
  }

  const srcAvatar = author.image && author.image !== '' ? author.image : avatar;

  return (
    <div
      className={`${styles['user-preview']} ${className ? className.toString() : ''}`}
    >
      <div className={styles.info}>
        {actionLink ? (
          <AppLink to="/profile">{author.username}</AppLink>
        ) : (
          <span className={styles.name}>{author.username}</span>
        )}

        {createdAt && <span className={styles.date}>{showDate}</span>}
      </div>
      {actionLink ? (
        <AppLink to="/profile" style={{ marginLeft: '12px' }}>
          <img className={styles.avatar} src={srcAvatar} alt="user-avatar" />
        </AppLink>
      ) : (
        <img
          className={styles.avatar}
          src={srcAvatar}
          alt="user-avatar"
          style={{ marginLeft: '12px' }}
        />
      )}
    </div>
  );
};
