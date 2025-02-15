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
import { TICKETS } from "@/components/TicketSelection";

export const useTicketStore = create<TicketStore>()(
  persist(
    (set, get) => ({
      tickets: [],
      currentTicket: null,

      addTicket: (ticket) =>
        set((state) => ({
          tickets: [...state.tickets, ticket]
        })),

      updateCurrentTicket: (data) => {
        const selectedTicket = TICKETS.find(
          (ticket) => ticket.type === data.ticketType
        );
        const total =
          (selectedTicket?.price ?? 0) * (data.numberOfTickets ?? 1);

        set((state) => ({
          currentTicket: {
            ...state.currentTicket,
            ...data,
            total
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
