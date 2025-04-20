import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Image from 'next/image';
import styles from './Projects.module.scss';
import {SectionWrapper} from '@/hoc';
import {projectsData} from '@/constants';
import ProjectModal from './ProjectModal';
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

const ProjectCard = ({project, onClick}) => {
    const t = useTranslations("Projects");

    return (
        <div className={styles.projectCard} onClick={onClick}>
            <div className={styles.projectImage}>
                <Image
                    src={project.mainImage}
                    alt={t(project.title)}
                    width={600}
                    height={400}
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{t(project.title)}</h3>
                <p className={styles.projectDescription}>{t(project.description)}</p>

                <div className={styles.techIconsContainer}>
                    {project.tags.map((tag: string, index: number) => (
                        <TechIcon key={index} tag={tag} />
                    ))}
                </div>

                <div className={styles.projectLinks}>
                    <span className={styles.viewDetails}>{t("viewDetails")}</span>
                    <div className={styles.projectIcons}>
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectIcon}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={"viewCodeOnGitHub"}
                        >
                            <i className="bi bi-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const t = useTranslations("Projects");
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
        <section className={styles.projectsSection} id="projects">
            <Container>
                <h2 className={styles.sectionTitle}>{t("sectionTitle")}</h2>
                <div className={styles.sectionDivider}></div>
                <p className={styles.sectionDescription}>
                    {t("sectionDescription")}
                </p>

                <Row>
                    {projectsData.map((project) => (
                        <Col key={project.id} md={4} sm={6} xs={12} className="mb-4">
                            <ProjectCard
                                project={project}
                                onClick={() => handleProjectClick(project)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            <ProjectModal
                project={selectedProject}
                show={showModal}
                handleClose={handleCloseModal}
            />
        </section>
    );
};

export default SectionWrapper(ProjectsSection, 'projects', {
    showScroll: true,
    showUpScroll: true,
    showDownScroll: true
});