import React from "react";
import TheTicketComponent from "./TheTicketComponent";
import { useTicketStore } from "../../store";

const TicketSection = () => {
  const { currentTicket } = useTicketStore();

  if (!currentTicket) {
    return <div>No ticket details available.</div>;
  }

  const ticketDetails = {
    name: currentTicket?.attendee?.name,
    email: currentTicket?.attendee?.email,
    photo: currentTicket?.attendee?.image,
    specialRequest: currentTicket?.attendee?.request,
    ticketType: currentTicket?.ticketType,
    numberOfTickets: currentTicket?.numberOfTickets
  };

  const eventInfo = {
    title: currentTicket?.event?.name,
    location: currentTicket?.event?.location,
    date: currentTicket?.event?.date,
    time: currentTicket?.event?.time
  };
  return (
    <div className="flex justify-center items-center w-full">
      <TheTicketComponent ticketDetails={ticketDetails} eventInfo={eventInfo} />
    </div>
  );
};

export default TicketSection;
