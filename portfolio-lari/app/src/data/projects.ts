export type Project = {
  id: number
  title: string
  category: string
  description: string
  image: string | null // ruta dentro de public/ (ej: '/img/horus-ai.png') o null
  techs: string[]
  meta: string // texto de arriba a la derecha
  featured?: boolean // true = proyecto principal
  links?: { label: string; url: string }[] // opcional: repo, demo, etc.
}

export const OTHERS_TITLE = 'Proyectos de 3º y 4º año de secundaria'

export const projects: Project[] = [
  {
    id: 1,
    title: 'Horus AI',
    category: 'inteligencia-artificial',
    description:
      'Aplicación de escritorio que integra modelos de IA sobre cámaras de seguridad existentes para detectar riesgos automáticamente.',
    image: null,
    techs: ['Python'],
    meta: '5.º año · proyecto principal',
    featured: true,
  },
  {
    id: 2,
    title: 'NEIA',
    category: 'inteligencia-artificial',
    description:
      'Plataforma web de análisis encefalográfico (EEG) capaz de identificar si una persona experimentó emociones positivas o negativas.',
    image: null,
    techs: ['React', 'Python'],
    meta: '4.º año',
  },
  {
    id: 3,
    title: 'Marcelo Ticardo',
    category: 'robótica',
    description: 'Robot guía diseñado para orientar a los alumnos hacia sus aulas.',
    image: null,
    techs: ['HTML', 'CSS'],
    meta: '4.º año',
  },
  {
    id: 4,
    title: 'Mind Race',
    category: 'desarrollo-web',
    description:
      'Aplicación web gamificada (estilo Kahoot) enfocada en el aprendizaje interactivo de lenguajes de programación como JavaScript y Python. Desarrollada en 48 horas durante una hackathon escolar.',
    image: null,
    techs: ['React', 'JavaScript'],
    meta: '3.º año · hackathon',
  },
]

export const ALL_TECHS = ['React', 'HTML', 'CSS', 'JavaScript', 'Python', 'SQL']