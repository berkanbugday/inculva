import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";
import { SiteWizard } from "./site-wizard";

const VALID_POSITIONS = new Set(["bottom-right", "bottom-left", "top-right", "top-left"]);
const VALID_LANGUAGES = new Set([
  "en","tr","de","fr","es","pt","it","nl","pl","ru","uk","cs","hu","ro","bg","hr",
  "sk","sl","el","fi","sv","no","da","lt","lv","et","ar","he","fa","zh","ja","ko",
  "th","vi","id","ms","hi","bn","ur","sw",
]);
const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

async function createSite(formData: FormData): Promise<void> {
  "use server";

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const name = formData.get("name") as string;
  const domain = formData.get("domain") as string;
  const rawColor = formData.get("primaryColor") as string | null;
  const rawPosition = formData.get("position") as string | null;
  const rawLanguage = formData.get("language") as string | null;

  if (!name?.trim() || !domain?.trim()) return;
  if (name.trim().length > 100 || domain.trim().length > 253) return;

  const primaryColor = rawColor && HEX_COLOR_RE.test(rawColor) ? rawColor : "#0066cc";
  const position = rawPosition && VALID_POSITIONS.has(rawPosition) ? rawPosition : "bottom-right";
  const language = rawLanguage && VALID_LANGUAGES.has(rawLanguage) ? rawLanguage : "en";

  const normalizedDomain = domain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .toLowerCase();

  // Atomically enforce plan site limit and create — prevents concurrent bypasses
  let siteId: string | null = null;
  let errorMsg: string | null = null;

  try {
    const site = await db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: session.user.id },
        select: { plan: true },
      });
      const plan = (user?.plan ?? "free") as Plan;
      const limits = PLAN_LIMITS[plan];

      if (limits.sites !== Infinity) {
        const siteCount = await tx.site.count({ where: { ownerId: session.user.id } });
        if (siteCount >= limits.sites) {
          throw new Error(
            `Your ${plan} plan allows up to ${limits.sites} site${limits.sites === 1 ? "" : "s"}. Upgrade to add more.`
          );
        }
      }

      return tx.site.create({
        data: {
          name: name.trim(),
          domain: normalizedDomain,
          ownerId: session.user.id,
          widgetConfig: {
            create: {
              position,
              theme: "auto",
              primaryColor,
              language,
            },
          },
        },
      });
    });
    siteId = site.id;
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : "Plan limit reached";
  }

  if (errorMsg) {
    redirect(`/dashboard/sites/new?error=${encodeURIComponent(errorMsg)}`);
  }
  if (siteId) {
    redirect(`/dashboard/sites/${siteId}`);
  }
}

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewSitePage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <main className="max-w-2xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400">
          Dashboard
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Add New Site</span>
      </nav>

      <SiteWizard createSite={createSite} error={error} />
    </main>
  );
}
