import { industries } from "@/data/industries";
import React from "react";

const OnBoardingPage = () => {
  //check if user is onboarded
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnBoardingPage;
