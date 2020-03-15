import { BREAKPOINTS } from "src/constants";

const getRule = (bp: number) => `@media screen and (min-width: ${bp + 1}px)`;
const getRule2 = (bp: number) => `@media screen and (max-width: ${bp}px)`;


const mediaQueries = {
  xxs: getRule(BREAKPOINTS.XXS),
  xs: getRule(BREAKPOINTS.XS),
  sm: getRule(BREAKPOINTS.SM),
  md: getRule(BREAKPOINTS.MD),
  lg: getRule(BREAKPOINTS.LG),
  mobile: getRule2(BREAKPOINTS.MOBILE),
  smallMobile: getRule2(BREAKPOINTS.SMALL_MOBILE),
};

export { mediaQueries };
