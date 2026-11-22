'use client'

import { Fragment } from 'react'
import type { ElementType } from 'react'
import { useInView } from '../hooks/useInView'

export default function RevealText({
  text,
  as = 'span',
  stagger = 80,
  delay = 0,
}: {
  text: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  stagger?: number
  delay?: number
}) {
  const { ref, inView } = useInView<HTMLElement>(0.4)
  const Tag = as as ElementType

  return (
    <Tag ref={ref} className={'reveal-text' + (inView ? ' reveal-text--in' : '')} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="rw" aria-hidden="true">
            <span className="rw__in" style={{ transitionDelay: `${delay + i * stagger}ms` }}>
              {word}
            </span>
          </span>{' '}
        </Fragment>
      ))}
    </Tag>
  )
}