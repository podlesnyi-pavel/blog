import { FC } from 'react';
import styles from './ModalLayout.module.scss';

interface ModalLayoutProps {
  children: React.ReactNode;
  width?: number;
}

const ModalLayout: FC<ModalLayoutProps> = ({ children, width }) => {
  return (
    <div
      style={width ? { width: `${width.toString()}px` } : {}}
      className={styles['layout-modal']}
    >
      {children}
    </div>
  );
};

export default ModalLayout;
