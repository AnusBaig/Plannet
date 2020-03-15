import { useState, useEffect } from "react";
import { BREAKPOINTS } from "src/constants";

type BreakpointName = "XS" | "SM" | "MD" | "LG" | "MOBILE";
type MediaQueries = { [P in BreakpointName]: string };

const getRule = (bp: BreakpointName) => `(max-width: ${BREAKPOINTS[bp]}px)`;

const mediaQueries: MediaQueries = {
  XS: getRule("XS"),
  SM: getRule("SM"),
  MD: getRule("MD"),
  LG: getRule("LG"),
  MOBILE: getRule("MOBILE"),

  
};

function useMediaQuery(breakpoint: BreakpointName = "XS") {
  const mqString = mediaQueries[breakpoint];
  const mqList = window.matchMedia(mqString);
  const [match, setMatch] = useState(mqList.matches);

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setMatch(event.matches);
    };
    mqList.addListener(listener);
    return () => mqList.removeListener(listener);
  }, [mqList]);

  return match;
}

export { useMediaQuery };
