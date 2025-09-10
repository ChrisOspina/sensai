import React from "react";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { getIndustryInsights } from "@/actions/dashboard";

const DashboardPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  //const insights = await getIndustryInsights;

  if (!isOnboarded) {
    redirect("/onboarding");
  }
  return <div>Dashboard</div>;
};

export default DashboardPage;
