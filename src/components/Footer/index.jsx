import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const contactTitle = footerRef.current?.querySelector(".contact-title");
      const contactForm = footerRef.current?.querySelector(".contact-form");
      const contactInfo =
        footerRef.current?.querySelector(".contact-info-grid");
      const socialLinks = footerRef.current?.querySelectorAll(
        ".footer-social-links li",
      );
      const footerText = footerRef.current?.querySelector(".footer-text");

      if (contactTitle) {
        gsap.fromTo(
          contactTitle,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (contactInfo) {
        gsap.fromTo(
          contactInfo,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (contactForm) {
        gsap.fromTo(
          contactForm,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (socialLinks?.length) {
        gsap.fromTo(
          socialLinks,
          { y: 30, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (footerText) {
        gsap.fromTo(
          footerText,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }
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
      <div className="contact-section">
        <span className="contact-label">Contato</span>
        <h2 className="contact-title">Vamos Trabalhar Juntos?</h2>
        <p className="contact-subtitle">
          Tem um projeto em mente ou quer trocar uma ideia? Entre em contato!
        </p>

        <div className="contact-content">
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <i className="fa-solid fa-envelope"></i>
              <div>
                <h4>E-mail</h4>
                <a href="mailto:contato@marciojunior.dev">
                  contato@marciojunior.dev
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <i className="fa-brands fa-whatsapp"></i>
              <div>
                <h4>WhatsApp</h4>
                <a
                  href="https://wa.me/5518996741310?text=Olá!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (18) 99674-1310
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <i className="fa-brands fa-linkedin"></i>
              <div>
                <h4>LinkedIn</h4>
                <a
                  href="https://www.linkedin.com/in/marciijunior"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /in/marciijunior
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <i className="fa-solid fa-location-dot"></i>
              <div>
                <h4>Localização</h4>
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="name"
              />
              <input
                type="email"
                name="email"
                placeholder="Seu e-mail"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
              />
            </div>
            <textarea
              name="message"
              placeholder="Sua mensagem..."
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="contact-submit-btn">
              <i className="fa-solid fa-paper-plane"></i>
              Enviar Mensagem
            </button>
            {formStatus === "sent" && (
              <p className="form-success">Abrindo seu cliente de e-mail...</p>
            )}
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <ul className="footer-social-links">
          <li>
            <a
              href="https://www.instagram.com/marciijunior/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src="/insta.png" alt="Instagram" loading="lazy" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/marciijunior"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <img src="/git.png" alt="Github" loading="lazy" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/marciijunior"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img src="/linkedin.png" alt="LinkedIn" loading="lazy" />
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/5518996741310?text=Olá!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <img src="/whatsapp.png" alt="WhatsApp" loading="lazy" />
            </a>
          </li>
        </ul>
        <p className="footer-text">
          &copy; 2026 Desenvolvido por Marcio Junior
        </p>
      </div>
    </footer>
  );
}
