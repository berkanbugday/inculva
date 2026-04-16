export const env = {
  clientId: process.env["NEXT_PUBLIC_IKAS_CLIENT_ID"]!,
  clientSecret: process.env["IKAS_CLIENT_SECRET"]!,
  deployUrl: process.env["NEXT_PUBLIC_DEPLOY_URL"]!,
  secretKey: process.env["SECRET_COOKIE_PASSWORD"]!,
  inculvaAppUrl: process.env["NEXT_PUBLIC_INCULVA_APP_URL"]!,
  widgetUrl: process.env["NEXT_PUBLIC_WIDGET_URL"]!,
} as const;

export const IKAS_GRAPHQL_URL =
  "https://api.myikas.com/api/v2/admin/graphql";
