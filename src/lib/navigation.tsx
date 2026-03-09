import Link from "next/link";
import { useRouter } from "next/router";
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
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}

export function useAppRouter() {
  const router = useRouter();
  return {
    pathname: router.pathname,
    push: router.push,
  };
}
