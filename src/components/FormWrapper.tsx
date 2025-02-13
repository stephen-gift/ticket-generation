import React from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface FormWrapperProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  buttons: {
    left: string[];
    right: string[];
  };
  onAction: (action: string) => void;
}

const FormWrapper = ({
  buttons,
  children,
  currentStep,
  onAction,
  title,
  totalSteps
}: FormWrapperProps) => {
  const progressValue = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="max-w-[700px] mx-auto rounded-[24px] border border-[#0E464F] bg-[#041E23] flex p-[48px] flex-col justify-center items-center gap-[32px] w-full">
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <p color="white">{title}</p>
          <p>
            Step {currentStep + 1}/{totalSteps}
          </p>
        </div>
        <Progress value={progressValue} className="h-2 mt-2" />
      </div>

      <div className="flex p-[24px] flex-col justify-center items-start gap-[32px] self-stretch rounded-[32px] border border-[#0E464F] bg-[#08252B] w-full">
        {children}

        <div className="flex justify-between flex-col md:flex-row items-center w-full gap-4 mt-4">
          <div className="flex flex-1 gap-2 w-full md:w-auto">
            {buttons.left.map((btn) => (
              <Button
                key={btn}
                variant="outline"
                className="w-full px-6 py-3 rounded-lg text-white font-medium border border-[#0E464F] bg-[#07373F] hover:bg-[#05282C]"
                onClick={() => onAction(btn)}
              >
                {btn}
              </Button>
            ))}
          </div>

          <div className="flex flex-1 gap-2 w-full md:w-auto">
            {buttons.right.map((btn) => (
              <Button
                key={btn}
                className="w-full px-6 py-3 rounded-lg text-white font-medium  border border-[#0E464F] bg-[#197686] hover:bg-[#156575]"
                onClick={() => onAction(btn)}
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
