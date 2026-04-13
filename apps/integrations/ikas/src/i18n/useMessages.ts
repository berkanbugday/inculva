import { en } from "./en";
import { tr } from "./tr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages: Record<string, any> = { en, tr };

export function getMessages(locale: string): typeof en {
  return messages[locale] ?? en;
}
