// types.ts

export interface Ticket {
  id: string;
  event: Event;
  ticketType: string;
  price: number;
  numberOfTickets: number;
  total: number;
  attendee: AttendeeFormValues;
  createdAt: string;
  status: "active" | "used" | "expired";
}

interface TicketStore {
  tickets: Ticket[];
  currentTicket: Partial<Ticket> | null;
  addTicket: (ticket: Ticket) => void;
  updateCurrentTicket: (data: Partial<Ticket>) => void;
  clearCurrentTicket: () => void;
  getTicketHistory: () => Ticket[];
  updateTicketStatus: (ticketId: string, status: Ticket["status"]) => void;
}

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Event } from "./types";
import { AttendeeFormValues } from "@/lib/schema";

export const useTicketStore = create<TicketStore>()(
  persist(
    (set, get) => ({
      tickets: [],
      currentTicket: null,

      addTicket: (ticket) =>
        set((state) => ({
          tickets: [...state.tickets, ticket]
          // currentTicket: null
        })),

      updateCurrentTicket: (data) => {
        console.log("Updating current ticket with explicit fields:", data);
        set((state) => ({
          currentTicket: {
            ...state.currentTicket,
            ...data
          }
        }));
      },

      clearCurrentTicket: () =>
        set(() => ({
          currentTicket: null
        })),

      getTicketHistory: () => get().tickets,

      updateTicketStatus: (ticketId, status) =>
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status } : ticket
          )
        }))
    }),
    {
      name: "ticket-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
