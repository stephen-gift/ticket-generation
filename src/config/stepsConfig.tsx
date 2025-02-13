// steps-config.ts
export const STEPS = [
  {
    title: "Ticket Selection",
    component: <div>Ticket Selection</div>,
    buttons: {
      left: ["Cancel"] as string[],
      right: ["Next"] as string[]
    }
  },
  {
    title: "Attendee Details",
    component: <div>Attendee Details</div>,
    buttons: {
      left: ["Back"] as string[],
      right: ["Get My Free Ticket"] as string[]
    }
  },
  {
    title: "Ready",
    component: <div>Ready</div>,
    buttons: {
      left: ["Book Another Ticket"] as string[],
      right: ["Download Ticket"] as string[]
    }
  }
];
