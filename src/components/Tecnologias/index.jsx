import { useEffect, useRef } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TechStack.css";

gsap.registerPlugin(ScrollTrigger);

export default function Tecnologias({ sectionRef, techStackData }) {
  const isCarouselView = useMediaQuery("(max-width: 1200px)");
  const containerRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector(".titulo-tech");
      const text = containerRef.current?.querySelector(".texto-tech");
      const columns = containerRef.current?.querySelectorAll(
        ".tech-category-column",
      );
      const techItems = containerRef.current?.querySelectorAll(".tech-item");

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
          },
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
          },
        );
      }

      if (columns?.length) {
        gsap.fromTo(
          columns,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.3,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (techItems?.length) {
        gsap.fromTo(
          techItems,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            delay: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isCarouselView]);

  const renderCategoryColumn = (title, techs) => (
    <div className="tech-category-column">
      <h3>{title}</h3>
      <div className="tech-items-list">
        {techs.map((tech, index) => (
          <span key={index} className="tech-item">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="tecnologias"
      ref={(el) => {
        containerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
      className="tech-stack-section"
    >
      <div className="interligacao-tech">
        <h2 className="titulo-tech">Tecnologias e Ferramentas</h2>
        <p className="texto-tech">
          As ferramentas e linguagens que mais utilizo.
        </p>
      </div>

      <div className="tech-stack-container">
        {isCarouselView ? (
          <div className="tech-carousel-wrapper">
            <div className="tech-carousel">
              <Slider {...settings}>
                {renderCategoryColumn("Frontend", techStackData.frontend)}
                {renderCategoryColumn("Backend", techStackData.backend)}
                {renderCategoryColumn("Design", techStackData.design)}
                {renderCategoryColumn("Ferramentas", techStackData.ferramentas)}
              </Slider>
            </div>
          </div>
        ) : (
          <>
            {renderCategoryColumn("Frontend", techStackData.frontend)}
            {renderCategoryColumn("Backend", techStackData.backend)}
            {renderCategoryColumn("Design", techStackData.design)}
            {renderCategoryColumn("Ferramentas", techStackData.ferramentas)}
          </>
        )}
      </div>
    </section>
  );
}
