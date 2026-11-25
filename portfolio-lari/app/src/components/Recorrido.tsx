'use client'

import type { CSSProperties } from 'react'
import { useInView } from '../hooks/useInView'
import { recorrido } from '../data/loubre'
import Reveal from './Reveal'

// Rollo de película dibujado en vector (se puede reemplazar por tu imagen)
function CanisterSvg() {
  return (
    <svg viewBox="0 0 100 200" aria-hidden="true">
      <defs>
        <linearGradient id="canBody" x1="0" x2="1">
          <stop offset="0" stopColor="#e6d067" />
          <stop offset="0.55" stopColor="#fdf27e" />
          <stop offset="1" stopColor="#f2e07a" />
        </linearGradient>
      </defs>
      <rect x="33" y="0" width="34" height="22" rx="2" fill="#4a0f1c" />
      <rect x="0" y="20" width="100" height="14" rx="3" fill="#6b1f2e" />
      <rect x="3" y="34" width="94" height="136" fill="url(#canBody)" />
      <rect x="72" y="34" width="9" height="136" fill="#6b1f2e" />
      <rect x="81" y="34" width="3" height="136" fill="#4a0f1c" opacity="0.5" />
      <rect x="0" y="168" width="100" height="14" rx="3" fill="#6b1f2e" />
      <ellipse cx="50" cy="184" rx="50" ry="8" fill="#6b1f2e" />
    </svg>
  )
}

export default function Recorrido() {
  const { ref, inView } = useInView<HTMLDivElement>(0.45)
  const { eyebrow, title, sub, canister, photos } = recorrido

  return (
    <section id="recorrido" className="rec">
      <Reveal className="rec__head">
        <p className="rec__eyebrow">{eyebrow}</p>
        <h2 className="rec__title">{title}</h2>
        <p className="rec__sub">{sub}</p>
      </Reveal>

      <div ref={ref} className={'reel' + (inView ? ' reel--in' : '')}>
        <div className="reel__rig">
          {/* La tira sale por la ranura del rollo */}
          <div className="reel__strip">
            <div className="reel__frames">
              {photos.map((src, i) => (
                <figure className="frame" key={src} style={{ '--i': i } as CSSProperties}>
                  <img src={src} alt={`Cuadro ${i + 1} de mi recorrido`} loading="lazy" draggable={false} />
                </figure>
              ))}
            </div>
          </div>

          <div className="reel__can">
            {canister ? <img src={canister} alt="" draggable={false} /> : <CanisterSvg />}
          </div>
        </div>
      </div>
    </section>
  )
}