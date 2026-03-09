import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode } from "react";

interface AppLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
  "aria-label"?: string;
}

export function AppLink({ href, children, className, ...props }: AppLinkProps) {
  return (
    <NextLink href={href} className={className} {...props}>
      {children}
    </NextLink>
  );
}

export function buildProductPath(slugOrId: string | number) {
  return `/product/${encodeURIComponent(String(slugOrId))}`;
}

export function useAppRouter() {
  const router = useRouter();
  const pathname = usePathname();

  return {
    pathname,
    push: router.push,
  };
}
