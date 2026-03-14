import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Portfolio.css";
import "./Modal.css";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio({
  sectionRef,
  portfolioData,
  onProjectClick,
}) {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".portfolio-glow-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: trigger },
      );

      gsap.fromTo(
        ".portfolio-label",
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
        ".portfolio-heading",
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
        ".portfolio-subtitle",
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

      const cards = containerRef.current?.querySelectorAll(".portfolio-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: trigger,
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={(el) => {
        containerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
      className="portfolio-section"
    >
      {/* ── Linha glow decorativa ── */}
      <div className="portfolio-glow-line" />

      {/* ── Label editorial ── */}
      <span className="portfolio-label">05 / Portfolio</span>

      {/* ── Cabeçalho ── */}
      <h2 className="portfolio-heading">
        <span className="portfolio-quote-mark">&ldquo;</span>
        Projetos Selecionados
      </h2>
      <p className="portfolio-subtitle">
        Uma curadoria dos trabalhos mais relevantes da minha trajetória.
      </p>

      {/* ── Grid compacto ── */}
      <div className="portfolio-grid">
        {portfolioData.map((project, index) => {
          const num = String(index + 1).padStart(2, "0");
          const isHovered = hoveredCard === index;
          return (
            <article
              key={project.id}
              className={`portfolio-card${index === 0 ? " portfolio-card--featured" : ""}${isHovered ? " portfolio-card--active" : ""}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="portfolio-card__visual"
                onClick={() => onProjectClick(project)}
              >
                <img
                  src={project.imageSrc}
                  alt={`Projeto ${project.title}`}
                  className="portfolio-card__img"
                  loading="lazy"
                />
                {index === 0 && (
                  <div className="portfolio-card__badge">
                    <span className="portfolio-card__badge-dot"></span>
                    Destaque
                  </div>
                )}
                <div className="portfolio-card__overlay">
                  <span className="portfolio-card__expand">
                    <i className="fa-solid fa-expand"></i>
                  </span>
                </div>
              </div>

              <div className="portfolio-card__info">
                <div className="portfolio-card__header">
                  <span className="portfolio-card__number">{num}</span>
                  <div className="portfolio-card__line"></div>
                </div>
                <h3 className="portfolio-card__title">{project.title}</h3>
                <div className="portfolio-card__techs">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="portfolio-card__tech">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="portfolio-card__actions">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-card__btn portfolio-card__btn--primary"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      Ver Site
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-card__btn portfolio-card__btn--secondary"
                    >
                      <i className="fa-brands fa-github"></i>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
