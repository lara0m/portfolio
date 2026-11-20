import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects, ALL_TECHS } from '../data/projects'

export default function Proyectos() {
  const [selected, setSelected] = useState([])

  const toggle = (tech) =>
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
        <h3 className="sidebar__title">proyectos</h3>
        {ALL_TECHS.map((tech) => (
          <label key={tech} className="check">
            <input
              type="checkbox"
              checked={selected.includes(tech)}
              onChange={() => toggle(tech)}
            />
            {tech}
          </label>
        ))}
      </Sidebar>

      <section className="grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </section>
    </div>
  )
}
