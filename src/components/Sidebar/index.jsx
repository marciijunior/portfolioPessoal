import { useRef, useEffect } from "react";
import { gsap } from "gsap";

import "./Sidebar.css";

const navLinks = [
  { id: "inicio", icon: "fa-house" },
  { id: "sobre", icon: "fa-user" },
  { id: "jornada", icon: "fa-route" },
  { id: "tecnologias", icon: "fa-microchip" },
  { id: "portfolio", icon: "fa-image" },
  { id: "certificados", icon: "fa-certificate" },
  { id: "contato", icon: "fa-envelope" },
];

export default function Sidebar({ onNavigate, activeSection }) {
  const navRef = useRef(null);
  const sidebarRef = useRef(null);
  const linkRefs = useRef({});
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !sidebarRef.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 1.5,
          ease: "back.out(1.7)",
        },
      );

      const links = sidebarRef.current.querySelectorAll(".nav-link");
      gsap.fromTo(
        links,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 1.8,
          ease: "back.out(2)",
        },
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const activeLink = linkRefs.current[activeSection];
    if (activeLink && navRef.current) {
      const top = activeLink.offsetTop;
      navRef.current.style.setProperty("--highlight-top", `${top}px`);

      const icon = activeLink.querySelector(".nav-link i");
      if (icon) {
        gsap.fromTo(
          icon,
          { rotate: -15, scale: 0.8 },
          {
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
        );
      }
    }
  }, [activeSection]);

  return (
    <nav className="sidebar" ref={sidebarRef}>
      <ul className="sidebar-nav" ref={navRef}>
        {navLinks.map((link) => (
          <li key={link.id} ref={(el) => (linkRefs.current[link.id] = el)}>
            <a
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.id);
              }}
              aria-label={link.id}
            >
              <i className={`fa-solid ${link.icon}`}></i>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
