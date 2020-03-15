import React from "react";
import { TableStyled } from "./Table.styled";

const Table: React.FC<{ style?: React.CSSProperties }> = props => {
  return <TableStyled {...props} />;
};
export default Table;
