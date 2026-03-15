import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { HybridApproach } from "@/components/landing/HybridApproach";
import { Compliance } from "@/components/landing/Compliance";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const APP_URL = process.env["NEXT_PUBLIC_APP_URL"] ?? "";
const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"] ?? "";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Nav cdnUrl={CDN_URL} appUrl={APP_URL} />
      <Hero appUrl={APP_URL} cdnUrl={CDN_URL} />
      <SocialProof />
      <HybridApproach />
      <Compliance />
      <Features />
      <Pricing appUrl={APP_URL} />
      <FAQ />
      <CTA appUrl={APP_URL} />
      <Footer />
    </div>
  );
}
