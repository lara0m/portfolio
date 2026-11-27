'use client'

import { useEffect, useRef } from 'react'
import { galeria } from '../data/loubre'
import { prefersReducedMotion } from '../hooks/useInView'
import Reveal from './Reveal'

// Cantidades de fotos con las que el mosaico queda completo, sin huecos
const LAYOUTS = [8, 14, 17]

export default function Galeria() {
  const gridRef = useRef<HTMLDivElement>(null)

  const photos = galeria.photos
  // Usa el mosaico más grande que entre con las fotos que tenés
  const count = [...LAYOUTS].reverse().find((n) => photos.length >= n) ?? photos.length
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

        <div className={`gal__grid gal__grid--${count}`} ref={gridRef}>
          {shown.map((photo, i) => (
            <figure className="tile" key={photo.src}>
              <div className="tile__z">
                <img
                  src={photo.src}
                  alt={`Foto de handball ${i + 1}`}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <span className="tile__n">{String(i + 1).padStart(2, '0')}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}