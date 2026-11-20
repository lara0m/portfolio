import { useState } from 'react'
import Sidebar, { SidebarSection } from '../components/Sidebar'
import ProjectCard from '../components/ProjectCard'
import { TECH_ICONS } from '../components/TechIcons'
import { projects, ALL_TECHS } from '../data/projects'

export default function Proyectos() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (tech: string) =>
    setSelected((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    )

  // Sin filtros activos => se muestran todos
  const visible =
    selected.length === 0
      ? projects
      : projects.filter((p) => p.techs.some((t) => selected.includes(t)))

  return (
    <div className="layout">
      <Sidebar>
        <SidebarSection title="stack-tecnológico">
          {ALL_TECHS.map((tech) => {
            const Icon = TECH_ICONS[tech]
            return (
              <label key={tech} className="tech">
              <input
                type="checkbox"
                checked={selected.includes(tech)}
                onChange={() => toggle(tech)}
              />
              {Icon && <Icon className="tech__icon" />}
              <span>{tech}</span>
            </label>
          )
        })}
       </SidebarSection>
      </Sidebar>

      <section className="grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </section>
    </div>
  )
}