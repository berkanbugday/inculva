"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { VerificationBanner } from "@/components/verification-banner";
import { Sidebar } from "@/components/sidebar";

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
}

interface DashboardData {
  user: User;
  sites: Site[];
  locale: string;
}

export function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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
    }

    fetchData();
  }, [router]);

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

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex flex-col">
      <DashboardHeader
        locale={data.locale}
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
  );
}
