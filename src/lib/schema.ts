import { z } from "zod";

export const ticketSchema = z.object({
  event: z.object({
    name: z.string(),
    location: z.string(),
    date: z.string(),
    time: z.string()
  }),
  ticketType: z.string().min(1, "Please select a ticket type"),
  numberOfTickets: z.number().min(1).max(5)
});

export const attendeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  request: z.string().optional(),
  image: z.string().min(1, { message: "Profile photo is required" })
});

export type AttendeeFormValues = z.infer<typeof attendeeSchema>;
export type TicketFormValues = z.infer<typeof ticketSchema>;
