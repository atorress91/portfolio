import { motion } from "framer-motion";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { services } from "../../constants";
import SectionWrapper from "../../hoc/SectionWrapper";
import { fadeIn, textVariant } from "../../utils/motion";
import styles from "./About.module.scss";

const ServiceCard = ({ index, title, icon }) => (
  <div className="col-md-4 mb-4">
    <Tilt
      className={styles["service-tilt"]}
      tiltMaxAngleX={45}
      tiltMaxAngleY={45}
      scale={1}
      transitionSpeed={450}
    >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className={`${styles["service-card"]} p-1 rounded shadow`}
      >
        <div
          className={`${styles["service-card-inner"]} bg-tertiary rounded py-5 px-4 d-flex flex-column justify-content-evenly align-items-center ${styles["min-height-280"]}`}
        >
          <Image
            src={icon}
            alt="service-icon"
            className={`img-fluid ${styles["service-icon"]}`}
            width={64}
            height={64}
          />
          <h3 className="text-white fs-4 fw-bold text-center mt-3">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  </div>
);

const About = () => {
  return (
    <div className={`${styles["about-section"]} container`}>
      <motion.div variants={textVariant(3)}>
        <p className={styles["section-subtext"]}>Introduction</p>
        <h2 className={styles["section-headtext"]}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className={`mt-4 text-secondary fs-5 ${styles["max-width-3xl"]}`}
      >
        I&apos;m a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and Three.js.
        I&apos;m a quick learner and collaborate closely with clients to create
        efficient, scalable, and user-friendly solutions that solve real-world
        problems. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <div className="row mt-5">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
