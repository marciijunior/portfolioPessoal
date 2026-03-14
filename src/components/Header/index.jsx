import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";

import "./Header.css";

const PRESET_COLORS = [
  { hex: "#ff4d05", label: "Laranja" },
  { hex: "#e63946", label: "Vermelho" },
  { hex: "#f72585", label: "Rosa" },
  { hex: "#b5179e", label: "Magenta" },
  { hex: "#7209b7", label: "Roxo" },
  { hex: "#3a86ff", label: "Azul" },
  { hex: "#06d6a0", label: "Verde" },
  { hex: "#ffd60a", label: "Amarelo" },
  { hex: "#00b4d8", label: "Ciano" },
  { hex: "#ff6b35", label: "Tangerina" },
];

/* ── Conversões de cor ── */
function hexToHsv(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
}

function hsvToHex(h, s, v) {
  h = h / 360;
  s = s / 100;
  v = v / 100;
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hueToHex(h) {
  return hsvToHex(h, 100, 100);
}

export default function Header({ sectionRef, onNavigate }) {
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const headlineRef = useRef(null);
  const portraitRef = useRef(null);
  const marqueeRef = useRef(null);
  const ctaRef = useRef(null);
  const panelRef = useRef(null);
  const colorWheelRef = useRef(null);
  const svAreaRef = useRef(null);
  const hueBarRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
  const [hsv, setHsv] = useState({ h: 16, s: 98, v: 100 }); // ~#ff4d05
  const [activeColor, setActiveColor] = useState("#ff4d05");
  const draggingRef = useRef(null); // "sv" | "hue" | "panel" | null
  const panelDragOffset = useRef({ x: 0, y: 0 });

  const applyColor = useCallback((hex) => {
    document.documentElement.style.setProperty("--cor1", hex);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    document.documentElement.style.setProperty(
      "--cor1-rgb",
      `${r}, ${g}, ${b}`,
    );
    setActiveColor(hex);
  }, []);

  const applyFromHsv = useCallback(
    (h, s, v) => {
      const hex = hsvToHex(h, s, v);
      applyColor(hex);
    },
    [applyColor],
  );

  const handleSvInteraction = useCallback(
    (clientX, clientY) => {
      const rect = svAreaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const s = (x / rect.width) * 100;
      const v = 100 - (y / rect.height) * 100;
      setHsv((prev) => ({ ...prev, s, v }));
      applyFromHsv(hsv.h, s, v);
    },
    [hsv.h, applyFromHsv],
  );

  const handleHueInteraction = useCallback(
    (clientX) => {
      const rect = hueBarRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const h = (x / rect.width) * 360;
      setHsv((prev) => ({ ...prev, h }));
      applyFromHsv(h, hsv.s, hsv.v);
    },
    [hsv.s, hsv.v, applyFromHsv],
  );

  // Drag handlers
  useEffect(() => {
    const handleMove = (e) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      if (draggingRef.current === "sv") handleSvInteraction(cx, cy);
      else if (draggingRef.current === "hue") handleHueInteraction(cx);
      else if (draggingRef.current === "panel") {
        setPanelPos({
          top: cy - panelDragOffset.current.y,
          left: cx - panelDragOffset.current.x,
        });
      }
    };
    const handleUp = () => {
      draggingRef.current = null;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [handleSvInteraction, handleHueInteraction]);

  // Fechar painel ao clicar fora
  useEffect(() => {
    if (!panelOpen) return;
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest(".hero-color-wheel")
      ) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [panelOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      );

      tl.fromTo(
        ".hero-line",
        { y: 80, opacity: 0, skewY: 4 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
        },
        "-=0.2",
      );

      tl.fromTo(
        portraitRef.current,
        { x: 80, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
        "-=0.6",
      );

      tl.fromTo(
        ctaRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
        "-=0.3",
      );

      tl.fromTo(
        marqueeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "UI/UX Design",
    "Figma",
    "GSAP",
    "Tailwind",
    "PostgreSQL",
    "Git",
  ];

  return (
    <header
      id="inicio"
      ref={(el) => {
        headerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
    >
      {/* ── Navbar ── */}
      <nav className="navbar" ref={navRef} aria-label="Navegação principal">
        <div className="nav-logo">
          <img src="/logo.png" alt="Logo Marcio Junior" />
        </div>

        <ul className="nav-links">
          <li>
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("inicio");
              }}
            >
              Início
            </a>
          </li>
          <li>
            <a
              href="#sobre"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("sobre");
              }}
            >
              Sobre
            </a>
          </li>
          <li>
            <a
              href="#jornada"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("jornada");
              }}
            >
              Jornada
            </a>
          </li>
          <li>
            <a
              href="#tecnologias"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("tecnologias");
              }}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("portfolio");
              }}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#certificados"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("certificados");
              }}
            >
              Certificados
            </a>
          </li>
          <li>
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contato");
              }}
            >
              Contato
            </a>
          </li>
        </ul>

        <ul className="nav-social">
          <li>
            <a
              href="https://www.instagram.com/marciijunior/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/marciijunior"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/marciijunior"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/5518996741310?text=Olá!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-split">
          {/* Lado esquerdo: texto */}
          <div className="hero-content">
            <div className="hero-headline" ref={headlineRef}>
              <div className="hero-line">
                <span className="hero-outline-text">CRIAND</span>
                <span
                  className="hero-color-wheel"
                  ref={colorWheelRef}
                  onClick={() => {
                    if (!panelOpen && colorWheelRef.current) {
                      const rect = colorWheelRef.current.getBoundingClientRect();
                      setPanelPos({
                        top: rect.top + rect.height / 2,
                        left: rect.right + 16,
                      });
                    }
                    setPanelOpen((v) => !v);
                  }}
                  title="Clique para mudar a cor do site"
                >
                  O
                </span>

                {/* Painel de cores */}
                {panelOpen && (
                  <div
                    className="color-panel"
                    ref={panelRef}
                    style={{ top: panelPos.top, left: panelPos.left }}
                  >
                    <div
                      className="color-panel__header"
                      onMouseDown={(e) => {
                        if (e.target.closest(".color-panel__close")) return;
                        draggingRef.current = "panel";
                        panelDragOffset.current = {
                          x: e.clientX - panelPos.left,
                          y: e.clientY - panelPos.top,
                        };
                      }}
                      onTouchStart={(e) => {
                        if (e.target.closest(".color-panel__close")) return;
                        draggingRef.current = "panel";
                        panelDragOffset.current = {
                          x: e.touches[0].clientX - panelPos.left,
                          y: e.touches[0].clientY - panelPos.top,
                        };
                      }}
                    >
                      <span className="color-panel__title">Cor do site</span>
                      <button
                        className="color-panel__close"
                        onClick={() => setPanelOpen(false)}
                        aria-label="Fechar painel de cores"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    {/* Área de Saturação / Brilho */}
                    <div
                      className="color-panel__sv-area"
                      ref={svAreaRef}
                      style={{ "--sv-hue": hueToHex(hsv.h) }}
                      onMouseDown={(e) => {
                        draggingRef.current = "sv";
                        handleSvInteraction(e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        draggingRef.current = "sv";
                        handleSvInteraction(
                          e.touches[0].clientX,
                          e.touches[0].clientY,
                        );
                      }}
                    >
                      <div
                        className="color-panel__sv-thumb"
                        style={{
                          left: `${hsv.s}%`,
                          top: `${100 - hsv.v}%`,
                          background: activeColor,
                        }}
                      />
                    </div>

                    {/* Barra de Matiz */}
                    <div
                      className="color-panel__hue-bar"
                      ref={hueBarRef}
                      onMouseDown={(e) => {
                        draggingRef.current = "hue";
                        handleHueInteraction(e.clientX);
                      }}
                      onTouchStart={(e) => {
                        draggingRef.current = "hue";
                        handleHueInteraction(e.touches[0].clientX);
                      }}
                    >
                      <div
                        className="color-panel__hue-thumb"
                        style={{
                          left: `${(hsv.h / 360) * 100}%`,
                          background: hueToHex(hsv.h),
                        }}
                      />
                    </div>

                    {/* Cor ativa */}
                    <div className="color-panel__active-row">
                      <span
                        className="color-panel__active-preview"
                        style={{ background: activeColor }}
                      />
                      <span className="color-panel__active-hex">
                        {activeColor.toUpperCase()}
                      </span>
                    </div>

                    {/* Swatches */}
                    <div className="color-panel__swatches">
                      {PRESET_COLORS.map((c) => (
                        <button
                          key={c.hex}
                          className={`color-panel__swatch${activeColor.toLowerCase() === c.hex.toLowerCase() ? " color-panel__swatch--active" : ""}`}
                          style={{ "--swatch-color": c.hex }}
                          onClick={() => {
                            const newHsv = hexToHsv(c.hex);
                            setHsv(newHsv);
                            applyColor(c.hex);
                          }}
                          title={c.label}
                          aria-label={`Selecionar cor ${c.label}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="hero-line">
                <span className="hero-filled-text">EXPERIÊNCIAS</span>
              </div>
              <div className="hero-line">
                <span className="hero-accent-text">DIGITAIS</span>
              </div>
            </div>

            <div className="hero-bottom" ref={ctaRef}>
              <p className="hero-desc">
                Desenvolvedor Fullstack & Designer UI/UX
              </p>
              <div className="hero-actions">
                <a
                  href="/Curriculo_Marcio_Junior.pdf"
                  download="Curriculo-Marcio-Junior.pdf"
                  className="btn-hero-primary"
                >
                  Baixar Currículo
                  <span className="btn-hero-primary__icons">
                    <i className="fa-solid fa-arrow-down"></i>
                    <i className="fa-solid fa-download"></i>
                  </span>
                </a>
                <a
                  href="#portfolio"
                  className="btn-hero-ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("portfolio");
                  }}
                >
                  Explorar Projetos
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Lado direito: retrato full-height */}
          <div className="hero-portrait-wrapper" ref={portraitRef}>
            <img
              src="/fotoPessoal.png"
              alt="Foto de Marcio Junior"
              className="hero-portrait-img"
            />
          </div>
        </div>

        {/* Marquee de tecnologias */}
        <div className="hero-marquee-wrapper" ref={marqueeRef}>
          <div className="hero-marquee">
            <div className="hero-marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span className="hero-marquee-item" key={i}>
                  {item}
                  <span className="hero-marquee-sep">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
