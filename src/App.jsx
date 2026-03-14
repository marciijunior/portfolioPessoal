import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import AboutMe from "./components/AboutMe";
import Tecnologias from "./components/Tecnologias";
import Portfolio from "./components/Portfolio";
import Certificados from "./components/Certificados";
import Footer from "./components/Footer";
import Feed from "./components/Feed";

import "./styles/global.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("inicio");

  const certificatesData = [
    {
      title:
        "Acessibilidade no HTML: escrevendo códigos semânticos para inclusão",
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
      title:
        "HTML e CSS: ambientes de desenvolvimento, estrutura de arquivos e tags",
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
      title:
        "HTML e CSS: trabalhando com responsividade e publicação de projetos",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado8.png",
      pdfSrc: "/certificates/pdf/certificado8Pdf.pdf",
    },
    {
      title: "JavaScript: construindo páginas dinâmicas",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado9.png",
      pdfSrc: "/certificates/pdf/certificado9Pdf.pdf",
    },
    {
      title: "JavaScript: entendendo promises e async/await",
      issuer: "Alura",
      thumbnailSrc: "/certificates/images/certificado10.png",
      pdfSrc: "/certificates/pdf/certificado10Pdf.pdf",
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
      title:
        "Node.js e terminal: dominando o ambiente de desenvolvimento front-end",
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
      imageSrc: "/projetoQuilha.png",
      title: "Quilha Hub — Hub Criativo",
      description:
        "Site institucional para hub criativo especializado em branding, marketing digital, web design e direção criativa. Layout imersivo com animações fluidas, seções de serviços interativas e cases de sucesso.",
      technologies: ["React", "Vite", "GSAP", "CSS3", "Vercel"],
      liveUrl: "https://projeto-quilha-hub.vercel.app/",
      repoUrl: "https://github.com/marciijunior",
    },
    {
      id: "proj2",
      imageSrc: "/projetoPortfolioLucasPicollo.png",
      title: "Portfólio Lucas Picollo",
      description:
        "Portfólio pessoal desenvolvido para o cliente Lucas Picollo, com design moderno, navegação intuitiva e apresentação visual dos seus trabalhos e habilidades.",
      technologies: ["React", "Vite", "CSS3", "Vercel"],
      liveUrl: "https://portfolio-picollo.vercel.app/",
      repoUrl: "https://github.com/marciijunior",
    },
    {
      id: "proj3",
      imageSrc: "/projetoPortfolio.png",
      title: "Portfólio Pessoal",
      description:
        "Meu próprio portfólio profissional com animações GSAP, design responsivo e seções interativas para apresentar projetos, certificados e tecnologias dominadas.",
      technologies: ["React", "Vite", "GSAP", "CSS3", "Vercel"],
      liveUrl: "https://marciojunior.dev/",
      repoUrl: "https://github.com/marciijunior",
    },
    {
      id: "proj4",
      imageSrc: "/projetoBadTube.png",
      title: "BadTube",
      description:
        "Clone inspirado no YouTube com interface de vídeo, navegação por categorias e design responsivo focado em reproduzir a experiência de uma plataforma de streaming.",
      technologies: ["React", "Vite", "CSS3", "JavaScript", "Vercel"],
      liveUrl: "https://badtube.vercel.app/",
      repoUrl: "https://github.com/marciijunior",
    },
    {
      id: "proj5",
      imageSrc: "/projetoMeuAmor.png",
      title: "Meu Amor",
      description:
        "Página web interativa e afetiva, criada como presente personalizado com animações, galeria de fotos e mensagens especiais.",
      technologies: ["React", "Vite", "CSS3", "Vercel"],
      liveUrl: "https://meu-amor-flax.vercel.app/",
      repoUrl: "https://github.com/marciijunior",
    },
  ];

  const techStackData = {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
    ],
    backend: [
      "Node.js",
      "Express",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "Prisma",
    ],
    design: [
      "Figma",
      "Adobe XD",
      "Photoshop",
      "UI/UX Design",
      "Design System",
      "Prototipagem",
    ],
    ferramentas: [
      "Git",
      "GitHub",
      "VS Code",
      "Vite",
      "Docker",
      "Vercel",
      "NPM",
      "Linux",
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
    contato: useRef(null),
  };

  // useLayoutEffect garante que defaults + scrollerProxy rodem ANTES
  // dos useEffect dos componentes filhos que criam ScrollTriggers
  useLayoutEffect(() => {
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

    const onScroll = () => ScrollTrigger.update();
    container.addEventListener("scroll", onScroll);

    // Recalcula posições após o proxy estar configurado
    ScrollTrigger.refresh();

    return () => {
      container.removeEventListener("scroll", onScroll);
      ScrollTrigger.defaults({ scroller: window });
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
    // Usa ScrollTrigger (já configurado com o scroller customizado)
    // em vez de IntersectionObserver, que pode falhar em produção
    // quando o scroll container não é o viewport padrão.
    const triggers = [];

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        triggers.push(
          ScrollTrigger.create({
            trigger: ref.current,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActiveSection(id);
            },
          }),
        );
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".modal-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      tl.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.1",
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
      <CustomCursor />
      <div className="content-wrapper" ref={scrollContainerRef}>
        <Header sectionRef={sectionRefs.inicio} onNavigate={handleNavigate} />
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
        <Footer sectionRef={sectionRefs.contato} />

        {selectedProject && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <button
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedProject.imageSrc}
                alt={`Visualização do projeto ${selectedProject.title}`}
                className="modal-img"
                loading="lazy"
              />
              <div className="modal-details">
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-description">
                  {selectedProject.description}
                </p>
                <div className="tech-tags-container">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="modal-links">
                  {selectedProject.liveUrl &&
                    selectedProject.liveUrl !== "#" && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link-btn"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                        Ver Site
                      </a>
                    )}
                  {selectedProject.repoUrl && (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link-btn modal-link-secondary"
                    >
                      <i className="fa-brands fa-github"></i> Código Fonte
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
