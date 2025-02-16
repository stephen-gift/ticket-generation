import React from "react";
import { Card, CardContent } from "./ui/card";

export type Event = {
  name: string;
  location: string;
  date: string;
  time: string;
};

type EventBannerProps = {
  event: Event;
};

const EventBanner = ({ event }: EventBannerProps) => {
  return (
    <Card className="bg-transparent border-none text-[#fafafa] p-0">
      <CardContent
        className="flex flex-col items-center font-roboto justify-center p-3 sm:p-6 text-center rounded-[24px] border-r-2 border-b-2 border-l-2 border-[#07373F]"
        style={{
          background:
            "radial-gradient(57.42% 106.59% at 14.02% 32.06%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), rgba(10, 12, 17, 0.10)",
          backdropFilter: "blur(7px)"
        }}
        role="article"
        aria-labelledby="event-name"
        aria-describedby="event-description"
      >
        <h2
          id="event-name"
          className="text-6xl font-bold font-roadrage text-[#fafafa] mb-2 tracking-widest"
        >
          {event.name}
        </h2>

        <p id="event-description" className="text-lg mb-2">
          Join us for an unforgettable experience at {event.name}! Secure your
          spot now.
        </p>

        <div className="flex items-center text-sm mt-2">
          <span className="mr-2" aria-label="Location">
            📍 {event.location}
          </span>

          <span className="mx-4" aria-hidden="true">
            ||
          </span>

          <time dateTime={`${event.date}T${event.time}`}>
            {event.date} | {event.time}
          </time>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventBanner;
