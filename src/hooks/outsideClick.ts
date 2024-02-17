import { LegacyRef, useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>();
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return ref as LegacyRef<HTMLDivElement>;
};
export default useOutsideClick;
