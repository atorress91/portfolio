import { useTranslations } from "next-intl";
import Scroll from "../Scroll/Scroll";
import styles from "./Hero.module.scss";

const Hero = () => {
    const t = useTranslations("Hero");

  return (
    <section className={`position-relative w-100 vh-100 ${styles.heroSection}`}>
      {/* Contenedor con grid */}
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          {/* Columna para el contenido */}
          <div className="col-md-6">
            <div className={`d-flex flex-row align-items-start gap-3 ${styles.heroContent}`}>
              {/* Elemento decorativo: círculo y línea */}
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className={styles.circle} />
                <div className={styles.verticalLine} />
              </div>
              {/* Texto de bienvenida */}
              <div>
                <h1 className={`${styles.heroHeadText} text-white`}>
                 {t("line-1")} <span className={styles.highlight}>Andrés Torres Sánchez</span>
                </h1>
                <p className={`${styles.heroSubText} mt-2 text-white`}>
                {t("line-2")} <br className="d-none d-sm-block" />
                {t("line-3")}
                {t("line-4")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <Scroll route="#about" title="Ir a sobre mí" />

    </section>
  );
};

export default Hero;
