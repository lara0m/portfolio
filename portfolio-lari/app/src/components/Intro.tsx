import type { CSSProperties } from 'react'
import { FRAME, intro } from '../data/loubre'

// Convierte medidas del Figma en porcentajes del frame
const px = (v: number, total: number) => `${(v / total) * 100}%`

export default function Intro() {
  const { camera, shots } = intro
  const mid = (shots.length - 1) / 2

  return (
    <section
      id="intro"
      className="intro"
      style={{ '--ar': FRAME.w / FRAME.h } as CSSProperties}
    >
      <div className="stage">
        {/* Franjas: cada vector ya trae su forma, solo se coloca */}
        {shots.map((s, i) => (
          <img
            key={s.src}
            className="shot"
            src={s.src}
            alt=""
            draggable={false}
            style={{ '--k': Math.abs(i - mid) } as CSSProperties}
            
          />
        ))}

        {/* Recuadro de enfoque */}
        <div className="reticle" aria-hidden="true">
          <i /><i /><i /><i /><b />
        </div>

        <img
          className="cam"
          src={camera.src}
          alt=""
          draggable={false}
          style={{
            left: px(camera.x, FRAME.w),
            top: px(camera.y, FRAME.h),
            height: `calc(${px(FRAME.h - camera.y, FRAME.h)} + 2px)`,
          }}
        />

        <div className="intro__foot">
          <div className="rise" style={{ animationDelay: '2.1s' }}>
            <h1 className="intro__title">loubre</h1>
            <p className="intro__sub">fotografía deportiva</p>
          </div>

          <a className="intro__link rise" style={{ animationDelay: '2.35s' }} href="#galeria">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <rect x="2.5" y="4.5" width="27" height="23" rx="3.5" />
              <circle cx="11" cy="12" r="2.3" />
              <path d="M3.5 24 L11.5 17 L17.5 22 L22.5 17.5 L28.5 23" />
            </svg>
            <span>mi galería</span>
          </a>
        </div>
      </div>

      <div className="flash" aria-hidden="true" />
    </section>
  )
}