import { FaReact, FaBootstrap, FaNodeJs, FaJava } from "react-icons/fa";
import {
  SiNextdotjs,
  SiChakraui,
  SiTypescript,
  SiJavascript,
  SiCss3,
  SiMysql,
} from "react-icons/SI";

export const TechObj = {
  nextjs: {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "whiteAlpha.500",
  },
  react: {
    name: "React",
    icon: FaReact,
    color: "blue.500",
  },
  chakraui: {
    name: "Chakra UI",
    icon: SiChakraui,
    color: "green.500",
  },
  typescript: {
    name: "TypeScript",
    icon: SiTypescript,
    color: "blue.500",
  },
  javascript: {
    name: "JavaScript",
    icon: SiJavascript,
    color: "yellow.500",
  },
  css: {
    name: "CSS Modules",
    icon: SiCss3,
    color: "blue.500",
  },
  bootstrap: {
    name: "Bootstrap",
    icon: FaBootstrap,
    color: "purple.500",
  },
  nodejs: {
    name: "Node.js",
    icon: FaNodeJs,
    color: "green.500",
  },
  java: {
    name: "Java",
    icon: FaJava,
    color: "red.500",
  },
  mysql: {
    name: "MySQL",
    icon: SiMysql,
    color: "blue.300",
  },
} as const;
