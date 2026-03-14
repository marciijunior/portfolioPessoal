import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./TechStack.css";

gsap.registerPlugin(ScrollTrigger);

const categoryMeta = {
  frontend: { icon: "fa-solid fa-code", label: "Frontend" },
  backend: { icon: "fa-solid fa-server", label: "Backend" },
  design: { icon: "fa-solid fa-palette", label: "Design" },
  ferramentas: { icon: "fa-solid fa-wrench", label: "Ferramentas" },
};

export default function Tecnologias({ sectionRef, techStackData }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".tech-glow-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: trigger },
      );

      gsap.fromTo(
        ".tech-label",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".tech-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".tech-subtitle",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".tech-bento-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tech-bento-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".tech-chip",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          stagger: 0.03,
          delay: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".tech-bento-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderBentoCard = (key) => {
    const meta = categoryMeta[key];
    const techs = techStackData[key];

    return (
      <div key={key} className={`tech-bento-card tech-bento-${key}`}>
        <div className="tech-bento-header">
          <i className={`${meta.icon} tech-bento-icon`}></i>
          <h3 className="tech-bento-title">{meta.label}</h3>
          <span className="tech-bento-count">{techs.length}</span>
        </div>
        <div className="tech-chips-wrap">
          {techs.map((tech, i) => (
            <span key={i} className="tech-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="tecnologias"
      ref={(el) => {
        containerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
      className="tech-section"
    >
      {/* Glow line decorativa */}
      <div className="tech-glow-line"></div>

      {/* Label editorial */}
      <span className="tech-label">04 / Stack</span>

      {/* Cabeçalho */}
      <h2 className="tech-title">
        <span className="tech-quote-mark">&ldquo;</span>
        Tecnologias e Ferramentas
      </h2>
      <p className="tech-subtitle">
        As ferramentas e linguagens que mais utilizo.
      </p>

      {/* Bento Grid */}
      <div className="tech-bento-grid">
        {renderBentoCard("frontend")}
        {renderBentoCard("backend")}
        {renderBentoCard("design")}
        {renderBentoCard("ferramentas")}
      </div>
    </section>
  );
}
