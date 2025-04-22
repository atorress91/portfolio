import React from 'react';
import {Modal, Button, Carousel} from 'react-bootstrap';
import Image from 'next/image';
import styles from './Projects.module.scss';
import {useTranslations} from "next-intl";

const techIconMap = {
    'Angular': '/angular.svg',
    '.Net': '/dotnet.svg',
    'Firebase': '/firebase.svg',
    'SqlServer': '/sql.svg',
    'Unity': '/unity.svg',
    'C#': '/c-sharp.svg',
    'Spring boot': '/spring-boot.svg',
    'MariaDb': '/mariadb.svg',
};

const TechIcon = ({ tag }) => {
    const hasIcon = techIconMap[tag] !== undefined;

    if (!hasIcon) return null;

    return (
        <div className={styles.techIcon} title={tag}>
            <Image
                src={techIconMap[tag]}
                alt={tag}
                width={32}
                height={32}
                className={styles.svgIcon}
            />
        </div>
    );
};

const ProjectModal = ({project, show, handleClose}) => {
    const t = useTranslations("Projects");

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
                <Carousel
                    className={styles.modalImagesSlider}
                    indicators={true}
                    interval={null}
                    controls={true}
                >
                    {project.images.map((image: string, index: number) => (
                        <Carousel.Item key={index} className="px-0 px-sm-2">
                            <div className="ratio ratio-16x9">
                                <Image
                                    className="d-block rounded"
                                    src={image}
                                    alt={`${t(project.title)} - ${t("imageAlt")} ${index + 1}`}
                                    width={600}
                                    height={400}
                                    style={{
                                        objectFit: 'contain',
                                        backgroundColor: '#121212'
                                    }}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className={`${styles.modalDescription} my-4`}>
                    <p className="mb-0">{t(project.description)}</p>
                </div>

                <div className={styles.modalTechnologies}>
                    <h4 className="mb-3 text-center">{t("technologies")}</h4>
                    <div className={`${styles.techIconsContainer} justify-content-center`}>
                        {project.tags.map((tag: string, index: number) => (
                            <TechIcon key={index} tag={tag} />
                        ))}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className={styles.modalButtons}>
                <Button
                    href={project.githubLink}
                    target="_blank"
                    className={`${styles.customBtnCode} d-flex align-items-center`}
                >
                    <i className="bi bi-github me-2"></i>
                    {t("viewCode")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProjectModal;