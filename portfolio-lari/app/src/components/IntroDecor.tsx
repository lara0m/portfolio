'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

// Aleatorio con semilla: siempre da lo mismo (evita errores de hidratación)
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(7)
const PX_ROWS = Array.from({ length: 11 }, () => {
  const rects: { x: number; w: number }[] = []
  let x = 0
  while (x < 300) {
    const w = 6 + Math.floor(rand() * 46)
    if (rand() > 0.25) rects.push({ x, w: Math.min(w, 300 - x) })
    x += w + 4 + Math.floor(rand() * 18)
  }
  return rects
})

/* Capa de atrás: va debajo de tu foto */
export function DecorBack() {
  const PANEL = '1030,90 1650,90 1710,150 1710,860 1650,920 1030,920 970,860 970,150'
  return (
    <div className="deco" aria-hidden="true">
      <div className="hud-grid" />
      <svg className="deco__svg" viewBox="0 0 1920 968" preserveAspectRatio="xMidYMid slice">
        {/* Panel con esquinas cortadas detrás de la foto */}
        <polygon className="hud-panel" points={PANEL} />
        <polygon className="hud-run" pathLength={1000} points={PANEL} />
        <text className="hud-t" x="978" y="76">// lara.png</text>

        {/* Líneas escalonadas, abajo a la izquierda */}
        <path className="hud-step hud-step--b" d="M70 930 H300 L330 900 H700 L730 870 H1000" />
        <path className="hud-step" d="M70 948 H300 L330 918 H700 L730 888 H1000" />
        <path className="hud-run-line" pathLength={1000} d="M70 948 H300 L330 918 H700 L730 888 H1000" />

        {/* Ventana + mira de enfoque */}
        <polygon className="hud-ghost" points="700,590 990,590 1040,640 1040,800 750,800 700,750" />
        <g className="hud-reticle">
          <path d="M825 674 V650 H849" />
          <path d="M891 650 H915 V674" />
          <path d="M915 716 V740 H891" />
          <path d="M849 740 H825 V716" />
          <path d="M870 688 V702 M863 695 H877" />
        </g>
      </svg>
    </div>
  )
}

/* Capa de adelante: bordes, escaneo y datos */
export function DecorFront() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('es-AR', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="deco" aria-hidden="true">
      <div className="hud-scan" />

      <i className="hud-corner hud-corner--tl" />
      <i className="hud-corner hud-corner--tr" />
      <i className="hud-corner hud-corner--bl" />
      <i className="hud-corner hud-corner--br" />

      <div className="hud-rail">
        <i className="hud-rail__bar" />
      </div>

      <svg className="hud-px" viewBox="0 0 300 120">
        {PX_ROWS.map((row, r) => (
          <g key={r} className="hud-px__row" style={{ animationDelay: `${(r * 0.37) % 2.4}s` }}>
            {row.map((b, i) => (
              <rect key={i} x={b.x} y={r * 11} width={b.w} height={5} />
            ))}
          </g>
        ))}
      </svg>

      <div className="hud-tri">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="hud-tri__item" style={{ '--i': n - 1 } as CSSProperties}>
            <svg viewBox="0 0 24 22">
              <polygon points="12,2 22,20 2,20" />
            </svg>
            <span>0{n}</span>
          </div>
        ))}
      </div>

      <div className="hud-read">
        <p><i className="hud-dot" /> online</p>
        <p className="hud-read__muted">// hora local</p>
        <p className="hud-read__time">{time}</p>
      </div>
    </div>
  )
}