import { AttendeeFormValues } from "@/lib/schema";

export type Event = {
  name: string;
  location: string;
  date: string;
  time: string;
};

export type TicketType = {
  type: string;
  price: number;
  remaining: number;
};

export type TicketSelectionData = {
  event: Event;
  ticketType: string;
  price: number;
  remaining: number;
  numberOfTickets: number;
  total: number;
};

export interface TicketSelectionProps {
  onSubmit: (data: TicketSelectionData) => void;
  initialData?: TicketSelectionData | null;
  onValidityChange?: (isValid: boolean) => void;
}

export interface TicketOptionProps extends TicketType {
  isSelected: boolean;
  onSelect: () => void;
}

export interface AttendeeDetailsProps {
  onSubmit: (data: AttendeeFormValues) => void;
  initialData?: AttendeeFormValues | null;
  onValidityChange?: (isValid: boolean) => void;
}

export interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  initialImage?: string;
}

export interface TheTicketComponentProps {
  ticketDetails: {
    name: string;
    email: string;
    photo?: string;
    specialRequest?: string;
    ticketType: string;
    numberOfTickets: number;
  };
  eventInfo: {
    title: string;
    location: string;
    date: string;
    time: string;
  };
  isStep?: boolean;
}
