import { FC } from 'react';
import { Link, LinkProps } from 'react-router';

interface To {
  to: '/' | 'articles' | `articles/${string}`;
}

type AppLinkProps = Omit<LinkProps, 'to'> & To;

export const AppLink: FC<
  AppLinkProps & React.RefAttributes<HTMLAnchorElement>
> = ({ className, children, to }) => {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
};
