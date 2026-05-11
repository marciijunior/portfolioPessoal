// Helpers de performance: detecta mobile / reduced-motion para
// pular animações pesadas (GSAP/ScrollTrigger) em dispositivos móveis.

const safeMatch = (query) => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
};

export const isMobileViewport = () => safeMatch("(max-width: 768px)");

export const prefersReducedMotion = () =>
  safeMatch("(prefers-reduced-motion: reduce)");

// Pulamos animações de entrada apenas quando o usuário pediu reduced-motion.
// Em mobile as animações GSAP voltam a rodar normalmente.
export const shouldSkipEntranceAnimations = () => prefersReducedMotion();

export const isHoverCapable = () =>
  safeMatch("(hover: hover) and (pointer: fine)");
