import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Projects.module.scss';
import { SectionWrapper } from '@/hoc';
import { projectsData } from '@/constants';
import ProjectModal from './ProjectModal';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { zoomIn } from '@/utils/motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const techIconMap = {
  Angular: '/angular.svg',
  '.Net': '/dotnet.svg',
  Firebase: '/firebase.svg',
  SqlServer: '/sql.svg',
  Unity: '/unity.svg',
  'C#': '/c-sharp.svg',
  'Spring boot': '/spring-boot.svg',
  MariaDb: '/mariadb.svg',
  flutter: '/flutter.svg',
  riverpod: '/riverpod.svg',
};

const TechIcon = ({ tag }) => {
  const hasIcon = techIconMap[tag] !== undefined;

  if (!hasIcon) return null;

  return (
    <div className={styles.techIcon} title={tag}>
      <Image src={techIconMap[tag]} alt={tag} width={32} height={32} className={styles.svgIcon} />
    </div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  const t = useTranslations('Projects');

  return (
    <button className={styles.projectCard} onClick={onClick} aria-label={`View details for ${t(project.title)}`}>
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
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{t(project.title)}</h3>
        <p className={styles.projectDescription}>{t(project.description)}</p>
        <div className={styles.techIconsContainer}>
          {project.tags.map((tag: string) => (
            <TechIcon key={tag} tag={tag} />
          ))}
        </div>
        <div className={styles.projectLinks}>
          <span className={styles.viewDetails}>{t('viewDetails')}</span>
          <div className={styles.projectIcons}>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectIcon}
              onClick={e => e.stopPropagation()}
              aria-label={t('viewCode')}
            >
              <Image src="/github.svg" width={40} height={40} alt="GitHub" unoptimized />,
            </a>
          </div>
        </div>
      </div>
    </button>
  );
};

const ProjectsSection = () => {
  const t = useTranslations('Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleProjectClick = (project: any) => {
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
      className={`${styles.projectsSection} d-flex flex-column align-items-center justify-content-lg-start justify-content-center min-vh-100`}
      id="projects"
    >
      <h2 className={`${styles.sectionTitle} mt-lg-2 mb-lg-5 mb-2`}>{t('sectionTitle')}</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="w-100"
      >
        {projectsData.map(project => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
          </SwiperSlide>
        ))}
      </Swiper>

      <ProjectModal project={selectedProject} show={showModal} handleClose={handleCloseModal} />
    </motion.section>
  );
};

export default SectionWrapper(ProjectsSection, 'projects', {
  showScroll: true,
  showUpScroll: true,
  showDownScroll: true,
});
