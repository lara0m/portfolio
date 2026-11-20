'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import Header from './src/components/Header'
import Hello from './src/pages-content/Hello'
import MiPerfil from './src/pages-content/MiPerfil'
import Proyectos from './src/pages-content/Proyectos'

type Tab = { id: string; label: string; Page: ComponentType }

const TABS: Tab[] = [
  { id: 'hello', label: 'hello-world!', Page: Hello },
  { id: 'perfil', label: 'mi-perfil', Page: MiPerfil },
  { id: 'proyectos', label: 'proyectos', Page: Proyectos },
]

export default function Home() {
  const [active, setActive] = useState<string>('hello')
  const current = TABS.find((t) => t.id === active) ?? TABS[0]
  const Page = current.Page

  return (
    <div className="app">
      <Header tabs={TABS} active={active} onChange={setActive} />
      <main className="main">
        <Page />
      </main>
    </div>
  )
}