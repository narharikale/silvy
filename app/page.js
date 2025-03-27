import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.homeHero}>
            <div className={styles.homeHeroInner}>
              <div>
                <div>
                  <li>Buttons</li>
                  <li>Transitions</li>
                  <li>Components</li>
                  <li>Loader</li>
                  <li>Animations</li>
                </div>
                <div>
                  <li>Documentation</li>
                  <li>Tools</li>
                  <li>References</li>
                  <li>Tutorials</li>
                </div>
              </div>
              <div>
                <h1>Start Intergrating Phonio on Your Website</h1>

                <div>
                  <button> Join meet</button>
                  <button> Contant us</button>
                </div>
              </div>

              <div> hidden</div>
              <div>
                <p>
                  {" "}
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos. lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quisquam, quos. lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h1>
            We built Osmo to help creative developers work smarter, faster, and
            better.
          </h1>

          <div>
            <div>
              <p>Trusted By</p>
              <div>ImageSlider</div>
            </div>

            <div>
              Carousel
              <div>₹</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
