"use client";

import React, {
  ReactNode,
  useEffect,
  useState,
  Suspense,
  useCallback
} from "react";
import FormWrapper from "./FormWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import TicketSelection from "./TicketSelection";
import { TicketSelectionData } from "../../types";
import AttendeeDetails from "./AttendeeDetails";
import { AttendeeFormValues } from "@/lib/schema";
import { Ticket, useTicketStore } from "../../store";
import TicketSection from "./Ticket";

export type ActionType =
  | "Cancel"
  | "Next"
  | "Back"
  | "Get My Free Ticket"
  | "Download Ticket"
  | "Book Another Ticket";

const totalSteps = 3;

const HomePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { addTicket, currentTicket, updateCurrentTicket, clearCurrentTicket } =
    useTicketStore();

  const [isTicketFormValid, setIsTicketFormValid] = useState(false);
  const [isAttendeeFormValid, setIsAttendeeFormValid] = useState(false);

  const stepParam = searchParams.get("step");
  const initialStep =
    stepParam && !isNaN(parseInt(stepParam, 10)) ? parseInt(stepParam, 10) : 1;

  const [currentStep, setCurrentStep] = useState<number>(
    initialStep >= 1 && initialStep <= totalSteps ? initialStep : 1
  );

  const isTicketSelectionValid = useCallback(() => {
    return !!(
      currentTicket?.event &&
      currentTicket.ticketType &&
      currentTicket.price &&
      currentTicket.numberOfTickets
    );
  }, [
    currentTicket?.event,
    currentTicket?.ticketType,
    currentTicket?.price,
    currentTicket?.numberOfTickets
  ]);

  const isAttendeeDetailsValid = useCallback(() => {
    return !!(
      currentTicket?.attendee?.name &&
      currentTicket?.attendee?.email &&
      currentTicket?.attendee?.image
    );
  }, [
    currentTicket?.attendee?.name,
    currentTicket?.attendee?.email,
    currentTicket?.attendee?.image
  ]);

  // Combined validation effect
  useEffect(() => {
    const validateCurrentStep = () => {
      switch (currentStep) {
        case 2:
          if (!isTicketSelectionValid()) {
            router.replace("/?step=1");
            return false;
          }
          break;
        case 3:
          if (!isAttendeeDetailsValid()) {
            router.replace("/?step=2");
            return false;
          }
          break;
      }
      return true;
    };

    validateCurrentStep();
  }, [currentStep, isTicketSelectionValid, isAttendeeDetailsValid, router]);

  useEffect(() => {
    const urlStep = searchParams.get("step");
    if (urlStep !== String(currentStep)) {
      router.replace(`?step=${currentStep}`);
    }
  }, [currentStep, router, searchParams]);

  const handleNext = (): void => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleCancel = (): void => {
    clearCurrentTicket();
  };

  const handleTicketSubmit = useCallback(
    (data: TicketSelectionData) => {
      setIsTicketFormValid(true);
      updateCurrentTicket({
        ...currentTicket,
        ...data
      });
    },
    [currentTicket, updateCurrentTicket]
  );

  const handleAttendeeSubmit = useCallback(
    (data: AttendeeFormValues) => {
      setIsAttendeeFormValid(true);
      updateCurrentTicket({ ...currentTicket, attendee: data });
    },
    [currentTicket, updateCurrentTicket]
  );

  const handleAction = (action: ActionType): void => {
    switch (action) {
      case "Next":
        handleNext();
        break;
      case "Back":
        handleBack();
        break;
      case "Cancel":
        handleCancel();
        break;
      case "Get My Free Ticket":
        if (currentTicket && isAttendeeDetailsValid()) {
          addTicket(currentTicket as Ticket);
          handleNext();
        }
        break;
      case "Download Ticket":
        setCurrentStep(1);
        setIsTicketFormValid(false);
        setIsAttendeeFormValid(false);
        setCurrentStep(1);
        clearCurrentTicket();
        break;
      case "Book Another Ticket":
        setCurrentStep(1);
        setIsTicketFormValid(false);
        setIsAttendeeFormValid(false);
        setCurrentStep(1);
        clearCurrentTicket();
        break;
      default:
        break;
    }
  };

  const renderStep = (): ReactNode => {
    switch (currentStep) {
      case 1:
        return (
          <TicketSelection
            onSubmit={handleTicketSubmit}
            onValidityChange={(isValid) => {
              setIsTicketFormValid(isValid);
            }}
          />
        );
      case 2:
        return (
          <AttendeeDetails
            onSubmit={handleAttendeeSubmit}
            onValidityChange={(isValid) => setIsAttendeeFormValid(isValid)}
          />
        );
      case 3:
        return (
          <div className="text-white w-full flex flex-col justify-center items-center p-2 gap-4 text-center">
            <h2 className="font-extrabold">Your Ticket is Booked</h2>
            <p>You can download or Check your email for a copy</p>
            <TicketSection />
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = (): string => {
    switch (currentStep) {
      case 1:
        return "Ticket Selection";
      case 2:
        return "Attendee Details";
      case 3:
        return "Ready";
      default:
        return "";
    }
  };

  const getButtons = (): { left: string[]; right: string[] } => {
    switch (currentStep) {
      case 1:
        return {
          left: ["Cancel"],
          right: [isTicketFormValid ? "Next" : "Complete the form"]
        };
      case 2:
        return {
          left: ["Back"],
          right: [
            isAttendeeFormValid ? "Get My Free Ticket" : "Complete the form"
          ]
        };
      case 3:
        return { left: ["Book Another Ticket"], right: ["Download Ticket"] };
      default:
        return { left: [], right: [] };
    }
  };

  return (
    <FormWrapper
      buttons={getButtons()}
      currentStep={currentStep}
      onAction={handleAction}
      title={getTitle()}
      totalSteps={totalSteps}
    >
      {renderStep()}
    </FormWrapper>
  );
};

const HomePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomePageContent />
  </Suspense>
);

export default HomePage;
