declare module "@dimelo/itinerary" {
  interface Likes {
    id: string;
    name: string;
    isLike: boolean;
  }

  interface CalendarDayItem {
    id: string;
    itemName: string;
    location: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    likes: Likes[];
  }

  interface CalendarDay {
    id: string;
    items: CalendarDayItem[];
    date?: Date | string;
    TripLegId: string;
  }

  export interface CalendarTripLegs {
    id: string;
    location: string;
    calendarDays: CalendarDay[];
  }
}
