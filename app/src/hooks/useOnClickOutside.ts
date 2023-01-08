import type { RefObject } from "react";
import { useEffect } from "react";

function useOnClickOutside(ref: any, handler: (event?: any) => void) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    window.addEventListener("click", listener);
    window.addEventListener("touchstart", listener);
    return () => {
      window.removeEventListener("click", listener);
      window.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
export default useOnClickOutside;
