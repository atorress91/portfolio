import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SvgIcon from '../SvgIcon/SvgIcon';
import styles from '../Skills.module.scss';

interface CategoryHeaderProps {
  category: 'frontend' | 'backend' | 'soft';
  delay?: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, delay = 0 }) => {
  const t = useTranslations('Skills');

  const getIconName = () => {
    switch (category) {
      case 'frontend':
        return 'angular';
      case 'backend':
        return 'dotnet';
      case 'soft':
        return 'brain';
      default:
        return 'angular';
    }
  };

  const getCategoryText = () => {
    switch (category) {
      case 'frontend':
        return t('frontendCategory');
      case 'backend':
        return t('backendCategory');
      case 'soft':
        return t('softSkillsCategory');
      default:
        return '';
    }
  };

  const getCategoryHeaderClass = () => {
    switch (category) {
      case 'frontend':
        return styles.frontendHeader;
      case 'backend':
        return styles.backendHeader;
      case 'soft':
        return styles.softHeader;
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`${styles.categoryHeader} ${getCategoryHeaderClass()}`}
    >
      <div className={styles.categoryIcon}>
        <SvgIcon name={getIconName()} size={28} />
      </div>
      <h3>{getCategoryText()}</h3>
      <div className={styles.categoryLine}></div>
    </motion.div>
  );
};

export default CategoryHeader;
