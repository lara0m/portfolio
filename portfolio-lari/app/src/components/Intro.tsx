import type { CSSProperties } from 'react'
import { FRAME, intro } from '../data/loubre'

// Convierte medidas del Figma en porcentajes del frame
const px = (v: number, total: number) => `${(v / total) * 100}%`

export default function Intro() {
  const { camera, shots } = intro

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
            style={
              {
                left: px(s.x, FRAME.w),
                top: px(s.y, FRAME.h),
                width: px(s.w, FRAME.w),
                height: px(s.h, FRAME.h),
                '--i': i,
              } as CSSProperties
            }
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
            width: px(camera.w, FRAME.w),
          }}
        />

        <div className="intro__foot">
          <div className="rise" style={{ animationDelay: '2.1s' }}>
            <h1 className="intro__title">loubre</h1>
            <p className="intro__sub">fotografía deportiva</p>
          </div>

          <a className="intro__link rise" style={{ animationDelay: '2.35s' }} href="#galeria">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <rect x="2.5" y="3.5" width="27" height="25" rx="4" />
              <circle cx="21.5" cy="11" r="2.6" />
              <path d="M2.5 23 L10.5 15 L17 21.5 L21 17.5 L29.5 26" />
            </svg>
            <span>mi galería</span>
          </a>
        </div>
      </div>

      <div className="flash" aria-hidden="true" />
    </section>
  )
}