import React from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ActionType } from "./HomePage";

interface FormWrapperProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  buttons: {
    left: string[];
    right: string[];
  };
  onAction: (action: ActionType) => void;
}

const FormWrapper = ({
  buttons,
  children,
  currentStep,
  onAction,
  title,
  totalSteps
}: FormWrapperProps) => {
  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <div
      className="max-w-[700px] mx-auto rounded-[24px] border border-[#0E464F] bg-[#041E23] flex p-3 sm:p-6 md:p-10 lg:p-12 flex-col justify-center items-center gap-[32px] w-full"
      role="form"
      aria-labelledby="form-title"
    >
      {/* Title and Step Indicator */}
      <div className="w-full">
        <div className="flex sm:justify-between flex-col sm:flex-row sm:items-center items-start w-full">
          <h1
            id="form-title"
            className="text-white font-jeju font-normal text-[32px]"
          >
            {title}
          </h1>
          <p className="font-roboto text-base text-white">
            Step {currentStep} / {totalSteps}
          </p>
        </div>
        <Progress
          value={progressValue}
          className="h-2 mt-2"
          aria-label={`Progress: ${progressValue}%`}
        />
      </div>

      {/* Form Content and Buttons */}
      <div
        className="flex p-0 sm:p-[8px] md:p-[16px] lg:p-[24px] flex-col justify-center items-start gap-[32px] self-stretch rounded-[32px] sm:bg-[#08252B] w-full"
        role="region"
        aria-live="polite"
      >
        {children}

        {/* Buttons */}
        <div className="flex justify-between flex-col-reverse md:flex-row items-center w-full gap-4 mt-4">
          {/* Left Buttons */}
          <div className="flex flex-1 gap-2 w-full md:w-auto">
            {buttons.left.map((btn) => (
              <Button
                key={btn}
                variant="outline"
                className="w-full px-6 py-3 rounded-lg text-white font-medium border border-[#0E464F] bg-[#07373F] hover:bg-[#05282C] focus:outline-none focus:ring-2 focus:ring-[#0E464F]"
                onClick={() => onAction(btn as ActionType)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onAction(btn as ActionType);
                  }
                }}
                aria-label={btn}
              >
                {btn}
              </Button>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="flex flex-1 gap-2 w-full md:w-auto">
            {buttons.right.map((btn) => (
              <Button
                key={btn}
                className="w-full px-6 py-3 rounded-lg text-white text-base font-jeju font-medium border border-[#0E464F] bg-[#197686] hover:bg-[#156575] focus:outline-none focus:ring-2 focus:ring-[#0E464F]"
                onClick={() => onAction(btn as ActionType)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onAction(btn as ActionType);
                  }
                }}
                aria-label={btn}
              >
                {btn}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
