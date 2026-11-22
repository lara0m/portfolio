'use client'

import { useRef, useState } from 'react'
import Sidebar, { SidebarSection, TreeItem } from '../components/Sidebar'
import { FileTextIcon, ImageIcon, MailIcon, PhoneIcon } from '../components/Icons'
import { profile } from '../data/profile'
import { intro, stats, steps } from '../data/natacion'

export default function Intereses() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0) // 0 = portada, 1..3 = puntos del timeline
  const total = steps.length
  const states = total + 1 // portada + puntos

  // El scroll solo decide en qué punto estamos
  const onScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    const i = Math.round(el.scrollTop / el.clientHeight)
    setStep(Math.min(total, Math.max(0, i)))
  }

  const goTo = (i: number) => {
    const el = scrollerRef.current
    el?.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' })
  }

  const counter = Math.max(1, step)
  const isLast = step === total

  return (
    <div className="layout">
      <Sidebar>
        <SidebarSection title="mi-perfil">
          <TreeItem icon={<FileTextIcon />}>experiencia</TreeItem>
          <TreeItem icon={<FileTextIcon />} active>intereses</TreeItem>
        </SidebarSection>

        <SidebarSection title="contacto">
          <TreeItem icon={<MailIcon />}>{profile.email}</TreeItem>
          <TreeItem icon={<PhoneIcon />}>{profile.phone}</TreeItem>
        </SidebarSection>

        <div className="side-timeline">
          <span>timeline</span>
          <span>
            <b>{String(counter).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
          </span>
        </div>
      </Sidebar>

      <div className="tl-scroller" ref={scrollerRef} onScroll={onScroll}>
        <div className="tl-track" style={{ height: `${states * 100}%` }}>
          {/* Puntos de encastre del scroll (invisibles) */}
          {Array.from({ length: states }).map((_, i) => (
            <div
              key={i}
              className="tl-snap"
              style={{ top: `${(i * 100) / states}%`, height: `${100 / states}%` }}
            />
          ))}

          {/* Escenario fijo: no se mueve, solo cambia su contenido */}
          <div className="tl-stage" style={{ height: `${100 / states}%` }}>
            {/* Capa 0: portada */}
            <div className={'tl-layer' + (step === 0 ? ' tl-layer--on' : '')}>
              <section className="hero-panel" style={{ height: '100%' }}>
                <div className="panel__tab">
                  <ImageIcon /> foto-natación.jpg
                </div>
                <div
                  className="hero"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(11,17,32,.85), rgba(11,17,32,0) 45%), url("${intro.photo}"), linear-gradient(160deg, #17223a, #0b1120)`,
                  }}
                >
                  <ul className="hero-stats">
                    {stats.map((s) => (
                      <li key={s.label}>
                        <strong>{s.value}</strong>
                        <div>
                          {s.pre && <small>{s.pre}</small>}
                          <span>{s.label}</span>
                          {s.post && <small>{s.post}</small>}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button className="hero-scroll" onClick={() => goTo(1)}>
                    scroll para conocer más
                    <i>↓</i>
                  </button>
                </div>
              </section>
            </div>

            {/* Capa 1: código + foto, cambian en el lugar */}
            <div className={'tl-layer tl-split' + (step > 0 ? ' tl-layer--on' : '')}>
              <div className="tl-pane">
                <div className="panel__tab">intereses</div>
                <div className="tl-code">
                  <div className="tl-stack">
                    {steps.map((s, i) => {
                      const lines = ['/**', `* ${s.id} — ${s.title}`, ...s.text.map((t) => `* ${t}`), '*', '*/']
                      return (
                        <div
                          key={s.id}
                          className={'tl-block' + (step === i + 1 ? ' tl-block--on' : '')}
                        >
                          <div className="tl-lines">
                            {lines.map((text, n) => (
                              <div key={n} className={'tl-line' + (n === 5 ? ' tl-line--marker' : '')}>
                                <span className="code__num">{n + 1}</span>
                                <span className={n === 1 ? 'tl-title' : ''}>{text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <button className="tl-hint" onClick={() => goTo(isLast ? 0 : step + 1)}>
                    {isLast ? 'volver al inicio ↑' : 'seguir leyendo ↓'}
                  </button>
                </div>
              </div>

              <div className="tl-pane tl-pane--photo">
                <div className="panel__tab">
                  foto-natación-{steps[Math.max(0, step - 1)].id}
                </div>
                <div className="tl-photo">
                  {steps.map((s, i) => (
                    <div
                      key={s.id}
                      className={'tl-photo__img' + (step === i + 1 ? ' tl-photo__img--on' : '')}
                      style={{
                        backgroundImage: `url("${s.photo}"), linear-gradient(160deg, #17223a, #0b1120)`,
                      }}
                    />
                  ))}
                  <div className="tl-bars">
                    {steps.map((_, k) => (
                      <i key={k} className={k === step - 1 ? 'on' : ''} />
                    ))}
                  </div>
                  <span className="tl-photo__n">{steps[Math.max(0, step - 1)].id}</span>
                  <span className="tl-photo__file">
                    imagen_{steps[Math.max(0, step - 1)].id}.png
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}