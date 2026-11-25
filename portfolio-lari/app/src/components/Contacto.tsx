'use client'

import { useState } from 'react'
import type { ChangeEvent, CSSProperties, FormEvent, ReactNode } from 'react'
import { FaInstagram, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { contacto } from '../data/loubre'
import { sendMessage } from '../lib/sendMessage'
import { useInView } from '../hooks/useInView'
import RevealText from './RevealText'

type Fields = { nombre: string; telefono: string; email: string; mensaje: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY: Fields = { nombre: '', telefono: '', email: '', mensaje: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const ICONS = {
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
  email: <FaEnvelope />,
}

// Orden de entrada en cascada
const d = (n: number) => ({ '--d': n }) as CSSProperties

function validate(v: Fields): Errors {
  const e: Errors = {}
  if (!v.nombre.trim()) e.nombre = 'Contame cómo te llamás'
  if (!v.email.trim()) e.email = 'Necesito tu email para responderte'
  else if (!EMAIL_RE.test(v.email)) e.email = 'Revisá el formato del email'
  if (!v.mensaje.trim()) e.mensaje = 'Escribí tu mensaje'
  return e
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div className={'field' + (error ? ' field--err' : '')}>
      <label className="field__l">
        <span className="field__t">
          {label}
          {required && <b aria-hidden="true">*</b>}
        </span>
        {children}
      </label>
      {error && (
        <span className="field__err" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export default function Contacto() {
  const { ref, inView } = useInView<HTMLElement>(0.25)
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [shaking, setShaking] = useState(false)
  const [flash, setFlash] = useState(0)

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
      return
    }

    setStatus('sending')
    try {
      await sendMessage(values)
      setFlash((n) => n + 1) // dispara el flash
      setValues(EMPTY)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" ref={ref} className={'ct' + (inView ? ' ct--in' : '')}>
      <div className="ct__bokeh" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>

      <div className="ct__wrap">
        {/* Columna izquierda */}
        <div className="ct__left">
          <div className="ct__title">
            <RevealText as="h2" text={contacto.title} />
          </div>
          <p className="ct__lead ct__a" style={d(1)}>{contacto.lead}</p>

          <div className="ct__info ct__a" style={d(2)}>
            <div>
              <h3>Teléfono</h3>
              <a className="ct__phone" href={contacto.phone.href}>{contacto.phone.label}</a>
            </div>
            <div>
              <h3>Redes sociales</h3>
              <div className="ct__social">
                {contacto.socials.map((s) => (
                  <a
                    key={s.kind}
                    className="ct__soc"
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    {...(s.kind !== 'email' ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {ICONS[s.kind]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Formulario, enmarcado como un visor */}
        <div className="ct__card">
          <i className="ct__corner ct__corner--tl" />
          <i className="ct__corner ct__corner--tr" />
          <i className="ct__corner ct__corner--bl" />
          <i className="ct__corner ct__corner--br" />
          {flash > 0 && <div key={flash} className="cflash" aria-hidden="true" />}

          {status === 'sent' ? (
            <div className="ct__done" role="status">
              <svg className="ct__check" viewBox="0 0 52 52" aria-hidden="true">
                <circle cx="26" cy="26" r="24" />
                <path d="M15 27 l8 8 l15 -17" />
              </svg>
              <h3>¡Mensaje enviado!</h3>
              <p>Gracias por escribir. Te respondo a la brevedad.</p>
              <button type="button" className="ct__again" onClick={() => setStatus('idle')}>
                enviar otro mensaje
              </button>
            </div>
          ) : (
            <form
              className={'ct__form' + (shaking ? ' ct__form--shake' : '')}
              onSubmit={onSubmit}
              noValidate
            >
              <fieldset className="ct__fs" disabled={status === 'sending'}>
                <div className="ct__a ct__row" style={d(2)}>
                  <Field label="Nombre" required error={errors.nombre}>
                    <input
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      placeholder="Escribe tu nombre aquí"
                      value={values.nombre}
                      onChange={set('nombre')}
                      aria-invalid={!!errors.nombre}
                    />
                  </Field>
                  <Field label="Teléfono">
                    <input
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Escribe tu teléfono aquí"
                      value={values.telefono}
                      onChange={set('telefono')}
                    />
                  </Field>
                </div>

                <div className="ct__a" style={d(3)}>
                  <Field label="Email" required error={errors.email}>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Escribe tu email aquí"
                      value={values.email}
                      onChange={set('email')}
                      aria-invalid={!!errors.email}
                    />
                  </Field>
                </div>

                <div className="ct__a" style={d(4)}>
                  <Field label="Mensaje" required error={errors.mensaje}>
                    <textarea
                      name="mensaje"
                      rows={5}
                      placeholder="Escribe tu mensaje aquí"
                      value={values.mensaje}
                      onChange={set('mensaje')}
                      aria-invalid={!!errors.mensaje}
                    />
                  </Field>
                </div>

                <div className="ct__a" style={d(5)}>
                  <button className="ct__btn" type="submit">
                    {status === 'sending' ? (
                      <>
                        <i className="ct__spin" aria-hidden="true" /> Enviando…
                      </>
                    ) : status === 'error' ? (
                      'Reintentar envío'
                    ) : (
                      'Enviar mensaje'
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="ct__fail" role="alert">
                    No se pudo enviar el mensaje. Probá de nuevo en un rato o escribime por Instagram.
                  </p>
                )}
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}