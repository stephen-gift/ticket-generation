import React, { useCallback, useEffect, useState } from "react";
import { Event, TicketSelectionProps, TicketType } from "../../types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "./ui/carousel";
import { TicketFormValues, ticketSchema } from "@/lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import EventBanner from "./EventBanner";
import TicketOption from "./TicketOption";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { useTicketStore } from "../../store";

const TICKETS: TicketType[] = [
  { type: "REGULAR ACCESS", price: 0, remaining: 20 },
  { type: "VIP ACCESS", price: 50, remaining: 20 },
  { type: "VVIP ACCESS", price: 150, remaining: 20 }
];

const EVENTS: Event[] = [
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

const TicketSelection = ({
  onSubmit,
  onValidityChange
}: TicketSelectionProps) => {
  const { currentTicket, updateCurrentTicket } = useTicketStore();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: currentTicket ?? {
      event: EVENTS[2],
      ticketType: "",
      price: 0,
      remaining: 0,
      numberOfTickets: 1
    },
    mode: "onChange"
  });

  useEffect(() => {
    if (currentTicket) {
      form.reset({
        event: currentTicket.event ?? EVENTS[0],
        ticketType: currentTicket.ticketType ?? "",
        price: currentTicket.price ?? 0,
        numberOfTickets: currentTicket.numberOfTickets
      });
    }
  }, [currentTicket, form]);

  // Handle carousel initialization and event sync
  useEffect(() => {
    if (!carouselApi || !currentTicket?.event) return;

    const eventIndex = EVENTS.findIndex(
      (e) =>
        e.name === currentTicket.event?.name &&
        e.location === currentTicket.event?.location &&
        e.date === currentTicket.event?.date &&
        e.time === currentTicket.event?.time
    );

    if (eventIndex !== -1) {
      carouselApi.scrollTo(eventIndex);
    }
  }, [carouselApi, currentTicket?.event]);

  // Carousel change handler
  const handleCarouselChange = useCallback(() => {
    if (!carouselApi) return;
    const selectedIndex = carouselApi.selectedScrollSnap();
    const event = EVENTS[selectedIndex];
    form.setValue("event", event);

    updateCurrentTicket({
      ...currentTicket,
      event
    });
  }, [carouselApi, form, updateCurrentTicket, currentTicket]);

  // Setup carousel event listeners
  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", handleCarouselChange);
    return () => {
      carouselApi.off("select", handleCarouselChange);
    };
  }, [carouselApi, handleCarouselChange]);

  useEffect(() => {
    const subscription = form.watch(async (data) => {
      if (form.formState.isValid) {
        const total = (data.price ?? 0) * (data.numberOfTickets ?? 1);

        const safeEvent: Event = {
          name: data.event?.name ?? "",
          time: data.event?.time ?? "",
          date: data.event?.date ?? "",
          location: data.event?.location ?? ""
        };

        updateCurrentTicket({
          event: safeEvent,
          ticketType: data.ticketType,
          price: data.price,
          numberOfTickets: data.numberOfTickets,
          total
        });
      } else {
      }
    });

    return () => subscription.unsubscribe();
  }, [form, updateCurrentTicket]);

  useEffect(() => {
    const values = form.getValues();
    const isValid = !!values.ticketType && !!values.price;
    onValidityChange?.(isValid);
  }, [form, onValidityChange]);

  const handleTicketSelect = useCallback(
    (ticket: TicketType) => {
      form.setValue("ticketType", ticket.type);
      form.setValue("price", Number(ticket.price));
      updateCurrentTicket({
        ...currentTicket,
        ticketType: ticket.type,
        price: Number(ticket.price)
      });
    },
    [form, updateCurrentTicket, currentTicket]
  );

  const handleSubmit: SubmitHandler<TicketFormValues> = useCallback(
    (data) => {
      const total = Number(data.price) * Number(data.numberOfTickets); // Ensure numbers
      onSubmit({ ...data, total });
    },
    [onSubmit]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-6"
      >
        {/* Carousel Section */}
        <div className="w-full flex flex-col items-center p-2 sm:p-6  justify-center border-r-2 border-b-2 border-l-2 border-[#07373F] rounded-[24px] backdrop-blur-[7px]">
          <Carousel className="w-full max-w-lg mx-auto" setApi={setCarouselApi}>
            <CarouselContent>
              {EVENTS.map((event, index) => (
                <CarouselItem key={index}>
                  <div className="">
                    <EventBanner event={event} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="bg-[#07373F] h-1 w-full"></div>

        {/* Ticket Selection */}
        <FormField
          control={form.control}
          name="ticketType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white font-roboto">
                Select Ticket Type:
              </FormLabel>
              <div className="rounded-[24px] bg-[#052228] border border-[#07373F] p-3 flex flex-col md:flex-row self-stretch gap-6 ">
                {TICKETS.map((ticket) => (
                  <TicketOption
                    key={ticket.type}
                    {...ticket}
                    isSelected={field.value === ticket.type}
                    onSelect={() => handleTicketSelect(ticket)}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number of Tickets */}
        <FormField
          control={form.control}
          name="numberOfTickets"
          render={({ field }) => (
            <FormItem className="space-y-2 w-full">
              <FormLabel className="text-sm font-medium text-white">
                Number of Tickets
              </FormLabel>
              <Select
                value={field.value?.toString() ?? "1"}
                onValueChange={(value) => {
                  field.onChange(Number(value));
                  updateCurrentTicket({
                    ...form.getValues(),
                    numberOfTickets: Number(value),
                    total: form.getValues().price * Number(value)
                  });
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full border border-[#07373F] text-white rounded-[12px] ">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#07373F] border-[#07373F] text-white">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default TicketSelection;
