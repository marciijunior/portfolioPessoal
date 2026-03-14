import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutMe.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe({ sectionRef }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      /* section label */
      gsap.fromTo(
        ".about-label",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: trigger },
      );

      /* fotos com blur */
      const photos = containerRef.current?.querySelectorAll(".about-photo");
      if (photos?.length) {
        gsap.fromTo(
          photos[0],
          { y: 80, opacity: 0, scale: 0.85, rotate: -4 },
          {
            y: 0, opacity: 1, scale: 1, rotate: 0,
            duration: 1, ease: "power3.out",
            onComplete: () => gsap.to(photos[0], { y: -4, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            scrollTrigger: trigger,
          },
        );
        gsap.fromTo(
          photos[1],
          { y: -80, opacity: 0, scale: 0.85, rotate: 3 },
          {
            y: 0, opacity: 1, scale: 1, rotate: 0,
            duration: 1, delay: 0.15, ease: "power3.out",
            onComplete: () => gsap.to(photos[1], { y: 4, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            scrollTrigger: trigger,
          },
        );
        gsap.fromTo(
          photos[2],
          { y: 80, opacity: 0, scale: 0.85, rotate: -3 },
          {
            y: 0, opacity: 1, scale: 1, rotate: 0,
            duration: 1, delay: 0.3, ease: "power3.out",
            onComplete: () => gsap.to(photos[2], { y: -4, duration: 4.4, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            scrollTrigger: trigger,
          },
        );
      }

      /* quote */
      gsap.fromTo(
        ".about-quote",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: "expo.out", scrollTrigger: trigger },
      );

      /* parágrafos */
      gsap.fromTo(
        ".about-paragraph",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, delay: 0.4, ease: "power2.out", scrollTrigger: trigger },
      );

      /* bento cards */
      gsap.fromTo(
        ".about-bento-card",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-bento",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      /* linha gradient pulse */
      gsap.fromTo(
        ".about-glow-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: trigger },
      );
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
      {/* ── Linha glow decorativa ── */}
      <div className="about-glow-line"></div>

      {/* ── Label editorial ── */}
      <span className="about-label">02 / Sobre</span>

      {/* ── Split: foto + texto ── */}
      <div className="about-split">
        {/* Fotos com blur */}
        <div className="about-photo-col">
          <img
            src="/foto-about-me.webp"
            alt="Foto de Marcio Junior"
            className="about-photo about-photo-1"
            loading="lazy"
          />
          <img
            src="/foto-about-me.webp"
            alt="Foto de Marcio Junior"
            className="about-photo about-photo-2"
            loading="lazy"
          />
          <img
            src="/foto-about-me.webp"
            alt="Foto de Marcio Junior"
            className="about-photo about-photo-3"
            loading="lazy"
          />
        </div>

        {/* Conteúdo lado direito */}
        <div className="about-text-col">
          {/* Quote destaque */}
          <blockquote className="about-quote">
            <span className="about-quote-mark">&ldquo;</span>
            Sou fascinado pelo design!
          </blockquote>

          <p className="about-paragraph">
            Meu nome é Márcio, tenho 23 anos e sou estudante de Engenharia de
            Computação. O apelo visual das coisas sempre me fascinou, mas o que
            realmente me move é a engenharia por trás delas.
          </p>
          <p className="about-paragraph">
            Meu objetivo é transformar essa visão em realidade, criando
            projetos onde código robusto e design cuidadoso caminham lado a
            lado.
          </p>
        </div>
      </div>

      {/* ── Bento grid ── */}
      <div className="about-bento">
        <div className="about-bento-card about-bento-location">
          <i className="fa-solid fa-location-dot about-bento-icon"></i>
          <span className="about-bento-value">Araçatuba, Brasil</span>
          <span className="about-bento-key">Localização</span>
        </div>

        <div className="about-bento-card about-bento-education">
          <i className="fa-solid fa-graduation-cap about-bento-icon"></i>
          <span className="about-bento-value">Eng. de Computação</span>
          <span className="about-bento-key">Em Formação</span>
        </div>

        <div className="about-bento-card about-bento-focus">
          <i className="fa-solid fa-crosshairs about-bento-icon"></i>
          <span className="about-bento-value">Fullstack & UI/UX</span>
          <span className="about-bento-key">Foco atual</span>
        </div>

        <div className="about-bento-card about-bento-stack">
          <i className="fa-solid fa-layer-group about-bento-icon"></i>
          <span className="about-bento-value">React · JavaScript · Figma</span>
          <span className="about-bento-key">Stack favorita</span>
        </div>
      </div>
    </section>
  );
}
