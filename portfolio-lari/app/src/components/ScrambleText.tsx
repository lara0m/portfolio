'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'

const CHARS = '!<>-_\\/[]{}—=+*^?#01'

export default function ScrambleText({
  text,
  play = true,
  runKey = 0,
  duration = 700,
}: {
  text: string
  play?: boolean
  runKey?: number // cambiar este número vuelve a disparar el efecto
  duration?: number
}) {
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!play || prefersReducedMotion()) { setOut(text); return }

    let raf = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now
      const p = Math.min((now - start) / duration, 1)
      const reveal = Math.floor(p * text.length)
      setOut(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < reveal ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join('')
      )
      if (p < 1) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, play, runKey, duration])

  return <>{out}</>
}