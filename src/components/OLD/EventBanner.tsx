import React from "react";
import { Card, CardContent } from "../ui/card";

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
    <Card className="bg-transparent border-none text-white-pure">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-2">{event.name}</h2>
        <p className="text-lg mb-2">
          Join us for an unforgettable experience at {event.name}! Secure your
          spot now.
        </p>
        <div className="flex items-center text-sm mt-2">
          <span className="mr-2">📍 {event.location}</span>
          <span className="mx-4">||</span>
          <span>
            {event.date} | {event.time}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventBanner;
