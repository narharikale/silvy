import styles from "../styles/home.module.css";

import Testimonials from "./components/Testimonials/Testimonials";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
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

                <div>
                  <button className={styles.btnPrimary}>Join agent meet</button>
                  <button className={styles.btnBlur}> Contant us</button>
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
            </div>
          </div>
        </section>

        <Testimonials />
      </main>
    </div>
  );
}
