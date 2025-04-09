import { FC } from 'react';
import classes from './AppButton.module.scss';
import { Button, ButtonProps } from 'antd';

type TButtonPropsOmitClassName = Omit<ButtonProps, 'className'>;
interface TButtonPropsModern extends TButtonPropsOmitClassName {
  className?: keyof typeof classes;
  width?: number;
  minWidth?: number;
  alignSelf?: string;
}
const AppButton: FC<TButtonPropsModern> = ({
  variant,
  size = 'middle',
  color,
  children,
  className,
  type,
  htmlType = 'button',
  width,
  minWidth,
  alignSelf,
  onClick,
}) => {
  return (
    <Button
      className={`app-button ${classes['app-button']} ${className ? classes[className] : ''}`}
      style={{
        width: width ? `${width.toString()}px` : '',
        minWidth: minWidth ? `${minWidth.toString()}px` : '',
        alignSelf: alignSelf ?? '',
      }}
      color={color}
      variant={variant}
      size={size}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default AppButton;
