// types/event.ts
export interface EventCoordinator {
  name: string;
  phone: string;
}

export interface EventGallery {
  id: string;
  url: string;
  caption?: string;
}

export interface Event {
  id: string;
  name: string;
  eventType: string;
    image?: string; 
  location: string;
  date: string;
  time: string;
  coordinator: EventCoordinator;
  conductedBy: string;
  description?: string;
  gallery?: EventGallery[];
  featured?: boolean;
  registrationUrl?: string;
  maxAttendees?: number;
  currentAttendees?: number;
}

export interface EventSection {
  title: string;
  events: Event[];
}

export type EventStatus = 'upcoming' | 'past';