"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { VerificationBanner } from "@/components/verification-banner";
import { Sidebar } from "@/components/sidebar";
import { DashboardLayoutContent } from "@/components/dashboard-layout-content";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}
