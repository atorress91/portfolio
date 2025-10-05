import { SkillNode } from '@/interfaces/SkillNode.interface';

export const getAllSkills = (node: SkillNode, skipRoot: boolean = false): SkillNode[] => {
  const skills: SkillNode[] = [];

  // Si no queremos saltar la raíz, agregamos el nodo actual
  if (!skipRoot) {
    skills.push(node);
  }

  // Agregamos todos los hijos recursivamente
  if (node.children) {
    node.children.forEach(child => {
      skills.push(...getAllSkills(child, false));
    });
  }
  return skills;
};
