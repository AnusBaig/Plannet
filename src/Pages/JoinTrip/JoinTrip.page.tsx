import React, { useCallback, useState, useEffect } from "react";
import { StepProps, Steps } from "@dimelo/jointrip";
import { RouteComponentProps, navigate } from "@reach/router";
import { useTrip } from "src/Providers/Trips";
import useApi from "src/shared/hooks/useApi";
import Heading from "src/Components/Heading";
import Fallback from "src/Components/Fallback";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Transportation from "./Transportation";
import Step4 from "./Step4";
import Done from "./Done";
import { StepWrapperStyled, StepContainerStyled } from "./jointrip.styled";
import { useAuth } from "src/Providers/Auth";
import Footer from "src/Components/Footer";
import { ReactComponent as BgIcon } from "../../shared/assets/group-19.svg";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

type Paths = "join" | "suggest" | "not-join";
type RouteProps = RouteComponentProps & {
  tripId?: string;
  joinOption?: Paths;
  email?: string;
  step?: string;
};

const Components = {
  Step1,
  Step2,
  Step3,
  Transportation,
  Step4,
  Done
};

const AllowedPaths: Paths[] = ["join", "suggest", "not-join"];

function getAttendingStatus(joinOption?: Paths) {
  let attendingStatus;

  switch (joinOption) {
    case "not-join":
      attendingStatus = "No";
      break;
    case "join":
    case "suggest":
      attendingStatus = "Yes";
      break;
    default:
      attendingStatus = "";
  }

  return attendingStatus;
}

const CreateTrip: React.FC<RouteProps> = ({
  tripId,
  joinOption,
  email,
  step
}) => {
  let initialView: Steps = "Step1";

  const [Active, setActive] = useState<Steps>(initialView);
  const [eligible, setEligible] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const smallScreen = useMediaQuery("SM");

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      setMounted(true);
      if (currentUser.email != email) {
        setEligible(false);
      }
    } else if (mounted) {
      navigate(`/login?redirect=${window.location.pathname}`);
    }
  }, [currentUser]);
  const {
    state: { newTrip, joinTrip },
    dispatch: dispatchTrip
  } = useTrip();

  const { state, dispatch } = useApi(
    `trip/welcome/${tripId}/${email}/${getAttendingStatus(joinOption)}`,
    "get"
  );
  const { isLoading } = state;

  const handleClose = useCallback(() => {
    navigate("/");
  }, []);

  const handleNext = useCallback(
    nextComponent => {
      if (!currentUser) {
        navigate(`/login?redirect=${window.location.pathname}`);
      }
      setActive(nextComponent);
    },
    [setActive]
  );

  const handleBack = useCallback(
    nextComponent => {
      // const elem = document.getElementById(
      // `progress${currentProgressStep - 1}`
      // );
      // elem && elem.setAttribute("display", "initial");

      // currentProgressStep -= 1;

      setActive(nextComponent);
    },
    [setActive]
  );

  useEffect(() => {
    const canGoNext = step === "step2" || step === "step3";

    if (canGoNext) handleNext(step);
  }, [step, handleNext]);

  useEffect(() => {
    if (joinOption === "not-join" || !state.data || !state.data.route) return;

    const {
      host: { email, startLocation, endLocation, budget },
      trip: { name },
      tripLegs,
      tripGuests
    } = state.data;

    if (joinOption === "join" || joinOption === "suggest") {
      dispatchTrip({
        type: "UPDATE_NEW_TRIP",
        payload: {
          id: tripId,
          name,
          tripLegs,
          emailHost: email,
          hostTripStart: startLocation,
          hostTripEnd: endLocation,
          hostTripBudget: budget,
          tripGuests
        }
      });
    }
  }, [dispatchTrip, state.data, joinOption, tripId]);

  useEffect(() => {
    if (eligible) {
      if (joinOption === "not-join") {
        dispatch({ type: "NOT-JOIN-TRIP" });
      } else if (joinOption === "join" || joinOption === "suggest") {
        dispatch({ type: "JOIN-TRIP" });
      }
    }
  }, [eligible, joinOption, dispatch]);

  const data: StepProps = React.useMemo(
    () => ({
      joinTrip,
      newTrip,
      dispatch: dispatchTrip,
      handleClose,
      handleNext,
      handleBack
    }),
    [handleClose, handleNext, handleBack, newTrip, joinTrip, dispatchTrip]
  );

  const ActiveComponent = Components[Active];

  if (joinOption && !AllowedPaths.includes(joinOption)) {
    return <div>404</div>;
  }
  if (!eligible) {
    return (
      <div style={{ textAlign: "center" }}>
        You are not eligible to accept this invitation
      </div>
    );
  }

  return joinOption === "join" ? (
    <div style={{ height: "auto", minHeight: "80vh" }}>
      <StepWrapperStyled
        style={{
          minHeight: "85vh",
          padding: smallScreen ? "0" : "",
          background: Active === "Transportation" ? "unset"  : "auto"
          // background: "none !important"



        }}
      >
        <StepContainerStyled style={{ height: "auto" }}>
          {isLoading && <Fallback />}

          {
            // @ts-ignore
            <ActiveComponent {...data} />
          }
        </StepContainerStyled>
      </StepWrapperStyled>
      <Footer />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        // border: '2px solid',
        height: "80vh",
        alignItems: "center",
        width: "100%"
      }}
    >
      {!smallScreen && (
        <div
          style={{
            height: "97vh",
            // border: '2px solid',
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e8f8ff",
            padding: "5px 10px",
            width: "50%"
          }}
        >
          <BgIcon />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-around",
          //  border: "2px solid black",
          padding: "5px 20px",
          width: smallScreen ? "80%" : "50%"
        }}
      >
        <>
          {isLoading && <Fallback />}
          {joinOption === "not-join" && state.data.message && (
            <>
              <h2 style={{ margin: "5% 0", color: "#0088e4", fontWeight: 500 }}>
                Thank You for letting us know you will not be joining the{" "}
                {state.data.trip.name} trip!
              </h2>
              <p style={{ margin: "5% 0" }}>
                Curious about hosting your own trip?{" "}
                <span
                  style={{
                    color: "#0088e4",
                    fontWeight: 500
                  }}
                >
                  Click here
                </span>
              </p>

              <button
                style={{
                  width: "28%",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  border: "solid 1px #0088e4",
                  color: "#0088e4",
                  margin: "10px 0",
                  padding: "10px 0"
                }}
              >
                Login
              </button>
            </>
          )}
          {joinOption !== "not-join" && (
            // @ts-ignore
            <ActiveComponent {...data} />
          )}
        </>
      </div>
    </div>
  );
};

export default CreateTrip;
