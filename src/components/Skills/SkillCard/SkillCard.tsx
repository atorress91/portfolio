import React, { useState } from 'react';
import { motion, easeOut } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SkillNode } from '@/interfaces/SkillNode.interface';
import SvgIcon from '../SvgIcon/SvgIcon';
import styles from '../Skills.module.scss';

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

export default SkillCard;
