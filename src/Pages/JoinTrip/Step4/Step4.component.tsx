import React, { useCallback, useEffect, useState } from "react";
import * as shortid from "shortid";
import { StepProps } from "@dimelo/jointrip";
import useApi from "src/shared/hooks/useApi";
import Input from "src/Components/Input";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import Fallback from "src/Components/Fallback";
import Separator from "src/Components/Separator";
import SliderRange from "src/Components/SliderRange";
import { SLIDER_MAX_VALUE } from "src/constants";
import { ReactComponent as UserIcon } from "src/shared/assets/add-user.svg";
import SelectionCard from "src/Components/SelectionCard";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as ChevronLeftIconMobile } from "src/shared/assets/b-1.svg";

import { ReactComponent as NoBudgetIcon } from "src/shared/assets/no-budget.svg";
import { ReactComponent as NotSureIcon } from "src/shared/assets/magnifying-glass.svg";
import { ReactComponent as NotSureBigIcon } from "src/shared/assets/magnifying-big.svg";
import { ReactComponent as CustomBudgetIcon } from "src/shared/assets/active.svg";
import { ReactComponent as CustomBudgetIconDefault } from "src/shared/assets/custom-amount-default.svg";
import AvatarURL from "src/shared/assets/maya.png";
import Whoops from "src/Components/Whoops";
import { useAuth } from "src/Providers/Auth";






import {
  StepActiveAreaStyled,
  StepHeaderStyled,
  StepBodyStyled,
  StepBodyWrapperStyled,
  StepFooterStyled,
  NameStyled
} from "src/Pages/JoinTrip/jointrip.styled";
import {
  Step5Styled,
  SectionStyled,
  Step5WrapperStyled,
  Step5ButtonsStyled,
  EmailListStyled,
  EmailRowStyled,
  SliderStyled
} from "./Step4.styled";
import {
  QuestionStyled,
  HelpSpeechContainerStyled,
  SelectionBoxContainerStyled,
  BackButtonStyled,
} from "../../CreateTrip/createtrip.styled";
import {
  StepWrapperStyled,
  StepContainerStyled,
  ProgressBarContainerStyled,
  ProgressBarWrapperStyled
} from "../../CreateTrip/createtrip.styled";
import { triggerAsyncId } from "async_hooks";
import { ReactComponent as NoBudgetActiveIcon } from "src/shared/assets/active-no-budget.svg";
import { ReactComponent as NoSureActiveIcon } from "src/shared/assets/active-skip-for-now.svg";

import { InputWrapperStyled } from "src/Components/Input/Input.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const initialValue = 1000;
let inviteGuestEmails: any = []
let emailForGuest: string = ''

const Step5: React.FC<StepProps> = data => {
  const [userResponse, setUserResponse] = useState();
  const [showWhoops, setShowWhoops] = useState();
  const { currentUser } = useAuth()
  const rsvpEndpoint = useApi("trip/rsvp");
  const { newTrip, dispatch, handleNext } = data;
  const [email, setEmail] = useState("");
  const ref = React.createRef<HTMLInputElement>();
  const { state, dispatch: rsvpSpecifyBudgetDisPatch } = useApi("/trip/rsvpSpecifyBudget");
  const handleInput = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(value);
      emailForGuest = value
    },
    []

  );
  const smallScreen = useMediaQuery("SM");
  const xSmallScreen = useMediaQuery("XS");
  




  const handleAddEmail = useCallback(() => {
    if (!newTrip || !ref.current) return;

    const isValidEmail = ref.current.checkValidity();


    if (isValidEmail) {
      const emails = newTrip.travelerEmails || [];

      dispatch({
        type: "UPDATE_NEW_TRIP",
        payload: { travelerEmails: emails.concat(email) }
      });
      setEmail("");
    } else {
      //TODO: better error handling
      alert("provide a valid email");
    }
  }, [dispatch, newTrip, email, ref]);

  const handleChange = useCallback(
    (values, setValues) => {
      setValues(values);
      dispatch({
        type: "UPDATE_NEW_TRIP",
        payload: { hostTripBudget: values }
      });
    },
    [dispatch]
  );

  const goBack = useCallback(() => {
    handleNext("Transportation");
  }, [handleNext]);

  const goDone = useCallback(() => {
    if (!newTrip || !newTrip.id) return;
    inviteGuestEmails.push(emailForGuest)
    rsvpEndpoint.dispatch({
      type: "RSVP",
      payload: {
        params: {
          attendingStatus: "Yes",
          "tripDateSuggestion": { "startDate": "01/06/2020", "endDate": "01/16/2020" },
          tripId: newTrip.id,
          budget: newTrip.hostTripBudget,
          inviteGuestEmails: inviteGuestEmails,
          startLocation: newTrip.hostTripStart,
          endLocation: newTrip.hostTripEnd,
          tripLegSuggestions: newTrip.tripLegs || []
        }
      }
    });
  }, [newTrip, rsvpEndpoint]);

  if (showWhoops) {
    return (
      <Whoops
        icon={NotSureBigIcon}
        message="We don’t currently support this option, but it’s coming shortly!"
        onGoBack={() => setShowWhoops(false)}
      />);
  }

  // useEffect(() => {
  //   dispatch({
  //     type: "UPDATE_NEW_TRIP",
  //     payload: { hostTripBudget: initialValue }
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   if (
  //     !rsvpEndpoint.state ||
  //     !rsvpEndpoint.state.data ||
  //     !rsvpEndpoint.state.data.tripGuestRSVPed
  //   )
  //     return;
  //   handleNext("Done");
  // }, [handleNext, rsvpEndpoint.state]);

  // useEffect(() => {
  // }, [state])


  const goForward = () => {

    rsvpSpecifyBudgetDisPatch({
      type: "RSVP_SPECIFY_BUDGET", payload: {
        params:

        {
          tripId: data.newTrip && data.newTrip.id, tripGuestId: currentUser && currentUser.id,
          budget: budget
        }

      }
    })

    handleNext("Done");

  }


  if (!newTrip) return null;

  const Icon = <UserIcon onClick={handleAddEmail} />;
  const budget = !newTrip.hostTripBudget
    ? 0
    : newTrip.hostTripBudget < SLIDER_MAX_VALUE
      ? newTrip.hostTripBudget
      : SLIDER_MAX_VALUE;
  let currentProgressStep = 0;
  return (
    <StepContainerStyled>
      {/* <ProgressBarContainerStyled className="ma-progress-bar">
        <ProgressBarWrapperStyled>
          <ul>
            <li className={currentProgressStep < 7 ?
              "active" :
              currentProgressStep > 6 ? "completed" : ""}></li>
            <li className={currentProgressStep < 8
              && currentProgressStep > 6 ? "active" :
              currentProgressStep > 7 ? "completed" : ""}></li>
            <li className={currentProgressStep < 9
              && currentProgressStep > 7 ? "active" :
              currentProgressStep > 8 ? "completed" : ""}></li>
            <li className={
              currentProgressStep < 10
                && currentProgressStep > 8 ? "active" :
                currentProgressStep > 9 ? "completed" : ""
            }></li>
            <li className={
              currentProgressStep < 11
                && currentProgressStep > 9 ? "active" :
                currentProgressStep >= 12 ? "completed" : ""
            }></li>
          </ul>
        </ProgressBarWrapperStyled>
      </ProgressBarContainerStyled> */}

      <QuestionStyled>
        How much are you looking to budget for this trip?
      </QuestionStyled>

      <BackButtonStyled 
       style={smallScreen ? {top:"18%"} : {} }
      onClick={goBack}>
         {smallScreen ? (<div style={{display: "flex", alignItems: "center"}}><ChevronLeftIconMobile /><span style={{color: "#1285d8"}}>back</span></div>)  : <ChevronLeftIcon />}
      </BackButtonStyled>

      {!smallScreen && <HelpSpeechContainerStyled width="100%" marginBottom="0">
        <img src={AvatarURL} />
        <p>Our budget suggestion for this trip is $2,500</p>
      </HelpSpeechContainerStyled>}

      <SelectionBoxContainerStyled
        width="768px"
        id = "joinTripBudgetDiv"
      >
        <SelectionCard
          icon={smallScreen ? null : CustomBudgetIconDefault}
          selectedIcon={smallScreen ? null : CustomBudgetIcon}
          label="Custom Budget!"
          onClick={() => setUserResponse('custom')}
          selected={userResponse === 'custom'}
          margin="24px"
        
         
        />
        <SelectionCard
          icon={smallScreen ? null : NoBudgetIcon}
          selectedIcon={smallScreen ? null : NoBudgetActiveIcon}
          label="No Budget!"
          onClick={() => setUserResponse('no_budget')}
          selected={userResponse === 'no_budget'}
          margin="24px"
        />
        <SelectionCard
          icon={smallScreen ? null : NotSureIcon}
          selectedIcon={smallScreen ? null : NoSureActiveIcon}
          label="Not Sure Yet"
          onClick={() => setShowWhoops(true)}
          margin="24px"
        />
      </SelectionBoxContainerStyled>
      <SliderStyled>
        {userResponse === "custom" && (
          <SliderRange
            values={budget}
            handleChange={handleChange}
          />)}
           {userResponse === "custom" && (
          <InputWrapperStyled style={{
            maxWidth: '248px', margin: "5px auto", marginBottom: "48px",
          }}>
            <Input value={budget} onChange={(ev) => {
              // if (Number(ev.target.value) <= SLIDER_MAX_VALUE)
              //   setBudgetValue(Number(ev.target.value))
            }} />
          </InputWrapperStyled>

        )}
      </SliderStyled>
      <Button
        glow
        onClick={goForward}
        width="184px"
        disabled={!userResponse}
      style={smallScreen ? {width: "50%"} : xSmallScreen ? {width: "90%"} : {}}
      >
        Next
      </Button>
    </StepContainerStyled>
  );
};

export default Step5;
