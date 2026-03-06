import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const socialLinks = footerRef.current?.querySelectorAll('.footer-social-links li');
      const footerText = footerRef.current?.querySelector('.footer-text');

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
          }
        );

        socialLinks.forEach((link) => {
          const img = link.querySelector('img');
          if (img) {
            link.addEventListener('mouseenter', () => {
              gsap.to(img, {
                scale: 1.2,
                rotate: 10,
                duration: 0.3,
                ease: "back.out(1.7)",
              });
            });
            link.addEventListener('mouseleave', () => {
              gsap.to(img, {
                scale: 1,
                rotate: 0,
                duration: 0.4,
                ease: "elastic.out(1, 0.3)",
              });
            });
          }
        });
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
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-container" ref={footerRef}>
      <ul className="footer-social-links">
        <li>
          <a href="https://www.instagram.com/marciijunior/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/insta.png" alt="Instagram logo" />
          </a>
        </li>
        <li>
          <a href="https://github.com/marciijunior" target="_blank" rel="noopener noreferrer" aria-label="Github">
            <img src="/git.png" alt="Github logo" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/marciijunior" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/linkedin.png" alt="LinkedIn logo" />
          </a>
        </li>
        <li>
          <a href="https://wa.me/5518996741310?text=Olá!" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img src="/whatsapp.png" alt="WhatsApp logo" />
          </a>
        </li>
      </ul>
      <p className="footer-text">© 2025 Desenvolvido por Marcio Junior</p>
    </footer>
  );
}