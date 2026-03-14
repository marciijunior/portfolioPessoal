import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCode,
  faBriefcase,
  faStar,
  faCertificate,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Feed.css";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { faGraduationCap, faCode, faBriefcase, faStar, faCertificate };
const baseApiUrl =
  "https://script.google.com/macros/s/AKfycbxPCbv7lMZw-tTq-RqPR5Z2iOJzIEnykQVrR-uhxiIXizTJorZo7a6Q3BniMZVGLnU/exec";

const TimelineCard = ({ post, index, side }) => {
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    if (Object.prototype.hasOwnProperty.call(likedPosts, post.id)) {
      setIsLiked(true);
    }
  }, [post.id]);

  useEffect(() => {
    if (!cardRef.current) return;

    const fromX = side === "left" ? -60 : 60;

    gsap.fromTo(
      cardRef.current,
      { x: fromX, opacity: 0, scale: 0.92 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.12,
        ease: "power3.out",
      },
    );
  }, [index, side]);

  const handleLike = () => {
    if (isLiked) return;
    setIsLiked(true);
    setLikeCount((prevCount) => Number(prevCount) + 1);

    const likeBtn = cardRef.current?.querySelector(".tl-like-button");
    if (likeBtn) {
      gsap.fromTo(
        likeBtn,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
      );
    }

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    if (!Object.prototype.hasOwnProperty.call(likedPosts, post.id)) {
      likedPosts[post.id] = true;
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    fetch(baseApiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ postId: post.id }),
    })
      .then((res) => res.json())
      .catch(() => {});
  };

  return (
    <div className={`tl-item tl-item--${side}`} ref={cardRef}>
      {/* Node on the center line */}
      <div className="tl-node">
        <div className="tl-node-dot">
          {iconMap[post.icon] && (
            <FontAwesomeIcon icon={iconMap[post.icon]} className="tl-node-icon" />
          )}
        </div>
      </div>

      {/* Connector line from node to card */}
      <div className="tl-connector"></div>

      {/* Card */}
      <div className="tl-card">
        <span className="tl-card-date">{post.date}</span>
        <h3 className="tl-card-title">{post.title}</h3>
        <p className="tl-card-desc">{post.description}</p>

        {post.imageUrl && (
          <div className="tl-card-img-wrap">
            <img src={post.imageUrl} alt={post.title} className="tl-card-img" loading="lazy" />
          </div>
        )}

        <div className="tl-card-footer">
          <button
            onClick={handleLike}
            className={`tl-like-button ${isLiked ? "liked" : ""}`}
            disabled={isLiked}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>Apoiar</span>
          </button>
          <span className="tl-like-count">
            {likeCount} apoios
          </span>
        </div>
      </div>
    </div>
  );
};

const SkeletonTimeline = () => (
  <>
    {[0, 1, 2].map((i) => (
      <div key={i} className={`tl-item tl-item--${i % 2 === 0 ? "left" : "right"} tl-skeleton`}>
        <div className="tl-node"><div className="tl-node-dot"></div></div>
        <div className="tl-connector"></div>
        <div className="tl-card">
          <div className="skeleton-text skeleton-date-line"></div>
          <div className="skeleton-text skeleton-title-line"></div>
          <div className="skeleton-text skeleton-desc-line"></div>
          <div className="skeleton-text skeleton-desc-line" style={{ width: "70%" }}></div>
        </div>
      </div>
    ))}
  </>
);

export default function Feed() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [availableYears, setAvailableYears] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingYears, setLoadingYears] = useState(true);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const yearsRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    fetch(baseApiUrl)
      .then((res) => res.json())
      .then((data) => {
        const years = Array.isArray(data)
          ? data.map((year) => year.toString())
          : [];
        setAvailableYears(years);

        if (years.includes("2025")) {
          setSelectedYear("2025");
        } else if (years.length > 0) {
          setSelectedYear(years[0]);
        }

        setLoadingYears(false);
      })
      .catch(() => {
        setLoadingYears(false);
        setError("Não foi possível carregar os anos.");
      });
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    setLoadingPosts(true);
    fetch(`${baseApiUrl}?year=${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoadingPosts(false);
      })
      .catch(() => {
        setError("Erro ao carregar os posts. Tente novamente.");
        setLoadingPosts(false);
      });
  }, [selectedYear]);

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".jornada-glow-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: trigger },
      );

      gsap.fromTo(
        ".jornada-label",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: trigger },
      );

      gsap.fromTo(
        titleRef.current,
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
        descRef.current,
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
        yearsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: trigger,
        },
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: trigger,
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!loadingYears && yearsRef.current) {
      const buttons = yearsRef.current.querySelectorAll(".jornada-year-btn");
      gsap.fromTo(
        buttons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
        },
      );
    }
  }, [loadingYears]);

  return (
    <section className="jornada-section" ref={sectionRef}>
      {/* ── Glow line decorativa ── */}
      <div className="jornada-glow-line"></div>

      {/* ── Label editorial ── */}
      <span className="jornada-label">03 / Jornada</span>

      {/* ── Header ── */}
      <div className="jornada-header">
        <blockquote className="jornada-quote" ref={titleRef}>
          <span className="jornada-quote-mark">&ldquo;</span>
          Cada passo é parte da construção.
        </blockquote>
        <p className="jornada-desc" ref={descRef}>
          Um diário da minha evolução profissional. Marcos, aprendizados e
          conquistas ao longo dos anos. Deixe seu apoio anônimo!
        </p>
      </div>

      {/* ── Year selector ── */}
      <nav className="jornada-years" ref={yearsRef}>
        {loadingYears ? (
          <>
            <div className="jornada-year-skeleton"></div>
            <div className="jornada-year-skeleton"></div>
            <div className="jornada-year-skeleton"></div>
          </>
        ) : (
          availableYears.map((year) => (
            <button
              key={year}
              className={`jornada-year-btn ${year === selectedYear ? "active" : ""}`}
              onClick={() => setSelectedYear(year.toString())}
            >
              {year}
            </button>
          ))
        )}
      </nav>

      {/* ── Timeline ── */}
      <div className="tl-wrapper">
        {/* Center vertical line */}
        <div className="tl-center-line" ref={lineRef}></div>

        {error ? (
          <div className="jornada-error">
            <p>{error}</p>
            <button
              onClick={() => {
                setError(null);
                setSelectedYear(selectedYear);
              }}
              className="jornada-year-btn active"
            >
              Tentar novamente
            </button>
          </div>
        ) : loadingPosts ? (
          <SkeletonTimeline />
        ) : posts.length === 0 ? (
          <div className="jornada-empty">
            <p>Nenhum marco encontrado para {selectedYear}.</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <TimelineCard
              key={post.id}
              post={post}
              index={index}
              side={index % 2 === 0 ? "left" : "right"}
            />
          ))
        )}
      </div>
    </section>
  );
}
