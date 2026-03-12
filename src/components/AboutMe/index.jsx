import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutMe.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe({ sectionRef }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = containerRef.current?.querySelectorAll(
        ".about-me-image img",
      );
      const title = containerRef.current?.querySelector(".about-me-title");
      const subtitle =
        containerRef.current?.querySelector(".about-me-subtitle");
      const paragraphs = containerRef.current?.querySelectorAll(
        ".about-me-text p:not(.about-me-subtitle)",
      );

      const startGentleFloat = (image, direction = -1, duration = 3.6) => {
        gsap.to(image, {
          y: direction * 4,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      };

      if (images?.length) {
        gsap.fromTo(
          images[0],
          { y: 100, opacity: 0, scale: 0.8, rotate: -5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            onComplete: () => startGentleFloat(images[0], -1, 3.6),
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );

        gsap.fromTo(
          images[1],
          { y: -100, opacity: 0, scale: 0.8, rotate: 3 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            delay: 0.15,
            ease: "power3.out",
            onComplete: () => startGentleFloat(images[1], 1, 4),
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );

        gsap.fromTo(
          images[2],
          { y: 100, opacity: 0, scale: 0.8, rotate: -3 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            onComplete: () => startGentleFloat(images[2], -1, 4.4),
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (title) {
        gsap.fromTo(
          title,
          { x: 80, opacity: 0, skewX: -5 },
          {
            x: 0,
            opacity: 1,
            skewX: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (paragraphs?.length) {
        gsap.fromTo(
          paragraphs,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={(el) => {
        containerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
    >
      <div className="about-me-content">
        <div className="about-me-image">
          <img
            className="about-me-image1"
            src="/foto-about-me.webp"
            alt="Foto de Marcio Junior"
            loading="lazy"
          />
          <img
            className="about-me-image2"
            src="/foto-about-me.webp"
            alt="Foto de Marcio Junior"
            loading="lazy"
          />
          <img
            className="about-me-image3"
            src="/foto-about-me.webp"
            alt="Foto de Marcio Junior"
            loading="lazy"
          />
        </div>
        <div className="about-me-text">
          <h2 className="about-me-title">Sobre Mim</h2>
          <p className="about-me-subtitle">
            Estudante de Engenharia de Computação, 23 anos.
          </p>
          <p>
            Meu nome é Márcio. Desde sempre, o apelo visual das coisas me
            fascina, mas minha verdadeira curiosidade está em entender como elas
            se conectam e funcionam por dentro.
          </p>
          <p>
            Meu objetivo é transformar essa visão em realidade, desenvolvendo
            projetos onde a engenharia robusta e o design cuidadoso andam lado a
            lado.
          </p>
        </div>
      </div>
    </section>
  );
}
