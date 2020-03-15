import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { colors } from "src/shared/styles/colors";

const TableStyled = styled.div`
padding: 25px 0px;
${mediaQueries.sm} {
    padding: 25px;
    }
`;

const NewLocationButtonStyled = styled.button`
    // width: 125px; 
    height: 43px; 
    // font-size: 12px; 
    color: white;
    background-color: #1285d8;
    outline: none;
    border: 0;
    padding: 5px 10px;
    border-radius: 4px;
    margin: 20px auto 0px;
    // margin-right: 26px;
    // float: right;
    text-transform: uppercase;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    cursor: pointer;
    line-height: 1.33;
    letter-spacing: 0.1px;
    text-align: center;
`;

const DeleteButtonStyled = styled.button`
    border: 0; 
    color: ${colors.coralTwo};
    font-size: 14px;
    font-weight: 500;
    background-color: ${colors.white};
    outline: none; 
    cursor: pointer;
    margin-left: 10px;
`;

export {
    TableStyled,
    DeleteButtonStyled,
    NewLocationButtonStyled
};
