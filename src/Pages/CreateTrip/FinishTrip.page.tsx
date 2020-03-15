import React, { useCallback, useState, useEffect } from "react";
import { StepProps, Steps } from "@dimelo/createtrip";
import { RouteComponentProps, navigate } from "@reach/router";
import { useTrip } from "src/Providers/Trips";
import { useAuth } from "src/Providers/Auth";
import OnboardingHeader from "src/Components/OnboardingHeader";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step11 from "./Step11";
import Step12 from "./Step12";
import Step21 from "./Step21";
import Step13 from "./Step13";
import Step14 from "./Step14";
import Step15 from "./Step15";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step51 from "./Step51";
import Confirm from "./ConfirmTrip";
import Done from "./Done";
import {
  StepWrapperStyled,
  StepContainerStyled,
  ProgressBarContainerStyled,
  ProgressBarProcess,
  ProgressLine,
  TickStyled
} from "./createtrip.styled";
import Footer from "src/Components/Footer";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { ReactComponent as TickSVG } from "src/shared/assets/tick.svg";
import { colors } from "src/shared/styles/colors";
import { useDashboardOverview } from "src/Providers/DashboardOverview";

const Components = {
  Step0,
  Step1,
  Step11,
  Step12,
  Step21,
  Step13,
  Step14,
  Step15,
  Step2,
  Step3,
  Step4,
  Step5,
  Step51,
  Confirm,
  Done
};

const CreateTrip: React.FC<RouteComponentProps> = () => {
  const {
    state: { newTrip, currentStep },
    dispatch
  } = useTrip();
  const { isLoggedIn } = useAuth();
  let [currentProgressStep, setcurrentProgressStep] = useState(0);
  useEffect(() => {
    if (newTrip && newTrip.trip && newTrip.trip.planningComplete === true) {
      // return () => {
      console.log("run", newTrip.trip.planningComplete)
      dispatch({
        type: "CLEAR_TRIPS"
      })
      setcurrentProgressStep(0)
      // }
    };
  }, []);
  const setCurrentStep = useCallback((step: Steps) => {
    dispatch({
      type: "SET_STEP",
      payload: step
    })
  }, []);
  const handleClose = useCallback(() => {
    currentProgressStep = 0;
    navigate("/");
  }, []);
  const { state: { dashboardOverview }, getDashboardData } = useDashboardOverview();

  console.log(currentStep, dashboardOverview);

  const handleNext = useCallback(
    nextComponent => {
      const elem = document.getElementById(`progress${currentProgressStep}`);
      elem && elem.setAttribute("display", "none");

      setcurrentProgressStep(currentProgressStep += 1);
      if (nextComponent === "Step51") setcurrentProgressStep(currentProgressStep -= 1);
      setCurrentStep(nextComponent);
    },
    [setCurrentStep]
  );



  const handleBack = useCallback(
    nextComponent => {
      const elem = document.getElementById(
        `progress${currentProgressStep - 1}`
      );
      elem && elem.setAttribute("display", "initial");

      setcurrentProgressStep(currentProgressStep -= 1);

      setCurrentStep(nextComponent);
    },
    [setCurrentStep]
  );

  const data: StepProps = React.useMemo(
    () => ({
      newTrip,
      dispatch,
      handleClose,
      handleNext,
      handleBack
    }),
    [handleClose, handleNext, handleBack, newTrip, dispatch]
  );

  const ActiveComponent = Components[currentStep];
  console.log(currentStep);

  useEffect(() => {
    if (newTrip && newTrip.trip && newTrip.trip.planningComplete === true) {
      // return () => {
      console.log("run", newTrip.trip.planningComplete)
      dispatch({
        type: "CLEAR_TRIPS"
      })
      setcurrentProgressStep(0)
      // }
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(
        `/login?redirect=${window.location.pathname}${window.location.search}`
      );
    }
  }, [isLoggedIn]);

  console.log(currentStep);

  const withProgressBar = () => {
    return Components[currentStep] !== Done;
  };

  const smallScreen = useMediaQuery('MOBILE');

  console.log(data);

  return (
    <>
      <OnboardingHeader />
      <StepWrapperStyled>
        <StepContainerStyled style={{ position: 'relative' }}>
          {withProgressBar() && (
            <ProgressBarContainerStyled style={{ marginTop: 100, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <ProgressBarProcess className={currentProgressStep < 3 ?
                  "active" :
                  currentProgressStep > 2 ? "completed" : ""}>{currentProgressStep > 2 && <TickStyled>L</TickStyled>}</ProgressBarProcess>
                {!smallScreen ? <p style={{
                  fontSize: 10,
                  color: currentProgressStep < 3 ? colors.cerulean : ""
                }}>CITIES</p> : null}
              </div>
              <div>
                <ProgressBarProcess className={currentProgressStep < 7
                  && currentProgressStep > 2 ? "active" :
                  currentProgressStep > 6 ? "completed" : ""}>{currentProgressStep > 6 && <TickStyled>L</TickStyled>}</ProgressBarProcess>
                {!smallScreen ? <p style={{
                  fontSize: 10,
                  color: currentProgressStep < 7
                    && currentProgressStep > 2 ? colors.cerulean : ""
                }}>DATES</p> : null}
              </div>
              <div>
                <ProgressBarProcess className={currentProgressStep < 8
                  && currentProgressStep > 6 ? "active" :
                  currentProgressStep > 7 ? "completed" : ""}>{currentProgressStep > 7 && <TickStyled>L</TickStyled>}</ProgressBarProcess>
                {!smallScreen ? <p style={{
                  fontSize: 10,
                  color: currentProgressStep < 8
                    && currentProgressStep > 6 ? colors.cerulean : ''
                }}>TRANSPORTATION</p> : null}
              </div>
              <div>
                <ProgressBarProcess className={currentProgressStep < 9
                  && currentProgressStep > 7 ? "active" :
                  currentProgressStep > 8 ? "completed" : ""}>{currentProgressStep > 8 && <TickStyled>L</TickStyled>}</ProgressBarProcess>
                {!smallScreen ? <p style={{
                  fontSize: 10,
                  color: currentProgressStep < 7
                    && currentProgressStep > 8 ? colors.cerulean : ''
                }}>ACCOMMODATION</p> : null}
              </div>
              <div>
                <ProgressBarProcess className={
                  currentProgressStep < 10
                    && currentProgressStep > 8 ? "active" :
                    currentProgressStep > 9 ? "completed" : ""
                }>{currentProgressStep > 9 && <TickStyled>L</TickStyled>}</ProgressBarProcess>
                {!smallScreen ? <p style={{
                  fontSize: 10,
                  color: currentProgressStep < 10
                    && currentProgressStep > 8 ? colors.cerulean : ''
                }}>BUDGET</p> : null}
              </div>
              <div>
                <ProgressBarProcess className={
                  currentProgressStep < 11
                    && currentProgressStep > 9 ? "active" :
                    currentProgressStep >= 11 ? "completed" : ""
                }>{currentProgressStep >= 11 && <TickStyled>L</TickStyled>}</ProgressBarProcess>
                {!smallScreen ? <p style={{
                  fontSize: 10,
                  color: currentProgressStep < 11
                    && currentProgressStep > 9 ? colors.cerulean : ''
                }}>WHO'S COMING</p> : null}
              </div>
              <ProgressLine />
            </ProgressBarContainerStyled>
          )}
          {console.log("currentProgressStep " + currentProgressStep)}

          <ActiveComponent {...data} />
        </StepContainerStyled>
        <Footer />
      </StepWrapperStyled>
    </>
  );
};

export default CreateTrip;
