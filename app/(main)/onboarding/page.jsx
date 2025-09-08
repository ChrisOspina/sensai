import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/dist/server/api-utils";
import OnboardingForm from "./_components/onboarding-form";
import React from "react";

const OnBoardingPage = async () => {
  //check if user is onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnBoardingPage;
