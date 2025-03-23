"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { experiences } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { textVariant } from '../../utils/motion';
import styles from './Experience.module.scss';

const ExperienceCard = ({ experience, index }) => {
  const t = useTranslations('Experiences');
  const isLeft = index % 2 === 0;

  return (
    <div className={styles.timelineItem}>
      <div className={`${styles.timelineIcon} ${styles[experience.iconBg]}`}>
        <Image
          src={experience.icon}
          alt={experience.company_name}
          className={`img-fluid ${styles.timelineIconImage}`}
          width={60}
          height={60}
        />
      </div>
      <div
        className={`
          ${styles.timelineItemContent} 
          ${isLeft ? styles.timelineItemContentLeft : styles.timelineItemContentRight}
        `}
      >
        <div className={styles.timelineDate}>{t(experience.date)}</div>
        <h3 className="h4 text-white">{t(experience.title)}</h3>
        <p className={`mb-0 font-weight-bold ${styles["secondary-color"]}`}>
          {experience.company_name}
        </p>
        <ul className="mt-3 list-unstyled">
          {experience.points.map((point, idx) => (
            <li key={`experience-point-${idx}`} className={styles.timelineListItem}>
              &#8226; {t(point)}
            </li>
          ))}
        </ul>
      </div>
      <div className="clearfix"></div>
    </div>
  );
};

const Experience = () => {
  const t = useTranslations('Experiences');

  return (
    <div className="container my-5">
      <motion.div variants={textVariant(1)}>
        <p className={`text-center mb-2 ${styles['primary-color']}`}>
          {t('headerSubtitle')}
        </p>
        <h2 className={`text-center mb-4 ${styles['secondary-color']}`}>
          {t('headerTitle')}
        </h2>
      </motion.div>
      <div className={styles.timeline}>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
