import { useLayoutEffect } from "react";

function useLockBodyScroll() {
  //@ts-ignore
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = originalStyle);
  }, []);
}

export default useLockBodyScroll;
