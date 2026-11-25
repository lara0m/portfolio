'use client'

import { useEffect, useRef } from 'react'
import { galeria } from '../data/loubre'
import { prefersReducedMotion } from '../hooks/useInView'
import Reveal from './Reveal'

export default function Galeria() {
  const gridRef = useRef<HTMLDivElement>(null)

  // El mosaico tiene dos formatos: 8 fotos o 17
  const photos = galeria.photos
  const count = photos.length >= 17 ? 17 : Math.min(photos.length, 8)
  const shown = photos.slice(0, count)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const tiles = Array.from(grid.querySelectorAll<HTMLElement>('.tile'))

    // Con "reducir movimiento" todo se ve revelado desde el principio
    if (prefersReducedMotion()) {
      tiles.forEach((t) => t.style.setProperty('--r', '1'))
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      tiles.forEach((t, i) => {
        const top = t.getBoundingClientRect().top
        // 0 = recién asoma por abajo · 1 = ya está revelada
        const start = vh * 0.98
        const end = vh * (0.55 + (i % 4) * 0.035) // pequeño desfase entre fotos
        const p = Math.min(1, Math.max(0, (start - top) / (start - end)))
        t.style.setProperty('--r', p.toFixed(3))
        if (p >= 1 && !t.classList.contains('tile--done')) t.classList.add('tile--done')
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [count])

  return (
    <section id="galeria" className="gal">
      <div className="gal__wrap">
        <Reveal className="gal__head">
          <p className="gal__eyebrow">{galeria.eyebrow}</p>
          <h2 className="gal__title">{galeria.title}</h2>
          <p className="gal__sub">{galeria.sub}</p>
        </Reveal>

        <div className="gal__grid" ref={gridRef}>
          {shown.map((src, i) => (
            <figure className="tile" key={src}>
              <div className="tile__z">
                <img src={src} alt={`Foto de handball ${i + 1}`} loading="lazy" draggable={false} />
              </div>
              <span className="tile__n">{String(i + 1).padStart(2, '0')}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}