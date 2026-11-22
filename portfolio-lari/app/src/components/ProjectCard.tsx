import type { Project } from '../data/projects'

export default function ProjectCard({
  project,
  big = false,
}: {
  project: Project
  big?: boolean
}) {
  const { title, category, description, image, techs, meta, links } = project

  return (
    <article className={'pblock' + (big ? ' pblock--big' : '')}>
      <header className="pblock__head">
        <h2 className="pblock__title">{title}</h2>
        <span className="pblock__meta">{meta}</span>
      </header>
      <p className="pblock__cat">// {category}</p>

      <div
        className="pblock__img"
        style={image ? { backgroundImage: `url("${image}")` } : undefined}
      />

      <div className="pblock__row">
        <span className="pblock__label">// descripción</span>
        <p className="pblock__text">{description}</p>
      </div>

      <div className="pblock__row">
        <span className="pblock__label">// stack</span>
        <p className="pblock__stack">{techs.join(' · ')}</p>
      </div>

      {links && links.length > 0 && (
        <div className="pblock__row">
          <span className="pblock__label">// links</span>
          <p className="pblock__stack">
            {links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </p>
        </div>
      )}
    </article>
  )
}