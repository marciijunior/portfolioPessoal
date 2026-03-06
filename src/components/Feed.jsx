import React, { useState, useEffect, useRef } from "react";
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
import "../styles/Feed.css";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { faGraduationCap, faCode, faBriefcase, faStar, faCertificate };
const baseApiUrl =
  "https://script.google.com/macros/s/AKfycbxPCbv7lMZw-tTq-RqPR5Z2iOJzIEnykQVrR-uhxiIXizTJorZo7a6Q3BniMZVGLnU/exec";

const PostCard = ({ post, index }) => {
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

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: index * 0.15,
        ease: "power2.out",
      }
    );
  }, [index]);

  const handleLike = () => {
    if (isLiked) return;
    setIsLiked(true);
    setLikeCount((prevCount) => Number(prevCount) + 1);

    const likeBtn = cardRef.current?.querySelector('.like-button');
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
        }
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
      .then((data) =>
        console.log("Like registrado para o post", post.id, "Novo total:", data.newLikes)
      )
      .catch(console.error);
  };

  return (
    <div className="post-card" ref={cardRef}>
      <div className="post-card-header">
        <img src="/logo.png" alt="Avatar" className="post-avatar" />
        <div className="post-author-info">
          <span className="post-author-name">Marcio Junior</span>
          <span className="post-date">{post.date}</span>
        </div>
      </div>
      <div className="post-content">
        <div className="post-content-title">
          {iconMap[post.icon] && (
            <FontAwesomeIcon icon={iconMap[post.icon]} className="post-title-icon" />
          )}
          <h3 className="post-title">{post.title}</h3>
        </div>
        <p className="post-description">{post.description}</p>
      </div>
      {post.imageUrl && (
        <div className="post-image-container">
          <img src={post.imageUrl} alt={post.title} className="post-image" />
        </div>
      )}
      <div className="post-footer">
        <button
          onClick={handleLike}
          className={`like-button ${isLiked ? "liked" : ""}`}
          disabled={isLiked}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>Apoiar</span>
        </button>
        <span className="like-count">
          {likeCount} apoios{" "}
          <span className="anonimato-nota">(apoio anônimo)</span>
        </span>
      </div>
    </div>
  );
};

const SkeletonPost = () => (
  <div className="post-card skeleton-post">
    <div className="post-card-header">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-author-info">
        <div className="skeleton-text skeleton-name"></div>
        <div className="skeleton-text skeleton-date"></div>
      </div>
    </div>
    <div className="skeleton-text skeleton-desc"></div>
    <div className="skeleton-text skeleton-desc" style={{ width: "80%" }}></div>
    <div className="skeleton-image"></div>
  </div>
);

export default function Feed() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [availableYears, setAvailableYears] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingYears, setLoadingYears] = useState(true);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    fetch(baseApiUrl)
      .then((res) => res.json())
      .then((data) => {
        const years = Array.isArray(data) ? data.map((year) => year.toString()) : [];
        setAvailableYears(years);

        if (years.includes("2025")) {
          setSelectedYear("2025");
        } else if (years.length > 0) {
          setSelectedYear(years[0]);
        }

        setLoadingYears(false);
      })
      .catch(console.error);
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
      .catch((error) => {
        console.error("Erro ao buscar posts:", error);
        setLoadingPosts(false);
      });
  }, [selectedYear]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        timelineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!loadingYears && timelineRef.current) {
      const buttons = timelineRef.current.querySelectorAll('.timeline-year');
      gsap.fromTo(
        buttons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [loadingYears]);

  return (
    <div className="feed-view" ref={sectionRef}>
      <header className="feed-header">
        <h1 ref={titleRef}>Minha Jornada</h1>
        <p className="feed-description" ref={descRef}>
          Esta seção funciona como um diário profissional. Deixe seu apoio anônimo!
        </p>
        <nav className="mini-timeline" ref={timelineRef}>
          {loadingYears ? (
            <>
              <div className="timeline-year-skeleton"></div>
              <div className="timeline-year-skeleton"></div>
              <div className="timeline-year-skeleton"></div>
              <div className="timeline-year-skeleton"></div>
            </>
          ) : (
            availableYears.map((year) => (
              <button
                key={year}
                className={`timeline-year ${year == selectedYear ? "active" : ""}`}
                onClick={() => setSelectedYear(year.toString())}
              >
                {year}
              </button>
            ))
          )}
        </nav>
      </header>
      <main className="feed-container">
        {loadingPosts ? (
          <>
            <SkeletonPost />
            <SkeletonPost />
          </>
        ) : (
          posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))
        )}
      </main>
    </div>
  );
}
