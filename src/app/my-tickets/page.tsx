"use client";
import React, { useState } from "react";
import { useTicketStore } from "../../../store";
import TheTicketComponent from "@/components/TheTicketComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TicketHistoryPage = () => {
  const { getTicketHistory } = useTicketStore();
  const tickets = getTicketHistory();

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tickets based on search term (name or email)
  const filteredTickets = tickets.filter((ticket) => {
    const nameMatch = ticket.attendee?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = ticket.attendee?.email
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  if (tickets.length === 0) {
    return <div>No ticket history available.</div>;
  }

  return (
    <div>
      {/* Search Input */}
      <div className=" flex flex-col gap-2 mb-4 p-4">
        <Label
          className="text-white
        "
        >
          Search
        </Label>
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-5 border rounded-2xl h-16 text-white"
        />
      </div>

      {/* Ticket Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredTickets.map((ticket) => {
          const ticketDetails = {
            name: ticket.attendee?.name,
            email: ticket.attendee?.email,
            photo: ticket.attendee?.image,
            specialRequest: ticket.attendee?.request,
            ticketType: ticket.ticketType,
            numberOfTickets: ticket.numberOfTickets
          };

          const eventInfo = {
            title: ticket.event?.name,
            location: ticket.event?.location,
            date: ticket.event?.date,
            time: ticket.event?.time
          };

          return (
            <div key={ticket.id} className="flex justify-center items-center">
              <TheTicketComponent
                ticketDetails={ticketDetails}
                eventInfo={eventInfo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketHistoryPage;
