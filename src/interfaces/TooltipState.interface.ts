import {SkillNode} from "@/interfaces/SkillNode.interface";

export interface TooltipState {
    visible: boolean;
    skill: SkillNode | null;
    x: number;
    y: number;
}
