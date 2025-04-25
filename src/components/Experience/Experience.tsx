"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { experiences } from '@/constants';
import { SectionWrapper } from '../../hoc';
import { textVariant } from '@/utils/motion';
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
        <h3 className="text-white">{t(experience.title)}</h3>
        <p className={`mb-0 font-weight-bold ${styles["secondary-color"]}`}>
          {experience.company_name}
        </p>
        <ul className="mt-3 list-unstyled">
          {experience.points.map((point: string, idx: number) => (
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
    <div id="work" className="container my-5 w-100">
      <motion.div variants={textVariant(1)}>
        <h2 className={`text-center mt-4 ${styles['primary-color']}`}>
          {t('headerTitle')}
        </h2>
        <div className={styles.timeline}>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Experience, "work", {
  showScroll: true,
  showUpScroll: true,
  showDownScroll: true
});
