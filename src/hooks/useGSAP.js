import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export const useGSAP = (animationCallback, deps = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      animationCallback(containerRef.current);
    }, containerRef);

    return () => ctx.revert();
  }, deps);

  return containerRef;
};
export const useScrollTriggerConfig = (scrollerSelector = ".content-wrapper") => {
  const getScrollerConfig = useCallback(
    (trigger, options = {}) => ({
      trigger,
      scroller: scrollerSelector,
      start: "top 85%",
      end: "bottom 20%",
      toggleActions: "play none none none",
      ...options,
    }),
    [scrollerSelector]
  );

  return { getScrollerConfig };
};
export const animateTextReveal = (element, options = {}) => {
  const {
    duration = 1,
    delay = 0,
    stagger = 0.03,
    scrollTrigger = null,
  } = options;

  const text = element.textContent;
  element.textContent = "";
  element.style.visibility = "visible";

  const chars = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.opacity = "0";
    element.appendChild(span);
    return span;
  });

  return gsap.fromTo(
    chars,
    { opacity: 0, y: 20, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      delay,
      stagger,
      ease: "back.out(1.7)",
      scrollTrigger,
    }
  );
};
export const useMagneticEffect = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return elementRef;
};

export { gsap, ScrollTrigger };
