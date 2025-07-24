import {SectionConfig} from "@/interfaces/SectionConfig.interface";
import {NavItem} from "@/interfaces/NavItem.interface";

export const experiences = [
  {
    id: 1,
    title: "fullStackDeveloper",
    company_name: "Ocx Group",
    icon: "/images/company/ocx-group.png",
    iconBg: "purple",
    date: "date2",
    points: ["point1", "point2", "point3", "point4"],
  },
  {
    id: 2,
    title: "fullStackDeveloper",
    company_name: "Aura Corporate",
    icon: "/images/company/aura.png",
    iconBg: "gray",
    date: "date1",
    points: ["point5", "point6", "point7"],
  },
];

export const projectsData = [
  {
    id: 1,
    title: "project1.title",
    description: "project1.description",
    tags: ["Angular", ".Net", "Firebase", "SqlServer"],
    mainImage: "/images/projects/componentes-2.png",
    images: [
      "/images/projects/componentes-1.png",
      "/images/projects/componentes-2.png",
    ],
    githubLink: "https://github.com/atorress91/componentes-ui",
  },
  {
    id: 2,
    title: "project2.title",
    description: "project2.description",
    tags: ["Unity", "C#"],
    mainImage: "/images/projects/patrones-1.png",
    images: [
      "/images/projects/patrones-1.png",
      "/images/projects/patrones-2.png",
    ],
    githubLink: "https://github.com/atorress91/cenfomon",
  },
  {
    id: 3,
    title: "project3.title",
    description: "project3.description",
    tags: ["Angular", "Spring boot", "MariaDb"],
    mainImage: "/images/projects/proyecto-1.png",
    images: [
      "/images/projects/proyecto-1.png",
      "/images/projects/proyecto-2.png",
      "/images/projects/proyecto-4.png",
      "/images/projects/proyecto-3.png",
      "/images/projects/proyecto-5.png",
      "/images/projects/proyecto-6.png"
    ],
    githubLink: "https://github.com/atorress91/rural-animal-frontend",
  },
];

export const sectionConfigs: SectionConfig[] = [
  { id: "hero", title: "About" },
  { id: "work", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" }
];

export const navItems: NavItem[] = [
    { key: "about", id: "hero" },
    { key: "experience", id: "work" },
    { key: "projects", id: "projects" },
    { key: "skills", id: "skills" },
    { key: "contact", id: "contact" },
];

