export const env = {
  ikasClientId: process.env["NEXT_PUBLIC_IKAS_CLIENT_ID"]!,
  ikasClientSecret: process.env["IKAS_CLIENT_SECRET"]!,
  ikasApiUrl:
    process.env["NEXT_PUBLIC_IKAS_API_URL"] ??
    "https://api.myikas.com/api/v2/admin/graphql",
  deployUrl: process.env["NEXT_PUBLIC_DEPLOY_URL"]!,
  cookiePassword: process.env["SECRET_COOKIE_PASSWORD"]!,
  inculvaAppUrl: process.env["NEXT_PUBLIC_INCULVA_APP_URL"]!,
  widgetUrl: process.env["NEXT_PUBLIC_WIDGET_URL"]!,
  databaseUrl: process.env["DATABASE_URL"]!,
} as const;
