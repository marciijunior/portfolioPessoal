import { useEffect, useRef, useCallback } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  const onMouseMove = useCallback((e) => {
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${isHovering.current ? 1.5 : 1})`;
  }, []);

  const onMouseEnterInteractive = useCallback(() => {
    isHovering.current = true;
    if (ringRef.current) {
      ringRef.current.classList.add("is-hovering");
      ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1.5)`;
    }
    if (dotRef.current) dotRef.current.classList.add("is-hovering");
  }, []);

  const onMouseLeaveInteractive = useCallback(() => {
    isHovering.current = false;
    if (ringRef.current) {
      ringRef.current.classList.remove("is-hovering");
      ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1)`;
    }
    if (dotRef.current) dotRef.current.classList.remove("is-hovering");
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    const addListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input[type='submit'], input[type='button'], .clickable, [onclick]",
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return interactives;
    };

    const elements = addListeners();

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [onMouseMove, onMouseEnterInteractive, onMouseLeaveInteractive]);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
