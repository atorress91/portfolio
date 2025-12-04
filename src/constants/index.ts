import { NavItem } from '@/interfaces/NavItem.interface';
import { SectionConfig } from '@/interfaces/SectionConfig.interface';

export const experiences = [
  {
    id: 1,
    title: 'fullStackDeveloper',
    company_name: 'Ocx Group',
    icon: '/images/company/ocx-group.png',
    iconBg: 'purple',
    date: 'date2',
    points: ['point1', 'point2', 'point3', 'point4'],
  },
  {
    id: 2,
    title: 'fullStackDeveloper',
    company_name: 'Aura Corporate',
    icon: '/images/company/aura.png',
    iconBg: 'gray',
    date: 'date1',
    points: ['point5', 'point6', 'point7'],
  },
];

export const techIconMap = {
  Angular: 'svg/angular.svg',
  '.Net': 'svg/dotnet.svg',
  Firebase: 'svg/firebase.svg',
  SqlServer: 'svg/sql.svg',
  Unity: 'svg/unity.svg',
  'C#': 'svg/c-sharp.svg',
  'Spring boot': 'svg/spring-boot.svg',
  MariaDb: 'svg/mariadb.svg',
  flutter: 'svg/flutter.svg',
  riverpod: 'svg/riverpod.svg',
  PostgreSQL: 'svg/postgresql.svg',
};

export type ProjectCategory = 'frontend' | 'backend' | 'mobile';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  categories: ProjectCategory[];
  mainImage: string;
  images: string[];
  githubLink: string;
}

export const projectsData: Project[] = [
  {
    id: 5,
    title: 'project5.title',
    description: 'project5.description',
    tags: ['Angular', '.Net', 'Firebase', 'PostgreSQL'],
    categories: ['frontend', 'backend'],
    mainImage: '/images/projects/recycoin-web/recycoin-1.png',
    images: [
      '/images/projects/recycoin-web/recycoin-1.png',
      '/images/projects/recycoin-web/recycoin-2.png',
      '/images/projects/recycoin-web/recycoin-3.png',
      '/images/projects/recycoin-web/recycoin-4.png',
    ],
    githubLink: 'https://github.com/atorress91/recycoin',
  },
  {
    id: 4,
    title: 'project4.title',
    description: 'project4.description',
    tags: ['flutter', 'riverpod', 'Firebase'],
    categories: ['mobile'],
    mainImage: '/images/projects/recycoin-app/recycoin-app-10.png',
    images: [
      '/images/projects/recycoin-app/recycoin-app-1.png',
      '/images/projects/recycoin-app/recycoin-app-2.png',
      '/images/projects/recycoin-app/recycoin-app-3.png',
      '/images/projects/recycoin-app/recycoin-app-4.png',
      '/images/projects/recycoin-app/recycoin-app-5.png',
      '/images/projects/recycoin-app/recycoin-app-6.png',
      '/images/projects/recycoin-app/recycoin-app-7.png',
      '/images/projects/recycoin-app/recycoin-app-8.png',
      '/images/projects/recycoin-app/recycoin-app-9.png',
      '/images/projects/recycoin-app/recycoin-app-10.png',
      '/images/projects/recycoin-app/recycoin-app-11.png',
      '/images/projects/recycoin-app/recycoin-app-12.png',
      '/images/projects/recycoin-app/recycoin-app-13.png',
      '/images/projects/recycoin-app/recycoin-app-14.png',
      '/images/projects/recycoin-app/recycoin-app-15.png',
      '/images/projects/recycoin-app/recycoin-app-16.png',
      '/images/projects/recycoin-app/recycoin-app-17.png',
    ],
    githubLink: 'https://github.com/atorress91/flutter-app',
  },
  {
    id: 1,
    title: 'project1.title',
    description: 'project1.description',
    tags: ['Angular', '.Net', 'Firebase', 'SqlServer'],
    categories: ['frontend', 'backend'],
    mainImage: '/images/projects/componentes-2.png',
    images: ['/images/projects/componentes-1.png', '/images/projects/componentes-2.png'],
    githubLink: 'https://github.com/atorress91/componentes-ui',
  },
  {
    id: 2,
    title: 'project2.title',
    description: 'project2.description',
    tags: ['Unity', 'C#'],
    categories: ['frontend'],
    mainImage: '/images/projects/patrones-1.png',
    images: ['/images/projects/patrones-1.png', '/images/projects/patrones-2.png'],
    githubLink: 'https://github.com/atorress91/cenfomon',
  },
  {
    id: 3,
    title: 'project3.title',
    description: 'project3.description',
    tags: ['Angular', 'Spring boot', 'MariaDb'],
    categories: ['frontend', 'backend'],
    mainImage: '/images/projects/proyecto-1.png',
    images: [
      '/images/projects/proyecto-1.png',
      '/images/projects/proyecto-2.png',
      '/images/projects/proyecto-4.png',
      '/images/projects/proyecto-3.png',
      '/images/projects/proyecto-5.png',
      '/images/projects/proyecto-6.png',
    ],
    githubLink: 'https://github.com/atorress91/rural-animal-frontend',
  },
];

export const sectionConfigs: SectionConfig[] = [
  { id: 'hero', title: 'About' },
  { id: 'work', title: 'Experience' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'contact', title: 'Contact' },
];

export const navItems: NavItem[] = [
  { key: 'about', id: 'hero' },
  { key: 'experience', id: 'work' },
  { key: 'projects', id: 'projects' },
  { key: 'skills', id: 'skills' },
  { key: 'contact', id: 'contact' },
];

// Skill Categories for the new Skills section design
export type SkillCategoryType = 'frontend' | 'backend' | 'mobile' | 'devops' | 'tools' | 'design';

export interface SkillItem {
  name: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: SkillCategoryType;
  icon: string;
  colorFrom: string;
  colorTo: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    icon: 'code',
    colorFrom: '#9810fa',
    colorTo: '#ad46ff',
    skills: [
      { name: 'React', featured: true },
      { name: 'TypeScript', featured: true },
      { name: 'Next.js' },
      { name: 'HTML/CSS' },
      { name: 'JavaScript', featured: true },
      { name: 'Angular' },
      { name: 'TanStack Query' },
    ],
  },
  {
    id: 'backend',
    icon: 'server',
    colorFrom: '#0092b8',
    colorTo: '#00b8db',
    skills: [
      { name: '.NET', featured: true },
      { name: 'Nest js' },
      { name: 'PostgreSQL' },
      { name: 'REST APIs', featured: true },
      { name: 'Kafka' },
      { name: 'Spring Boot' },
      { name: 'SQL Server' },
    ],
  },
  {
    id: 'mobile',
    icon: 'smartphone',
    colorFrom: '#e60076',
    colorTo: '#f6339a',
    skills: [{ name: 'Flutter', featured: true }],
  },
  {
    id: 'devops',
    icon: 'cloud',
    colorFrom: '#4f39f6',
    colorTo: '#615fff',
    skills: [
      { name: 'Docker', featured: true },
      { name: 'AWS' },
      { name: 'CI/CD' },
      { name: 'Kubernetes' },
      { name: 'Digital Ocean' },
    ],
  },
  {
    id: 'tools',
    icon: 'settings',
    colorFrom: '#7f22fe',
    colorTo: '#8e51ff',
    skills: [{ name: 'Git', featured: true }, { name: 'Figma' }, { name: 'Postman' }],
  },
  {
    id: 'design',
    icon: 'palette',
    colorFrom: '#c800de',
    colorTo: '#e12afb',
    skills: [
      { name: 'UI/UX Design' },
      { name: 'Responsive Design', featured: true },
      { name: 'Prototyping' },
      { name: 'Design Systems' },
      { name: 'Wireframing' },
    ],
  },
];

// Legacy buildSkillTree for backward compatibility (if needed elsewhere)
export const buildSkillTree = () => {
  return {
    frontend: {
      id: 'frontend',
      icon: 'angular',
      iconBg: 'red',
      children: [
        { id: 'react', icon: 'react', iconBg: 'blue', points: [1, 2], featured: false },
        { id: 'angular', icon: 'angular', iconBg: 'red', points: [1, 2], featured: true },
      ],
    },
    backend: {
      id: 'backend',
      icon: 'dotnet',
      iconBg: 'green',
      children: [
        { id: 'dotnet', icon: 'dotnet', iconBg: 'purple', points: [1, 2, 3, 4], featured: true },
        { id: 'spring', icon: 'spring-boot', iconBg: 'green', points: [1], featured: false },
      ],
    },
    soft: {
      id: 'soft',
      icon: 'brain',
      iconBg: 'purple',
      children: [
        { id: 'communication', icon: 'communication', iconBg: 'purple', points: [1] },
        { id: 'teamwork', icon: 'teamwork', iconBg: 'blue', points: [1, 2] },
        { id: 'problemsolving', icon: 'brain', featured: true, iconBg: 'green', points: [1, 2] },
      ],
    },
  };
};

export const socialLinks = [
  {
    id: 'linkedin',
    iconSrc: 'svg/linkedin.svg',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/andrés-torres-sánchez-3ba367353',
  },
  {
    id: 'github',
    iconSrc: 'svg/github.svg',
    label: 'GitHub',
    url: 'https://github.com/atorress91',
  },
  {
    id: 'whatsapp',
    iconSrc: 'svg/whatsapp.svg',
    label: 'WhatsApp',
    url: 'https://wa.me/50683010150',
  },
  {
    id: 'email',
    iconSrc: 'svg/email.svg',
    label: 'Email',
    url: 'mailto:andres91411@gmail.com',
  },
];
