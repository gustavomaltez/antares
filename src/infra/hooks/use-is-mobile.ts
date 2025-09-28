import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  function onChange() {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mediaQueryList.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
