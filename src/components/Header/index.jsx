import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./Header.css";
import "./PosHeader.css";
import "./InviteScroll.css";

export default function Header({ sectionRef, onNavigate }) {
  const headerRef = useRef(null);
  const socialRef = useRef(null);
  const iamRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const scrollInviteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        socialRef.current?.querySelectorAll("li"),
        { x: -80, opacity: 0, scale: 0.5 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      );

      tl.fromTo(
        iamRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      );

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, skewY: 3 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.5",
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6",
      );

      tl.fromTo(
        buttonsRef.current?.querySelectorAll("a"),
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.4)",
        },
        "-=0.4",
      );

      tl.fromTo(
        imageRef.current,
        { x: 120, opacity: 0, scale: 0.85, rotate: 3 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "expo.out",
        },
        "-=1",
      );

      tl.fromTo(
        scrollInviteRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      );

      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, headerRef);

    // Hover effects managed outside gsap.context for proper cleanup
    const socialItems = socialRef.current?.querySelectorAll("li a");
    const enterHandlers = new Map();
    const leaveHandlers = new Map();

    socialItems?.forEach((item) => {
      const onEnter = () =>
        gsap.to(item, { scale: 1.2, duration: 0.3, ease: "back.out(1.7)" });
      const onLeave = () =>
        gsap.to(item, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" });
      enterHandlers.set(item, onEnter);
      leaveHandlers.set(item, onLeave);
      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);
    });

    return () => {
      socialItems?.forEach((item) => {
        item.removeEventListener("mouseenter", enterHandlers.get(item));
        item.removeEventListener("mouseleave", leaveHandlers.get(item));
      });
      ctx.revert();
    };
  }, []);

  return (
    <header
      id="inicio"
      ref={(el) => {
        headerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
    >
      <div className="header-content">
        <nav className="links" aria-label="Navegação principal do site">
          <ul className="links-redes" ref={socialRef}>
            <li className="insta">
              <a
                href="https://www.instagram.com/marciijunior/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="/insta.png" alt="Instagram" loading="lazy" />
              </a>
            </li>
            <li className="git">
              <a
                href="https://github.com/marciijunior"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <img src="/git.png" alt="Github" loading="lazy" />
              </a>
            </li>
            <li className="linkedin">
              <a
                href="https://www.linkedin.com/in/marciijunior"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img src="/linkedin.png" alt="LinkedIn" loading="lazy" />
              </a>
            </li>
            <li className="whatsapp">
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
        </nav>
      </div>
      <div className="divpremain">
        <div className="premain">
          <div>
            <div className="Iam" ref={iamRef}>
              <img className="img-im" src="/img-im.png" alt="I am" />
              <p className="p-im">Olá, eu sou</p>
            </div>
            <h1 className="titulo-premain" ref={titleRef}>
              Marcio Junior
            </h1>
            <p className="p-premain" ref={subtitleRef}>
              Desenvolvedor Fullstack e Designer UI/UX.
            </p>
          </div>
          <div className="div-btn" ref={buttonsRef}>
            <a
              href="/Curriculo_Marcio_Junior.pdf"
              download="Curriculo-Marcio-Junior.pdf"
              className="btn"
            >
              <span>Download CV</span>
              <i>
                <svg
                  className="download-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </i>
            </a>
            <a
              href="#jornada"
              className="btn2"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("jornada");
              }}
            >
              <span>My Work</span>
            </a>
          </div>
          <div className="invite-to-scroll" ref={scrollInviteRef}>
            <div className="animationScrollInvite"></div>
          </div>
        </div>
        <div className="img-premain" ref={imageRef}>
          <img src="/img-premain.webp" alt="Imagem principal do site" />
        </div>
      </div>
    </header>
  );
}
