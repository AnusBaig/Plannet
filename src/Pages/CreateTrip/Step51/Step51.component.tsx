import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import Button from "src/Components/Button";
import Whoops from "src/Components/Whoops";
import Input from "src/Components/Input";
import RectanguleShadow from "src/Components/RectanguleShadow";
import AvatarURL from "src/shared/assets/maya.png";
import {
  ContainerStyled,
  InputWrapperStyled,
  CityCardStyled,
  NameStyled,
  EmailStyled,
  UserDetailWrapper,
} from "./Step51.styled";
import {
  QuestionStyled,
  BackButtonStyled,
  HelpSpeechContainerStyled,
} from "../createtrip.styled";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as AddIcon } from "src/shared/assets/add-circle.svg";
import { ReactComponent as BigGlobeIcon } from "src/shared/assets/globe-2.svg";
import { ReactComponent as UserIcon } from "src/shared/assets/user-icon.svg";
import { ReactComponent as CancelIcon } from "src/shared/assets/cancel.svg";
import { useInput } from "src/shared/hooks/useInput";
import useApi from "src/shared/hooks/useApi";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { colors } from "src/shared/styles/colors";

interface InviteeStyled {
  name: string;
  email: string;
}

const Step51: React.FC<StepProps> = data => {
  const [showWhoops, setShowWhoops] = useState();
  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("trip/inviteTripGuests", "post");
  const [invitees, setInvitees] = useState<InviteeStyled[]>([]);
  const [travelerEmails, setTravelerEmails] = useState<string[]>([]);
  const [error, setError] = useState(false)
  const [guest, setGuests] = useState<any>([]);
  const firstNameInput = useInput();
  const lastNameInput = useInput();
  const emailInput = useInput();
  const smallScreen = useMediaQuery("SM");

  useEffect(() => {
  }, [smallScreen])


  const createTrip = useCallback(params => {
    if (params.tripGuests.length) {

      return dispatch({ type: "CREATE_TRIP", payload: { params } })
    }
  },
    [dispatch]
  );
  useEffect(() => {
    if (!state.api) return;
    setTrip(state.data)
  }, [state.api, state]);

  const setTrip = useCallback(
    (trip) => {
      if (trip.trip) {
        tripDispatch({ type: "UPDATE_NEW_TRIP", payload: trip });
        goForward();
      }
    },
    [tripDispatch]
  );

  const goForward = useCallback(() => {
    handleNext("Confirm");
  }, [handleNext]);

  const goBack = useCallback(() => {
    handleBack("Step5");
  }, [handleBack]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(()=>{
    scrollToTop()
  },[])
  if (!newTrip) return null;

  if (showWhoops) {
    return (
      <Whoops
        icon={BigGlobeIcon}
        onGoBack={() => setShowWhoops(false)}
        message="We don’t currently support this option, but it’s coming shortly!"
      />
    )
  }
  const handleAdd = () => {

    if (newTrip) {
      createTrip({
        // tripGuestId :newTrip.tripGuest.id,
        tripId: newTrip.trip.id,
        // tripLegId: cities[selected].id,
        travelerEmails: travelerEmails,
        tripGuests: guest
      })
    }
    // goForward()
  }

  const onAddInvite = () => {
    if (!firstNameInput.error && !lastNameInput.error && !emailInput.error) {
      setError(false)
      setTravelerEmails([...travelerEmails, emailInput.value]);
      setInvitees([...invitees, {
        name: firstNameInput.value + " " + lastNameInput.value,
        email: emailInput.value
      }]);
      setGuests([...guest, {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value
      }]);
      firstNameInput.setValue('');
      lastNameInput.setValue('');
      emailInput.setValue('');
    } else {
      setError(true)
    }
  };

  const onRemoveInvite = (value: object) => {
    setInvitees(
      invitees.filter(person => {
        return person !== value;
      })
    );
  };

  return (
    <ContainerStyled>
      <QuestionStyled>
        Let’s invite them!
      </QuestionStyled>

      <BackButtonStyled onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>

      <InputWrapperStyled>
        <Input
          {...firstNameInput}
          label="FIRST NAME"
        />
        <Input
          {...lastNameInput}
          label="LAST NAME"
        />
        <Input
          {...emailInput}
          type="email"
          label="EMAIL ADDRESS"
        />
        {/* {samll ?} */}
        {smallScreen ? (
          <div
          style={{width: "100%", display: "flex"}}

          >
        <button
          style={{
            width: '50%',
            backgroundColor: colors.white,
            borderRadius: '4px',
            border: "solid 1px #0088e4",
            color: '#0088e4',
            margin: '0 10px',
            padding: '10px 0'

          }}
          onClick={() => onAddInvite()}

        >
          Add
        </button>
        <button
         style={{
          width: '50%',
          backgroundColor: colors.white,
          borderRadius: '4px',
          border: "solid 1px #f85353",
          color: '#f85353',
          margin: '0 10px',
          padding: '10px 0'

        }}
        onClick={() => {
          setError(false)
          firstNameInput.setValue('');
          lastNameInput.setValue('');
          emailInput.setValue('');
        }}
        
        >
          Cancel
        </button>
        </div>
        ) :
          <div style={{ display: "flex", justifyContent: 'space-evenly' }}>
            <AddIcon
              style={{
                width: smallScreen ? "100%" : "75px",
                // marginTop: "11px",
              }}
              className={firstNameInput.value && lastNameInput.value && emailInput.value && "Colortrue"}
              onClick={() => onAddInvite()}

            />
            <AddIcon
              style={{
                width: smallScreen ? "100%" : "75px",
                // marginTop: "11px",
                // marginLeft: "10px",
                transform: 'rotate(45deg)'
              }}
              className={"exButon"}
              onClick={() => {
                setError(false)
                firstNameInput.setValue('');
                lastNameInput.setValue('');
                emailInput.setValue('');
              }}

            />
          </div>

        }

      </InputWrapperStyled>
      {error && (
        <HelpSpeechContainerStyled
          style={{
            overflow: 'hidden',
            transition: "max-height 1s",
          }}>
          <img src={AvatarURL} />
          <p>Please Enter First Name , Last Name & Correct Email </p>
        </HelpSpeechContainerStyled>
      )}
      <CityCardStyled>
        {invitees.map((value, index) => (
          <RectanguleShadow width="100%">
            <UserIcon />
            <UserDetailWrapper >
              <NameStyled >
                {value.name}
              </NameStyled>
              <EmailStyled>
                {value.email}
              </EmailStyled>
            </UserDetailWrapper>
            <CancelIcon
              onClick={() => onRemoveInvite(value)} />
          </RectanguleShadow>
        ))}
      </CityCardStyled>

      {invitees.length > 0 &&
        <HelpSpeechContainerStyled width="50%">
          <img src={AvatarURL} alt="Maya" />
          <p>Your recipients will have 7 days to respond to their invite before it expires, etc.</p>
        </HelpSpeechContainerStyled>}{}
      <Button
        glow
        onClick={handleAdd}
        width={smallScreen ? '90%' : "184px"}
        style={{
          margin: "10px 0px"
        }}
        disabled={!invitees.length}
      >
        {invitees.length > 0 ? "Send Invites" : "Suggest New"}
      </Button>
    </ContainerStyled>
  );
};

export default Step51;
