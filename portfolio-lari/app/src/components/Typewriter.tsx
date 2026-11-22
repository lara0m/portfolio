'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'

export default function Typewriter({
  text,
  play = true,
  speed = 60,
  delay = 0,
}: {
  text: string
  play?: boolean
  speed?: number
  delay?: number
}) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!play) { setN(0); return }
    if (prefersReducedMotion()) { setN(text.length); return }

    setN(0)
    let i = 0
    let iv: ReturnType<typeof setInterval> | undefined
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++
        setN(i)
        if (i >= text.length) clearInterval(iv)
      }, speed)
    }, delay)

    return () => { clearTimeout(t); clearInterval(iv) }
  }, [text, play, speed, delay])

  return (
    <span>
      {text.slice(0, n)}
      <span className="caret-blink" aria-hidden="true">▌</span>
    </span>
  )
}