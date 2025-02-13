"use client";

import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import { STEPS } from "@/config/stepsConfig";

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "Next":
        handleNext();
        break;
      case "Back":
        handleBack();
        break;
      case "Get My Free Ticket":
        // Handle ticket generation
        handleNext();
        break;
      case "Download Ticket":
        // Handle download logic
        setCurrentStep(0);
        break;
      case "Book Another Ticket":
        setCurrentStep(0);
        break;
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  return (
    <>
      <FormWrapper
        buttons={STEPS[currentStep].buttons}
        currentStep={currentStep}
        onAction={handleAction}
        title={STEPS[currentStep].title}
        totalSteps={STEPS.length}
      >
        {CurrentStepComponent}
      </FormWrapper>
    </>
  );
};

export default HomePage;
