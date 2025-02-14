// app/event-form.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ticketSchema, attendeeSchema } from "@/lib/schema";
import FormWrapper from "../FormWrapper";
import TicketSelection from "./TicketSelection";
import AttendeeDetails from "./AttendeeDetails";

const formSchema = z.object({
  ticket: ticketSchema,
  attendee: attendeeSchema
});

type FormValues = z.infer<typeof formSchema>;

export function EventForm() {
  const [step, setStep] = useState(0);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticket: {
        event: {
          name: "",
          location: "",
          date: "",
          time: ""
        },
        ticketType: "",
        numberOfTickets: 1,
        total: 0
      },
      attendee: {
        name: "",
        email: "",
        request: "",
        image: ""
      }
    }
  });

  const handleNext = async () => {
    const fields =
      step === 0
        ? ["ticket.event", "ticket.ticketType", "ticket.numberOfTickets"]
        : ["attendee.name", "attendee.email", "attendee.image"];

    const isValid = await form.trigger(fields);
    if (isValid) setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const onSubmit = (data: FormValues) => {
    setSubmittedData(data);
    setStep(2);
    console.log("Final Form Data:", data);
  };

  if (step === 2) {
    return (
      <FormWrapper
        currentStep={3} // Now showing step 3/3
        totalSteps={3}
        title="Confirmation"
        buttons={{
          left: [],
          right: ["Complete"]
        }}
        onAction={() => window.location.reload()}
      >
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4">Ticket Information</h2>
          <pre>{JSON.stringify(submittedData?.ticket, null, 2)}</pre>

          <h2 className="text-2xl font-bold mt-6 mb-4">Attendee Details</h2>
          <pre>{JSON.stringify(submittedData?.attendee, null, 2)}</pre>
        </div>
      </FormWrapper>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 0 && (
          <FormWrapper
            currentStep={1} // Now showing step 1/3
            totalSteps={3}
            title="Select Ticket"
            buttons={{
              left: [],
              right: ["Next"]
            }}
            onAction={handleNext}
          >
            <TicketSelection />
          </FormWrapper>
        )}

        {step === 1 && (
          <FormWrapper
            currentStep={2} // Now showing step 2/3
            totalSteps={3}
            title="Attendee Details"
            buttons={{
              left: ["Previous"],
              right: ["Submit"]
            }}
            onAction={(action) => {
              action === "Previous"
                ? handlePrev()
                : form.handleSubmit(onSubmit)();
            }}
          >
            <AttendeeDetails />
          </FormWrapper>
        )}
      </form>
    </Form>
  );
}
