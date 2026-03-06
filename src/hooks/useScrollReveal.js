import { useRef, useEffect } from "react";
import ScrollReveal from "scrollreveal";

export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);
  const optionsJSON = JSON.stringify(options);

  useEffect(() => {
    const currentElement = elementRef.current;

    if (currentElement && typeof ScrollReveal !== 'undefined') {
      const sr = ScrollReveal();

      sr.reveal(currentElement, JSON.parse(optionsJSON));
    }
  }, [optionsJSON]);

  return elementRef;
};