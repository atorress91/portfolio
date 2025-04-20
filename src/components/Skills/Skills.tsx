"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import {
    Code, Server, Cloud, FileJson, Database, BarChart3,
    Users, Brain, Trophy, ArrowUpCircle, Languages, Globe
} from 'lucide-react';
import { SectionWrapper } from '../../hoc';
import styles from './Skills.module.scss';
import { skills } from '@/constants';

interface SkillItem {
    id: string;
    icon: string;
    iconBg?: string;
    level?: number;
    points?: number[];
    featured?: boolean;
}

interface SkillCardProps {
    skill: SkillItem;
    t: (key: string) => string;
}

// Componente SkillCard
const SkillCard: React.FC<SkillCardProps> = ({ skill, t }) => {
    if (!skill || !skill.id) return null;

    return (
        <div className={`${styles.skillCard}`}>
            <div className={`${styles.skillCardInner} h-100 d-flex flex-column position-relative overflow-hidden`}>
                <div className="d-flex align-items-center gap-3 mb-4">
                    <div className={`${styles.skillIcon} ${styles[skill.iconBg || 'purple']} d-flex justify-content-center align-items-center`}>
                        {getSkillIcon(skill.icon)}
                    </div>
                    <div>
                        <h3 className={`${styles.skillName} mb-1`}>{t(`${skill.id}.name`)}</h3>
                        <span className={`${styles.skillCategory} d-inline-block`}>{t(`${skill.id}.category`)}</span>
                    </div>
                </div>

                {skill.level && (
                    <div className="mb-3 mt-2">
                        <div className="d-flex justify-content-between small mb-2">
                            <span className={`${styles.skillLevelText}`}>{t('skillLevel')}</span>
                            <span className={`${styles.skillLevelText}`}>{skill.level}%</span>
                        </div>
                        <div className="rounded overflow-hidden" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <div
                                className={`${styles.skillLevelProgress}`}
                                style={{ width: `${skill.level}%`, height: '100%', borderRadius: '4px' }}
                            ></div>
                        </div>
                    </div>
                )}

                {skill.points && skill.points.length > 0 && (
                    <div className="mt-3 flex-grow-1">
                        <h4 className={`${styles.skillPointsTitle} fw-semibold mb-3`}>{t('keyCapabilities')}</h4>
                        <ul className="list-unstyled m-0 p-0">
                            {skill.points.map((pointNumber, idx) => (
                                <li key={`skill-point-${idx}`} className={`${styles.skillPoint} mb-2`}>
                                    {t(`${skill.id}.point${pointNumber}`)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {skill.featured && (
                    <div className={`${styles.featuredBadge} position-absolute`}>
                        {t('featured')}
                    </div>
                )}
            </div>
        </div>
    );
};

// Íconos
const getSkillIcon = (iconName: string) => {
    const iconProps = { size: 28, className: `${styles.skillIconImage}` };
    switch (iconName) {
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

const SkillsComponent: React.FC = () => {
    const t = useTranslations('Skills');
    const categoriesOrder = ['featured', 'technical', 'soft', 'languages'];

    const allSkills = categoriesOrder.reduce<SkillItem[]>((acc, category) => {
        if (skills[category] && Array.isArray(skills[category])) {
            return [...acc, ...skills[category]];
        }
        return acc;
    }, []);

    return (
        <div className="container py-5">
            <div className="text-center mb-5 mt-3">
                <h2 className={`${styles.headerTitle} mb-3`}>{t('headerTitle')}</h2>
                <p className={`${styles.headerDescription} mx-auto`} style={{ maxWidth: '700px' }}>
                    {t('headerDescription')}
                </p>
            </div>

            <div className={`${styles.carouselWrapper} position-relative w-100 overflow-hidden py-3 mx-auto`}>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={'auto'}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    centeredSlides={true}
                    className={styles.carouselContainer}
                >
                    {allSkills.map((skill, index) => (
                        <SwiperSlide key={`skill-${index}`} className={`${styles.skillSlide} d-flex justify-content-center align-items-center`}>
                            <SkillCard skill={skill} t={t} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SectionWrapper(SkillsComponent, "skills", {
    showScroll: true,
    showUpScroll: true,
    showDownScroll: true
});