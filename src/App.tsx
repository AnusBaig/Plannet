import React, { Suspense } from "react";
import { Router } from "@reach/router";
import { Global } from "@emotion/core";
import { toast, Slide } from "react-toastify";
import {
  TripProvider,
  AuthProvider,
  DashboardOverviewProvider
} from "src/Providers";
import Nav from "src/Components/Nav";
import Fallback from "src/Components/Fallback";
import ErrorPage from "src/Pages/Error";
import { globalStyles } from "./App.styled";
import "react-toastify/dist/ReactToastify.css";
import TripDashboard from "./Pages/Dashboard/TripDashboard/TripDashboard";

const Landing = React.lazy(() => import("src/Pages/Landing"));
const CreateTrip = React.lazy(() => import("src/Pages/CreateTrip"));
const JoinTrip = React.lazy(() => import("src/Pages/JoinTrip"));
const MyTrip = React.lazy(() => import("src/Pages/MyTrip"));
const Login = React.lazy(() => import("src/Pages/Modals/Login"));
const Signup = React.lazy(() => import("src/Pages/Modals/Signup"));
const VerifyEmail = React.lazy(() => import("src/Pages/Modals/VerifyEmail"));
const PasswordReset = React.lazy(() =>
  import("src/Pages/Modals/PasswordReset")
);
const Forgot = React.lazy(() => import("src/Pages/Modals/Forgot"));
const Dashboard = React.lazy(() => import("src/Pages/Dashboard"));
const CityDates = React.lazy(() => import("src/Pages/Dashboard/CityDates"));
const WhoIsComming = React.lazy(() =>
  import("src/Pages/Dashboard/WhoIsComming")
);
const Transportation = React.lazy(() =>
  import("src/Pages/Dashboard/Transportation")
);
const Travelers = React.lazy(() =>
  import("src/Pages/Dashboard/Transportation/Travelers")
);
const MyTrips = React.lazy(() =>
  import("src/Pages/Dashboard/Transportation/myTrips")
);
const SearchFlight = React.lazy(() =>
  import("src/Pages/Dashboard/Transportation/SearchFlight")
);
const Accommodation = React.lazy(() =>
  import("src/Pages/Dashboard/Accommodation")
);
const MyPlaces = React.lazy(() =>
  import("src/Pages/Dashboard/Accommodation/MyPlaces")
);
const SearchHotels = React.lazy(() =>
  import("src/Pages/Dashboard/Accommodation/SearchHotels")
);
const Itinerary = React.lazy(() => import("src/Pages/Dashboard/Itinerary"));

toast.configure({
  position: "top-center",
  autoClose: 5000,
  closeOnClick: false,
  transition: Slide
});

const App: React.FC = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <AuthProvider>
        <TripProvider>
          <DashboardOverviewProvider>
            <Suspense fallback={<Fallback />}>
              <Router primary={false}>
                <CreateTrip path="/create-trip" />
                <CreateTrip path="/create-trip/:id" />
                <Nav path='/'>

                  <Landing path="/" />
                  <JoinTrip path="/join-trip/:tripId/:joinOption/:email" />
                  <JoinTrip path="/join-trip/:tripId/:joinOption/:email/:step" />

                  <TripDashboard path="/trip-dashboard" />
                  <MyTrip path="/my-trips" />
                  <Signup path="/signup" />
                  <VerifyEmail path="/emailVerification/:token/:email" />
                  <PasswordReset path="/password-reset" />
                  <Login path="/login" />
                  <Forgot path="/forgot" />
                  <Dashboard path="/dashboard/:id">
                    <CityDates default />
                    <WhoIsComming path="who-is-coming" />
                    <Transportation path="transportation">
                      <MyTrips default />
                      <Travelers path="Travelers" />
                      <SearchFlight path="SearchFlight" />
                    </Transportation>
                    <Accommodation path="accommodation">
                      <MyPlaces default />
                      <Travelers isAccommodation path="Travelers" />
                      <SearchHotels path="SearchHotels" />
                    </Accommodation>
                    <Itinerary path="itinerary" />
                  </Dashboard>
                  <ErrorPage default />
                </Nav>
              </Router>
            </Suspense>
          </DashboardOverviewProvider>
        </TripProvider>
      </AuthProvider>
    </>
  );
};

export default App;
