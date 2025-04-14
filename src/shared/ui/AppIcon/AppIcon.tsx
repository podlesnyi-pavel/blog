import { FC } from 'react';
import HeartOutline from '@/shared/ui/AppIcon/icons/outline/HeartOutline';
import HeartFilled from '@/shared/ui/AppIcon/icons/filled/HeartFilled';

type AppIconType = keyof typeof iconComponents;

export interface AppIconProps {
  type: AppIconType;
  color?: string;
  cursor?: 'pointer';
  onClick?: () => void;
}

const iconComponents = {
  HeartOutline,
  HeartFilled,
};

const AppIcon: FC<AppIconProps> = (props) => {
  const { type, ...otherProps } = props;
  const Icon = iconComponents[type];

  return <Icon {...otherProps} />;
};

export default AppIcon;
