import React from "react";

import { RouteComponentProps } from "@reach/router";
import { IFrame } from "../Transportation/Transportation.styled";

const SearchHotels: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <IFrame
        src="//whitelabel.travelpayouts.com/?host=accommodations.plannet.io&iframe=1"
      />
    </>
  );
};
export default SearchHotels;