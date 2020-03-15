import { CalendarTripLegs } from "@dimelo/itinerary";
import { useReducer, useEffect, useCallback, useMemo } from "react";
import axios, { AxiosInstance } from "axios";
import { Maybe } from "@dimelo/global";
import { useAuth } from "src/Providers/Auth";
import { Trip } from "src/Providers/Trips/Trip.reducer";
import { DIMELO_TOKEN } from "src/constants";
import storage from "src/shared/utils/storage";
import { StatusRejectedTd } from "src/Pages/Dashboard/Dashboard.styled";

type ErrorMessages =
  | "not authorized"
  | "Unexpected error"
  | "CONFLICT"
  | "MISSING_PARAMETER"
  | "EMAIL_EXISTS";

// type ReducerTypes =
//   | "FETCH_INIT"
//   | "FETCH_FAILURE"
//   | "FETCH_SUCCESS"
//   | "LOGIN"
//   | "SIGNUP"
//   | "GET_MYTRIPS"
//   | "CREATE_TRIP"
//   | "GET_DASHBOARD"
//   | "SUBSCRIBE";
//   | "SEND_GROUP_EMAIL";
//   | "VERIFY_EMAIL";
//   | "RESEND_VERIFY_EMAIL";

interface StateType {
  isLoading: boolean;
  isError: boolean | ErrorMessages;
  data: any;
  api: Maybe<AxiosInstance>;
}

type ReducerType =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_FAILURE"; payload?: ErrorMessages }
  | { type: "FETCH_SUCCESS"; payload: AxiosInstance }
  | {
    type: "LOGIN";
    payload: { data: { token: string }; api: AxiosInstance } | any;
  }
  | {
    type: "SIGNUP";
    payload:
    | { data: { user_id: number; token: string }; api: AxiosInstance }
    | any;
  }
  | { type: "GET_MYTRIPS"; payload: Trip[] }
  | { type: "CREATE_TRIP"; payload: Trip }
  | { type: "GET_DASHBOARD"; payload?: any }
  | { type: "ADD_ACCOMMODATION"; payload?: any }
  | { type: "ADD_ACCOMMODATION_SUGGESTION"; payload?: any }
  | { type: "ADD_ACTIVITY"; payload?: any }
  | { type: "GET_ITINERARY_DASHBOARD"; payload?: any }
  | { type: "ADD_ADDED_ITINERARY"; payload: any }
  | { type: "GET_TRIP_DASHBOARD"; payload?: any }
  | { type: "JOIN_TRIP"; payload?: Trip }
  | { type: "FETCH_TRIP_EXISTING_DATA", payload: any }


const dataFetchReducer = (state: StateType, action: ReducerType): StateType => {

  switch (action.type) {

    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        api: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: action.payload || true
      };
    case "LOGIN":
    case "SIGNUP":
      return {
        ...state,
        isLoading: false,
        isError: false,
        ...action.payload
      };
    case "GET_MYTRIPS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        ...action.payload
      };
    case "GET_DASHBOARD":

      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
          currentDashboard: { ...action.payload.data }
        }
      };
    case "GET_ITINERARY_DASHBOARD":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
          ...state.data,
          itinerary: {
            ...action.payload.data,
            activities: action.payload.data.activities || []
          }
        }
      };
    case "ADD_ADDED_ITINERARY":
      return {
        ...state,
        data: {
          ...state.data,
          itinerary: {
            ...state.data.itinerary,
            activities: [
              ...state.data.itinerary.activities,
              action.payload
            ]
          }
        }
      };

    case "ADD_ACCOMMODATION_SUGGESTION":
      const currentDashboard = action.payload.params.currentDashboard;
      const index = currentDashboard.accommodation.suggestedAccommodationTripLegs.findIndex(
        (item: any) => item.id === action.payload.data.TripLegId
      );
      currentDashboard.accommodation.suggestedAccommodationTripLegs[
        index
      ].suggestedAccommodations.push(action.payload.data);

      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
          ...action.payload.data,
          currentDashboard: {
            ...currentDashboard
          }
        }
      };

    case "ADD_ACCOMMODATION":
      const currentDashboard2 = action.payload.params.currentDashboard;
      const index2 = currentDashboard2.accommodation.currentAccommodations.findIndex(
        (item: any) => item.tripLeg.id === action.payload.data.TripLegId
      );
      currentDashboard2.accommodation.currentAccommodations[index2].accommodation.push(action.payload.data);

      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
          ...action.payload.data,
          currentDashboard: {
            ...currentDashboard2
          }
        }
      };

    // case "ADD_ACTIVITY":
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: false,
    //     data: {
    //       ...state.data,
    //       itinerary: {
    //         ...state.data.itinerary,
    //         activities: [
    //           ...state.data.itinerary.activities,
    //           action.payload.data
    //         ]
    //       }
    //     }
    //   };

    case "ADD_ACTIVITY":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
          added: action.payload.data
        }
      };
    case "GET_TRIP_DASHBOARD":
    case "FETCH_TRIP_EXISTING_DATA":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data
      }
    default:
      return {
        ...state,
        isLoading: false,
        isError: false,
        ...action.payload
      };
  }
};

const initialState: StateType = {
  isLoading: false,
  isError: false,
  data: {},
  api: null
};

function useApi(endpoint: string, method: "get" | "post" | "put" | "delete" = "post") {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const { login } = useAuth();

  const preDispatch = useCallback(
    async action => {
      if (!state.api) return;

      try {
        dispatch({ type: "FETCH_INIT" });

        const params =
          action.payload && action.payload.params ? action.payload.params : {};
        //@ts-ignore
        const response = await state.api[method](endpoint, params);

        if (
          (action.type === "LOGIN" || action.type === "SIGNUP") &&
          response.data.token
        ) {
          state.api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          login(response.data.token, response.data.user);
          //TODO: add token to localstorage
        }

        if (response.data.error) {
          dispatch({ type: "FETCH_FAILURE", payload: response.data.error });
        } else {
          dispatch({
            type: action.type,
            payload: { data: response.data, api: state.api, params }
          });
        }
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: "Unexpected error" });
      }
    },
    [state.api, endpoint, login, method]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.api) return;
        const baseURL = "https://plannet-back-end.herokuapp.com/api/";

        dispatch({ type: "FETCH_INIT" });

        const instance = axios.create({
          baseURL,
          validateStatus: function (status) {
            return status >= 200 && status <= 503;
          }
        });

        const token = storage.get(DIMELO_TOKEN);
        if (token) {
          instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        instance.defaults.headers.post["Content-Type"] = "application/json";

        dispatch({ type: "FETCH_SUCCESS", payload: instance });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, [state.api]);

  const value = useMemo(
    () => ({
      state,
      mutateDispatch: dispatch,
      dispatch: preDispatch
    }),
    [state, dispatch, preDispatch]
  );

  return value;
}

export default useApi;
