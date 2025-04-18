import { CSSProperties, FC } from 'react';
import { Link, LinkProps, Path } from 'react-router';
import styles from './AppLink.module.scss';

interface customProps {
  type?: 'button';
  size?: 'large-plus' | 'middle';
  variant?: 'outlined';
  color?: 'green' | 'blue';
  padding?: 'sm';
  style?: CSSProperties | undefined;
}

interface To {
  to:
    | '/'
    | '/articles'
    | `/articles/${string}`
    | `/articles/${string}/edit`
    | '/sign-in'
    | '/sign-up'
    | '/profile'
    | '/new-article'
    | Partial<Path>;
}

type AppLinkProps = Omit<LinkProps, 'to'> & To & customProps;

export const AppLink: FC<
  AppLinkProps & React.RefAttributes<HTMLAnchorElement>
> = ({
  className,
  children,
  to,
  type,
  size,
  variant,
  color,
  padding,
  style,
}) => {
  const typeClass = type ? styles[`app-link--type--${type}`] : '';
  const sizeClass = size ? styles[`app-link--size--${size}`] : '';
  const variantClass = variant ? styles[`app-link--variant--${variant}`] : '';
  const colorClass = color ? styles[`app-link--color--${color}`] : '';
  const paddingClass = padding ? styles[`app-link--padding--${padding}`] : '';

  return (
    <Link
      style={style}
      className={`${className ?? ''} ${styles['app-link']} ${typeClass} ${sizeClass} ${variantClass} ${colorClass} ${paddingClass}`}
      to={to}
    >
      {children}
    </Link>
  );
};
