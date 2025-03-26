import { FC } from 'react';
import styles from './UserPreview.module.scss';

import avatar from './assets/avatar.png';
import { IArticle, Author } from '@/shared/types/IArticlesData';
import { MONTHS } from '@/shared/constants/months';

interface UserPreviewProps {
  className?: string;
  author: Author;
  createdAt: IArticle['createdAt'];
}

const UserPreview: FC<UserPreviewProps> = ({
  className,
  author,
  createdAt,
}) => {
  const date = new Date(createdAt);
  const showDate = `${MONTHS[date.getMonth()]} ${date.getDate().toString()}, ${date.getFullYear().toString()}`;

  return (
    <div className={`${styles['user-preview']} ${className ?? ''}`}>
      <span className={styles.name}>{author.username}</span>
      <span className={styles.date}>{showDate}</span>
      <img
        className={styles.avatar}
        src={author.image || avatar}
        alt="user-avatar"
      />
    </div>
  );
};
export default UserPreview;
