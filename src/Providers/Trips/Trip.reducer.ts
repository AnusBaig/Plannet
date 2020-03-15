import { Steps } from "@dimelo/createtrip";
import { Maybe } from "@dimelo/global";
import { CalendarTripLegs } from "@dimelo/itinerary";

export type TripType =
  | "iKnowWhereAndWhen"
  | "iKnowWhen"
  | "iKnowWhere"
  | "iDontKnowAnything";

export interface TripLeg {
  id?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  tripTransport?: string;
  tripAccomudation?: string;
}

export interface Trip {
  id?: string;
  tripName?: string;
  name?: string;
  description?: string;
  tripType?: TripType;
  tripLegs?: TripLeg[];
  hostTripBudget?: number;
  travelerEmails?: string[];
  startDate?: Date;
  endDate?: Date;
  depositRequired?: boolean;
  depositAmount?: number;
  depositDescription?: string;
  hostTripStart?: string;
  hostTripEnd?: string;
  tripLegsSet?: boolean;
  isPrivate?: boolean;
  tripDeparture?: string;
  tripArrival?: string;
  tripDescription?: string;
  tripGuest?: any;
  transportationLegs?: any;
  emailHost?: string;
  trip?: any;
  tripGuests?: TripGuests[];
}

export interface AdminTrip {
  email?: string;
  TripId?: string;
  UserId?: string;
  attendingStatus?: string;
  budget?: number;
  firstName?: string;
  lastName: string;
  id?: string;
  isHost?: boolean;
  rsvp?: boolean;
}

interface TripGuests {
  firstName: string;
  lastName: string;
  email: string;
  budget: number;
  id: string;
  attendingStatus: string;
}

export interface flightLegForTripGuests {
  id: string;
  flightNumber?: string;
  location?: any;
  origin?: string;
  destination?: string;
  type?: any;
  departureDate?: Date | string;
  arrivalDate?: Date | string;
}

export interface flightLegsForTripGuests {
  guestName: string;
  flightLegs: flightLegForTripGuests[];
}

interface TripLegSuggestionCluster {
  likes: number;
  dislikes: number;
  name?: string;
  tripDateSuggestion: {
    id: string;
  };
  tripLegSuggestions: TripLeg[];
}

export interface Accommodation {
  id: string;
  link: string;
  name: string;
}

export interface suggestedAccommodationTripLegs extends TripLeg {
  suggestedAccommodations: Accommodation[];
}

export interface ChatMessage {
  message: string;
  TripChatId: string;
  TripGuestId: string;
  id: number;
  createdAt: Date;
  firstName?: string;
  lastName?: string;
}

export interface CurrentAccommodation {
  accommodation: Accommodation[];
  tripLeg: TripLeg;
}

export interface tripDashboard {
  //TODO: type correctly
  trip: Trip;
  tripAdmin: AdminTrip;
  tripGuest: TripGuests;
  summary: {
    numberOfTotalDays: string;
    totalNumberOfGuests: string;
    tripLegs: TripLeg[];
    tripGuests: TripGuests[];
    summaryChat: any;
    summaryChatMessages: {
      chatMessage: ChatMessage;
    }[];
  };
  suggestedDates: {
    currentLegs: TripLeg[];
    tripLegSuggestionCluster: TripLegSuggestionCluster[];
    tripGuests: TripGuests[];
    suggestedDatesChat: any;
    suggestedDatesChatMessages: {
      chatMessage: ChatMessage;
    }[];
  };
  transportation: {
    flightLegForTripGuests: {
      guestName: string;
      flightLegs: flightLegForTripGuests[];
    }[];
    transportationStatus: {
      guestName: string;
      transportationStatus: string;
    }[];
    transportationChat: any;
    transportationChatMessages: {
      chatMessage: ChatMessage;
    }[];
  };
  accommodation: {
    currentAccommodations: CurrentAccommodation[];
    suggestedAccommodationTripLegs: suggestedAccommodationTripLegs[];
    accommodationChat: any;
    accommodationChatMessages: {
      chatMessage: ChatMessage;
    }[];
  };
  itinerary: {
    startDate: Date;
    endDate: Date;
    tripLegs: TripLeg[];
    itineraryChat: any;
    itineraryChatMessages: {
      chatMessage: ChatMessage;
    }[];
    calendarTripLegs: CalendarTripLegs[];
  };
}

export interface TripsState {
  trips: Maybe<Trip[]>;
  newTrip?: Maybe<Trip>;
  currentDashboard?: Maybe<tripDashboard>;
  joinTrip?: Maybe<tripDashboard>;
  currentStep: Steps;
}

export type Action =
  | { type: "CLEAR_TRIPS" }
  | { type: "SET_STEP"; payload: Steps }
  | { type: "LOAD_TRIPS"; payload: Trip[] }
  | { type: "UPDATE_NEW_TRIP"; payload: Trip }
  | { type: "UPDATE_TRIP_DASHBOARD"; payload: tripDashboard }
  | { type: "CLEAR_DASHBOARD" }
  | { type: "RSVP_ARRIVAL_DEPARTURE"; payload: tripDashboard };

function tripReducer(state: TripsState, action: Action): TripsState {
  switch (action.type) {
    case "CLEAR_TRIPS":
      return {
        ...state,
        trips: null,
        newTrip: {},
        currentStep : "Step0"
      };
    case "LOAD_TRIPS":
      return {
        ...state,
        trips: action.payload
      };
    case "UPDATE_NEW_TRIP":
      return {
        ...state,
        newTrip: { ...state.newTrip, ...action.payload }
      };
    case "UPDATE_TRIP_DASHBOARD":
      return {
        ...state,
        currentDashboard: { ...state.currentDashboard, ...action.payload }
      };
    case "CLEAR_DASHBOARD":
      return {
        ...state,
        currentDashboard: null
      };
    case "RSVP_ARRIVAL_DEPARTURE":
      return {
        ...state,
        joinTrip: { ...state.joinTrip, ...action.payload }
      };
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload
      };
    default:
      throw new Error("Not supported action");
  }
}

export default tripReducer;
