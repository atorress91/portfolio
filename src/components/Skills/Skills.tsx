"use client";

import React, {useState, useRef, useEffect, useMemo} from 'react';
import {SectionWrapper} from '../../hoc';
import styles from './Skills.module.scss';
import Image from "next/image";
import {TooltipState} from "@/interfaces/TooltipState.interface";
import {SkillNode} from "@/interfaces/SkillNode.interface";
import {useTranslations} from "next-intl";

const SvgIcon = ({name}: { name: string }) => {
    return (
        <Image
            src={`/${name}.svg`}
            alt={name}
            className={styles.svgIcon}
            width={24}
            height={24}
        />
    );
};

const buildSkillTree = () => {
    return {
        frontend: {
            id: 'frontend',
            icon: 'angular',
            iconBg: 'red',
            children: [
                {
                    id: 'react',
                    icon: 'react',
                    iconBg: 'blue',
                    points: [1, 2],
                    featured: false
                },
                {
                    id: 'angular',
                    icon: 'angular',
                    iconBg: 'red',
                    points: [1, 2],
                    featured: false
                }
            ]
        },
        backend: {
            id: 'backend',
            icon: 'dotnet',
            iconBg: 'green',
            children: [
                {
                    id: 'dotnet',
                    icon: 'dotnet',
                    iconBg: 'purple',
                    points: [1, 2],
                    featured: true,
                    children: [
                        {id: 'csharp', icon: 'c-sharp', iconBg: 'purple', points: [1, 2]}
                    ]
                },
                {
                    id: 'spring',
                    icon: 'spring-boot',
                    iconBg: 'green',
                    points: [1, 2],
                    featured: true,
                    children: [
                        {id: 'java', icon: 'java', iconBg: 'green', points: [1, 2]}
                    ]
                },
                {
                    id: 'databases',
                    icon: 'postgresql',
                    iconBg: 'gray',
                    featured: true,
                    children: [
                        {
                            id: 'sqlserver',
                            icon: 'sql',
                            iconBg: 'gray'
                        },
                        {
                            id: 'mariadb',
                            icon: 'mariadb',
                            iconBg: 'gray'
                        }
                    ]
                }
            ]
        },
        soft: {
            id: 'soft',
            icon: 'brain',
            iconBg: 'purple',
            children: [
                {
                    id: 'communication',
                    icon: 'communication',
                    iconBg: 'purple'
                },
                {
                    id: 'teamwork',
                    icon: 'teamwork',
                    iconBg: 'blue'
                },
                {
                    id: 'problemsolving',
                    icon: 'brain',
                    iconBg: 'green'
                }
            ]
        }
    };
};

const SkillNod = ({
                      node,
                      x,
                      y,
                      onHover,
                      onLeave
                  }: {
    node: SkillNode;
    x: number;
    y: number;
    onHover: (node: SkillNode, x: number, y: number) => void;
    onLeave: () => void;
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('Skills');

    const handleMouseEnter = () => {
        if (nodeRef.current) {
            const rect = nodeRef.current.getBoundingClientRect();
            onHover(node, rect.x + rect.width / 2, rect.y);
        }
    };

    const nodeLabel = node.id ? t(`${node.id}.name`, { defaultValue: node.id }) : node.id;

    return (
        <div
            ref={nodeRef}
            className={styles.skillNode}
            style={{left: `${x}px`, top: `${y}px`}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onLeave}
        >
            <div
                className={`${styles.skillIcon} ${styles[node.iconBg || 'purple']}`}
                data-icon={nodeLabel}
            >
                <SvgIcon name={node.icon}/>
            </div>
            {node.featured && <div className={styles.featuredIndicator}></div>}
        </div>
    );
};


const TreeConnections = ({
                             nodes
                         }: {
    nodes: Array<{ node: SkillNode; x: number; y: number; parent?: { x: number; y: number } }>;
}) => {
    return (
        <svg className={styles.connections}>
            {nodes.map((item, index) => {
                if (!item.parent) return null;

                return (
                    <path
                        key={`connection-${index}`}
                        d={`M${item.parent.x},${item.parent.y + 30} C${item.parent.x},${(item.parent.y + item.y) / 2} ${item.x},${(item.parent.y + item.y) / 2} ${item.x},${item.y - 30}`}
                        className={styles.connectionPath}
                    />
                );
            })}
        </svg>
    );
};

const SkillTooltip = ({
                          tooltip
                      }: {
    tooltip: TooltipState;
}) => {
    const t = useTranslations('Skills');

    if (!tooltip.visible || !tooltip.skill) return null;

    const skillName = t(`${tooltip.skill.id}.name`, { defaultValue: tooltip.skill.id });
    const categoryKey = tooltip.skill.id === 'frontend' ? 'frontendCategory' :
        tooltip.skill.id === 'backend' ? 'backendCategory' :
            tooltip.skill.id === 'soft' ? 'softSkillsCategory' :
                `${tooltip.skill.id}.category`;
    const category = t(categoryKey, { defaultValue: tooltip.skill.id });

    return (
        <div
            className={styles.tooltip}
            style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y + 15}px`,
                transform: 'translate(-50%, -100%)'
            }}
        >
            <div className={styles.tooltipContent}>
                <h3 className={styles.tooltipTitle}>
                    {skillName}
                </h3>
                {tooltip.skill.points && tooltip.skill.points.length > 0 && (
                    <div className={styles.tooltipPoints}>
                        <h4>{t('keyCapabilities')}</h4>
                        <ul>
                            {tooltip.skill.points.map((pointNumber, idx) => (
                                <li key={`tooltip-point-${idx}`}>
                                    {t(`${tooltip.skill!.id}.point${pointNumber}`, { defaultValue: `Skill point ${pointNumber}` })}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className={styles.tooltipCategory}>
                    {category}
                </div>
                {tooltip.skill.featured && (
                    <div className={styles.tooltipCategory} style={{ marginLeft: '8px' }}>
                        {t('featured')}
                    </div>
                )}
            </div>
            <div className={styles.tooltipArrow}></div>
        </div>
    );
};

const calculateNodePositions = (
    node: SkillNode,
    x: number,
    y: number,
    horizontalSpacing: number,
    verticalSpacing: number,
    parent?: { x: number; y: number }
): Array<{ node: SkillNode; x: number; y: number; parent?: { x: number; y: number } }> => {
    const result: Array<{ node: SkillNode; x: number; y: number; parent?: { x: number; y: number } }> = [
        {node, x, y, parent}
    ];

    if (node.children && node.children.length > 0) {
        let childWidth = horizontalSpacing * (node.children.length - 1);

        const maxWidth = horizontalSpacing * 2.5;
        if (childWidth > maxWidth && node.children.length > 3) {
            childWidth = maxWidth;
        }

        const startX = x - childWidth / 2;

        node.children.forEach((child, index) => {
            let childX = startX + (index * childWidth) / Math.max(1, node.children!.length - 1);

            if (node.id === 'backend' || node.id === 'soft') {
                childX = x + ((childX - x) * 0.85);
            }

            const childY = y + verticalSpacing;

            const nextHorizontalSpacing = horizontalSpacing * 0.75;

            const childPositions = calculateNodePositions(
                child,
                childX,
                childY,
                nextHorizontalSpacing,
                verticalSpacing,
                {x, y}
            );
            result.push(...childPositions);
        });
    }

    return result;
}

const SkillsTree: React.FC = () => {
    const t = useTranslations('Skills');

    const [tooltip, setTooltip] = useState<TooltipState>({
        visible: false,
        skill: null,
        x: 0,
        y: 0
    });

    const [treePositions, setTreePositions] = useState<{
        frontend: Array<{ node: SkillNode; x: number; y: number; parent?: { x: number; y: number } }>;
        backend: Array<{ node: SkillNode; x: number; y: number; parent?: { x: number; y: number } }>;
        soft: Array<{ node: SkillNode; x: number; y: number; parent?: { x: number; y: number } }>;
    }>({
        frontend: [],
        backend: [],
        soft: []
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const skillTrees = useMemo(() => buildSkillTree(), []);

    useEffect(() => {
        const calculatePositions = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.clientWidth;
            const baseHorizontalSpacing = Math.min(180, containerWidth / 6);
            const isMobile = containerWidth < 768;
            const frontendSpacing = isMobile ? baseHorizontalSpacing * 0.8 : baseHorizontalSpacing;
            const backendSpacing = isMobile ? baseHorizontalSpacing * 0.6 : baseHorizontalSpacing * 0.7;
            const softSpacing = isMobile ? baseHorizontalSpacing * 0.6 : baseHorizontalSpacing * 0.7;
            const verticalSpacing = isMobile ? 100 : 120;
            const frontendX = isMobile ? containerWidth * 0.25 : containerWidth * 0.2;
            const backendX = containerWidth * 0.5;
            const softX = isMobile ? containerWidth * 0.75 : containerWidth * 0.8;
            const startY = isMobile ? 150 : 100;

            const frontendPositions = calculateNodePositions(
                skillTrees.frontend,
                frontendX,
                startY,
                frontendSpacing,
                verticalSpacing
            );

            const backendPositions = calculateNodePositions(
                skillTrees.backend,
                backendX,
                startY,
                backendSpacing,
                verticalSpacing
            );

            const softPositions = calculateNodePositions(
                skillTrees.soft,
                softX,
                startY,
                softSpacing,
                verticalSpacing
            );

            setTreePositions({
                frontend: frontendPositions,
                backend: backendPositions,
                soft: softPositions
            });
        };

        calculatePositions();
        window.addEventListener('resize', calculatePositions);

        return () => {
            window.removeEventListener('resize', calculatePositions);
        };
    }, [skillTrees]);

    const handleNodeHover = (node: SkillNode, x: number, y: number) => {
        setTooltip({
            visible: true,
            skill: node,
            x,
            y
        });
    };

    const handleNodeLeave = () => {
        setTooltip({
            ...tooltip,
            visible: false
        });
    };

    return (
        <div className="container py-5 d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="text-center mb-5 mt-3">
                <h2 className={styles.headerTitle}>{t('headerTitle')}</h2>
            </div>
            <div
                ref={containerRef}
                className={`${styles.skillTreeContainer} mx-auto w-100`}
            >
                {/* Connections */}
                <TreeConnections nodes={[...treePositions.frontend, ...treePositions.backend, ...treePositions.soft]}/>

                {/* Main Categories */}
                <div className={styles.treeCategoryLabels}>
                    <div className={`${styles.treeCategoryLabel} ${styles.frontendLabel}`}>
                        {t('frontendCategory')}
                    </div>
                    <div className={`${styles.treeCategoryLabel} ${styles.backendLabel}`}>
                        {t('backendCategory')}
                    </div>
                    <div className={`${styles.treeCategoryLabel} ${styles.softLabel}`}>
                        {t('softSkillsCategory')}
                    </div>
                </div>

                {/* Frontend Nodes */}
                {treePositions.frontend.map((item, index) => (
                    <SkillNod
                        key={`frontend-${index}`}
                        node={item.node}
                        x={item.x}
                        y={item.y}
                        onHover={handleNodeHover}
                        onLeave={handleNodeLeave}
                    />
                ))}

                {/* Backend Nodes */}
                {treePositions.backend.map((item, index) => (
                    <SkillNod
                        key={`backend-${index}`}
                        node={item.node}
                        x={item.x}
                        y={item.y}
                        onHover={handleNodeHover}
                        onLeave={handleNodeLeave}
                    />
                ))}

                {/* Soft Skills Nodes */}
                {treePositions.soft.map((item, index) => (
                    <SkillNod
                        key={`soft-${index}`}
                        node={item.node}
                        x={item.x}
                        y={item.y}
                        onHover={handleNodeHover}
                        onLeave={handleNodeLeave}
                    />
                ))}

                {/* Tooltip */}
                <SkillTooltip tooltip={tooltip}/>
            </div>
        </div>
    );
};

export default SectionWrapper(SkillsTree, "skills", {
    showScroll: true,
    showUpScroll: true,
    showDownScroll: true
});