import type { IconType } from 'react-icons'
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaPython, FaDatabase } from 'react-icons/fa'

// La clave tiene que coincidir con los nombres de ALL_TECHS y de projects.ts
export const TECH_ICONS: Record<string, IconType> = {
  React: FaReact,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  Python: FaPython,
  SQL: FaDatabase,
}