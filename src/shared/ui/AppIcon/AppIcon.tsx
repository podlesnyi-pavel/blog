import { FC } from 'react';
import HeartOutline from '@/shared/ui/AppIcon/icons/outline/HeartOutline';

type AppIconType = 'HeartOutline';

export interface AppIconProps {
  type: AppIconType;
  color?: string;
  cursor?: 'pointer';
  onClick?: () => void;
}

const iconComponents = {
  HeartOutline,
};

const AppIcon: FC<AppIconProps> = (props) => {
  const { type, ...otherProps } = props;
  const Icon = iconComponents[type];

  return <Icon {...otherProps} />;
};

export default AppIcon;
