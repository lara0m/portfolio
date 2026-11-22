import { useRef, useState } from 'react'
import Sidebar, { SidebarSection } from '../components/Sidebar'
import ProjectCard from '../components/ProjectCard'
import { TECH_ICONS } from '../components/TechIcons'
import { projects, ALL_TECHS, OTHERS_TITLE } from '../data/projects'
import Reveal from '../components/Reveal'

export default function Proyectos() {
  const [selected, setSelected] = useState<string[]>([])
  const othersRef = useRef<HTMLHeadingElement>(null)

  const toggle = (tech: string) =>
    setSelected((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    )

  // Sin filtros activos => se muestran todos
  const matches = (techs: string[]) =>
    selected.length === 0 || techs.some((t) => selected.includes(t))

  const featured = projects.filter((p) => p.featured && matches(p.techs))
  const others = projects.filter((p) => !p.featured && matches(p.techs))

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

      <div className="proj-scroll">
        <div className="proj-inner">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} big />
          ))}

          {featured.length > 0 && others.length > 0 && (
            <button
              className="proj-hint"
              onClick={() => othersRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Seguí bajando para ver mis otros proyectos ↓
            </button>
          )}

          {others.length > 0 && (
            <>
              <Reveal className="proj-group-wrap">
                <h2 className="proj-group" ref={othersRef}>
                {OTHERS_TITLE}
                </h2>
              </Reveal>  
              {others.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </>
          )}

          {featured.length === 0 && others.length === 0 && (
            <p className="muted">// ningún proyecto usa ese stack todavía</p>
          )}
        </div>
      </div>
    </div>
  )
}