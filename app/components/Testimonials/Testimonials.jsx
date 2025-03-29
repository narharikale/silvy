"use client";
import Image from "next/image";

import styles from "./Testimonials.module.css";
import { testimonial } from "@/app/data/testimonial";
import { useState } from "react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(null);

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
            {testimonial.map((review, index) => {
              return (
                <button
                  className={`${styles.imageBtn} ${
                    review.id === activeIndex ? "active" : null
                  }`}
                  onClick={() => setActiveIndex(index)}
                  key={review.id}
                >
                  <Image
                    src={review.image}
                    alt="Profile picture"
                    width={40}
                    height={40}
                    className={`${styles.image} active`}
                  />
                  <p
                    className={`${styles.nameTag} ${
                      activeIndex === index ? styles.nameTagActive : null
                    }`}
                  >
                    {review.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="card">
          <p className="cardContent">
            Osmo is my new go-to resource for the best Webflow cloneables and
            code snippets. It saves me a lot of time and elevates my workflow.
            The scaling system, in particular, is a game-changer—it’s exactly
            what I was missing and is now my fluid scaling solution for every
            project
          </p>

          <div className="cardFooter">
            <Image
              src="/assets/logo.svg"
              alt="Profile picture"
              width={40}
              height={40}
            />
            <div>
              <p>Name Surname</p>
              <p>role</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
