"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./Testimonials.module.css";
import { testimonial } from "@/app/data/testimonial";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(2);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  const updatePosition = () => {
    if (!carouselRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const cardWidth = 20 * 16 + 16;

    const centerPosition = (containerWidth - cardWidth) / 2;

    const activeCardPosition = activeIndex * cardWidth;

    const transformX = centerPosition - activeCardPosition;

    carouselRef.current.style.transform = `translateX(${transformX}px)`;
  };

  // Handle auto-scroll
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((prev) => (prev + 1) % totalCards);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [totalCards]);

  useEffect(() => {
    updatePosition();

    const handleResize = () => updatePosition();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className={styles.container}>
      <div>
        <h1 className={styles.heading}>
          We built Osmo to help
          <br /> creative developers work, <br /> smarter, faster, and better.
        </h1>
        <div className={styles.divider}></div>

        <div className={styles.imageNavigatorContainer}>
          <p className={styles.imageNavigatorTitle}>Trusted By: </p>
          <div className={styles.imageList}>
            {testimonial.map((review, index) => (
              <button
                key={review.id}
                className={`${styles.imageBtn} ${
                  review.id === activeIndex ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={review.image}
                  alt="Profile picture"
                  width={40}
                  height={40}
                  className={styles.image}
                />
                <p
                  className={`${styles.nameTag} ${
                    activeIndex === index ? styles.nameTagActive : ""
                  }`}
                >
                  {review.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={containerRef} className={styles.carouselContainer}>
        <div ref={carouselRef} className={styles.carousel}>
          {testimonial.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className={`${styles.card} ${
                index === activeIndex ? styles.cardActive : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <p className={styles.cardContent}>{review.review}</p>
              <div className={styles.cardFooter}>
                <Image
                  src={review.image}
                  alt={`${review.name}'s profile picture`}
                  width={40}
                  height={40}
                  className={styles.avatarImage}
                />
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>{review.name}</p>
                  <p className={styles.authorRole}>{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
