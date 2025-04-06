import { FC } from 'react';
import styles from './UserPreview.module.scss';

import avatar from './assets/avatar.png';
import { IArticle, IAuthor } from '@/shared/api';
import { MONTHS } from '../../model/constants/months';

interface UserPreviewProps {
  className?: string;
  author: IAuthor;
  createdAt?: IArticle['createdAt'];
}

export const UserPreview: FC<UserPreviewProps> = ({
  className,
  author,
  createdAt,
}) => {
  let date;
  let showDate;

  if (createdAt) {
    date = new Date(createdAt);
    showDate = `${MONTHS[date.getMonth()]} ${date.getDate().toString()}, ${date.getFullYear().toString()}`;
  }

  return (
    <div className={`${styles['user-preview']} ${className ?? ''}`}>
      <div className={styles.info}>
        <span className={styles.name}>{author.username}</span>
        {createdAt && <span className={styles.date}>{showDate}</span>}
      </div>
      <img
        className={styles.avatar}
        src={author.image ?? avatar}
        alt="user-avatar"
      />
    </div>
  );
};
