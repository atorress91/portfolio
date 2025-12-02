import React from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import Image from 'next/image';
import styles from './Projects.module.scss';
import { useTranslations } from 'next-intl';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0C4.477 0 0 4.477 0 10C0 14.42 2.865 18.17 6.84 19.49C7.34 19.58 7.52 19.27 7.52 19C7.52 18.77 7.51 18.14 7.51 17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.52 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.48C3.62 8.39 4.01 7.5 4.65 6.79C4.55 6.54 4.2 5.52 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.52 15.45 6.54 15.35 6.79C15.99 7.5 16.38 8.39 16.38 9.48C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26C12.5 17.6 12.49 18.68 12.49 19C12.49 19.27 12.67 19.59 13.18 19.49C17.14 18.16 20 14.42 20 10C20 4.477 15.523 0 10 0Z"
      fill="currentColor"
    />
  </svg>
);

const ProjectModal = ({ project, show, handleClose }) => {
  const t = useTranslations('Projects');

  if (!project) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      dialogClassName="modal-90w modal-dialog-scrollable"
      contentClassName="h-100"
      className={styles.projectModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t(project.title)}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-2 px-sm-3 py-3">
        <Carousel className={styles.modalImagesSlider} indicators={true} interval={null} controls={true}>
          {project.images.map((image: string, index: number) => (
            <Carousel.Item key={`${project.title}-image-${index}-${image.split('/').pop()}`} className="px-0 px-sm-2">
              <div className="ratio ratio-16x9">
                <Image
                  className="d-block rounded"
                  src={image}
                  alt={`${t(project.title)} - ${t('imageAlt')} ${index + 1}`}
                  width={600}
                  height={400}
                  style={{
                    objectFit: 'contain',
                    backgroundColor: '#121212',
                  }}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className={styles.modalDescription}>
          <p>{t(project.description)}</p>
        </div>

        <div className={styles.modalTechnologies}>
          <h4>{t('technologies')}</h4>
          <div className={styles.modalTagsContainer}>
            {project.tags.map((tag: string, index: number) => (
              <span key={`${project.title}-tech-${tag}-${index}`} className={styles.techTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.modalFooter}>
        <Button href={project.githubLink} target="_blank" className={styles.customBtnCode}>
          <GithubIcon />
          {t('viewCode')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;
