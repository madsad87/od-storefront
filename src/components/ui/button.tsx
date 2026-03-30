import Link from 'next/link';
import type { Route } from 'next';
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

import type { ReactNode } from 'react';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-ghost',
};

export function ButtonLink({ href, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  return (
    <Link href={href as Route} className={`${VARIANT_CLASS[variant]} ${className}`.trim()}>
      {children}
    </Link>
  );
}
