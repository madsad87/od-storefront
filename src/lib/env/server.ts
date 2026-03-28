import { z } from 'zod';

const serverEnvSchema = z.object({
  FAUSTWP_SECRET_KEY: z.string().min(32),
  WP_HEADLESS_REVALIDATE_TOKEN: z.string().min(24),
});

export const serverEnv = serverEnvSchema.parse({
  FAUSTWP_SECRET_KEY: process.env.FAUSTWP_SECRET_KEY,
  WP_HEADLESS_REVALIDATE_TOKEN: process.env.WP_HEADLESS_REVALIDATE_TOKEN,
});
