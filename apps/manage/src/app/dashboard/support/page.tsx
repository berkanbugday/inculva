"use client";

import { useDashboard } from "@/components/dashboard-layout-content";
import { SupportForm } from "./support-form";
import { useEffect, useState } from "react";

interface UserInfo {
  name: string | null;
  email: string;
}

export default function SupportPage() {
  const { messages: t } = useDashboard();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/dashboard/data");
        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.user.name, email: data.user.email });
        }
      } catch {
        // fallback: render form without pre-filled data
        setUser({ name: null, email: "" });
      }
    }
    void fetchUser();
  }, []);

  if (!user) {
    return (
      <main className="space-y-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t.support.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.support.titleDesc}</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t.support.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.support.titleDesc}</p>
      </div>
      <SupportForm userName={user.name} userEmail={user.email} />
    </main>
  );
}
