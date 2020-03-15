import React, { useState, useCallback, useRef, useEffect } from "react";
import RectanguleShadow from "../RectanguleShadow";
import {
  DropdownMenuStyled,
  LinkStyled,
  MenuStyled
} from "./DropdownMenu.styled";

interface DropdownMenuProps {
  text: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ text, children }) => {
  const node = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = useCallback(
    () => setShowMenu(prevShowMenu => !prevShowMenu),
    []
  );

  const handleClick = useCallback(e => {
    if(!node || !node.current) return;
    //@ts-ignore
    if (node.current.contains(e.target)) {
      return;
    }

    setShowMenu(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => document.addEventListener("mousedown", handleClick);
  }, [handleClick]);

  return (
    <DropdownMenuStyled ref={node}>
      <LinkStyled onClick={handleShowMenu}>{text}</LinkStyled>
      {showMenu && (
        <MenuStyled>
          <RectanguleShadow width="100%" column>
            {children}
          </RectanguleShadow>
        </MenuStyled>
      )}
    </DropdownMenuStyled>
  );
};

export default DropdownMenu;
