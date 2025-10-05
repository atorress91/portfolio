'use client';

import React, { useState, useMemo } from 'react';
import { SectionWrapper } from '../../hoc';
import styles from './Skills.module.scss';
import Image from 'next/image';
import { SkillNode } from '@/interfaces/SkillNode.interface';
import { useTranslations } from 'next-intl';
import { motion, easeOut } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import { buildSkillTree } from '@/constants';

const SvgIcon = ({ name, size = 32 }: { name: string; size?: number }) => {
  return <Image src={`svg/${name}.svg`} alt={name} className={styles.svgIcon} width={size} height={size} />;
};

interface SkillCardProps {
  node: SkillNode;
  category: 'frontend' | 'backend' | 'soft';
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ node, category, index }) => {
  const t = useTranslations('Skills');
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryKey = (nodeId: string): string => {
    if (nodeId === 'frontend') return 'frontendCategory';
    if (nodeId === 'backend') return 'backendCategory';
    if (nodeId === 'soft') return 'softSkillsCategory';
    return `${nodeId}.category`;
  };

  const skillName = t(`${node.id}.name`, { defaultValue: node.id });
  const categoryKey = getCategoryKey(node.id);
  const categoryName = t(categoryKey, { defaultValue: '' });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const getCategoryClass = () => {
    switch (category) {
      case 'frontend':
        return styles.frontendCard;
      case 'backend':
        return styles.backendCard;
      case 'soft':
        return styles.softCard;
      default:
        return '';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`${styles.skillCard} ${getCategoryClass()}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={`${styles.iconWrapper} ${styles[node.iconBg || 'purple']}`}>
          <SvgIcon name={node.icon} size={40} />
          {node.featured && (
            <div className={styles.featuredBadge}>
              <span>★</span>
            </div>
          )}
        </div>
        <div className={styles.cardHeaderText}>
          <h3 className={styles.skillName}>{skillName}</h3>
          {categoryName && <span className={styles.categoryBadge}>{categoryName}</span>}
        </div>
      </div>

      {/* Description */}
      {node.points && node.points.length > 0 && (
        <div className={`${styles.cardContent} ${isExpanded ? styles.expanded : ''}`}>
          <ul className={styles.pointsList}>
            {node.points.map(pointNumber => (
              <li key={`${node.id}-point-${pointNumber}`}>
                {t(`${node.id}.point${pointNumber}`, {
                  defaultValue: `Capability ${pointNumber}`,
                })}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Children Skills */}
      {node.children && node.children.length > 0 && (
        <div className={styles.childrenSkills}>
          {node.children.map(child => {
            const childName = t(`${child.id}.name`, { defaultValue: child.id });
            return (
              <div key={child.id} className={styles.childSkillChip}>
                <SvgIcon name={child.icon} size={16} />
                <span>{childName}</span>
                {child.featured && <span className={styles.starIcon}>★</span>}
              </div>
            );
          })}
        </div>
      )}

      {/* Expand Indicator */}
      {node.points && node.points.length > 0 && (
        <div className={styles.expandIndicator}>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={styles.expandArrow}
          >
            ▼
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  const t = useTranslations('Skills');
  const skillTrees = useMemo(() => buildSkillTree(), []);

  const getAllSkills = (node: SkillNode, skipRoot: boolean = false): SkillNode[] => {
    const skills: SkillNode[] = [];

    // Si no queremos saltar la raíz, agregamos el nodo actual
    if (!skipRoot) {
      skills.push(node);
    }

    // Agregamos todos los hijos recursivamente
    if (node.children) {
      node.children.forEach(child => {
        skills.push(...getAllSkills(child, false));
      });
    }
    return skills;
  };

  // Obtenemos solo las habilidades hijas, sin incluir los nodos raíz
  const frontendSkills = getAllSkills(skillTrees.frontend, true);
  const backendSkills = getAllSkills(skillTrees.backend, true);
  const softSkills = getAllSkills(skillTrees.soft, true);

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
      <div className="text-center mb-5 mt-3">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.headerTitle}
        >
          {t('headerTitle')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.headerSubtitle}
        >
          {t('headerSubtitle', { defaultValue: 'Technical expertise and professional capabilities' })}
        </motion.p>
      </div>

      {/* Skills Grid */}
      <div className={styles.skillsContainer}>
        {/* Frontend Section */}
        <div className={styles.categorySection}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${styles.categoryHeader} ${styles.frontendHeader}`}
          >
            <div className={styles.categoryIcon}>
              <SvgIcon name="angular" size={28} />
            </div>
            <h3>{t('frontendCategory')}</h3>
            <div className={styles.categoryLine}></div>
          </motion.div>
          <div className={styles.cardsGrid}>
            {frontendSkills.map((skill, index) => (
              <SkillCard key={skill.id} node={skill} category="frontend" index={index} />
            ))}
          </div>
        </div>

        {/* Backend Section */}
        <div className={styles.categorySection}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${styles.categoryHeader} ${styles.backendHeader}`}
          >
            <div className={styles.categoryIcon}>
              <SvgIcon name="dotnet" size={28} />
            </div>
            <h3>{t('backendCategory')}</h3>
            <div className={styles.categoryLine}></div>
          </motion.div>
          <div className={styles.cardsGrid}>
            {backendSkills.map((skill, index) => (
              <SkillCard key={skill.id} node={skill} category="backend" index={index} />
            ))}
          </div>
        </div>

        {/* Soft Skills Section */}
        <div className={styles.categorySection}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${styles.categoryHeader} ${styles.softHeader}`}
          >
            <div className={styles.categoryIcon}>
              <SvgIcon name="brain" size={28} />
            </div>
            <h3>{t('softSkillsCategory')}</h3>
            <div className={styles.categoryLine}></div>
          </motion.div>
          <div className={styles.cardsGrid}>
            {softSkills.map((skill, index) => (
              <SkillCard key={skill.id} node={skill} category="soft" index={index} />
            ))}
          </div>
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
