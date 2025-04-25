import SectionWrapper from "@/hoc/SectionWrapper";
import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";
import Typewriter from "../Typewriter/Tipewriter";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section id="about" className={`position-relative container w-100 vh-100 ${styles.heroSection}`}>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-md-6">
            <div className={`d-flex flex-row align-items-start gap-3 ${styles.heroContent}`}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className={styles.circle} />
                <div className={styles.verticalLine} />
              </div>
              <div>
                <span className={styles.highlight}>Andrés Torres Sánchez</span> <br className="d-none d-sm-block" />
                <h1 className={`${styles.heroHeadText} text-white`}>
                  {t("line-1")} <span className={styles.highlight}>Andrés</span>
                </h1>
                <p className={`${styles.heroSubText} mt-2 text-white`}>
                  <Typewriter
                    text={`${t("line-2")} ${t("line-3")} ${t("line-4")}`}
                    speed={50}
                    delay={3000}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Hero, "hero", {
  showScroll: true,
  showUpScroll: false,
  showDownScroll: true
});
