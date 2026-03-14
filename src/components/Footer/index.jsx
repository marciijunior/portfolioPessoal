import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Início", id: "inicio" },
  { label: "Sobre", id: "sobre" },
  { label: "Tecnologias", id: "tecnologias" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Certificados", id: "certificados" },
  { label: "Contato", id: "contato" },
];

export default function Footer({ sectionRef }) {
  const footerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { name, email, message } = formData;
      const subject = encodeURIComponent(`Contato via Portfólio - ${name}`);
      const body = encodeURIComponent(
        `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      );
      window.open(
        `mailto:contato@marciojunior.dev?subject=${subject}&body=${body}`,
      );
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus(null), 4000);
    },
    [formData],
  );

  const scrollToTop = useCallback(() => {
    const container = document.querySelector(".content-wrapper");
    if (container) {
      gsap.to(container, { scrollTop: 0, duration: 1.2, ease: "power3.inOut" });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: footerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".contact-glow-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: trigger },
      );

      gsap.fromTo(
        ".contact-label",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: trigger },
      );

      gsap.fromTo(
        ".contact-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", scrollTrigger: trigger },
      );

      gsap.fromTo(
        ".contact-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power2.out", scrollTrigger: trigger },
      );

      const contactItems = footerRef.current?.querySelectorAll(".contact-info-item");
      if (contactItems?.length) {
        gsap.fromTo(
          contactItems,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.6, stagger: 0.1, delay: 0.2,
            ease: "power3.out",
            scrollTrigger: trigger,
          },
        );
      }

      gsap.fromTo(
        ".contact-form",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out", scrollTrigger: trigger },
      );

      const footerTrigger = {
        trigger: ".footer-bottom",
        start: "top 95%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".footer-glow-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "expo.out", scrollTrigger: footerTrigger },
      );

      gsap.fromTo(
        ".footer-brand",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: footerTrigger },
      );

      const footerNavLinks = footerRef.current?.querySelectorAll(".footer-nav-link");
      if (footerNavLinks?.length) {
        gsap.fromTo(
          footerNavLinks,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out", scrollTrigger: footerTrigger },
        );
      }

      const socialIcons = footerRef.current?.querySelectorAll(".footer-social-icon");
      if (socialIcons?.length) {
        gsap.fromTo(
          socialIcons,
          { y: 20, opacity: 0, scale: 0.5 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.5, stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: footerTrigger,
          },
        );
      }

      gsap.fromTo(
        ".footer-copyright",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out", scrollTrigger: footerTrigger },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contato"
      className="footer-container"
      ref={(el) => {
        footerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
    >
      {/* ══════ CONTACT SECTION ══════ */}
      <div className="contact-section">
        <div className="contact-glow-line"></div>

        <span className="contact-label">07 / Contato</span>

        <h2 className="contact-title">
          <span className="contact-quote-mark">&ldquo;</span>
          Vamos Trabalhar Juntos?
        </h2>
        <p className="contact-subtitle">
          Tem um projeto em mente ou quer trocar uma ideia? Entre em contato
          e vamos transformar sua visão em realidade.
        </p>

        <div className="contact-content">
          <div className="contact-info-grid">
            <a
              href="mailto:contato@marciojunior.dev"
              className="contact-info-item"
            >
              <div className="contact-info-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="contact-info-text">
                <h4>E-mail</h4>
                <span>contato@marciojunior.dev</span>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square contact-info-arrow"></i>
            </a>

            <a
              href="https://wa.me/5518996741310?text=Olá!"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
            >
              <div className="contact-info-icon">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="contact-info-text">
                <h4>WhatsApp</h4>
                <span>(18) 99674-1310</span>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square contact-info-arrow"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/marciijunior"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
            >
              <div className="contact-info-icon">
                <i className="fa-brands fa-linkedin"></i>
              </div>
              <div className="contact-info-text">
                <h4>LinkedIn</h4>
                <span>/in/marciijunior</span>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square contact-info-arrow"></i>
            </a>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="contact-info-text">
                <h4>Localização</h4>
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-field">
                <label htmlFor="contact-name">Nome</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">E-mail</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">Mensagem</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Conte sobre seu projeto ou ideia..."
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="contact-submit-btn">
              <span>Enviar Mensagem</span>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
            {formStatus === "sent" && (
              <p className="form-success">
                <i className="fa-solid fa-circle-check"></i>
                Abrindo seu cliente de e-mail...
              </p>
            )}
          </form>
        </div>
      </div>

      {/* ══════ FOOTER BOTTOM ══════ */}
      <div className="footer-bottom">
        <div className="footer-glow-line"></div>

        <div className="footer-inner">
          <div className="footer-col footer-col--brand">
            <p className="footer-brand">
              <span className="footer-brand-name">Marcio Junior</span>
              <span className="footer-brand-role">Desenvolvedor Front-end</span>
            </p>
            <div className="footer-social">
              <a
                href="https://github.com/marciijunior"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="footer-social-icon"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/marciijunior"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social-icon"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.instagram.com/marciijunior/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-icon"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://wa.me/5518996741310?text=Olá!"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="footer-social-icon"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <nav className="footer-col footer-col--nav" aria-label="Navegação do rodapé">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="footer-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col footer-col--cta">
            <h4 className="footer-col-title">Disponível para projetos</h4>
            <p className="footer-cta-text">
              Sempre aberto a novas oportunidades e parcerias criativas.
            </p>
            <button
              className="footer-back-top"
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
            >
              <i className="fa-solid fa-arrow-up"></i>
              <span>Voltar ao topo</span>
            </button>
          </div>
        </div>

        <div className="footer-copyright-bar">
          <p className="footer-copyright">
            &copy; 2026 Marcio Junior &mdash; Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
