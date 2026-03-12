import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = containerRef.current?.querySelector(".portfolio-header");
      const cards = containerRef.current?.querySelectorAll(
        ".portfolio-showcase-card",
      );

      if (header) {
        gsap.fromTo(
          header,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (cards?.length) {
        cards.forEach((card, i) => {
          const isEven = i % 2 === 1;
          gsap.fromTo(
            card,
            { x: isEven ? 80 : -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        });
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
      className="container-portfolio"
    >
      <div className="interligacao-portfolio">
        <h2 className="titulo-portfolio">Portfólio</h2>
        <p className="texto-portfolio">
          Trabalhos realizados em minha carreira
        </p>
      </div>

      <div className="portfolio-showcase">
        {portfolioData.map((project, index) => (
          <article
            key={project.id}
            className={`portfolio-showcase-card ${index % 2 === 1 ? "reverse" : ""}`}
          >
            <div
              className="showcase-image-wrapper"
              onClick={() => onProjectClick(project)}
            >
              <div className="showcase-image-inner">
                <img
                  src={project.imageSrc}
                  alt={`Projeto ${project.title}`}
                  className="showcase-image"
                  loading="lazy"
                />
                <div className="showcase-image-overlay">
                  <span className="showcase-view-label">
                    <i className="fa-solid fa-expand"></i> Ver Projeto
                  </span>
                </div>
              </div>
              <div className="showcase-number">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="showcase-info">
              <div className="showcase-info-inner">
                <h3 className="showcase-title">{project.title}</h3>
                <p className="showcase-description">{project.description}</p>

                <div className="showcase-tech-list">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="showcase-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="showcase-actions">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-btn showcase-btn-primary"
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
                      className="showcase-btn showcase-btn-secondary"
                    >
                      <i className="fa-brands fa-github"></i>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
