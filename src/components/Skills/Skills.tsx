"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { skills } from '@/constants';
import { SectionWrapper } from '../../hoc';
import { textVariant, fadeIn } from '@/utils/motion';
import styles from './Skills.module.scss';

const SkillCard = ({ skill, index }) => {
  const t = useTranslations('Skills');

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className={styles.skillCard}
    >
      <div className={styles.skillCardInner}>
        <div className={styles.skillIconContainer}>
          <div className={`${styles.skillIcon} ${styles[skill.iconBg || 'purple']}`}>
            <Image
              src={skill.icon}
              alt={t(skill.name)}
              className={styles.skillIconImage}
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className={styles.skillContent}>
          <h3 className={styles.skillName}>{t(skill.name)}</h3>
          {skill.category && (
            <span className={styles.skillCategory}>{skill.category}</span>
          )}
          {skill.level && (
            <div className={styles.skillLevel}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`${styles.skillDot} ${i < skill.level / 20 ? styles.active : ''}`}
                ></span>
              ))}
            </div>
          )}
          {skill.points && skill.points.length > 0 && (
            <ul className={styles.skillPoints}>
              {skill.points.map((point, idx) => (
                <li key={`skill-point-${idx}`} className={styles.skillPoint}>
                  {t(point)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SkillSection = ({ title, skills }) => {
  const t = useTranslations('Skills');

  return (
    <div className="mb-5">
      <h3 className={`mb-4 ${styles.sectionTitle}`}>{t(title)}</h3>
      <div className={styles.skillsGrid}>
        {skills.map((skill, index) => (
          <SkillCard key={`skill-${index}`} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

const SkillsComponent = () => {
  const t = useTranslations('Skills');

  return (
    <div className="container my-5">
      <motion.div variants={textVariant(0.5)}>
        <p className={`text-center mb-2 ${styles.headerSubtitle}`}>
          {t('headerSubtitle')}
        </p>
        <h2 className={`text-center mb-5 ${styles.headerTitle}`}>
          {t('headerTitle')}
        </h2>

        <div className={styles.skillsContainer}>
          <SkillSection title="technicalSkills" skills={skills.technical} />
          <SkillSection title="softSkills" skills={skills.soft} />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(SkillsComponent, "skills", {
  showScroll: true,
  showUpScroll: true,
  showDownScroll: true
});