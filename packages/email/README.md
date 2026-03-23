# @inculva/email — Email Package

Shared email package powered by [Resend](https://resend.com). Provides a `sendEmail()` function and all HTML email templates.

## Usage

```typescript
import { sendEmail, welcomeTemplate, teamInviteTemplate } from "@inculva/email";

await sendEmail({
  to: "user@example.com",
  subject: "Welcome to Inculva!",
  html: welcomeTemplate("Alice"),
});
```

## Templates

| Template       | Function                                        | When sent              |
| -------------- | ----------------------------------------------- | ---------------------- |
| Welcome        | `welcomeTemplate(name)`                         | After registration     |
| Verify Email   | `verifyEmailTemplate(name, url)`                | Email verification     |
| Reset Password | `resetPasswordTemplate(name, url)`              | Password reset request |
| Team Invite    | `teamInviteTemplate(name, teamName, inviteUrl)` | Team invitation        |
| Plan Upgraded  | `planUpgradedTemplate(name, plan)`              | Subscription upgrade   |
| Usage Warning  | `usageWarningTemplate(name, plan, used, limit)` | 80% quota reached      |
| Usage Limit    | `usageLimitTemplate(name, plan, limit)`         | 100% quota reached     |

## Environment Variables

| Variable         | Description                                      |
| ---------------- | ------------------------------------------------ |
| `RESEND_API_KEY` | Resend API key (from resend.com)                 |
| `EMAIL_FROM`     | Sender address (e.g. `Inculva <hi@inculva.com>`) |

## Source Structure

```
src/
├── client.ts        ← Resend client initialization
├── index.ts         ← sendEmail() function + template exports
└── templates/
    ├── base.ts              ← Shared HTML wrapper/styles
    ├── welcome.ts
    ├── verify-email.ts
    ├── reset-password.ts
    ├── team-invite.ts
    ├── plan-upgraded.ts
    ├── usage-warning.ts
    └── usage-limit.ts
```

## Adding a New Template

1. Create `src/templates/my-template.ts`:
   ```typescript
   export function myTemplate(param: string): string {
     return `<html>...</html>`;
   }
   ```
2. Export from `src/index.ts`
3. Import and use anywhere in the monorepo:
   ```typescript
   import { myTemplate } from "@inculva/email";
   ```
