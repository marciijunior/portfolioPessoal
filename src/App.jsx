import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Tecnologias from "./components/Tecnologias";
import Portfolio from "./components/Portfolio";
import Certificados from "./components/Certificados";
import Footer from "./components/Footer";
import Feed from "./components/Feed";

import "./styles/Header.css";
import "./styles/PosHeader.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/Portfolio.css";
import "./styles/Modal.css";
import "./styles/Sidebar.css";
import "./styles/InviteScroll.css";
import "./styles/AboutMe.css";
import "./styles/TechStack.css";
import "./styles/Certificates.css";
import "./styles/Feed.css";
import "./styles/Scrollbar.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("inicio");

  const certificatesData = [
    {
      title: "Acessibilidade no HTML: escrevendo códigos semânticos para inclusão",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado1.png",
      pdfSrc: "/certificates/pdf/certificado1Pdf.pdf",
    },
    {
      title: "Começando em Programação: carreira e primeiros passos",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado2.png",
      pdfSrc: "/certificates/pdf/certificado2Pdf.pdf",
    },
    {
      title: "HTML e CSS: ambientes de desenvolvimento, estrutura de arquivos e tags",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado3.png",
      pdfSrc: "/certificates/pdf/certificado3Pdf.pdf",
    },
    {
      title: "HTML e CSS: cabeçalho, footer e variáveis CSS",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado4.png",
      pdfSrc: "/certificates/pdf/certificado4Pdf.pdf",
    },
    {
      title: "HTML e CSS: Classes, posicionamento e Flexbox",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado5.png",
      pdfSrc: "/certificates/pdf/certificado5Pdf.pdf",
    },
    {
      title: "HTML e CSS: praticando HTML/CSS",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado6.png",
      pdfSrc: "/certificates/pdf/certificado6Pdf.pdf",
    },
    {
      title: "HTML e CSS: responsividade com mobile-first",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado7.png",
      pdfSrc: "/certificates/pdf/certificado7Pdf.pdf",
    },
    {
      title: "HTML e CSS: trabalhando com responsividade e publicação de projetos",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado8.png",
      pdfSrc: "/certificates/pdf/certificado8Pdf.pdf",
    },
    {
      title: "JavaScript: construindo páginas dinâmicas",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado9.png",
      pdfSrc: "/certificates/pdf/certicado9Pdf.pdf",
    },
    {
      title: "JavaScript: entendendo promises e async/await",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado10.png",
      pdfSrc: "/certificates/pdf/certicado10Pdf.pdf",
    },
    {
      title: "JavaScript: explorando a linguagem",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado11.png",
      pdfSrc: "/certificates/pdf/certificado11Pdf.pdf",
    },
    {
      title: "JavaScript: interfaces e Herança em Orientação a Objetos",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado12.png",
      pdfSrc: "/certificates/pdf/certificado12Pdf.pdf",
    },
    {
      title: "JavaScript: métodos de array",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado13.png",
      pdfSrc: "/certificates/pdf/certificado13Pdf.pdf",
    },
    {
      title: "JavaScript: programando a Orientação a Objetos",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado14.png",
      pdfSrc: "/certificates/pdf/certificado14Pdf.pdf",
    },
    {
      title: "Lógica de programação: explore funções e listas",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado15.png",
      pdfSrc: "/certificates/pdf/certificado15Pdf.pdf",
    },
    {
      title: "Lógica de programação: mergulhe em programação com JavaScript",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado16.png",
      pdfSrc: "/certificates/pdf/certificado16Pdf.pdf",
    },
    {
      title: "Node.js e terminal: dominando o ambiente de desenvolvimento front-end",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado17.png",
      pdfSrc: "/certificates/pdf/certificado17Pdf.pdf",
    },
    {
      title: "React: desenvolvendo com JavaScript",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado18.png",
      pdfSrc: "/certificates/pdf/certificado18Pdf.pdf",
    },
  ];

  const portfolioData = [
    {
      id: "proj1",
      imageSrc: "/site1.webp",
      title: "Website Corporativo Moderno",
      technologies: ["React", "Vite", "CSS Grid", "Figma"],
    },
    {
      id: "proj2",
      imageSrc: "/site2.webp",
      title: "Plataforma de E-commerce",
      technologies: ["JavaScript", "HTML5", "CSS3", "API Rest"],
    },
    {
      id: "proj3",
      imageSrc: "/site3.webp",
      title: "Landing Page para Evento",
      technologies: ["React", "GSAP", "Spline"],
    },
    {
      id: "proj4",
      imageSrc: "/site4.webp",
      title: "Blog Pessoal Minimalista",
      technologies: ["React", "CSS Flexbox", "UI/UX"],
    },
  ];

  const techStackData = {
    frontend: [
      "React", "Next.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Three.js", "Tailwind CSS",
    ],
    backend: ["Node.js", "Python", "SQL", "SQLite", "C++", "Pascal"],
    ferramentas: [
      "Git", "GitHub", "Figma", "Photoshop", "VS Code", "Vite", "Webpack", "NPM",
    ],
  };

  const scrollContainerRef = useRef(null);

  const sectionRefs = {
    inicio: useRef(null),
    sobre: useRef(null),
    jornada: useRef(null),
    tecnologias: useRef(null),
    portfolio: useRef(null),
    certificados: useRef(null),
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    ScrollTrigger.defaults({
      scroller: container,
    });

    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (arguments.length) {
          container.scrollTop = value;
        }
        return container.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    container.addEventListener("scroll", () => ScrollTrigger.update());

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  const handleNavigate = useCallback((id) => {
    const targetElement = sectionRefs[id].current;
    const containerElement = scrollContainerRef.current;

    if (targetElement && containerElement) {
      const currentScrollTop = containerElement.scrollTop;
      const targetOffsetTop = targetElement.offsetTop;
      const isScrollingDown = targetOffsetTop > currentScrollTop;

      let topPosition;
      if (isScrollingDown) {
        topPosition =
          targetOffsetTop +
          targetElement.offsetHeight -
          containerElement.clientHeight;
      } else {
        topPosition = targetOffsetTop;
      }

      if (id === "inicio") {
        topPosition = 0;
      }

      gsap.to(containerElement, {
        scrollTop: topPosition,
        duration: 1.2,
        ease: "power3.inOut",
      });
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: "0px",
      threshold: 0.4,
    };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".modal-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      tl.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.1"
      );
    }
  }, [selectedProject]);

  const handleCloseModal = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => setSelectedProject(null),
    });
    tl.to(".modal-content", {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in",
    });
    tl.to(".modal-overlay", { opacity: 0, duration: 0.2 }, "-=0.1");
  }, []);

  return (
    <div className="app-container">
      <Sidebar onNavigate={handleNavigate} activeSection={activeSection} />
      <div className="content-wrapper" ref={scrollContainerRef}>
        <Header
          sectionRef={sectionRefs.inicio}
          onNavigate={handleNavigate}
        />
        <main>
          <AboutMe sectionRef={sectionRefs.sobre} />

          <div id="jornada" ref={sectionRefs.jornada}>
            <Feed />
          </div>

          <Tecnologias
            sectionRef={sectionRefs.tecnologias}
            techStackData={techStackData}
          />
          <Portfolio
            sectionRef={sectionRefs.portfolio}
            portfolioData={portfolioData}
            onProjectClick={setSelectedProject}
          />
          <Certificados
            sectionRef={sectionRefs.certificados}
            certificatesData={certificatesData}
          />
        </main>
        <Footer />

        {selectedProject && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <span className="modal-close" onClick={handleCloseModal}>X</span>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedProject.imageSrc}
                alt={`Visualização do projeto ${selectedProject.title}`}
                className="modal-img"
              />
              <div className="modal-details">
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-description">{selectedProject.description}</p>
                <div className="tech-tags-container">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
