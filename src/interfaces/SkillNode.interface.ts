export interface SkillNode {
    id: string;
    icon: string;
    iconBg?: string;
    points?: number[];
    featured?: boolean;
    children?: SkillNode[];
}
