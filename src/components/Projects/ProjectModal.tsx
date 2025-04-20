import React from 'react';
import {Modal, Button, Carousel} from 'react-bootstrap';
import Image from 'next/image';
import styles from './Projects.module.scss';
import {useTranslations} from "next-intl";

const ProjectModal = ({project, show, handleClose}) => {
    const t = useTranslations("Projects");

    if (!project) return null;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            centered
            className={styles.projectModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>{t(project.title)}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Carousel
                    className={styles.modalImagesSlider}
                    indicators={true}
                    interval={null}
                >
                    {project.images.map((image: string, index: number) => (
                        <Carousel.Item key={index}>
                            <Image
                                className="d-block w-100"
                                src={image}
                                alt={`${t(project.title)} - ${t("imageAlt")} ${index + 1}`}
                                width={600}
                                height={400}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className={styles.modalDescription}>
                    <p>{t(project.description)}</p>
                </div>

                <div className={styles.modalTechnologies}>
                    <h4>{t("technologies")}</h4>
                    <div className={styles.projectTags}>
                        {project.tags.map((tag: string, index: number) => (
                            <span key={index} className={styles.projectTag}>
                  {tag}
                </span>
                        ))}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className={styles.modalButtons}>
                <Button
                    variant="outline-primary"
                    href={project.githubLink}
                    target="_blank"
                    className={`${styles.btnCode} d-flex align-items-center`}
                >
                    <i className="bi bi-github me-2"></i>
                    {t("viewCode")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProjectModal;