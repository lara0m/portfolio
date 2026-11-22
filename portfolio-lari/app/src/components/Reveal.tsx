'use client'

import type { ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

export default function Reveal({
  as = 'div',
  className = '',
  delay = 0,
  children,
}: {
  as?: 'div' | 'section' | 'p' | 'span'
  className?: string
  delay?: number
  children: ReactNode
}) {
  const { ref, inView } = useInView<HTMLElement>(0.2)
  const Tag = as as ElementType

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal--in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}