import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Certificates.css";

gsap.registerPlugin(ScrollTrigger);

export default function Certificados({ sectionRef, certificatesData }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = containerRef.current?.querySelector(".cert-label");
      const title = containerRef.current?.querySelector(".cert-title");
      const text = containerRef.current?.querySelector(".cert-subtitle");
      const swiperContainer = containerRef.current?.querySelector(
        ".certificates-swiper",
      );

      if (label) {
        gsap.fromTo(
          label,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
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

      if (swiperContainer) {
        gsap.fromTo(
          swiperContainer,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Hover effects handled via CSS transitions for better performance
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certificados"
      ref={(el) => {
        containerRef.current = el;
        if (sectionRef) sectionRef.current = el;
      }}
      className="container-certificados"
    >
      <div className="cert-header">
        <span className="cert-label">Formação</span>
        <h2 className="cert-title">Certificados e Cursos</h2>
        <p className="cert-subtitle">
          Algumas das minhas certificações e cursos mais recentes.
        </p>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="certificates-swiper"
        >
          {certificatesData.map((cert, index) => (
            <SwiperSlide key={index}>
              <a
                href={cert.pdfSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-card-link"
              >
                <div className="certificate-card">
                  <div className="certificate-image">
                    <img
                      src={cert.thumbnailSrc}
                      alt={`Certificado de ${cert.title}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="certificate-info">
                    <h4>{cert.title}</h4>
                    <span>Emitido por: {cert.issuer}</span>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
