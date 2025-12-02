'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Projects.module.scss';
import { SectionWrapper } from '@/hoc';
import { projectsData, Project, ProjectCategory } from '@/constants';
import ProjectModal from './ProjectModal';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { zoomIn } from '@/utils/motion';

// Icons for category badges
const FrontendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3L6 1L11 3V9L6 11L1 9V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M1 3L6 5M6 5L11 3M6 5V11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const BackendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="2" width="10" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="1" y="7" width="10" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="3" cy="3.5" r="0.75" fill="currentColor" />
    <circle cx="3" cy="8.5" r="0.75" fill="currentColor" />
  </svg>
);

const MobileIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="1" width="7" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <line x1="4" y1="2" x2="8" y2="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="6" cy="9" r="0.75" fill="currentColor" />
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0C4.477 0 0 4.477 0 10C0 14.42 2.865 18.17 6.84 19.49C7.34 19.58 7.52 19.27 7.52 19C7.52 18.77 7.51 18.14 7.51 17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.52 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.48C3.62 8.39 4.01 7.5 4.65 6.79C4.55 6.54 4.2 5.52 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.52 15.45 6.54 15.35 6.79C15.99 7.5 16.38 8.39 16.38 9.48C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26C12.5 17.6 12.49 18.68 12.49 19C12.49 19.27 12.67 19.59 13.18 19.49C17.14 18.16 20 14.42 20 10C20 4.477 15.523 0 10 0Z"
      fill="currentColor"
    />
  </svg>
);

interface CategoryBadgeProps {
  category: ProjectCategory;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const t = useTranslations('Projects');

  const getCategoryConfig = (cat: ProjectCategory) => {
    switch (cat) {
      case 'frontend':
        return { icon: <FrontendIcon />, label: t('categoryFrontend'), className: styles.badgeFrontend };
      case 'backend':
        return { icon: <BackendIcon />, label: t('categoryBackend'), className: styles.badgeBackend };
      case 'mobile':
        return { icon: <MobileIcon />, label: t('categoryMobile'), className: styles.badgeMobile };
    }
  };

  const config = getCategoryConfig(category);

  return (
    <span className={`${styles.categoryBadge} ${config.className}`}>
      <span className={styles.badgeIcon}>{config.icon}</span>
      {config.label}
    </span>
  );
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const t = useTranslations('Projects');

  return (
    <div className={styles.projectCardContainer}>
      {/* Category Badges */}
      <div className={styles.categoryBadges}>
        {project.categories.map(category => (
          <CategoryBadge key={category} category={category} />
        ))}
      </div>

      {/* Project Card */}
      <button className={styles.projectCard} onClick={onClick} aria-label={`${t('viewDetails')} ${t(project.title)}`}>
        {/* Project Image */}
        <div className={styles.projectImage}>
          <Image
            src={project.mainImage}
            alt={t(project.title)}
            width={600}
            height={400}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Gradient Overlay */}
          <div className={styles.imageGradient} />

          {/* Hover Overlay with Icons */}
          <div className={styles.hoverOverlay}>
            <div className={styles.hoverIcons}>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.hoverIcon}
                onClick={e => e.stopPropagation()}
                aria-label={t('viewCode')}
              >
                <GithubIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className={styles.projectContent}>
          <h3 className={styles.projectTitle}>{t(project.title)}</h3>
          <p className={styles.projectDescription}>{t(project.description)}</p>

          {/* Technology Tags */}
          <div className={styles.tagsContainer}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.techTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Gradient Border on Hover */}
        <div className={styles.gradientBorder} />
      </button>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const t = useTranslations('Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <motion.section
      variants={zoomIn(0.2, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={styles.projectsSection}
      id="projects"
    >
      {/* Header */}
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
        <p className={styles.sectionSubtitle}>{t('sectionSubtitle')}</p>
      </div>

      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project)} />
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} show={showModal} handleClose={handleCloseModal} />
    </motion.section>
  );
};

export default SectionWrapper(ProjectsSection, 'projects', {
  showScroll: true,
  showUpScroll: true,
  showDownScroll: true,
});
