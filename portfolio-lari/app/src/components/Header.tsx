'use client'

import { useState } from 'react'
import ScrambleText from './ScrambleText'

type HeaderProps = {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  const [run, setRun] = useState(0)
  return (
    <button
      className={'tab' + (active ? ' tab--active' : '')}
      onClick={onClick}
      onMouseEnter={() => setRun((r) => r + 1)}
    >
      <ScrambleText text={label} play={run > 0} runKey={run} duration={400} />
    </button>
  )
}

export default function Header({ tabs, active, onChange }: HeaderProps) {
  return (
    <header className="header">
      <span className="header__name">lara-muiña</span>
      <nav className="tabs">
        {tabs.map((t) => (
          <TabButton
            key={t.id}
            label={t.label}
            active={t.id === active}
            onClick={() => onChange(t.id)}
          />
        ))}
      </nav>
    </header>
  )
}