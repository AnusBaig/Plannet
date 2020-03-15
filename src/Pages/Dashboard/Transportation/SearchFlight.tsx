import React from "react";

import { RouteComponentProps } from "@reach/router";
import { IFrame } from "./searchFlight.styled";

const SearchFlight: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <IFrame  src="//whitelabel.travelpayouts.com/?host=flights.plannet.io&iframe=1" />
    </>
  );
};
export default SearchFlight;