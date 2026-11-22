'use client'

import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import { useInView, prefersReducedMotion } from '../hooks/useInView'
import RevealText from './RevealText'
import ScrambleText from './ScrambleText'


export default function ProjectCard({
  project,
  big = false,
}: {
  project: Project
  big?: boolean
}) {
  const { title, category, description, image, techs, meta, links } = project
  const { ref, inView } = useInView<HTMLElement>(0.15)
  const imgRef = useRef<HTMLDivElement>(null)

  // Parallax: la imagen se mueve más lento que el scroll
  useEffect(() => {
    const box = imgRef.current
    if (!box || prefersReducedMotion()) return
    const scroller = box.closest('.proj-scroll')
    const inner = box.firstElementChild as HTMLElement | null
    if (!scroller || !inner) return

    const update = () => {
      const s = scroller.getBoundingClientRect()
      const r = box.getBoundingClientRect()
      const p = (r.top + r.height / 2 - (s.top + s.height / 2)) / s.height
      inner.style.transform = `translateY(${p * -40}px)`
    }
    update()
    scroller.addEventListener('scroll', update, { passive: true })
    return () => scroller.removeEventListener('scroll', update)
  }, [])

  return (
    <article
      ref={ref}
      className={'pblock' + (big ? ' pblock--big' : '') + (inView ? ' pblock--in' : '')}
    >
      <header className="pblock__head">
        <h2 className="pblock__title">
          <RevealText text={title} />
        </h2>
        <span className="pblock__meta">{meta}</span>
      </header>
      <p className="pblock__cat">
        // <ScrambleText text={category} play={inView} />
      </p>

      <div className="pblock__img" ref={imgRef}>
        <div
          className="pblock__img-in"
          style={image ? { backgroundImage: `url("${image}")` } : undefined}
        />
      </div>

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