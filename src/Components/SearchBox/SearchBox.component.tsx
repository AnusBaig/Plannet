import React from "react";
import { ReactComponent as SearchIcon } from "src/shared/assets/search.svg";
import { SearchBoxStyled, SearchInputStyled } from "./SearchBox.styled";

interface SearchBoxProps {
  placeholder: string;
  onChange?: ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = props => {
  return (
    <SearchBoxStyled>
      <SearchInputStyled {...props} />
      <SearchIcon />
    </SearchBoxStyled>
  );
};

export default SearchBox;
