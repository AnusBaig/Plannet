import styled from "@emotion/styled/macro";

const AddActivityButton = styled.button`
   max-width: 160px;
    min-height: 48px;
    border-radius: 4px;
    background-color: #1285d8;
    font-family: Quicksand;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.25px;
    text-align: center;
    color: #fafbfd;
    border : none;
    outline : none;
    margin: 15px 46px;
    cursor:pointer
    `;
const TextPara = styled.p`
// width: 103px;
  min-height: 16px;
  font-family: Quicksand;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #292c3b;
  margin : 16px
`
const FilterDiv = styled.div`
    margin : 16px;
    width : 160px
`
const FilterInput = styled.input`
 max-width: 206px;
      outline: none;
      min-height: 40px;
      border-radius: 4px;
      border: solid 0.5px #a1a5a9c0;
      background-color: #ffffff;
      font-family: Quicksand;
      font-size: 15px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
    letter-spacing: 0.1px;
  color: #585858;
  padding : 0px 16px
`

const RadiobuttonTextTd = styled.td`
   max-width: 146px;
  min-height: 16px;
  font-family: Quicksand;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
`

export { AddActivityButton, TextPara, FilterDiv, FilterInput, RadiobuttonTextTd };
