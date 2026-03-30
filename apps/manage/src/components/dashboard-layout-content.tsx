"use client";

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { VerificationBanner } from "@/components/verification-banner";
import { Sidebar } from "@/components/sidebar";
import { useMessages, useLocale } from "@/i18n/useMessages";
import { getMessages } from "@/i18n/messages";
import type { DashboardMessages } from "@/i18n/messages";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";

interface Site {
  id: string;
  name: string;
  domain: string;
}

interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  bannedAt: Date | null;
  plan: string;
}

interface DashboardData {
  user: User;
  sites: Site[];
  locale: string;
}

interface DashboardCtx {
  messages: DashboardMessages;
  locale: string;
  canAddSite: boolean;
  plan: string;
  refreshSites: () => void;
}

const DashboardContext = createContext<DashboardCtx>({
  messages: getMessages("en"),
  locale: "en",
  canAddSite: false,
  plan: "free",
  refreshSites: () => {},
});

export function useDashboard() {
  return useContext(DashboardContext);
}

export function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const messages = useMessages();
  const locale = useLocale();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/data");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (res.status === 403) {
          router.push("/banned");
          return;
        }
        throw new Error("Failed to fetch dashboard data");
      }
      const dashboardData = await res.json();
      setData(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchData();
  }, [fetchData, pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const plan = (data.user.plan ?? "free") as Plan;
  const maxSites = PLAN_LIMITS[plan]?.maxSites ?? 1;
  const canAddSite = data.sites.length < maxSites;

  return (
    <DashboardContext.Provider
      value={{
        messages,
        locale,
        canAddSite,
        plan: data.user.plan,
        refreshSites: fetchData,
      }}
    >
      <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex flex-col">
        <DashboardHeader
          canAddSite={canAddSite}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        {!data.user.emailVerified && (
          <VerificationBanner email={data.user.email} />
        )}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            sites={data.sites}
            userName={data.user.name}
            userEmail={data.user.email}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 min-w-0 overflow-y-auto lg:ml-64 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
