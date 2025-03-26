import { FC } from 'react';
import styles from './AppButton.module.scss';
import { Button, ButtonProps } from 'antd';

type TButtonPropsOmitClassName = Omit<ButtonProps, 'className'>;
interface TButtonPropsModern extends TButtonPropsOmitClassName {
  className: keyof typeof styles;
}
const AppButton: FC<TButtonPropsModern> = ({
  variant,
  size = 'middle',
  color,
  children,
  className,
  type,
  onClick,
}) => {
  return (
    <Button
      className={` ${styles['app-button']} ${className ? styles[className] : ''}`}
      color={color}
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default AppButton;
