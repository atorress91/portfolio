import React from 'react';
import { SkillNode } from '@/interfaces/SkillNode.interface';
import CategoryHeader from '../CategoryHeader/CategoryHeader';
import SkillCard from '../SkillCard/SkillCard';
import styles from '../Skills.module.scss';

interface CategorySectionProps {
  category: 'frontend' | 'backend' | 'soft';
  skills: SkillNode[];
  delay?: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, skills, delay = 0 }) => {
  return (
    <div className={styles.categorySection}>
      <CategoryHeader category={category} delay={delay} />
      <div className={styles.cardsGrid}>
        {skills.map((skill, index) => (
          <SkillCard key={skill.id} node={skill} category={category} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
