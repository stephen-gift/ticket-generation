import React from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ActionType } from "./HomePage";

interface FormWrapperProps {
  children: React.ReactNode;
  currentStep: number; // now 1-indexed
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
  // Calculate progress based on human-readable step numbers.
  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-[700px] mx-auto rounded-[24px] border border-[#0E464F] bg-[#041E23] flex p-3 sm:p-6 md:p-10 lg:p-12 flex-col justify-center items-center gap-[32px] w-full">
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-white">{title}</p>
          <p>
            Step {currentStep}/{totalSteps}
          </p>
        </div>
        <Progress value={progressValue} className="h-2 mt-2" />
      </div>

      <div className="flex p-0 sm:p-[8px] md:p-[16px] lg:p-[24px] flex-col justify-center items-start gap-[32px] self-stretch rounded-[32px]  sm:bg-[#08252B] w-full">
        {children}

        <div className="flex justify-between flex-col md:flex-row items-center w-full gap-4 mt-4">
          <div className="flex flex-1 gap-2 w-full md:w-auto">
            {buttons.left.map((btn) => (
              <Button
                key={btn}
                variant="outline"
                className="w-full px-6 py-3 rounded-lg text-white font-medium border border-[#0E464F] bg-[#07373F] hover:bg-[#05282C]"
                onClick={() => onAction(btn as ActionType)}
              >
                {btn}
              </Button>
            ))}
          </div>

          <div className="flex flex-1 gap-2 w-full md:w-auto">
            {buttons.right.map((btn) => (
              <Button
                key={btn}
                className="w-full px-6 py-3 rounded-lg text-white font-medium border border-[#0E464F] bg-[#197686] hover:bg-[#156575]"
                onClick={() => onAction(btn as ActionType)}
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
