'use client'

import { useInView } from '../hooks/useInView'
import { sobreMi } from '../data/loubre'

export default function SobreMi() {
  const { ref, inView } = useInView<HTMLElement>(0.35)

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className={'about' + (inView ? ' about--in' : '')}
    >
      <div className="about__inner">
        <div className="about__cam">
          <img src={sobreMi.image} alt="Cámara fotográfica vista desde atrás" draggable={false} />

          {/* Recuadro de enfoque */}
          <div className="reticle" aria-hidden="true">
            <i /><i /><i /><i /><b />
          </div>
        </div>

        <div className="about__text">
          <p className="about__eyebrow">{sobreMi.eyebrow}</p>
          <h2 className="about__title">{sobreMi.title}</h2>
          <p className="about__p">{sobreMi.text}</p>
        </div>
      </div>
    </section>
  )
}