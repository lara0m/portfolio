'use client'

import { useState, type ReactNode, type CSSProperties } from 'react'
import { CaretIcon, ChevronIcon, FolderIcon } from './Icons'

// Contenedor animado: abre/cierra sin medir alturas (grid 0fr -> 1fr)
function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div className={'collapse' + (open ? ' collapse--open' : '')}>
      <div className="collapse__inner">{children}</div>
    </div>
  )
}

export default function Sidebar({ children }: { children: ReactNode }) {
  return <aside className="sidebar">{children}</aside>
}

export function SidebarSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    
    <section className="side-section">
      <button
        className="side-section__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <CaretIcon className={'caret' + (open ? ' caret--open' : '')} />
        {title}
      </button>
      <Collapse open={open}>
        <div className="side-section__body">{children}</div>
      </Collapse>
    </section>
  )
}

export function TreeFolder({
  label,
  color,
  defaultOpen = false,
  children,
}: {
  label: string
  color: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button className="tree-row" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <ChevronIcon className={'chev' + (open ? ' chev--open' : '')} />
        <FolderIcon style={{ color } as CSSProperties} />
        {label}
      </button>
      <Collapse open={open}>
        <div className="tree-children">{children}</div>
      </Collapse>
    </div>
  )
}

export function TreeItem({ icon, children, active=false }: { icon?: ReactNode; children: ReactNode, active?: boolean }) {
  return (
    <div className={"tree-row" + (active ? ' tree-row--active' : '')}>
      {icon}
      <span>{children}</span>
    </div>
  )
}
