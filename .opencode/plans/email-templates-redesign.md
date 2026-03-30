# Email Templates Redesign Plan

## Overview
Redesign all email HTML templates with:
- CDN logo URL (`https://cdn.inculva.com/logos/logo-dark.png`)
- Fully rounded buttons (`border-radius: 9999px`)
- English + Turkish (en/tr) i18n support
- Remove unused `team-invite` template

---

## 1. `packages/email/src/client.ts`

```typescript
import { Resend } from "resend";

if (!process.env["RESEND_API_KEY"]) {
  console.warn("[email] RESEND_API_KEY not set — emails will not be sent");
}

export const resend = new Resend(process.env["RESEND_API_KEY"] ?? "re_placeholder");

export const FROM_ADDRESS = process.env["EMAIL_FROM"]!;
export const APP_URL = process.env["NEXT_PUBLIC_APP_URL"]!;
export const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;
```

**Change:** Add `CDN_URL` export.

---

## 2. `packages/email/src/i18n/messages.ts` (NEW FILE)

```typescript
export type Locale = "en" | "tr";

export const messages = {
  en: {
    company: "inculva",
    hi: "Hi",
    there: "there",
    orCopyLink: "Or copy this link",
    ifYouDidntRequest: "If you didn't request this, you can safely ignore this email.",
    ifYouDidntCreate: "If you didn't create an inculva account, you can safely ignore this email.",
    questionsReply: "Need help? Reply to this email — we're happy to assist.",
    managePreferences: "Manage email preferences",
    dashboard: "Dashboard",
    pricing: "Pricing",
    billingSettings: "Billing Settings",
    helpCenter: "Help Center",

    // welcome
    welcomeTitle: "Welcome to inculva!",
    welcomeHi: "Welcome to inculva,",
    welcomeDesc: "We're glad you're here. inculva helps you make your website accessible to everyone — in minutes.",
    welcomeHowTo: "Here's how to get started:",
    welcomeStep1: "Add your first website",
    welcomeStep2: "Copy the embed snippet",
    welcomeStep3: 'Paste it before </body> on your site',
    welcomeCta: "Go to Dashboard",
    welcomePlan: "Your plan:",
    freePlan: "Free",
    freePlanDesc: "1 site, 10,000 events/month.",
    readyToScale: "Ready to scale?",
    upgradeAnytime: "Upgrade anytime",

    // verify-email
    verifyTitle: "Verify your email address",
    verifyDesc: "Click the button below to verify your email address. This link expires in",
    verifyHours: "24 hours",
    verifyCta: "Verify Email",

    // reset-password
    resetTitle: "Reset your password",
    resetDesc: "We received a request to reset the password for your inculva account. Click the button below to choose a new password. This link expires in",
    resetHours: "1 hour",
    resetCta: "Reset Password",

    // weekly-digest
    digestTitle: "Your weekly accessibility digest",
    digestHi: "Hi",
    digestDesc: "Here's a summary of your widget activity for",
    digestTotalEvents: "Total Events This Week",
    digestNoActivity: "It looks like your widget didn't receive any events this week. Make sure it's installed correctly on your site.",
    digestCheckSites: "Check your sites",
    digestViewAnalytics: "View full analytics",
    digestSite: "Site",
    digestEvents: "Events",
    digestTopFeature: "Top Feature",
    digestManage: "You're receiving this weekly digest because you have an active inculva account.",

    // health-degraded
    healthTitle: "Widget may be offline on",
    healthDesc: "Our health monitor couldn't detect the inculva widget on",
    healthMightMean: "This might mean:",
    healthReason1: "The embed snippet was accidentally removed",
    healthReason2: "A deployment removed the widget script",
    healthReason3: "The site is temporarily down",
    healthImpact: "If accessibility tracking is interrupted, visitors won't be able to use the widget until it's restored.",
    healthCheckSettings: "Check site settings",
    healthOneNotification: "You'll only receive one notification per outage — we won't repeat this until the widget is healthy again.",

    // drip-day3
    drip3Title: "Have you installed the widget yet?",
    drip3Desc: "You signed up for inculva a few days ago — great to have you! One quick question: have you added the widget to your site?",
    drip3Desc2: "It only takes 30 seconds — paste a single line of HTML before your closing",
    drip3Tag: "tag and you're live.",
    drip3Cta: "Install the widget",

    // drip-day7
    drip7Title: "Run your free WCAG scan",
    drip7Desc: "Did you know inculva includes a built-in",
    drip7Scanner: "WCAG 2.1 AA scanner",
    drip7Desc2: "? It checks your site for the most common accessibility issues and shows you exactly what to fix.",
    drip7Desc3: "It's free for all plans — just click below to scan your first site.",
    drip7Cta: "Run WCAG scan",
    drip7Ea: "The European Accessibility Act requires digital products to be WCAG 2.1 AA compliant.",

    // drip-day30
    drip30Title: "Unlock unlimited accessibility",
    drip30Desc: "You've been using inculva for a month — thank you! Your widget has tracked",
    drip30Events: "events",
    drip30Desc2: "so far.",
    drip30FreeLimit: "On the Free plan you're limited to",
    drip30EventsPerMonth: "10,000 events/month",
    drip30And: "and",
    drip30Site: "1 site",
    drip30Upgrade: ". Upgrading to",
    drip30Pro: "Pro",
    drip30Gives: "gives you:",
    drip30UpTo10Sites: "Up to 10 sites",
    drip30100kEvents: "100,000 events/month",
    drip30TeamCollab: "Team collaboration (up to 5 members)",
    drip30PrioritySupport: "Priority support",
    drip30Cta: "Upgrade to Pro",
    drip30OnFree: "You're on the Free plan.",
    drip30Compare: "Compare all plans",

    // plan-upgraded
    upgradedTitle: "You're now on the",
    upgradedPlan: "plan",
    upgradedDesc: "Your upgrade was successful. Here's what you now have access to:",
    upgradedUpTo: "Up to",
    upgradedPageviews: "pageviews",
    upgradedPerMonth: "per month",
    upgradedWebsites: "websites",
    upgradedCustomBranding: "Custom branding",
    upgradedPriorityPhone: "Priority support (phone & email)",
    upgradedPriorityEmail: "Priority email support",
    upgradedFullScan: "Full WCAG 2.1 AA & AAA scanning",
    upgradedCta: "Go to Dashboard",
    upgradedQuestions: "Questions? Reply to this email or visit our",

    // usage-warning
    warningTitle: "You've used",
    warningOfMonthly: "of your monthly events",
    warningHi: "Hi",
    warningApproaching: "You're approaching your",
    warningPlan: "plan event limit for this month.",
    warningEventUsage: "Event Usage",
    warningOnce100: "Once you reach 100%, new events from your sites will be dropped until the month resets.",
    warningUpgrade: "Upgrade now to make sure disabled users on your sites keep receiving uninterrupted accessibility support.",
    warningCta: "Upgrade Plan",
    warningResets: "Your usage resets at the start of each calendar month.",

    // usage-limit
    limitTitle: "You've reached your monthly event limit",
    limitHi: "Hi",
    limitReached: "Your",
    limitPlan: "plan has reached its limit of",
    limitEvents: "events",
    limitForMonth: "for this month.",
    limitStatus: "Status",
    limitDropped: "New events are being dropped until your limit resets",
    limitWidgetStill: "This means the accessibility widget on your sites is still loading, but user interactions are no longer being recorded. More importantly,",
    limitDisabledUsers: "disabled users relying on your widget are not affected",
    limitWidgetContinues: "— the widget continues to function.",
    limitUpgrade: "Upgrade to restore event tracking and ensure complete analytics for the rest of the month.",
    limitCta: "Upgrade Now",
    limitResets: "Your usage resets automatically at the start of each calendar month.",

    // payment-failed
    paymentTitle: "Payment failed",
    paymentHi: "Hi",
    paymentFailed: "We were unable to process your payment for the",
    paymentPlan: "plan.",
    paymentRestricted: "Your account has been moved to a restricted state — your widget will continue to work, but you won't be able to create new sites or access premium features until your billing is resolved.",
    paymentPleaseUpdate: "Please update your payment method to restore full access.",
    paymentCta: "Update payment method",
    paymentErrorContact: "If you believe this is an error, contact us at",
    paymentSupportEmail: "hi@inculva.com",
  },

  tr: {
    company: "inculva",
    hi: "Merhaba",
    there: "arkadaşım",
    orCopyLink: "Veya bu bağlantıyı kopyalayın",
    ifYouDidntRequest: "Bunu talep etmediyseniz, bu e-postayı güvenle ignore edebilirsiniz.",
    ifYouDidntCreate: "inculva hesabı oluşturmadıysanız, bu e-postayı güvenle ignore edebilirsiniz.",
    questionsReply: "Yardıma mı ihtiyacınız var? Bu e-postaya cevap verin — yardımcı olmaktan mutluluk duyarız.",
    managePreferences: "E-posta tercihlerini yönet",
    dashboard: "Kontrol Paneli",
    pricing: "Fiyatlandırma",
    billingSettings: "Faturalama Ayarları",
    helpCenter: "Yardım Merkezi",

    // welcome
    welcomeTitle: "inculva'ya hoş geldiniz!",
    welcomeHi: "inculva'ya hoş geldiniz,",
    welcomeDesc: "Burada olduğunuz için mutluyuz. inculva, web sitenizi dakikalar içinde herkes için erişilebilir hale getirmenize yardımcı olur.",
    welcomeHowTo: "Başlamak için izlemeniz gereken adımlar:",
    welcomeStep1: "İlk web sitenizi ekleyin",
    welcomeStep2: "Embed snippet'ini kopyalayın",
    welcomeStep3: "Sitizenizin </body> etiketinden önce yapıştırın",
    welcomeCta: "Kontrol Paneline Git",
    welcomePlan: "Planınız:",
    freePlan: "Ücretsiz",
    freePlanDesc: "1 site, ayda 10.000 etkinlik.",
    readyToScale: "Ölçeklendirmeye hazır mısınız?",
    upgradeAnytime: "İstediğiniz zaman yükseltin",

    // verify-email
    verifyTitle: "E-posta adresinizi doğrulayın",
    verifyDesc: "E-posta adresinizi doğrulamak için aşağıdaki düğmeye tıklayın. Bu bağlantı",
    verifyHours: "24 saat",
    verifyCta: "E-postayı Doğrula",

    // reset-password
    resetTitle: "Şifrenizi sıfırlayın",
    resetDesc: "inculva hesabınız için şifre sıfırlama talebi aldık. Yeni bir şifre belirlemek için aşağıdaki düğmeye tıklayın. Bu bağlantı",
    resetHours: "1 saat",
    resetCta: "Şifreyi Sıfırla",

    // weekly-digest
    digestTitle: "Haftalık erişilebilirlik özeti",
    digestHi: "Merhaba",
    digestDesc: "Widget etkinliğinizin",
    digestTotalEvents: "Bu Haftaki Toplam Etkinlikler",
    digestNoActivity: "Görünüşe göre widget'ınız bu hafta hiç etkinlik almadı. Doğru kurulduğundan emin olun.",
    digestCheckSites: "Sitelerinizi kontrol edin",
    digestViewAnalytics: "Tam analizi görüntüle",
    digestSite: "Site",
    digestEvents: "Etkinlikler",
    digestTopFeature: "En İyi Özellik",
    digestManage: "Bu haftalık özeti, aktif bir inculva hesabınız olduğu için alıyorsunuz.",

    // health-degraded
    healthTitle: "Widget şu adrende çevrimdışı olabilir:",
    healthDesc: "Sağlık izleyicimiz, widget'ınızı",
    healthMightMean: "durumunda algılayamadı. Bu şu anlama gelebilir:",
    healthReason1: "Embed snippet'i yanlışlıkla kaldırıldı",
    healthReason2: "Bir dağıtım, widget betiğini kaldırdı",
    healthReason3: "Site geçici olarak kapalı",
    healthImpact: "Erişilebilirlik takibi kesintiye uğrarsa, ziyaretçiler widget sağlanana kadar widget'ı kullanamaz.",
    healthCheckSettings: "Site ayarlarını kontrol et",
    healthOneNotification: "Her kesinti için yalnızca bir bildirim alırsınız — widget sağlıklı olana kadar bunu tekrarlamayız.",

    // drip-day3
    drip3Title: "Widget'ı henüz kurdunuz mu?",
    drip3Desc: "Birkaç gün önce inculva'ya kaydoldunuz — sizi burada görmek güzel! Hızlı bir soru: widget'ı sitenize eklediniz mi?",
    drip3Desc2: "Sadece 30 saniye sürer — kapanış",
    drip3Tag: "etiketinden önce tek bir HTML satırı yapıştırın ve hazırsınız.",
    drip3Cta: "Widget'ı kur",

    // drip-day7
    drip7Title: "Ücretsiz WCAG taramasını çalıştırın",
    drip7Desc: "inculva'nın yerleşik bir",
    drip7Scanner: "WCAG 2.1 AA tarayıcısı",
    drip7Desc2: "içerdiğini biliyor muydunuz? Sitelerinizdeki en yaygın erişilebilirlik sorunlarını kontrol eder ve tam olarak neyin düzeltileceğini gösterir.",
    drip7Desc3: "Tüm planlarda ücretsizdir — ilk sitenizi taramak için aşağıya tıklayın.",
    drip7Cta: "WCAG taramasını çalıştır",
    drip7Ea: "Avrupa Erişilebilirlik Yasası, dijital ürünlerin WCAG 2.1 AA uyumlu olmasını gerektirir.",

    // drip-day30
    drip30Title: "Sınırsız erişilebilirlik kilidini açın",
    drip30Desc: "Bir aydır inculva'yı kullanıyorsunuz — teşekkürler! Widget'ınız şu ana kadar",
    drip30Events: "etkinlik",
    drip30Desc2: "izledi.",
    drip30FreeLimit: "Ücretsiz planda",
    drip30EventsPerMonth: "ayda 10.000 etkinlik",
    drip30And: "ve",
    drip30Site: "1 site",
    drip30Upgrade: "ile sınırlısınız.",
    drip30Pro: "Pro",
    drip30Gives: "'a yükseltmek size şunları verir:",
    drip30UpTo10Sites: "10'a kadar site",
    drip30100kEvents: "100.000 etkinlik/ay",
    drip30TeamCollab: "Ekip işbirliği (5'e kadar üye)",
    drip30PrioritySupport: "Öncelikli destek",
    drip30Cta: "Pro'ya Yükselt",
    drip30OnFree: "Ücretsiz plandasınız.",
    drip30Compare: "Tüm planları karşılaştırın",

    // plan-upgraded
    upgradedTitle: "Artık",
    upgradedPlan: "planındasınız",
    upgradedDesc: "Yükseltmeniz başarılı oldu. İşte şimdi erişebildikleriniz:",
    upgradedUpTo: "Aya kadar",
    upgradedPageviews: "sayfa görüntülemesi",
    upgradedPerMonth: "her ay",
    upgradedWebsites: "web sitesi",
    upgradedCustomBranding: "Özel marka",
    upgradedPriorityPhone: "Öncelikli destek (telefon ve e-posta)",
    upgradedPriorityEmail: "Öncelikli e-posta desteği",
    upgradedFullScan: "Tam WCAG 2.1 AA ve AAA taraması",
    upgradedCta: "Kontrol Paneline Git",
    upgradedQuestions: "Sorularınız mı var? Bu e-postaya cevap verin veya",

    // usage-warning
    warningTitle: "Aylık etkinliklerinizin",
    warningOfMonthly: "kısmını kullandınız",
    warningHi: "Merhaba",
    warningApproaching: "Bu ay",
    warningPlan: "plan etkinlik sınırına yaklaşıyorsunuz.",
    warningEventUsage: "Etkinlik Kullanımı",
    warningOnce100: "%100'e ulaştığınızda, sitelerinizden gelen yeni etkinlikler ay sıfırlanana kadar bırakılır.",
    warningUpgrade: "Sitelerinizdeki engelli kullanıcıların kesintisiz erişilebilirlik desteği almaya devam ettiğinden emin olmak için şimdi yükseltin.",
    warningCta: "Planı Yükselt",
    warningResets: "Kullanımınız her ay takvimin başında sıfırlanır.",

    // usage-limit
    limitTitle: "Aylık etkinlik sınırınıza ulaştınız",
    limitHi: "Merhaba",
    limitReached: "",
    limitPlan: "planınız bu ay için",
    limitEvents: "etkinlik",
    limitForMonth: "sınırına ulaştı.",
    limitStatus: "Durum",
    limitDropped: "Yeni etkinlikler, limit sıfırlanana kadar bırakılıyor",
    limitWidgetStill: "Bu, sitelerinizdeki erişilebilirlik widget'ının hala yüklendiği anlamına gelir, ancak kullanıcı etkileşimleri artık kaydedilmiyor. Daha da önemlisi,",
    limitDisabledUsers: "widget'ınıza güvenen engelli kullanıcılar etkilenmez",
    limitWidgetContinues: "— widget çalışmaya devam eder.",
    limitUpgrade: "Etkinlik takibini geri yüklemek ve ayın geri kalanı için eksiksiz analitik sağlamak için yükseltin.",
    limitCta: "Şimdi Yükselt",
    limitResets: "Kullanımınız her ay takvimin başında otomatik olarak sıfırlanır.",

    // payment-failed
    paymentTitle: "Ödeme başarısız oldu",
    paymentHi: "Merhaba",
    paymentFailed: "",
    paymentPlan: "planı için ödemenizi işleyemedik.",
    paymentRestricted: "Hesabınız kısıtlı duruma geçirildi — widget'ınız çalışmaya devam edecek, ancak faturalandırma çözülene kadar yeni site oluşturamaz veya premium özelliklere erişemezsiniz.",
    paymentPleaseUpdate: "Tam erişimi geri yüklemek için lütfen ödeme yönteminizi güncelleyin.",
    paymentCta: "Ödeme yöntemini güncelle",
    paymentErrorContact: "Bunun bir hata olduğunu düşünüyorsanız, şu adresten bizimle iletişime geçin:",
    paymentSupportEmail: "hi@inculva.com",
  },
} as const;

export type MessageKey = keyof typeof messages.en;

export function t(locale: Locale, key: MessageKey): string {
  return messages[locale][key] ?? messages.en[key];
}

export function detectLocale(request: Request): Locale {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return "en";

  const locales: Locale[] = ["tr", "en"];
  const preferred = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().substring(0, 2).toLowerCase());

  for (const pref of preferred) {
    if (locales.includes(pref as Locale)) return pref as Locale;
  }
  return "en";
}
```

---

## 3. `packages/email/src/templates/base.ts`

```typescript
import { CDN_URL } from "../client.js";

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type Locale = "en" | "tr";

export function baseTemplate(
  locale: Locale,
  content: string,
  previewText = "",
): string {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>inculva</title>
  ${
    previewText
      ? `<span style="display:none;max-height:0;overflow:hidden;">${previewText}</span>`
      : ""
  }
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; }
    .card { background: #ffffff; border-radius: 16px; overflow: hidden; }
    .header { background: #ffffff; padding: 24px 36px; border-bottom: 3px solid #1d4ed8; }
    .header img { height: 36px; width: auto; display: block; }
    .body { padding: 36px; color: #374151; text-align: center; }
    .body h2 { margin: 0 0 12px; font-size: 20px; color: #111827; }
    .body p { margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #4b5563; }
    .body ul { margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8; text-align: left; display: inline-block; }
    .body ol { margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8; text-align: left; display: inline-block; }
    .btn { display: inline-block; background: #1d4ed8; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 9999px; font-weight: 600; font-size: 15px; margin: 8px 0 20px; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .small { font-size: 13px; color: #9ca3af; line-height: 1.5; }
    .footer { padding: 20px 36px; text-align: center; font-size: 12px; color: #9ca3af; }
    .footer a { color: #9ca3af; }
    code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <img src="${CDN_URL}/logos/logo-dark.png" alt="inculva" />
      </div>
      <div class="body">
        ${content}
      </div>
    </div>
    <div class="footer">
      <p>© ${year} inculva. All rights reserved.</p>
      <p>You're receiving this because you signed up for inculva.</p>
    </div>
  </div>
</body>
</html>`;
}
```

**Changes:**
- Uses `CDN_URL` instead of `landingUrl`
- `border-radius: 9999px` (fully rounded buttons)
- `locale` parameter added
- `text-align: center` on body
- `ul`/`ol` styles added

---

## 4. `packages/email/src/templates/welcome.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function welcomeTemplate(name: string, locale: Locale = "en"): string {
  const displayName = escapeHtml(name || t(locale, "there"));
  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "welcomeHi")} ${displayName}!</h2>
    <p>${t(locale, "welcomeDesc")}</p>
    <p>${t(locale, "welcomeHowTo")}</p>
    <ol style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>${t(locale, "welcomeStep1")}</li>
      <li>${t(locale, "welcomeStep2")}</li>
      <li>${t(locale, "welcomeStep3")}</li>
    </ol>
    <a href="${APP_URL}/dashboard" class="btn">${t(locale, "welcomeCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "welcomePlan")} <strong>${t(locale, "freePlan")}</strong> — ${t(locale, "freePlanDesc")}<br>
    ${t(locale, "readyToScale")} <a href="${APP_URL}/pricing" style="color: #1d4ed8;">${t(locale, "upgradeAnytime")}</a></p>
    `,
    t(locale, "welcomeTitle"),
  );
}
```

---

## 5. `packages/email/src/templates/verify-email.ts`

```typescript
import { baseTemplate } from "./base.js";
import { t, type Locale } from "../i18n/messages.js";

export function verifyEmailTemplate(
  name: string,
  verifyUrl: string,
  locale: Locale = "en",
): string {
  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "verifyTitle")}</h2>
    <p>${t(locale, "hi")} ${name || t(locale, "there")},</p>
    <p>${t(locale, "verifyDesc")} <strong>${t(locale, "verifyHours")}</strong>.</p>
    <a href="${verifyUrl}" class="btn">${t(locale, "verifyCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "ifYouDidntCreate")}<br>
    ${t(locale, "orCopyLink")}: <span style="word-break: break-all; color: #6b7280;">${verifyUrl}</span></p>
    `,
    t(locale, "verifyTitle"),
  );
}
```

---

## 6. `packages/email/src/templates/reset-password.ts`

```typescript
import { baseTemplate } from "./base.js";
import { t, type Locale } from "../i18n/messages.js";

export function resetPasswordTemplate(
  resetUrl: string,
  locale: Locale = "en",
): string {
  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "resetTitle")}</h2>
    <p>${t(locale, "hi")} ${t(locale, "there")},</p>
    <p>${t(locale, "resetDesc")} <strong>${t(locale, "resetHours")}</strong>.</p>
    <a href="${resetUrl}" class="btn">${t(locale, "resetCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "ifYouDidntRequest")}<br>
    ${t(locale, "orCopyLink")}: <span style="word-break: break-all; color: #6b7280;">${resetUrl}</span></p>
    `,
    t(locale, "resetTitle"),
  );
}
```

---

## 7. `packages/email/src/templates/weekly-digest.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

interface DigestSite {
  name: string;
  domain: string;
  events: number;
  topFeature: string | null;
}

export function weeklyDigestTemplate(
  userName: string,
  totalEvents: number,
  sites: DigestSite[],
  weekLabel: string,
  locale: Locale = "en",
): string {
  const sitesHtml = sites
    .map(
      (s) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #f3f4f6;">
          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">${escapeHtml(s.name)}</p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">${escapeHtml(s.domain)}</p>
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 14px; font-weight: 600; color: #1d4ed8;">
          ${s.events.toLocaleString()}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 13px; color: #6b7280;">
          ${s.topFeature ? escapeHtml(s.topFeature) : "—"}
        </td>
      </tr>`,
    )
    .join("");

  const noActivity = totalEvents === 0;

  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "digestTitle")}</h2>
    <p>${t(locale, "digestHi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "digestDesc")} <strong>${escapeHtml(weekLabel)}</strong>.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 12px; color: #1d4ed8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "digestTotalEvents")}</p>
          <p style="margin: 0; font-size: 36px; font-weight: 700; color: #1e40af;">${totalEvents.toLocaleString()}</p>
        </td>
      </tr>
    </table>

    ${
      noActivity
        ? `<p style="color: #6b7280;">${t(locale, "digestNoActivity")}</p>
           <a href="${APP_URL}/dashboard" class="btn">${t(locale, "digestCheckSites")} →</a>`
        : `<table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
             <thead>
               <tr style="background: #f9fafb;">
                 <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "digestSite")}</th>
                 <th style="padding: 10px 12px; text-align: right; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "digestEvents")}</th>
                 <th style="padding: 10px 12px; text-align: right; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "digestTopFeature")}</th>
               </tr>
             </thead>
             <tbody>${sitesHtml}</tbody>
           </table>
           <a href="${APP_URL}/dashboard" class="btn">${t(locale, "digestViewAnalytics")} →</a>`
    }

    <hr class="divider">
    <p class="small">
      ${t(locale, "digestManage")}<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    `${totalEvents.toLocaleString()} accessibility events this week`,
  );
}
```

---

## 8. `packages/email/src/templates/health-degraded.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function healthDegradedTemplate(
  userName: string,
  domain: string,
  siteId: string,
  locale: Locale = "en",
): string {
  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "healthTitle")} ${escapeHtml(domain)}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "healthDesc")} <strong>${escapeHtml(domain)}</strong>. ${t(locale, "healthMightMean")}</p>
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
      <li>${t(locale, "healthReason1")}</li>
      <li>${t(locale, "healthReason2")}</li>
      <li>${t(locale, "healthReason3")}</li>
    </ul>
    <p>${t(locale, "healthImpact")}</p>
    <a href="${APP_URL}/dashboard/sites/${escapeHtml(siteId)}" class="btn">${t(locale, "healthCheckSettings")} →</a>
    <hr class="divider">
    <p class="small">
      ${t(locale, "healthOneNotification")}<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    `Widget may be offline on ${domain}`,
  );
}
```

---

## 9. `packages/email/src/templates/drip-day3.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function dripDay3Template(userName: string, locale: Locale = "en"): string {
  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "drip3Title")}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "drip3Desc")}</p>
    <p>${t(locale, "drip3Desc2")} <code>&lt;/body&gt;</code> ${t(locale, "drip3Tag")}</p>
    <a href="${APP_URL}/dashboard" class="btn">${t(locale, "drip3Cta")} →</a>
    <hr class="divider">
    <p class="small">
      ${t(locale, "questionsReply")}<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    "Install your accessibility widget in 30 seconds",
  );
}
```

---

## 10. `packages/email/src/templates/drip-day7.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function dripDay7Template(userName: string, locale: Locale = "en"): string {
  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "drip7Title")}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "drip7Desc")} <strong>${t(locale, "drip7Scanner")}</strong>${t(locale, "drip7Desc2")}</p>
    <p>${t(locale, "drip7Desc3")}</p>
    <a href="${APP_URL}/dashboard" class="btn">${t(locale, "drip7Cta")} →</a>
    <hr class="divider">
    <p class="small">
      ${t(locale, "drip7Ea")}<br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    "Free WCAG scan included with your inculva account",
  );
}
```

---

## 11. `packages/email/src/templates/drip-day30.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function dripDay30Template(
  userName: string,
  eventCount: number,
  locale: Locale = "en",
): string {
  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "drip30Title")}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(userName || t(locale, "there"))},</p>
    <p>${t(locale, "drip30Desc")} <strong>${eventCount.toLocaleString()} ${t(locale, "drip30Events")}</strong> ${t(locale, "drip30Desc2")}</p>
    <p>${t(locale, "drip30FreeLimit")} <strong>${t(locale, "drip30EventsPerMonth")}</strong> ${t(locale, "drip30And")} <strong>${t(locale, "drip30Site")}</strong>. ${t(locale, "drip30Upgrade")} <strong>${t(locale, "drip30Pro")}</strong> ${t(locale, "drip30Gives")}</p>
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
      <li>${t(locale, "drip30UpTo10Sites")}</li>
      <li>${t(locale, "drip30100kEvents")}</li>
      <li>${t(locale, "drip30TeamCollab")}</li>
      <li>${t(locale, "drip30PrioritySupport")}</li>
    </ul>
    <a href="${APP_URL}/dashboard/settings/billing" class="btn">${t(locale, "drip30Cta")} →</a>
    <hr class="divider">
    <p class="small">
      ${t(locale, "drip30OnFree")} <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">${t(locale, "drip30Compare")}</a><br>
      <a href="${APP_URL}/dashboard/settings" style="color: #1d4ed8;">${t(locale, "managePreferences")}</a>
    </p>
    `,
    `You've tracked ${eventCount.toLocaleString()} events — time to upgrade?`,
  );
}
```

---

## 12. `packages/email/src/templates/plan-upgraded.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function planUpgradedTemplate(
  name: string,
  plan: string,
  locale: Locale = "en",
): string {
  const planLabel: Record<string, string> = {
    small: "Small",
    medium: "Medium",
    large: "Large",
  };
  const label = planLabel[plan] ?? plan;
  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "upgradedTitle")} ${label} ${t(locale, "upgradedPlan")}</h2>
    <p>${t(locale, "hi")} ${escapeHtml(name || t(locale, "there"))},</p>
    <p>${t(locale, "upgradedDesc")}</p>
    ${plan === "large" ? `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>${t(locale, "upgradedUpTo")} <strong>1,000,000 ${t(locale, "upgradedPageviews")}</strong> ${t(locale, "upgradedPerMonth")}</li>
      <li>${t(locale, "upgradedUpTo")} <strong>25 ${t(locale, "upgradedWebsites")}</strong></li>
      <li>${t(locale, "upgradedCustomBranding")}</li>
      <li>${t(locale, "upgradedPriorityPhone")}</li>
    </ul>` : plan === "medium" ? `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>${t(locale, "upgradedUpTo")} <strong>300,000 ${t(locale, "upgradedPageviews")}</strong> ${t(locale, "upgradedPerMonth")}</li>
      <li>${t(locale, "upgradedUpTo")} <strong>10 ${t(locale, "upgradedWebsites")}</strong></li>
      <li>${t(locale, "upgradedPriorityEmail")}</li>
    </ul>` : `
    <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 2;">
      <li>${t(locale, "upgradedUpTo")} <strong>100,000 ${t(locale, "upgradedPageviews")}</strong> ${t(locale, "upgradedPerMonth")}</li>
      <li>${t(locale, "upgradedUpTo")} <strong>5 ${t(locale, "upgradedWebsites")}</strong></li>
      <li>${t(locale, "upgradedFullScan")}</li>
    </ul>`}
    <a href="${APP_URL}/dashboard" class="btn">${t(locale, "upgradedCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "upgradedQuestions")} <a href="${APP_URL}/help" style="color: #1d4ed8;">${t(locale, "helpCenter")}</a>.<br>
    <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">${t(locale, "billingSettings")}</a>.</p>
    `,
    `You're now on the ${label} plan`,
  );
}
```

---

## 13. `packages/email/src/templates/usage-warning.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function usageWarningTemplate(
  name: string,
  plan: string,
  used: number,
  limit: number,
  locale: Locale = "en",
): string {
  const percent = Math.round((used / limit) * 100);
  const planLabel: Record<string, string> = {
    free: "Free",
    small: "Small",
    medium: "Medium",
    large: "Large",
  };
  const label = planLabel[plan] ?? "Free";
  const usedFormatted = used.toLocaleString();
  const limitFormatted = limit.toLocaleString();

  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "warningTitle")} ${percent}% ${t(locale, "warningOfMonthly")}</h2>
    <p>${t(locale, "warningHi")} ${escapeHtml(name || t(locale, "there"))},</p>
    <p>${t(locale, "warningApproaching")} ${label} ${t(locale, "warningPlan")}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #fefce8; border: 1px solid #fde047; border-radius: 10px;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #92400e; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "warningEventUsage")}</p>
          <p style="margin: 0; font-size: 28px; font-weight: 700; color: #78350f;">${usedFormatted} <span style="font-size: 15px; font-weight: 400; color: #92400e;">/ ${limitFormatted}</span></p>
        </td>
      </tr>
    </table>
    <p>${t(locale, "warningOnce100")}</p>
    <p>${t(locale, "warningUpgrade")}</p>
    <a href="${APP_URL}/pricing" class="btn">${t(locale, "warningCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "warningResets")}<br>
    <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">${t(locale, "billingSettings")}</a>.</p>
    `,
    `You've used ${percent}% of your ${label} plan events`,
  );
}
```

---

## 14. `packages/email/src/templates/usage-limit.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function usageLimitTemplate(
  name: string,
  plan: string,
  limit: number,
  locale: Locale = "en",
): string {
  const planLabel: Record<string, string> = {
    free: "Free",
    small: "Small",
    medium: "Medium",
    large: "Large",
  };
  const label = planLabel[plan] ?? "Free";
  const limitFormatted = limit.toLocaleString();

  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "limitTitle")}</h2>
    <p>${t(locale, "limitHi")} ${escapeHtml(name || t(locale, "there"))},</p>
    <p>${t(locale, "limitReached")} ${label} ${t(locale, "limitPlan")} <strong>${limitFormatted} ${t(locale, "limitEvents")}</strong> ${t(locale, "limitForMonth")}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 16px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 10px;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #991b1b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${t(locale, "limitStatus")}</p>
          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #7f1d1d;">${t(locale, "limitDropped")}</p>
        </td>
      </tr>
    </table>
    <p>${t(locale, "limitWidgetStill")} <strong>${t(locale, "limitDisabledUsers")}</strong> ${t(locale, "limitWidgetContinues")}</p>
    <p>${t(locale, "limitUpgrade")}</p>
    <a href="${APP_URL}/pricing" class="btn">${t(locale, "limitCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "limitResets")}<br>
    <a href="${APP_URL}/dashboard/settings/billing" style="color: #1d4ed8;">${t(locale, "billingSettings")}</a>.</p>
    `,
    "Event limit reached — upgrade to restore tracking",
  );
}
```

---

## 15. `packages/email/src/templates/payment-failed.ts`

```typescript
import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";
import { t, type Locale } from "../i18n/messages.js";

export function paymentFailedTemplate(
  name: string,
  plan: string,
  locale: Locale = "en",
): string {
  const planLabel: Record<string, string> = {
    small: "Small",
    medium: "Medium",
    large: "Large",
  };
  const label = planLabel[plan] ?? plan;

  return baseTemplate(
    locale,
    `
    <h2>${t(locale, "paymentTitle")}</h2>
    <p>${t(locale, "paymentHi")} ${escapeHtml(name || t(locale, "there"))},</p>
    <p>${t(locale, "paymentFailed")} <strong>${label}</strong> ${t(locale, "paymentPlan")}</p>
    <p>${t(locale, "paymentRestricted")}</p>
    <p>${t(locale, "paymentPleaseUpdate")}</p>
    <a href="${APP_URL}/dashboard/settings/billing" class="btn">${t(locale, "paymentCta")} →</a>
    <hr class="divider">
    <p class="small">${t(locale, "paymentErrorContact")} <a href="mailto:${t(locale, "paymentSupportEmail")}" style="color: #1d4ed8;">${t(locale, "paymentSupportEmail")}</a>.</p>
    `,
    "Payment failed — action required",
  );
}
```

**Note:** This refactors the custom HTML email to use `baseTemplate()` for consistency.

---

## 16. `packages/email/src/index.ts`

```typescript
export { resend, FROM_ADDRESS, APP_URL, CDN_URL } from "./client.js";
export { welcomeTemplate } from "./templates/welcome.js";
export { verifyEmailTemplate } from "./templates/verify-email.js";
export { planUpgradedTemplate } from "./templates/plan-upgraded.js";
export { resetPasswordTemplate } from "./templates/reset-password.js";
export { usageWarningTemplate } from "./templates/usage-warning.js";
export { usageLimitTemplate } from "./templates/usage-limit.js";
export { paymentFailedTemplate } from "./templates/payment-failed.js";
export { weeklyDigestTemplate } from "./templates/weekly-digest.js";
export { dripDay3Template } from "./templates/drip-day3.js";
export { dripDay7Template } from "./templates/drip-day7.js";
export { dripDay30Template } from "./templates/drip-day30.js";
export { healthDegradedTemplate } from "./templates/health-degraded.js";
export { detectLocale } from "./i18n/messages.js";
export type { Locale } from "./i18n/messages.js";

import { resend, FROM_ADDRESS } from "./client.js";

interface SendOptions {
  to: string;
  subject: string;
  html: string;
}

const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 1000;

export async function sendEmail({ to, subject, html }: SendOptions): Promise<void> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
    });

    if (!error) return;

    lastError = new Error(error.message);
    console.error(`[email] Attempt ${attempt}/${MAX_ATTEMPTS} failed:`, error);

    if (attempt < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, BASE_DELAY_MS * 2 ** (attempt - 1)));
    }
  }

  const dlqEntry = {
    timestamp: new Date().toISOString(),
    to,
    subject,
    error: lastError?.message ?? "Unknown",
    attempts: MAX_ATTEMPTS,
  };
  console.error("[email:DLQ] Permanently failed — add to dead-letter queue:", JSON.stringify(dlqEntry));

  throw lastError ?? new Error("Email send failed");
}
```

**Changes:**
- Remove `teamInviteTemplate` export
- Add `CDN_URL` export
- Add `detectLocale` and `Locale` type exports

---

## 17. Call Sites to Update

### `apps/manage/src/lib/auth.ts`

Update `sendResetPassword` and `sendVerificationEmail` to pass locale:
```typescript
sendResetPassword: async ({ user, url, request }) => {
  const locale = detectLocale(request as unknown as Request);
  await sendEmail({
    to: user.email,
    subject: "Reset your inculva password",
    html: resetPasswordTemplate(url, locale),
  });
},
sendVerificationEmail: async ({ user, url, request }) => {
  const locale = detectLocale(request as unknown as Request);
  await sendEmail({
    to: user.email,
    subject: "Verify your inculva email",
    html: verifyEmailTemplate(user.name ?? "", url, locale),
  });
},
```

### `apps/manage/src/app/api/auth/welcome/route.ts`

Add locale detection:
```typescript
import { detectLocale } from "@inculva/email";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const locale = detectLocale(request);
  void sendEmail({
    to: session.user.email,
    subject: "Welcome to inculva",
    html: welcomeTemplate(session.user.name ?? "", locale),
  }).catch((err) => console.error("[email] Welcome failed:", err));

  return NextResponse.json({ ok: true });
}
```

### `apps/manage/src/app/api/cron/weekly-digest/route.ts`
### `apps/manage/src/app/api/cron/health-check/route.ts`
### `apps/manage/src/app/api/cron/drip-emails/route.ts`
### `apps/manage/src/app/api/webhooks/polar/route.ts`
### `apps/api/src/routes/widget.ts`

All cron jobs and webhooks default to `"en"` since they don't have browser context:
```typescript
html: weeklyDigestTemplate(userName, totalEvents, sites, weekLabel, "en"),
html: healthDegradedTemplate(userName, domain, siteId, "en"),
html: dripDay3Template(userName, "en"),
// etc.
```

---

## Summary of All Changes

| File | Action |
|------|--------|
| `packages/email/src/client.ts` | Modify - add CDN_URL |
| `packages/email/src/i18n/messages.ts` | **CREATE** - all en/tr translations |
| `packages/email/src/templates/base.ts` | Modify - CDN logo, rounded buttons, locale param |
| `packages/email/src/templates/welcome.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/verify-email.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/reset-password.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/weekly-digest.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/health-degraded.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/drip-day3.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/drip-day7.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/drip-day30.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/plan-upgraded.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/usage-warning.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/usage-limit.ts` | Modify - locale param + i18n |
| `packages/email/src/templates/payment-failed.ts` | Modify - use baseTemplate + locale + i18n |
| `packages/email/src/index.ts` | Modify - remove teamInvite, add CDN_URL + detectLocale export |
| `apps/manage/src/lib/auth.ts` | Modify - pass locale to templates |
| `apps/manage/src/app/api/auth/welcome/route.ts` | Modify - pass locale to welcomeTemplate |
| `apps/manage/src/app/api/cron/*.ts` | Modify - pass "en" as default locale |
| `apps/manage/src/app/api/webhooks/polar/route.ts` | Modify - pass "en" as default locale |
| `apps/api/src/routes/widget.ts` | Modify - pass "en" as default locale |

**Total: 20 files modified, 1 file created**
