import { ReactNode } from 'react';

import { Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

interface RouteLinkProps extends LinkProps {
  href: string;
  locale?: string;
  children: ReactNode;
}

const RouteLink = ({
  href,
  locale,
  children,
  ...props
}: RouteLinkProps): JSX.Element => (
  <NextLink href={href} locale={locale} passHref>
    <Link {...props}>{children}</Link>
  </NextLink>
);

export default RouteLink;
