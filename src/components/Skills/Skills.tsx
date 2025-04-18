"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import {Code, Server, Cloud, FileJson, Database, BarChart3, Users, Brain, Trophy, ArrowUpCircle, Languages, Globe
} from 'lucide-react';
import { SectionWrapper } from '../../hoc';
import styles from './Skills.module.scss';
import {skills} from '@/constants';

const getSkillIcon = (iconName: string) => {
    const iconProps = { size: 28, className: styles.skillIconImage };

    switch(iconName) {
        case 'react': return <Code {...iconProps} />;
        case 'node': return <Server {...iconProps} />;
        case 'aws': return <Cloud {...iconProps} />;
        case 'typescript': return <FileJson {...iconProps} />;
        case 'docker': return <ArrowUpCircle {...iconProps} />;
        case 'mongodb': return <Database {...iconProps} />;
        case 'communication': return <BarChart3 {...iconProps} />;
        case 'teamwork': return <Users {...iconProps} />;
        case 'problemsolving': return <Brain {...iconProps} />;
        case 'leadership': return <Trophy {...iconProps} />;
        case 'english': return <Globe {...iconProps} />;
        case 'spanish': return <Languages {...iconProps} />;
        default: return <Code {...iconProps} />;
    }
};

const SkillsComponent = () => {
    const t = useTranslations('Skills');

    return (
        <div className={styles.container}>
            {/* Encabezado */}
            <div className={styles.header}>
                <p className={styles.headerSubtitle}>{t('headerSubtitle')}</p>
                <h2 className={styles.headerTitle}>{t('headerTitle')}</h2>
                <p className={styles.headerDescription}>{t('headerDescription')}</p>
            </div>

            {/* Contenedor de todas las habilidades */}
            <div className={styles.skillsContainer} style={{color: 'white'}}>
                {/* Sección de habilidades destacadas */}
                {skills.featured && skills.featured.length > 0 && (
                    <div className={styles.skillSection}>
                        <h3 className={styles.sectionTitle}>{t('featuredSkills')}</h3>
                        <div className={styles.skillsGrid}>
                            {skills.featured.map((skill, index) => (
                                <div key={`featured-${index}`} className={styles.skillCard}>
                                    <div className={styles.skillCardInner}>
                                        {/* Encabezado de la tarjeta */}
                                        <div className={styles.cardHeader}>
                                            <div className={`${styles.skillIcon} ${styles[skill.iconBg || 'purple']}`}>
                                                {getSkillIcon(skill.icon)}
                                            </div>
                                            <div>
                                                <h3 className={styles.skillName}>{t(`${skill.id}.name`)}</h3>
                                                <span className={styles.skillCategory}>{t(`${skill.id}.category`)}</span>
                                            </div>
                                        </div>

                                        {/* Nivel de habilidad */}
                                        {skill.level && (
                                            <div className={styles.skillLevelContainer}>
                                                <div className={styles.skillLevelLabel}>
                                                    <span>{t('skillLevel')}</span>
                                                    <span>{skill.level}%</span>
                                                </div>
                                                <div className={styles.skillLevelBar}>
                                                    <div
                                                        className={styles.skillLevelProgress}
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Puntos de habilidad */}
                                        {skill.points && skill.points.length > 0 && (
                                            <div className={styles.skillPointsContainer}>
                                                <h4 className={styles.skillPointsTitle}>{t('keyCapabilities')}</h4>
                                                <ul className={styles.skillPoints}>
                                                    {skill.points.map((pointNumber, idx) => {
                                                        const translationKey = `${skill.id}.point${pointNumber}`;
                                                        return (
                                                            <li key={`skill-point-${idx}`} className={styles.skillPoint}>
                                                                {t(translationKey)}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Insignia destacada */}
                                        {skill.featured && (
                                            <div className={styles.featuredBadge}>
                                                {t('featured')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sección de habilidades técnicas */}
                <div className={styles.skillSection}>
                    <h3 className={styles.sectionTitle}>{t('technicalSkills')}</h3>
                    <div className={styles.skillsGrid}>
                        {skills.technical.map((skill, index) => (
                            <div key={`technical-${index}`} className={styles.skillCard}>
                                <div className={styles.skillCardInner}>
                                    {/* Contenido de tarjeta similar al anterior */}
                                    <div className={styles.cardHeader}>
                                        <div className={`${styles.skillIcon} ${styles[skill.iconBg || 'purple']}`}>
                                            {getSkillIcon(skill.icon)}
                                        </div>
                                        <div>
                                            <h3 className={styles.skillName}>{t(`${skill.id}.name`)}</h3>
                                            <span className={styles.skillCategory}>{t(`${skill.id}.category`)}</span>
                                        </div>
                                    </div>

                                    {skill.level && (
                                        <div className={styles.skillLevelContainer}>
                                            <div className={styles.skillLevelLabel}>
                                                <span>{t('skillLevel')}</span>
                                                <span>{skill.level}%</span>
                                            </div>
                                            <div className={styles.skillLevelBar}>
                                                <div
                                                    className={styles.skillLevelProgress}
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    {skill.points && skill.points.length > 0 && (
                                        <div className={styles.skillPointsContainer}>
                                            <h4 className={styles.skillPointsTitle}>{t('keyCapabilities')}</h4>
                                            <ul className={styles.skillPoints}>
                                                {skill.points.map((pointNumber, idx) => {
                                                    const translationKey = `${skill.id}.point${pointNumber}`;
                                                    return (
                                                        <li key={`skill-point-${idx}`} className={styles.skillPoint}>
                                                            {t(translationKey)}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de habilidades interpersonales */}
                <div className={styles.skillSection}>
                    <h3 className={styles.sectionTitle}>{t('softSkills')}</h3>
                    <div className={styles.skillsGrid}>
                        {skills.soft.map((skill, index) => (
                            <div key={`soft-${index}`} className={styles.skillCard}>
                                <div className={styles.skillCardInner}>
                                    {/* Contenido similar */}
                                    <div className={styles.cardHeader}>
                                        <div className={`${styles.skillIcon} ${styles[skill.iconBg || 'purple']}`}>
                                            {getSkillIcon(skill.icon)}
                                        </div>
                                        <div>
                                            <h3 className={styles.skillName}>{t(`${skill.id}.name`)}</h3>
                                            <span className={styles.skillCategory}>{t(`${skill.id}.category`)}</span>
                                        </div>
                                    </div>

                                    {skill.level && (
                                        <div className={styles.skillLevelContainer}>
                                            <div className={styles.skillLevelLabel}>
                                                <span>{t('skillLevel')}</span>
                                                <span>{skill.level}%</span>
                                            </div>
                                            <div className={styles.skillLevelBar}>
                                                <div
                                                    className={styles.skillLevelProgress}
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    {skill.points && skill.points.length > 0 && (
                                        <div className={styles.skillPointsContainer}>
                                            <h4 className={styles.skillPointsTitle}>{t('keyCapabilities')}</h4>
                                            <ul className={styles.skillPoints}>
                                                {skill.points.map((pointNumber, idx) => {
                                                    const translationKey = `${skill.id}.point${pointNumber}`;
                                                    return (
                                                        <li key={`skill-point-${idx}`} className={styles.skillPoint}>
                                                            {t(translationKey)}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de idiomas */}
                {skills.languages && skills.languages.length > 0 && (
                    <div className={styles.skillSection}>
                        <h3 className={styles.sectionTitle}>{t('languageSkills')}</h3>
                        <div className={styles.skillsGrid}>
                            {skills.languages.map((skill, index) => (
                                <div key={`language-${index}`} className={styles.skillCard}>
                                    <div className={styles.skillCardInner}>
                                        {/* Contenido similar */}
                                        <div className={styles.cardHeader}>
                                            <div className={`${styles.skillIcon} ${styles[skill.iconBg || 'purple']}`}>
                                                {getSkillIcon(skill.icon)}
                                            </div>
                                            <div>
                                                <h3 className={styles.skillName}>{t(`${skill.id}.name`)}</h3>
                                                <span className={styles.skillCategory}>{t(`${skill.id}.category`)}</span>
                                            </div>
                                        </div>

                                        {skill.level && (
                                            <div className={styles.skillLevelContainer}>
                                                <div className={styles.skillLevelLabel}>
                                                    <span>{t('skillLevel')}</span>
                                                    <span>{skill.level}%</span>
                                                </div>
                                                <div className={styles.skillLevelBar}>
                                                    <div
                                                        className={styles.skillLevelProgress}
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        {skill.points && skill.points.length > 0 && (
                                            <div className={styles.skillPointsContainer}>
                                                <h4 className={styles.skillPointsTitle}>{t('keyCapabilities')}</h4>
                                                <ul className={styles.skillPoints}>
                                                    {skill.points.map((pointNumber, idx) => {
                                                        const translationKey = `${skill.id}.point${pointNumber}`;
                                                        return (
                                                            <li key={`skill-point-${idx}`} className={styles.skillPoint}>
                                                                {t(translationKey)}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionWrapper(SkillsComponent, "skills", {
    showScroll: true,
    showUpScroll: true,
    showDownScroll: true
});