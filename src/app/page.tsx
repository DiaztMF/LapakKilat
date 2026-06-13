"use client";

import { signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import new Tailark components
import LogoCloud from "@/components/logo-cloud";
import StatsSection from "@/components/stats-2";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import FAQsTwo from "@/components/faqs-2";
import HeroSection from "@/components/hero-section";
import { HeroHeader } from "@/components/headers";
import FeaturesSection from "@/components/features-1";
import CTA from "@/components/cta";
import FooterSection from "@/components/footer";
import HowItWorks from "@/components/how-it-works";

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = async () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-950">
      {/* Navigation */}
      <HeroHeader session={session} onGetStarted={handleGetStarted} />

      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Logo Cloud Section */}
      <LogoCloud />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing onGetStarted={handleGetStarted} />

      {/* FAQs Section */}
      <FAQsTwo />

      {/* CTA Section */}
      <CTA onGetStarted={handleGetStarted} />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}
