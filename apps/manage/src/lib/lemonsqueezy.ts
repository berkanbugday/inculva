import {
  lemonSqueezySetup,
  createCheckout,
  cancelSubscription,
} from "@lemonsqueezy/lemonsqueezy.js";

lemonSqueezySetup({
  apiKey: process.env["LEMONSQUEEZY_API_KEY"] ?? "",
  onError: (error: Error) => console.error("[LemonSqueezy]", error),
});

export const LS_STORE_ID = parseInt(
  process.env["LEMONSQUEEZY_STORE_ID"] ?? "0",
  10
);

export { createCheckout, cancelSubscription };
