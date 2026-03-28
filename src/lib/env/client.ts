import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_WORDPRESS_URL: z.string().url(),
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default('en-US'),
  NEXT_PUBLIC_CURRENCY_CODE: z.string().default('USD'),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  NEXT_PUBLIC_CURRENCY_CODE: process.env.NEXT_PUBLIC_CURRENCY_CODE,
});
