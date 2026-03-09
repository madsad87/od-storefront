export interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface CheckoutSessionContext {
  cartSessionToken?: string;
  checkoutPath?: string;
}

export interface CheckoutActionInput {
  form: CheckoutFormData;
  session?: CheckoutSessionContext;
}

export interface CheckoutActionResult {
  mode: "hybrid" | "headless";
  status: "redirected" | "completed";
  redirectUrl?: string;
}

export interface CheckoutStrategy {
  mode: "hybrid" | "headless";
  completeCheckout: (input: CheckoutActionInput) => Promise<CheckoutActionResult>;
}

interface CheckoutStrategyConfig {
  mode?: "hybrid" | "headless";
  wordpressUrl?: string;
  checkoutPath?: string;
}

const DEFAULT_CHECKOUT_PATH = "/checkout";

const getWordPressUrl = (override?: string) => {
  if (override) {
    return override;
  }

  const env = import.meta.env as Record<string, string | undefined>;
  return env.NEXT_PUBLIC_WORDPRESS_URL ?? env.VITE_WORDPRESS_URL ?? "";
};

const normalizeUrl = (url: string) => url.replace(/\/$/, "");

export const createHybridCheckoutStrategy = (
  config: Pick<CheckoutStrategyConfig, "wordpressUrl" | "checkoutPath"> = {}
): CheckoutStrategy => ({
  mode: "hybrid",
  completeCheckout: async ({ session }) => {
    const wordpressUrl = getWordPressUrl(config.wordpressUrl);

    if (!wordpressUrl) {
      throw new Error(
        "Missing NEXT_PUBLIC_WORDPRESS_URL (or VITE_WORDPRESS_URL fallback) for hybrid checkout redirect."
      );
    }

    const checkoutUrl = new URL(
      session?.checkoutPath ?? config.checkoutPath ?? DEFAULT_CHECKOUT_PATH,
      `${normalizeUrl(wordpressUrl)}/`
    );

    if (session?.cartSessionToken) {
      checkoutUrl.searchParams.set("session", session.cartSessionToken);
    }

    window.location.assign(checkoutUrl.toString());

    return {
      mode: "hybrid",
      status: "redirected",
      redirectUrl: checkoutUrl.toString(),
    };
  },
});

export const createHeadlessCheckoutStrategy = (): CheckoutStrategy => ({
  mode: "headless",
  completeCheckout: async () => {
    /**
     * Scaffold only: when the storefront is ready for full headless checkout,
     * wire this to the CHECKOUT mutation in `client/src/graphql/mutations.ts`.
     *
     * Intentionally not implemented yet because payment orchestration currently
     * lives in WooCommerce's native checkout experience.
     */
    throw new Error(
      "Headless checkout is not implemented yet. Adopt the CHECKOUT mutation before enabling this strategy."
    );
  },
});

export const createCheckoutStrategy = (
  config: CheckoutStrategyConfig = {}
): CheckoutStrategy => {
  if (config.mode === "headless") {
    return createHeadlessCheckoutStrategy();
  }

  return createHybridCheckoutStrategy(config);
};
