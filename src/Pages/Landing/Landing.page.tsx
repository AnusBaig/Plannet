import React, { useCallback, useState, useEffect } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { toast } from "react-toastify";
import Footer from "src/Components/Footer";
import Heading from "src/Components/Heading";
import Input from "src/Components/Input";
import Button from "src/Components/Button";
import useApi from "src/shared/hooks/useApi";
import useWindowSize from "src/shared/hooks/useWindowSize";
import Step from "./Step";
import StayImage from "./assets/artboard-3@3x.png";
import { ReactComponent as Icon1 } from "./assets/create-trip.svg";
import { ReactComponent as Icon3 } from "./assets/settle-date.svg";
import { ReactComponent as Icon4 } from "./assets/enjoy-vacay.svg";
import { ReactComponent as Icon2 } from "./assets/invite-friends.svg";
import { ReactComponent as Icon5 } from "./assets/phone.svg";
import { ReactComponent as Icon6 } from "./assets/dashboard.svg";
import {
  LandingWrapper,
  HeroStyled,
  HeroTitleStyled,
  HeroButtonsContainerStyled,
  HeroButtonStyled,
  StepsStyled,
  OptinStyled,
  OptinWrapperStyled,
  OptinFormStyled,
  OptinTitleStyle,
  OptinImageStyled,
  HiringStyled,
  HiringButtonStyled,
  DescriptionStepStyled,
  EmailStyled
} from "./Landing.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { useTrip } from "src/Providers/Trips";
import { useInput } from "src/shared/hooks/useInput";

const Landing: React.FC<RouteComponentProps> = () => {
  const { state, dispatch } = useApi("auth/earlyAccess/");
  const { isError } = state;
  const { height } = useWindowSize();
  const [email, setEmail] = useState("");

  const emailState = useInput();
  const {
    // state: { newTrip, currentStep },
    dispatch: tripDispatch
  } = useTrip();

  const handleEmailChange = useCallback(
    ({ target: { value } }) => {
      setEmail(value);
      emailState.setValue(value);
      // alert(emailState)
    },
    [emailState]
  );
  useEffect(() => {
    tripDispatch({
      type: "CLEAR_TRIPS"
    })
  }, [])
  const smallScreen = useMediaQuery("SM");

  useEffect(() => {
    if (!isError) return;
    switch (isError) {
      case "MISSING_PARAMETER":
        toast.error("Invalid email. Please try again.");
        break;
      case "EMAIL_EXISTS":
        toast.warn("You are already subscribed");
        break;
      case "CONFLICT":
        toast.warn("There is a conflict with the email");
        break;
    }
  }, [isError]);

  useEffect(() => {
    if (state.data.message) {
      toast.success(state.data.message);
    }
  }, [state.data.message]);

  const handleHost = useCallback(() => {
    navigate("/create-trip");
  }, []);

  const handleJoin = useCallback(() => {
    navigate("/my-trips");
  }, []);

  const handleSubscribe = () => {
    dispatch({ type: "SUBSCRIBE", payload: { params: { email } } });
  };

  return (
    <LandingWrapper
    // style={{backgroundColor: "red"}}
    >
      <HeroStyled style={smallScreen ? { maxHeight: "70vh" } : { height: "72vh" }}>
        <HeroTitleStyled
          style={smallScreen ? { marginTop: "90px" } : {}}
        >
          You want to travel more. Plannet makes it happen.
        </HeroTitleStyled>
        <HeroButtonsContainerStyled>
          <HeroButtonStyled
            style={smallScreen ? { padding: '15px' } : {}}
            onClick={handleHost}>Host a Trip</HeroButtonStyled>
          <HeroButtonStyled
            style={smallScreen ? { padding: '15px' } : {}}

            onClick={handleJoin}>Join a Trip</HeroButtonStyled>
        </HeroButtonsContainerStyled>
      </HeroStyled>
      <StepsStyled>
        <DescriptionStepStyled>
          <Heading>How it Works?</Heading>
          We were sick of spending hours in email chains, text threads, and spreadsheets trying to book travel with our friends. <b style={{ color: "#1285d8" }}>That’s why we created Plannet,</b> a platform that’s purpose-built for bringing travelers together to make decisions and easily book transportation, accommodations, and more.
        </DescriptionStepStyled>
        <Step Icon={Icon1}>
          <b>Create a trip</b>
          <p style={{ padding: "0 14%", marginTop: "20px", fontSize: "16px", color: "#292c36" }}>Choose a destination or dates to get started. Not sure? Ask your friends.</p>
        </Step>
        <Step Icon={Icon5}>
          <b>Invite Your Friends</b>
          <p style={{ padding: "0 14%", marginTop: "20px", fontSize: "16px", color: "#292c36" }}>Send your friends customized invitations with all the details they need to know.</p>
        </Step>
        <Step Icon={Icon2}>
          <b>Decide and Book</b>
          <p style={{ padding: "0 14%", marginTop: "20px", fontSize: "16px", color: "#292c36" }}>Choose a budget, build an itinerary and book flights.</p>
        </Step>
        <Step Icon={Icon6}>
          <b>View Your Dashboard</b>
          <p style={{ padding: "0 14%", marginTop: "20px", fontSize: "16px", color: "#292c36" }}>See departures, arrivals, and more in one streamlined view.</p>
        </Step>
      </StepsStyled>
      <OptinStyled>
        <OptinWrapperStyled>
          <OptinImageStyled src={StayImage} />
          <OptinFormStyled>
            <OptinTitleStyle>Stay in the loop!</OptinTitleStyle>
            Keep up to date with the platform and be one of the first to get
            access!
          <form
              onSubmit={(e) => {
                e.preventDefault();

                if (emailState.value) { handleSubscribe() }
                else { emailState.setError(true) };
              }}
            >
              <EmailStyled>
                <Input
                  name='email'
                  type="email"
                  value={email}
                  // placeholder="YOUR EMAIL ADDRESS"
                  label="YOUR EMAIL ADDRESS"
                  onChange={(ev) => {
                    handleEmailChange(ev.target.value)
                    emailState.setError(false);

                  }}
                  {...emailState}
                  errorText={emailState.error === true && emailState.value === "" ? "please enter email" : ""}
                />
                <Button>Submit</Button>

              </EmailStyled>
            </form>
          </OptinFormStyled>
        </OptinWrapperStyled>
      </OptinStyled>
      <HiringStyled>
        <Heading>We’re Hiring</Heading>
        We’re currently looking for talented engineers. If you
        <br /> think that could be you, we’d love to hear from you.
        <HiringButtonStyled href="mailto:contact@dimelo.io">
          Say Hi!
        </HiringButtonStyled>
      </HiringStyled>
      <Footer />
    </LandingWrapper>
  );
};

export default Landing;
