/**
 * NAVIGATION ABSTRACTION LAYER
 * =============================
 * This file abstracts routing so components are portable between frameworks.
 *
 * CURRENT: wouter (Vite/React SPA)
 * TARGET:  next/link + next/router (Faust.js / Next.js)
 *
 * MIGRATION STEPS FOR NEXT.JS:
 * 1. Replace the wouter imports below with:
 *      import NextLink from "next/link";
 *      import { useRouter } from "next/router";
 * 2. Update AppLink to render <NextLink> instead of wouter's <Link>
 * 3. Update useAppRouter to use Next.js useRouter():
 *      const router = useRouter();
 *      return { pathname: router.pathname, push: router.push, query: router.query };
 * 4. Product detail params come from getStaticProps/getServerSideProps in Next.js,
 *    not from useRoute(). Pass product data as page props instead.
 */

import { Link as WouterLink, useLocation } from "wouter";
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
    <WouterLink href={href} className={className} {...props}>
      {children}
    </WouterLink>
  );
}

export function useAppRouter() {
  const [pathname, navigate] = useLocation();
  return {
    pathname,
    push: navigate,
  };
}
