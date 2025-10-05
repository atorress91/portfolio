import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from '../Skills.module.scss';

const SkillsHeader: React.FC = () => {
  const t = useTranslations('Skills');

  return (
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
  );
};

export default SkillsHeader;
