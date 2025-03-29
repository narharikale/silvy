import styles from "../styles/home.module.css";
import Image from "next/image";

import Testimonials from "./components/Testimonials/Testimonials";

export const revalidate = 15;

export default async function Home() {
  const buildTime = new Date().toTimeString();
  console.log(`[Server] Page built at: ${buildTime}`);

  return (
    <div>
      <main>
        <section className={styles.heroSection}>
          <div className={styles.homeHero}>
            <div className={styles.homeHeroInner}>
              <div className={styles.actionItemContainer}>
                <div className={styles.actionItemList}>
                  <li>Buttons</li>
                  <li>Transitions</li>
                  <li>Components</li>
                  <li>Loader</li>
                  <li>Animations</li>
                </div>
                <div className={styles.actionItemList}>
                  <li>Documentation</li>
                  <li>Tools</li>
                  <li>References</li>
                  <li>Tutorials</li>
                </div>
              </div>
              <div>
                <h1 className={styles.heroTitle}>
                  Start building agents <br></br>people remember.
                </h1>

                <div style={{ display: "flex", gap: "2rem" }}>
                  <button className={styles.btnPrimary}>Join agent meet</button>
                  <button className={styles.btnBlur}>
                    <Image
                      width={30}
                      height={30}
                      className={styles.btnFaces}
                      alt="avater"
                      src="/assets/button-faces.png"
                    />
                    Contant us
                  </button>
                </div>
              </div>

              <div> </div>
              <div className={styles.heroDescription}>
                <p>
                  Osmo came from constantly digging through old projects
                  wondering, ‘How did I build that again?’ It is basically our
                  personal toolbox, packed with components, techniques, tricks
                  and tutorials—and it will keep growing
                </p>
              </div>

              <div className={styles.heroVideo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 220 220"
                  fill="none"
                  className={styles.homeVideoStar}
                >
                  <g opacity="0.3">
                    <rect
                      x="109.498"
                      width="1.00457"
                      height="220"
                      fill="currentColor"
                      style={{ height: "100%" }}
                    ></rect>
                    <rect
                      x="220"
                      y="109.498"
                      width="1.00457"
                      height="220"
                      transform="rotate(90 220 109.498)"
                      fill="currentColor"
                      style={{ height: "100%" }}
                    ></rect>
                    <rect
                      x="187.426"
                      y="31.8638"
                      width="1.00457"
                      height="220"
                      transform="rotate(45 187.426 31.8638)"
                      fill="currentColor"
                      style={{ height: "100%" }}
                    ></rect>
                  </g>
                </svg>

                <div className={styles.videoWrap}>
                  <video
                    className={styles.video}
                    src="https://cdn.prod.website-files.com/6708f85ff3d3cba6aff436fb%2F670e5ef201603b3a7dda3aa9_Osmo-V12-Reel-Tiny_compressed-transcode.mp4"
                    autoPlay={true}
                  />
                </div>

                <div className={styles.heroVidInfo}>
                  <div id="reel-text" data-split="chars" className="eyebrow">
                    00:35
                  </div>
                  <div className="eyebrow">▶</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials buildTime={buildTime} />
      </main>
    </div>
  );
}
