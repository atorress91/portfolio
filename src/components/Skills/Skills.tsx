'use client';

import React from 'react';
import { SectionWrapper } from '../../hoc';
import { motion } from 'framer-motion';
import { fadeIn, zoomIn } from '@/utils/motion';
import { skillCategories, SkillCategory, SkillCategoryType } from '@/constants';
import { useTranslations } from 'next-intl';
import styles from './Skills.module.scss';

// SVG Icons for each category
const CategoryIcons: Record<string, React.FC<{ className?: string }>> = {
  code: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
    </svg>
  ),
  server: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <line x1="7" y1="7" x2="7" y2="7" />
      <line x1="7" y1="17" x2="7" y2="17" />
    </svg>
  ),
  smartphone: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="18" r="1" />
    </svg>
  ),
  cloud: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  settings: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  palette: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
};

// Get card class based on category
const getCardClass = (categoryId: SkillCategoryType): string => {
  const classMap: Record<SkillCategoryType, string> = {
    frontend: styles.frontendCard,
    backend: styles.backendCard,
    mobile: styles.mobileCard,
    devops: styles.devopsCard,
    tools: styles.toolsCard,
    design: styles.designCard,
  };
  return classMap[categoryId] || '';
};

// Skill Category Card Component
interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, index }) => {
  const t = useTranslations('Skills');
  const IconComponent = CategoryIcons[category.icon];

  return (
    <motion.div
      variants={zoomIn(index * 0.1, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`${styles.skillCard} ${getCardClass(category.id)}`}
    >
      {/* Background Icon */}
      <div className={styles.bgIcon}>{IconComponent && <IconComponent />}</div>

      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>{IconComponent && <IconComponent />}</div>
        <h3 className={styles.categoryTitle}>{t(`categories.${category.id}`)}</h3>
      </div>

      {/* Skills Tags */}
      <div className={styles.skillsTagsContainer}>
        {category.skills.map(skill => (
          <span key={skill.name} className={`${styles.skillTag} ${skill.featured ? styles.skillTagFeatured : ''}`}>
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Main Skills Section Component
const SkillsSection: React.FC = () => {
  const t = useTranslations('Skills');

  return (
    <motion.div
      variants={fadeIn('up', 'tween', 0.2, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      id="skills"
      className="container py-5 d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      {/* Header */}
      <h2 className={styles.headerTitle}>{t('headerTitle')}</h2>
      <p className={styles.headerSubtitle}>{t('headerSubtitle')}</p>

      {/* Skills Grid */}
      <div className={styles.skillsContainer}>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(SkillsSection, 'skills', {
  showScroll: true,
  showUpScroll: true,
  showDownScroll: true,
});
