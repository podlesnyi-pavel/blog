import { FC } from 'react';
import styles from './ModalLayout.module.scss';

interface ModalLayoutProps {
  children: React.ReactNode;
}

const ModalLayout: FC<ModalLayoutProps> = ({ children }) => {
  return <div className={styles['layout-modal']}>{children}</div>;
};

export default ModalLayout;
