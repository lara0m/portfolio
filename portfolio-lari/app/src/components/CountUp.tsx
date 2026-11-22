'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'

export default function CountUp({
  value,
  play,
  duration = 1600,
  delay = 0,
}: {
  value: string
  play: boolean
  duration?: number
  delay?: number
}) {
  const target = parseInt(value, 10)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!play) { setN(0); return }
    if (isNaN(target) || prefersReducedMotion()) { setN(target); return }

    let raf = 0
    let start = 0
    const t = setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now
        const p = Math.min((now - start) / duration, 1)
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => { clearTimeout(t); cancelAnimationFrame(raf) }
  }, [play, target, duration, delay])

  return <>{isNaN(target) ? value : n}</>
}