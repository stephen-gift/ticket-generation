"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormMessage } from "@/components/ui/form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import EventBanner from "./EventBanner";
import TicketOption from "./TicketOption";
import { Ticket, useTicketStore } from "../../../store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "@/lib/schema";
import FormWrapper from "../FormWrapper";

// Mock data
const tickets = [
  { type: "REGULAR ACCESS", price: "FREE", remaining: 20 },
  { type: "VIP ACCESS", price: "$50", remaining: 20 },
  { type: "VVIP ACCESS", price: "$150", remaining: 20 }
];

const events = [
  {
    name: "Techember Fest '25",
    location: "Tech City Convention Center",
    date: "March 15, 2025",
    time: "7:00 PM"
  },
  {
    name: "DevSummit 2025",
    location: "Silicon Valley Expo",
    date: "April 22, 2025",
    time: "9:00 AM"
  },
  {
    name: "Next.js Conference",
    location: "Online Event",
    date: "June 10, 2025",
    time: "5:00 PM"
  }
];

const TicketSelection = () => {
  const { updateData, setStep } = useTicketStore();
  const form = useForm<Ticket>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      event: {
        name: "",
        location: "",
        date: "",
        time: ""
      },
      ticketType: "REGULAR ACCESS", // Set default value
      numberOfTickets: 1, // Set default value
      quantity: 1,
      total: 0,
      attendees: []
    }
  });

  const handleAction = (action: string) => {
    if (action === "next") {
      form.handleSubmit((data) => {
        updateData(data);
        setStep(2);
      })();
    } else if (action === "cancel") {
      form.reset();
    }
  };

  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(
    null
  );

  useEffect(() => {
    if (!carouselApi) return;

    const handleSlideChange = () => {
      const selectedIndex = carouselApi.selectedScrollSnap();
      if (events[selectedIndex]) {
        form.setValue("event", events[selectedIndex]);
      }
    };

    carouselApi.on("select", handleSlideChange);

    return () => {
      carouselApi?.off("select", handleSlideChange);
    };
  }, [carouselApi, form]);

  const calculateTotal = (ticketType: string, numberOfTickets: number) => {
    const selectedTicket = tickets.find((t) => t.type === ticketType);
    if (!selectedTicket || numberOfTickets <= 0) return 0;

    const price =
      selectedTicket.price === "Free"
        ? 0
        : parseFloat(selectedTicket.price.replace("$", "")) || 0;

    return price * numberOfTickets;
  };

  return (
    <FormWrapper
      title="Select Your Ticket"
      currentStep={1}
      totalSteps={3}
      onAction={handleAction}
    >
      <div className="space-y-8">
        <FormField
          name="ticket.event"
          render={() => (
            <FormControl>
              <Carousel
                className="w-full max-w-lg mx-auto"
                setApi={setCarouselApi}
              >
                <CarouselContent>
                  {events.map((event, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <EventBanner event={event} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </FormControl>
          )}
        />

        <FormField
          name="ticketType"
          render={({ field }) => (
            <div className="space-y-4">
              <div className="flex gap-4">
                {tickets.map((ticket) => (
                  <TicketOption
                    key={ticket.type}
                    type={ticket.type}
                    price={ticket.price}
                    remaining={ticket.remaining}
                    isSelected={field.value === ticket.type}
                    onSelect={() => {
                      form.setValue(
                        "ticketType",
                        ticket.type as
                          | "REGULAR ACCESS"
                          | "VIP ACCESS"
                          | "VVIP ACCESS"
                      );
                      const numTickets = form.getValues("numberOfTickets");
                      form.setValue(
                        "total",
                        calculateTotal(ticket.type, numTickets)
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </div>
          )}
        />

        <FormField
          name="numberOfTickets"
          render={({ field }) => (
            <div className="space-y-4">
              <select
                value={field.value}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1; // Default to 1 if NaN
                  const ticketType =
                    form.getValues("ticketType") || tickets[0]?.type; // Default to first ticket type

                  form.setValue("numberOfTickets", value);
                  form.setValue("total", calculateTotal(ticketType, value));
                }}
                className="bg-[#07373F] text-white p-2 rounded"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <FormMessage />
            </div>
          )}
        />
      </div>
    </FormWrapper>
  );
};

export default TicketSelection;
