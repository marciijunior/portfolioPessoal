import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Certificates.css";

gsap.registerPlugin(ScrollTrigger);

const categoryMap = {
  Todos: () => true,
  "HTML & CSS": (t) => /html|css|acessibilidade/i.test(t),
  JavaScript: (t) => /javascript|lógica/i.test(t),
  "React & Node": (t) => /react|node/i.test(t),
  Outros: (t) =>
    !/html|css|acessibilidade|javascript|lógica|react|node/i.test(t),
};

const categoryIcons = {
  Todos: "fa-solid fa-layer-group",
  "HTML & CSS": "fa-brands fa-html5",
  JavaScript: "fa-brands fa-js",
  "React & Node": "fa-brands fa-react",
  Outros: "fa-solid fa-graduation-cap",
};

export default function Certificados({ sectionRef, certificatesData }) {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const predicate = categoryMap[activeFilter];
    return certificatesData.filter((c) => predicate(c.title));
  }, [activeFilter, certificatesData]);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".cert-glow-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: trigger },
      );

      gsap.fromTo(
        ".cert-label",
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
        ".cert-title",
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
        ".cert-subtitle",
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
        ".cert-open-btn",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: trigger,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ── Animate cards when opened or filter changes ── */
  useEffect(() => {
    if (!open) return;
    const cards = containerRef.current?.querySelectorAll(".cert-card");
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      },
    );
  }, [activeFilter, open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
  };

  return (
    <section
      id="certificados"
      ref={(el) => {
        containerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
      className="container-certificados"
    >
      {/* ── Linha glow decorativa ── */}
      <div className="cert-glow-line"></div>

      {/* ── Label editorial ── */}
      <span className="cert-label">06 / Certificados</span>

      {/* ── Cabeçalho ── */}
      <h2 className="cert-title">
        <span className="cert-quote-mark">&ldquo;</span>
        Certificados e Cursos
      </h2>
      <p className="cert-subtitle">
        Algumas das minhas certificações e cursos mais recentes.
      </p>

      {/* ── Botão para abrir/fechar ── */}
      <button className="cert-open-btn" onClick={handleToggle}>
        <i className={`fa-solid ${open ? "fa-xmark" : "fa-certificate"}`}></i>
        <span>
          {open
            ? "Fechar"
            : `Ver certificados (${certificatesData.length})`}
        </span>
        <i className={`fa-solid fa-chevron-${open ? "up" : "down"} cert-open-btn__arrow`}></i>
      </button>

      {/* ── Painel expansível ── */}
      {open && (
        <div className="cert-panel" ref={gridRef}>
          {/* Filtros */}
          <div className="cert-filters">
            {Object.keys(categoryMap).map((cat) => (
              <button
                key={cat}
                className={`cert-filter-btn${activeFilter === cat ? " cert-filter-btn--active" : ""}`}
                onClick={() => handleFilterChange(cat)}
              >
                <i className={categoryIcons[cat]}></i>
                {cat}
              </button>
            ))}
          </div>

          {/* Contador */}
          <div className="cert-counter">
            <span className="cert-counter-num">{filtered.length}</span>
            <span className="cert-counter-label">
              {filtered.length === 1 ? "certificado" : "certificados"}
              {activeFilter !== "Todos" && ` em ${activeFilter}`}
            </span>
          </div>

          {/* Grid */}
          <div className="cert-grid">
            {filtered.map((cert, index) => {
              const num = String(index + 1).padStart(2, "0");
              return (
                <a
                  key={index}
                  href={cert.pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card"
                >
                  <div className="cert-card__visual">
                    <img
                      src={cert.thumbnailSrc}
                      alt={`Certificado de ${cert.title}`}
                      className="cert-card__img"
                      loading="lazy"
                    />
                    <div className="cert-card__overlay">
                      <span className="cert-card__view-btn">
                        <i className="fa-solid fa-file-pdf"></i>
                        Ver Certificado
                      </span>
                    </div>
                    <span className="cert-card__number">{num}</span>
                  </div>
                  <div className="cert-card__body">
                    <h4 className="cert-card__title">{cert.title}</h4>
                    <div className="cert-card__meta">
                      <i className="fa-solid fa-building cert-card__meta-icon"></i>
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
