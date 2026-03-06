import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio({
  sectionRef,
  portfolioData,
  onProjectClick,
}) {
  const [expandedId, setExpandedId] = useState(portfolioData[0]?.id || null);
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector('.titulo-portfolio');
      const text = containerRef.current?.querySelector('.texto-portfolio');
      const cards = containerRef.current?.querySelectorAll('.portfolio-card');

      if (title) {
        gsap.fromTo(
          title,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (text) {
        gsap.fromTo(
          text,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            delay: 0.3,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        cards.forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -5,
              boxShadow: "0px 20px 50px -5px rgba(255, 77, 5, 0.2)",
              duration: 0.4,
              ease: "power2.out",
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
              duration: 0.4,
              ease: "power2.out",
            });
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (e, project) => {
    if (expandedId === project.id) {
      onProjectClick(project);
      return;
    }

    const card = e.currentTarget;
    gsap.fromTo(
      card,
      { scale: 0.98 },
      {
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.4)",
      }
    );

    setExpandedId(project.id);

    setTimeout(() => {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }, 400);
  };

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
        <p className="texto-portfolio">Trabalhos realizados em minha carreira</p>
      </div>

      <div className="flex-cards-container" ref={cardsContainerRef}>
        {portfolioData.map((project, index) => (
          <div
            key={project.id}
            className={`portfolio-card ${expandedId === project.id ? "is-expanded" : ""}`}
            onClick={(e) => handleCardClick(e, project)}
          >
            <div className="portfolio-img-container">
              <img
                src={project.imageSrc}
                alt={`Imagem do projeto ${project.title}`}
                className="portfolio-card-img"
              />
            </div>

            <div className="card-row">
              <div className="card-icon">{index + 1}</div>
              <div className="card-description">
                <h4>{project.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
