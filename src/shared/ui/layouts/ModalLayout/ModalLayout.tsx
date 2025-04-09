import { FC } from 'react';
import styles from './ModalLayout.module.scss';

interface ModalLayoutProps {
  children: React.ReactNode;
  width?: number;
  mt?: number;
}

const ModalLayout: FC<ModalLayoutProps> = ({ children, width, mt }) => {
  return (
    <div
      style={{
        width: width ? `${width.toString()}px` : '',
        marginTop: mt ? `${mt.toString()}px` : '',
      }}
      className={styles['layout-modal']}
    >
      {children}
    </div>
  );
};

export default ModalLayout;
