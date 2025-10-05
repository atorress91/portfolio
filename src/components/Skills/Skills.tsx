'use client';

import React, { useMemo } from 'react';
import { SectionWrapper } from '../../hoc';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import { buildSkillTree } from '@/constants';
import { SkillsHeader, CategorySection, getAllSkills } from './';
import styles from './Skills.module.scss';

const SkillsSection: React.FC = () => {
  const skillTrees = useMemo(() => buildSkillTree(), []);

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
      <SkillsHeader />

      <div className={styles.skillsContainer}>
        <CategorySection category="frontend" skills={frontendSkills} delay={0} />
        <CategorySection category="backend" skills={backendSkills} delay={0.1} />
        <CategorySection category="soft" skills={softSkills} delay={0.2} />
      </div>
    </motion.div>
  );
};

export default SectionWrapper(SkillsSection, 'skills', {
  showScroll: true,
  showUpScroll: true,
  showDownScroll: true,
});
